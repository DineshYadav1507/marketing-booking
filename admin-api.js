const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

function attachAdmin(app) {
  const dbPath = process.env.DB_PATH || path.join(__dirname, 'data', 'bookings.db');
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  db.pragma('journal_mode=WAL');
  db.exec(`CREATE TABLE IF NOT EXISTS admin_settings(key TEXT PRIMARY KEY,value TEXT NOT NULL,updated_at TEXT NOT NULL)`);
  const seed = {
    business_name: 'Shavya Talent Recruitment',
    whatsapp_number: process.env.WHATSAPP_NUMBER || '+918563019149',
    owner_email: process.env.OWNER_EMAIL || 'dineshmca500@gmail.com',
    notification_email: process.env.OWNER_EMAIL || 'dineshmca500@gmail.com',
    timezone: 'America/New_York'
  };
  const insert = db.prepare('INSERT OR IGNORE INTO admin_settings(key,value,updated_at) VALUES(?,?,?)');
  for (const [k,v] of Object.entries(seed)) insert.run(k, String(v), new Date().toISOString());

  const token = () => process.env.ADMIN_TOKEN || 'change-this-admin-token';
  function auth(req, res, next) {
    const supplied = req.get('x-admin-token') || req.body?.token || '';
    if (!supplied || supplied !== token()) return res.status(401).json({error:'Unauthorized'});
    next();
  }
  const clean = (v,n=500) => String(v ?? '').trim().slice(0,n);
  const settings = () => Object.fromEntries(db.prepare('SELECT key,value FROM admin_settings').all().map(x=>[x.key,x.value]));

  app.get('/admin', (req,res) => res.send(ADMIN_HTML));
  app.post('/api/admin/login', (req,res) => {
    const supplied = clean(req.body?.token,300);
    if (!supplied || supplied !== token()) return res.status(401).json({error:'Invalid admin token'});
    res.json({ok:true});
  });
  app.get('/api/admin/summary', auth, (req,res) => {
    const counts = {
      bookings: db.prepare("SELECT COUNT(*) c FROM bookings").get().c,
      new_bookings: db.prepare("SELECT COUNT(*) c FROM bookings WHERE status='new'").get().c,
      resumes: db.prepare('SELECT COUNT(*) c FROM resume_intakes').get().c,
      analyzed: db.prepare("SELECT COUNT(*) c FROM resume_intakes WHERE status='analyzed'").get().c,
      today: db.prepare("SELECT COUNT(*) c FROM bookings WHERE booking_date=(SELECT strftime('%Y-%m-%d','now')) AND status!='cancelled'").get().c
    };
    res.json({ok:true,counts,settings:settings()});
  });
  app.get('/api/admin/bookings', auth, (req,res) => {
    const status = clean(req.query.status,30);
    const rows = status ? db.prepare('SELECT * FROM bookings WHERE status=? ORDER BY created_at DESC LIMIT 500').all(status) : db.prepare('SELECT * FROM bookings ORDER BY created_at DESC LIMIT 500').all();
    res.json({items:rows});
  });
  app.patch('/api/admin/bookings/:id', auth, (req,res) => {
    const id = clean(req.params.id,50);
    const allowed = ['new','confirmed','completed','cancelled','follow-up'];
    const status = clean(req.body?.status,30);
    if (!allowed.includes(status)) return res.status(400).json({error:'Invalid status'});
    const now = new Date().toISOString();
    const result = db.prepare('UPDATE bookings SET status=?,updated_at=? WHERE public_id=?').run(status,now,id);
    if (!result.changes) return res.status(404).json({error:'Booking not found'});
    res.json({ok:true});
  });
  app.get('/api/admin/resumes', auth, (req,res) => {
    const rows = db.prepare('SELECT public_id,name,email,whatsapp,target_role,country,file_name,file_size,mime_type,status,ats_score,keyword_match,portfolio_slug,created_at FROM resume_intakes ORDER BY created_at DESC LIMIT 500').all();
    res.json({items:rows});
  });
  app.get('/api/admin/resumes/:id', auth, (req,res) => {
    const x = db.prepare('SELECT * FROM resume_intakes WHERE public_id=?').get(clean(req.params.id,50));
    if (!x) return res.status(404).json({error:'Resume not found'});
    x.missing_keywords = JSON.parse(x.missing_keywords || '[]');
    x.matched_keywords = JSON.parse(x.matched_keywords || '[]');
    res.json({resume:x});
  });
  app.get('/api/admin/resumes/:id/download', auth, (req,res) => {
    const x = db.prepare('SELECT file_path,file_name FROM resume_intakes WHERE public_id=?').get(clean(req.params.id,50));
    if (!x || !x.file_path || !fs.existsSync(x.file_path)) return res.status(404).json({error:'Resume file not found'});
    res.download(x.file_path, x.file_name);
  });
  app.delete('/api/admin/resumes/:id', auth, (req,res) => {
    const x = db.prepare('SELECT file_path FROM resume_intakes WHERE public_id=?').get(clean(req.params.id,50));
    if (!x) return res.status(404).json({error:'Resume not found'});
    if (x.file_path && fs.existsSync(x.file_path)) fs.unlinkSync(x.file_path);
    db.prepare('DELETE FROM resume_intakes WHERE public_id=?').run(clean(req.params.id,50));
    res.json({ok:true});
  });
  app.get('/api/admin/settings', auth, (req,res) => res.json({settings:settings()}));
  app.put('/api/admin/settings', auth, (req,res) => {
    const allowed = ['business_name','whatsapp_number','owner_email','notification_email','timezone'];
    const stmt = db.prepare('INSERT INTO admin_settings(key,value,updated_at) VALUES(?,?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=excluded.updated_at');
    const now = new Date().toISOString();
    const tx = db.transaction(() => { for (const k of allowed) if (req.body[k] !== undefined) stmt.run(k, clean(req.body[k],200), now); });
    tx();
    res.json({ok:true,settings:settings(),restart_required:true});
  });
  app.get('/api/admin/whatsapp', auth, (req,res) => res.json({number:settings().whatsapp_number || ''}));

  return app;
}

