require('dotenv').config();
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const Database = require('better-sqlite3');
const nodemailer = require('nodemailer');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const BASE_URL = (process.env.BASE_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'change-this-admin-token';
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'dineshmca500@gmail.com';
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '';
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'bookings.db');

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.exec(`
CREATE TABLE IF NOT EXISTS bookings (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 public_id TEXT NOT NULL UNIQUE,
 name TEXT NOT NULL,
 country TEXT NOT NULL,
 visa TEXT NOT NULL,
 whatsapp TEXT NOT NULL,
 requirement TEXT NOT NULL,
 message TEXT DEFAULT '',
 booking_date TEXT NOT NULL,
 booking_time TEXT NOT NULL,
 timezone TEXT NOT NULL DEFAULT 'America/New_York',
 status TEXT NOT NULL DEFAULT 'new',
 created_at TEXT NOT NULL,
 updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_bookings_slot ON bookings(booking_date, booking_time);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
`);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(morgan('combined'));
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, limit: 120, standardHeaders: 'draft-8', legacyHeaders: false }));
app.use(express.static(path.join(__dirname)));

const times = ['10:00 AM ET','11:30 AM ET','1:00 PM ET','3:00 PM ET','5:30 PM ET','7:00 PM ET'];
function pad(n){ return String(n).padStart(2,'0'); }
function nextBusinessDays(count=10){
  const days=[]; const d=new Date();
  while(days.length<count){
    d.setDate(d.getDate()+1);
    const dow=d.getDay();
    if(dow!==0 && dow!==6) days.push(new Date(d));
  }
  return days;
}
function isoDate(d){ return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }
function displayDate(d){ return d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'}); }
function slotsForDate(date){
  const booked = new Set(db.prepare('SELECT booking_time FROM bookings WHERE booking_date = ? AND status NOT IN (\'cancelled\')').all(date).map(x=>x.booking_time));
  return times.map(time=>({time, available:!booked.has(time)}));
}
function safe(value,max=200){ return String(value ?? '').trim().slice(0,max); }
function validDate(value){ return /^\d{4}-\d{2}-\d{2}$/.test(value); }
function validSlot(value){ return times.includes(value); }
function bookingUrl(id){ return `${BASE_URL}/api/bookings/${encodeURIComponent(id)}/ics`; }
function whatsappUrl(text){
  if(!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g,'')}?text=${encodeURIComponent(text)}`;
}

let transporter = null;
if(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS){
  transporter = nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:String(process.env.SMTP_SECURE)==='true',auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});
}
async function sendOwnerEmail(booking){
  if(!transporter) return false;
  const subject=`New USA Job Marketing Call — ${booking.name}`;
  const text=[`New booking request`,``,`Candidate: ${booking.name}`,`Country: ${booking.country}`,`Visa: ${booking.visa}`,`WhatsApp: ${booking.whatsapp}`,`Requirement: ${booking.requirement}`,`Date: ${booking.booking_date}`,`Time: ${booking.booking_time} (ET)`,`Message: ${booking.message||'Not provided'}`,``,`Calendar file: ${bookingUrl(booking.public_id)}`].join('\n');
  await transporter.sendMail({from:process.env.SMTP_FROM||OWNER_EMAIL,to:OWNER_EMAIL,subject,text,replyTo:booking.whatsapp.includes('@')?undefined:OWNER_EMAIL});
  return true;
}

app.get('/api/health',(req,res)=>res.json({ok:true,service:'usa-job-marketing',time:new Date().toISOString()}));
app.get('/api/slots',(req,res)=>{
  const dates=nextBusinessDays(10).map(d=>({date:isoDate(d),label:displayDate(d),slots:slotsForDate(isoDate(d))}));
  res.json({timezone:'America/New_York',dates});
});

app.post('/api/bookings', async (req,res)=>{
  try{
    const name=safe(req.body.name,100), country=safe(req.body.country,60), visa=safe(req.body.visa,80), whatsapp=safe(req.body.whatsapp,40), requirement=safe(req.body.requirement,80), message=safe(req.body.message,1000), booking_date=safe(req.body.booking_date,10), booking_time=safe(req.body.booking_time,30);
    if(!name||!country||!visa||!whatsapp||!requirement||!booking_date||!booking_time) return res.status(400).json({error:'Please complete all required fields.'});
    if(!validDate(booking_date)||!validSlot(booking_time)) return res.status(400).json({error:'Invalid date or time slot.'});
    const allowed=nextBusinessDays(10).some(d=>isoDate(d)===booking_date);
    if(!allowed) return res.status(400).json({error:'Please select an available booking date.'});
    const existing=db.prepare('SELECT id FROM bookings WHERE booking_date=? AND booking_time=? AND status NOT IN (\'cancelled\')').get(booking_date,booking_time);
    if(existing) return res.status(409).json({error:'That slot was just booked. Please choose another slot.'});
    const public_id=crypto.randomBytes(8).toString('hex'); const now=new Date().toISOString();
    const result=db.prepare(`INSERT INTO bookings(public_id,name,country,visa,whatsapp,requirement,message,booking_date,booking_time,timezone,status,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(public_id,name,country,visa,whatsapp,requirement,message,booking_date,booking_time,'America/New_York','new',now,now);
    const booking={id:result.lastInsertRowid,public_id,name,country,visa,whatsapp,requirement,message,booking_date,booking_time,timezone:'America/New_York',status:'new',created_at:now};
    let emailSent=false; try{ emailSent=await sendOwnerEmail(booking); }catch(err){ console.error('Email error:',err.message); }
    const waText=`Hi Dinesh, I booked a USA Job Marketing call. Name: ${name}. Requirement: ${requirement}. Preferred time: ${displayDate(new Date(`${booking_date}T12:00:00`))} • ${booking_time} ET. Booking ID: ${public_id}`;
    res.status(201).json({ok:true,booking,calendar_url:bookingUrl(public_id),whatsapp_url:whatsappUrl(waText),email_sent:emailSent});
  }catch(err){ console.error(err); res.status(500).json({error:'Unable to create booking right now.'}); }
});

