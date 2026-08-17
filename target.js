(()=>{
'use strict';

/* Candidate Marketing Toolkit */
const toolkit={
 ats:{title:'ATS & LENS',cards:[['ATS SCORE','92%','Resume structure, keywords and formatting are optimized for ATS readability.'],['LENS / RECRUITER VIEW','Senior Software Engineer','Java · Spring Boot · AWS · React · Microservices · Kubernetes · SQL'],['OPTIMIZATION CHECK','✓ ATS Optimized · ✓ Keyword Optimized · ✓ Recruiter Friendly','Higher shortlisting potential for target roles.']]},
 resume:{title:'RESUME OPTIMIZATION',cards:[['RESUME SCORE','94%','Recruiter-ready structure with stronger achievements and role-specific keywords.'],['ROLE POSITIONING','Senior Software Engineer','Experience, impact, technology stack and measurable outcomes are prioritized.'],['KEYWORD MATCH','95%','Spring Boot 95% · AWS 92% · Microservices 94% · Java 96%']]},
 cover:{title:'COVER LETTER',cards:[['ROLE ALIGNMENT','Targeted','Position the candidate around the exact role, company and business need.'],['PERSONALIZED NARRATIVE','Why this candidate?','A concise story connecting experience, technical strengths and measurable impact.'],['QUALITY CHECK','✓ Role aligned · ✓ Concise · ✓ Achievement-led','Recruiter-friendly and easy to scan.']]},
 outreach:{title:'RECRUITER OUTREACH',cards:[['TARGET NETWORK','Recruiters + Vendors','Staffing firms, recruiters, hiring contacts, hotlists and requirement-based outreach.'],['RECRUITER PITCH','Senior Software Engineer — Java / AWS','Skills snapshot · availability · work authorization · target role · resume.'],['FOLLOW-UP FLOW','Day 1 → Day 3 → Requirement Match → Re-submission','Keep the profile visible without random outreach.']]},
 tracking:{title:'PIPELINE TRACKING',cards:[['APPLICATION PIPELINE','Applied → Viewed → Response → Screening → Interview → Offer','Track movement across the candidate journey.'],['CAMPAIGN ACTIVITY','150+ · 12 · 24 · 3','Applications · responses · follow-ups · interviews.'],['CURRENT STATUS','ACTIVE CAMPAIGNS','Follow-ups due · interview pipeline · offer movement.']]},
 interview:{title:'INTERVIEW SUPPORT',cards:[['INTERVIEW PREP','JD + Resume + Questions','Walk through the JD, align the resume, prepare technical and behavioral focus areas.'],['INTERVIEW PIPELINE','Screening → Technical → Client','Coordinate scheduling, preparation and next-step communication.'],['READY CHECK','✓ JD understood · ✓ Resume aligned · ✓ Scheduled','Candidate enters each round with a clear preparation plan.']]}
};
function renderToolkit(key){
 const panel=document.getElementById('ecoPanel'); if(!panel)return;
 const data=toolkit[key]||toolkit.ats;
 panel.innerHTML=`<div class="eco-panel-head"><div><small>CANDIDATE TOOLKIT</small><h3>${data.title}</h3></div><span>LIVE PREVIEW</span></div><div class="eco-grid">${data.cards.map((c,i)=>`<article class="eco-card"><small>0${i+1}</small><h4>${c[0]}</h4><strong>${c[1]}</strong><p>${c[2]}</p><div class="eco-meter"><i style="width:${88-i*7}%"></i></div></article>`).join('')}</div>`;
 document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab===key));
}
function initToolkit(){
 document.querySelectorAll('.tabs button').forEach(b=>b.addEventListener('click',()=>renderToolkit(b.dataset.tab)));
 renderToolkit('ats');
}