const ADMIN_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Shavya Admin Dashboard</title><style>
:root{--navy:#071a35;--blue:#126df4;--cyan:#18b8e8;--bg:#f4f8fd;--card:#fff;--muted:#71839a;--line:#dce6f1;--green:#0aa579;--red:#e55353}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:#122a47;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif}button,input,select{font:inherit}.login{min-height:100vh;display:grid;place-items:center;padding:20px;background:radial-gradient(circle at 20% 10%,#1a72ff33,transparent 35%),var(--navy)}.login-card{width:min(430px,100%);background:#fff;border-radius:24px;padding:32px;box-shadow:0 30px 90px #0005}.brand{display:flex;gap:12px;align-items:center;margin-bottom:24px}.logo{width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,#126df4,#18b8e8);display:grid;place-items:center;color:#fff;font-weight:900}.login h1{margin:0 0 8px}.muted{color:var(--muted)}.field{margin:16px 0}.field label{display:block;font-size:12px;font-weight:800;margin-bottom:7px}.field input,.field select{width:100%;border:1px solid var(--line);border-radius:12px;padding:13px;background:#fff;outline:none}.btn{border:0;border-radius:11px;padding:12px 16px;background:var(--blue);color:#fff;font-weight:800;cursor:pointer}.btn.secondary{background:#eaf2ff;color:#126df4}.btn.danger{background:#fff0f0;color:#c43c3c}.shell{display:none;min-height:100vh}.top{height:72px;background:#fff;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 26px;position:sticky;top:0;z-index:5}.top h2{margin:0;font-size:18px}.layout{display:flex}.side{width:230px;min-height:calc(100vh - 72px);background:var(--navy);padding:20px 12px}.nav{width:100%;border:0;background:transparent;color:#9db0ca;text-align:left;padding:13px 14px;border-radius:10px;font-weight:800;cursor:pointer;margin-bottom:4px}.nav.active,.nav:hover{background:#ffffff12;color:#fff}.main{flex:1;padding:26px;max-width:1500px}.page{display:none}.page.active{display:block}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.stat{background:#fff;border:1px solid var(--line);border-radius:18px;padding:20px}.stat small{color:var(--muted);font-weight:700}.stat strong{display:block;font-size:32px;margin-top:8px}.panel{margin-top:20px;background:#fff;border:1px solid var(--line);border-radius:18px;padding:20px;overflow:auto}.panel h3{margin:0 0 16px}.table{width:100%;border-collapse:collapse;min-width:760px}.table th,.table td{padding:12px;border-bottom:1px solid #edf1f6;text-align:left;font-size:12px;vertical-align:top}.table th{color:#6c7e94;font-size:10px;text-transform:uppercase;letter-spacing:.08em}.badge{display:inline-block;padding:5px 8px;border-radius:999px;background:#eaf2ff;color:#126df4;font-size:10px;font-weight:900}.actions{display:flex;gap:6px;flex-wrap:wrap}.toolbar{display:flex;gap:10px;justify-content:space-between;align-items:center;margin-bottom:14px}.toolbar select{padding:10px;border:1px solid var(--line);border-radius:10px}.settings{display:grid;grid-template-columns:1fr 1fr;gap:18px}.settings .panel{margin-top:0}.toast{position:fixed;right:20px;bottom:20px;background:#102a49;color:#fff;padding:13px 16px;border-radius:12px;display:none;z-index:20}@media(max-width:900px){.side{width:68px}.nav{font-size:0;text-align:center}.main{padding:16px}.grid{grid-template-columns:repeat(2,1fr)}.settings{grid-template-columns:1fr}}@media(max-width:560px){.top{padding:0 14px}.grid{grid-template-columns:1fr 1fr}.stat strong{font-size:25px}.side{position:fixed;bottom:0;left:0;right:0;width:auto;height:62px;min-height:0;display:flex;z-index:10}.nav{flex:1;margin:0}.layout{padding-bottom:60px}.main{padding:12px}}
</style></head><body><div id="login" class="login"><div class="login-card"><div class="brand"><div class="logo">ST</div><div><b>Shavya Talent Recruitment</b><div class="muted" style="font-size:12px">Admin Control Center</div></div></div><h1>Secure dashboard</h1><p class="muted">Manage candidates, bookings, resumes and WhatsApp settings from one place.</p><div class="field"><label>Admin Token</label><input id="token" type="password" placeholder="Enter ADMIN_TOKEN"></div><button class="btn" style="width:100%" onclick="login()">Open Dashboard</button><p id="loginMsg" class="muted"></p></div></div>
<div id="shell" class="shell"><header class="top"><h2>Shavya Talent Recruitment <span class="badge">ADMIN</span></h2><button class="btn secondary" onclick="logout()">Logout</button></header><div class="layout"><aside class="side"><button class="nav active" data-page="overview">◉ Overview</button><button class="nav" data-page="bookings">◷ Bookings</button><button class="nav" data-page="resumes">▣ Resumes & ATS</button><button class="nav" data-page="settings">⚙ Settings</button></aside><main class="main"><section id="overview" class="page active"><h1>Control Center</h1><p class="muted">Everything coming from your website in one dashboard.</p><div class="grid"><div class="stat"><small>Total Calls</small><strong id="sBookings">0</strong></div><div class="stat"><small>New Calls</small><strong id="sNew">0</strong></div><div class="stat"><small>Resume Reviews</small><strong id="sResumes">0</strong></div><div class="stat"><small>Analyzed CVs</small><strong id="sAnalyzed">0</strong></div></div><div class="panel"><h3>Quick actions</h3><div class="actions"><button class="btn" onclick="go('bookings')">View Bookings</button><button class="btn secondary" onclick="go('resumes')">Review Resumes</button><button class="btn secondary" onclick="go('settings')">WhatsApp & Settings</button></div></div></section>
<section id="bookings" class="page"><h1>Call Requests & Bookings</h1><div class="toolbar"><span class="muted">Manage every strategy-call request.</span><select id="bookingFilter" onchange="loadBookings()"><option value="">All</option><option>new</option><option>confirmed</option><option>completed</option><option>follow-up</option><option>cancelled</option></select></div><div class="panel"><table class="table"><thead><tr><th>Candidate</th><th>Requirement</th><th>USA Slot</th><th>WhatsApp</th><th>Status</th><th>Action</th></tr></thead><tbody id="bookingRows"></tbody></table></div></section>
<section id="resumes" class="page"><h1>Resume Intelligence</h1><p class="muted">Uploaded CVs, ATS-style analysis and digital portfolio links.</p><div class="panel"><table class="table"><thead><tr><th>Candidate</th><th>Target Role</th><th>ATS</th><th>Keywords</th><th>File</th><th>Received</th><th>Action</th></tr></thead><tbody id="resumeRows"></tbody></table></div></section>
<section id="settings" class="page"><h1>Business Settings</h1><p class="muted">Change public contact and WhatsApp configuration from one place.</p><div class="settings"><div class="panel"><h3>Public contact</h3><div class="field"><label>Business Name</label><input id="business_name"></div><div class="field"><label>WhatsApp Number</label><input id="whatsapp_number" placeholder="+918563019149"></div></div><div class="panel"><h3>Notifications</h3><div class="field"><label>Owner Email</label><input id="owner_email"></div><div class="field"><label>Notification Email</label><input id="notification_email"></div><div class="field"><label>Booking Timezone</label><input id="timezone" value="America/New_York"></div></div></div><div class="panel"><button class="btn" onclick="saveSettings()">Save Settings</button><p class="muted" id="settingsMsg"></p></div></section></main></div></div><div id="toast" class="toast"></div>
<script>let T=sessionStorage.getItem('shavya_admin_token')||'';const $=id=>document.getElementById(id);async function api(url,opt={}){opt.headers={...(opt.headers||{}),'x-admin-token':T,'Content-Type':'application/json'};const r=await fetch(url,opt);const d=await r.json().catch(()=>({}));if(r.status===401){logout();throw Error('Unauthorized')}if(!r.ok)throw Error(d.error||'Request failed');return d}async function login(){const t=$('token').value.trim();try{const r=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:t})});if(!r.ok)throw Error('Invalid admin token');T=t;sessionStorage.setItem('shavya_admin_token',T);show();}catch(e){$('loginMsg').textContent=e.message}}function show(){$('login').style.display='none';$('shell').style.display='block';loadAll()}function logout(){T='';sessionStorage.removeItem('shavya_admin_token');$('shell').style.display='none';$('login').style.display='grid'}function toast(x){$('toast').textContent=x;$('toast').style.display='block';setTimeout(()=>$('toast').style.display='none',2200)}function go(p){document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('active',x.dataset.page===p));document.querySelectorAll('.page').forEach(x=>x.classList.toggle('active',x.id===p));if(p==='bookings')loadBookings();if(p==='resumes')loadResumes();if(p==='settings')loadSettings()}document.querySelectorAll('.nav').forEach(x=>x.onclick=()=>go(x.dataset.page));async function loadAll(){try{const d=await api('/api/admin/summary');$('sBookings').textContent=d.counts.bookings;$('sNew').textContent=d.counts.new_bookings;$('sResumes').textContent=d.counts.resumes;$('sAnalyzed').textContent=d.counts.analyzed}catch(e){toast(e.message)}}async function loadBookings(){const d=await api('/api/admin/bookings?status='+encodeURIComponent($('bookingFilter').value));$('bookingRows').innerHTML=d.items.map(x=>`<tr><td><b>${esc(x.name)}</b><br><span class="muted">${esc(x.country)} · ${esc(x.visa)}</span></td><td>${esc(x.requirement)}<br><span class="muted">${esc(x.message||'')}</span></td><td>${esc(x.booking_date)}<br>${esc(x.booking_time)}<br><span class="badge">ET</span></td><td>${esc(x.whatsapp)}<br><a href="https://wa.me/${x.whatsapp.replace(/\\D/g,'')}" target="_blank">Open WhatsApp</a></td><td><span class="badge">${esc(x.status)}</span></td><td><select onchange="statusBooking('${x.public_id}',this.value)"><option>${esc(x.status)}</option><option>confirmed</option><option>completed</option><option>follow-up</option><option>cancelled</option><option>new</option></select></td></tr>`).join('')||'<tr><td colspan="6">No bookings yet.</td></tr>'}async function statusBooking(id,status){await api('/api/admin/bookings/'+id,{method:'PATCH',body:JSON.stringify({status})});toast('Booking updated');loadBookings();loadAll()}async function loadResumes(){const d=await api('/api/admin/resumes');$('resumeRows').innerHTML=d.items.map(x=>`<tr><td><b>${esc(x.name)}</b><br>${esc(x.email)}<br>${esc(x.country)}</td><td>${esc(x.target_role||'—')}</td><td><b>${x.ats_score||0}/100</b></td><td>${x.keyword_match||0}%</td><td>${esc(x.file_name)}<br><button class="btn secondary" onclick="downloadResume('${x.public_id}')">Download</button></td><td>${new Date(x.created_at).toLocaleString()}</td><td><div class="actions"><a class="btn secondary" href="/portfolio/${encodeURIComponent(x.portfolio_slug)}" target="_blank">Portfolio</a><button class="btn danger" onclick="deleteResume('${x.public_id}')">Delete</button></div></td></tr>`).join('')||'<tr><td colspan="7">No resumes yet.</td></tr>'}async function downloadResume(id){const r=await fetch('/api/admin/resumes/'+id+'/download',{headers:{'x-admin-token':T}});const b=await r.blob();const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='resume';a.click();URL.revokeObjectURL(a.href)}async function deleteResume(id){if(!confirm('Delete this resume and stored file?'))return;await api('/api/admin/resumes/'+id,{method:'DELETE'});toast('Resume deleted');loadResumes();loadAll()}async function loadSettings(){const d=await api('/api/admin/settings');for(const k of ['business_name','whatsapp_number','owner_email','notification_email','timezone'])$(k).value=d.settings[k]||''}async function saveSettings(){const body={};for(const k of ['business_name','whatsapp_number','owner_email','notification_email','timezone'])body[k]=$(k).value;const d=await api('/api/admin/settings',{method:'PUT',body:JSON.stringify(body)});$('settingsMsg').textContent='Saved. Restart the Node server once for WhatsApp changes to be picked up by the public site.';toast('Settings saved')}function esc(x){return String(x??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]))}if(T)api('/api/admin/summary').then(show).catch(()=>{});</script></body></html>`;

module.exports = { attachAdmin };