function admin(req,res,next){ if(req.query.token!==ADMIN_TOKEN && req.get('x-admin-token')!==ADMIN_TOKEN) return res.status(401).json({error:'Unauthorized'}); next(); }
app.get('/api/admin/bookings',admin,(req,res)=>{
  const status=safe(req.query.status,30); const rows=status?db.prepare('SELECT * FROM bookings WHERE status=? ORDER BY booking_date ASC, booking_time ASC').all(status):db.prepare('SELECT * FROM bookings ORDER BY booking_date ASC, booking_time ASC').all();
  res.json({bookings:rows});
});
app.patch('/api/admin/bookings/:id',admin,(req,res)=>{
  const status=safe(req.body.status,20); if(!['new','confirmed','completed','cancelled'].includes(status)) return res.status(400).json({error:'Invalid status'});
  const now=new Date().toISOString(); const r=db.prepare('UPDATE bookings SET status=?,updated_at=? WHERE public_id=?').run(status,now,safe(req.params.id,50));
  if(!r.changes) return res.status(404).json({error:'Booking not found'}); res.json({ok:true});
});
app.get('/api/bookings/:id/ics',(req,res)=>{
  const b=db.prepare('SELECT * FROM bookings WHERE public_id=?').get(safe(req.params.id,50));
  if(!b) return res.status(404).send('Booking not found');
  const [y,m,d]=b.booking_date.split('-').map(Number);
  const start=new Date(Date.UTC(y,m-1,d,15,0,0)); const end=new Date(start.getTime()+30*60000);
  const fmt=x=>x.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
  const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Dinesh Yadav//USA Job Marketing//EN','BEGIN:VEVENT',`UID:${b.public_id}@${req.hostname}`,`DTSTAMP:${fmt(new Date())}`,`DTSTART:${fmt(start)}`,`DTEND:${fmt(end)}`,'SUMMARY:USA Job Application Marketing Strategy Call',`DESCRIPTION:${(b.requirement+' - '+(b.message||'')).replace(/[\r\n,;]/g,' ')}`,`LOCATION:Online / WhatsApp`,`STATUS:${b.status==='cancelled'?'CANCELLED':'CONFIRMED'}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');
  res.set({'Content-Type':'text/calendar; charset=utf-8','Content-Disposition':`attachment; filename="usa-job-call-${b.public_id}.ics"`}); res.send(ics);
});

app.get('/admin',(req,res)=>res.sendFile(path.join(__dirname,'admin.html')));
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'index.html')));
app.listen(PORT,HOST,()=>console.log(`USA Job Marketing running on ${HOST}:${PORT}`));