/* Sample candidate reviews. Clearly labelled as samples so they are not presented as verified testimonials. */
const reviews=[
 ['Rahul Sharma','Software Engineer','The process was structured and the roadmap made every stage easy to understand.',47],
 ['Priya Patel','Data Engineer','ATS optimization and targeted applications made my job search much more organized.',32],
 ['Amit Kumar','DevOps Engineer','The outreach and follow-up workflow gave my profile better visibility.',45],
 ['Neha Verma','QA Automation Engineer','Clear communication and a professional application-marketing workflow.',56],
 ['Vikram Singh','Java Developer','The profile positioning helped me focus on better-fit USA opportunities.',12],
 ['Sneha Reddy','Data Analyst','I liked having a measurable pipeline instead of random applications.',24]
];
function reviewCard(r,label='SAMPLE CANDIDATE'){
 return `<article class="review-card"><div class="review-person"><img src="https://i.pravatar.cc/80?img=${r[3]}" alt="Sample candidate avatar"><div><b>${r[0]}</b><small>${r[1]}</small></div></div><div class="stars">★★★★★</div><p>“${r[2]}”</p><div class="review-meta">${label} · USA JOB SEARCH</div></article>`;
}
function initReviews(){
 const grid=document.getElementById('reviewGrid'); if(!grid)return;
 grid.innerHTML=reviews.map(r=>reviewCard(r)).join('');
 try{JSON.parse(localStorage.getItem('dy_reviews')||'[]').forEach(r=>grid.insertAdjacentHTML('beforeend',reviewCard([r.name,r.role,r.review,Math.floor(Math.random()*70)+1],'COMMUNITY REVIEW')))}catch(e){}
 const modal=document.getElementById('reviewModal');
 const add=document.getElementById('addReview');
 const close=modal?.querySelector('.close');
 add?.addEventListener('click',()=>modal?.classList.add('show'));
 close?.addEventListener('click',()=>modal?.classList.remove('show'));
 document.getElementById('reviewForm')?.addEventListener('submit',e=>{
  e.preventDefault();const d=Object.fromEntries(new FormData(e.target));
  const arr=JSON.parse(localStorage.getItem('dy_reviews')||'[]');arr.push(d);localStorage.setItem('dy_reviews',JSON.stringify(arr));modal?.classList.remove('show');e.target.reset();initReviews();
 });
}

/* Booking slots */
let dates=[],selectedDate='',selectedTime='';
async function loadSlots(){
 const dateBox=document.getElementById('dates'),slotBox=document.getElementById('slots');if(!dateBox||!slotBox)return;
 try{
  const r=await fetch('/api/slots');const d=await r.json();dates=d.dates||[];
  if(!dates.length){dateBox.innerHTML='<small>No dates available right now.</small>';slotBox.innerHTML='';return;}
  dateBox.innerHTML=dates.map((x,i)=>`<button type="button" data-date="${x.date}" class="${i===0?'active':''}">${x.label}</button>`).join('');
  selectedDate=dates[0].date;renderSlots();
  dateBox.querySelectorAll('button').forEach(b=>b.onclick=()=>{dateBox.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');selectedDate=b.dataset.date;renderSlots()});
 }catch(e){slotBox.innerHTML='<small>Booking slots are unavailable. Please start the Node server.</small>'}
}
function renderSlots(){
 const box=document.getElementById('slots');if(!box)return;const d=dates.find(x=>x.date===selectedDate);
 box.innerHTML=(d?.slots||[]).map(x=>`<button type="button" ${x.available?'':'disabled'} data-time="${x.time}">${x.time}</button>`).join('');
 box.querySelectorAll('button:not([disabled])').forEach(b=>b.onclick=()=>{box.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');selectedTime=b.dataset.time;const out=document.getElementById('selectedSlot');if(out)out.textContent=`${selectedDate} · ${selectedTime}`});
}
function initBooking(){
 loadSlots();const form=document.getElementById('bookingForm');if(!form)return;
 form.addEventListener('submit',async e=>{e.preventDefault();if(!selectedDate||!selectedTime){alert('Please select a call slot.');return}const data=Object.fromEntries(new FormData(form));data.booking_date=selectedDate;data.booking_time=selectedTime;try{const r=await fetch('/api/bookings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const j=await r.json();if(!r.ok)throw new Error(j.error||'Booking failed');alert(`Booking confirmed. ID: ${j.booking.public_id}`);if(j.whatsapp_url)window.open(j.whatsapp_url,'_blank');form.reset();selectedTime='';document.getElementById('selectedSlot').textContent='No slot selected';loadSlots()}catch(err){alert(err.message)}});
}
function init(){initToolkit();initReviews();initBooking()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
