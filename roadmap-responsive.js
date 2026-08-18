(()=>{
'use strict';

const journeys={
 candidate:{eyebrow:'CANDIDATE JOURNEY',title:'From <span>profile</span> to <strong>placement</strong>',subtitle:'A simple, transparent path from profile preparation to interview, offer and onboarding.',steps:[
 ['01','Profile Intake','Resume, experience, skills, location, work authorization and goals.','Profile ready'],
 ['02','Skill & Market Audit','Map skills, seniority and target roles against USA hiring demand.','Best-fit roles defined'],
 ['03','ATS Resume & Positioning','Optimize structure, keywords, achievements and recruiter-facing positioning.','Market-ready profile'],
 ['04','Job Targeting','Define roles, locations, employers, vendors and employment models.','Search campaign launched'],
 ['05','Recruitment Marketing','Targeted applications, recruiter outreach, hotlists and profile pitching.','Recruiter visibility'],
 ['06','Screening & Interviews','Manage recruiter screens, technical rounds and client interviews.','Interview pipeline'],
 ['07','Offer & Negotiation','Support rate/package discussions, offer review and joining planning.','Offer ready'],
 ['08','Placement & Onboarding','Coordinate joining, documentation and transition into the selected opportunity.','Job confirmed']
 ]},
 employer:{eyebrow:'EMPLOYER HIRING JOURNEY',title:'From <span>requirement</span> to <strong>the right hire</strong>',subtitle:'A structured hiring process designed to move qualified talent from requirement to onboarding.',steps:[
 ['01','Requirement Discovery','Understand role, business need, skills, location, work model and timeline.','Hiring brief approved'],
 ['02','Role Calibration','Create sourcing strategy, scorecard and candidate profile.','Search criteria locked'],
 ['03','Talent Sourcing','Search targeted talent pools, networks, referrals and recruiter channels.','Qualified pipeline'],
 ['04','Screening & Evaluation','Validate experience, skills, communication, availability and work status.','Shortlist ready'],
 ['05','Client Shortlist','Present aligned profiles with fit notes, availability and recruiter summary.','Manager review'],
 ['06','Interview Coordination','Coordinate screening, technical, panel and client interviews.','Finalists selected'],
 ['07','Offer & Close','Support compensation/rate discussion, acceptance and start planning.','Offer accepted'],
 ['08','Onboarding','Coordinate joining, documentation and post-placement communication.','Hire onboarded']
 ]},
 project:{eyebrow:'PROJECT / RESOURCE RECRUITMENT',title:'From <span>project scope</span> to <strong>ready-to-deliver talent</strong>',subtitle:'A practical resource hiring process for project staffing and delivery teams.',steps:[
 ['01','Project Scope','Understand deliverables, milestones, budget, location and required skills.','Resource plan'],
 ['02','Skill Matrix','Break the project into roles, levels, technologies and availability.','Skill map approved'],
 ['03','Resource Sourcing','Build a targeted pool of consultants and professionals.','Talent bench'],
 ['04','Technical Screening','Validate hands-on experience, project relevance and availability.','Technically aligned'],
 ['05','Client Review','Submit strongest profiles with project-fit notes, rates and availability.','Client shortlist'],
 ['06','Assessment','Coordinate technical panels, practical assessments and stakeholder interviews.','Resource selected'],
 ['07','Deployment','Coordinate start date, paperwork, access and project onboarding.','Resource starts'],
 ['08','Delivery Support','Maintain communication and replacement/escalation coordination.','Project continuity']
 ]}
};

function addStyles(){
 if(document.getElementById('shavyaProcessFix'))return;
 const s=document.createElement('style');s.id='shavyaProcessFix';s.textContent=`
 .process-intro .roadmap{height:auto!important;min-height:0!important;overflow:visible!important;background:transparent!important;border:0!important;padding:0!important;display:block!important;}
 .process-intro .roadmap>.road{height:auto!important;min-height:0!important;overflow:visible!important;background:transparent!important;border:0!important;padding:0!important;display:block!important;}
 .sp-wrap{display:block!important;width:100%!important;max-width:1160px!important;margin:0 auto!important;box-sizing:border-box!important;}
 .sp-head{display:flex!important;align-items:flex-end!important;justify-content:space-between!important;gap:30px!important;margin:0 0 28px!important;}
 .sp-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:16px!important;position:relative!important;visibility:visible!important;opacity:1!important;height:auto!important;}
 .sp-card{display:grid!important;visibility:visible!important;opacity:1!important;position:relative!important;z-index:2!important;min-height:145px!important;background:#fff!important;color:#183653!important;}
 .sp-content h3,.sp-content p,.sp-tag,.sp-result,.sp-result b,.sp-result span,.sp-num{visibility:visible!important;opacity:1!important;}
 .sp-note{display:flex!important;visibility:visible!important;opacity:1!important;}
 .sp-switch{position:relative!important;z-index:5!important;}
 .sp-switch button{cursor:pointer!important;}
 @media(max-width:900px){.sp-head{display:block!important}.sp-grid{grid-template-columns:1fr!important}.sp-card{grid-template-columns:58px 1fr!important}.sp-result{grid-column:2!important}}
 @media(max-width:560px){.sp-card{grid-template-columns:48px 1fr!important}.sp-result{grid-column:1/-1!important}.sp-note{display:block!important}}
 `;document.head.appendChild(s);
}

function render(){
 const container=document.querySelector('.process-intro .roadmap');
 if(!container)return;
 addStyles();
 container.innerHTML=`<div class="sp-wrap"><div class="sp-head"><div><div class="sp-eyebrow" id="spEyebrow"></div><h2 id="spTitle"></h2><p id="spSubtitle"></p></div><div class="sp-switch" role="tablist" aria-label="Recruitment workflow"><button type="button" class="active" data-mode="candidate">For Candidates</button><button type="button" data-mode="employer">For Employers</button><button type="button" data-mode="project">Project Recruiting</button></div></div><div class="sp-grid" id="spGrid"></div><div class="sp-note"><strong>Simple. Transparent. Outcome focused.</strong><span>Click any step to see exactly what happens, what we handle and what comes next.</span></div></div>`;
 let mode='candidate',active=0;
 const grid=document.getElementById('spGrid');
 const buttons=container.querySelectorAll('.sp-switch button');
 function draw(){
   const data=journeys[mode];
   document.getElementById('spEyebrow').textContent=data.eyebrow;
   document.getElementById('spTitle').innerHTML=data.title;
   document.getElementById('spSubtitle').textContent=data.subtitle;
   grid.innerHTML=data.steps.map((s,i)=>`<article class="sp-card ${i===active?'active':''}" data-i="${i}" tabindex="0" role="button" aria-label="${s[1]}"><div class="sp-num">${s[0]}</div><div class="sp-content"><span class="sp-tag">STEP ${s[0]}</span><h3>${s[1]}</h3><p>${s[2]}</p></div><div class="sp-result"><b>EXPECTED OUTCOME</b><span>${s[3]}</span></div></article>`).join('');
   grid.querySelectorAll('.sp-card').forEach(card=>{
     const select=()=>{active=Number(card.dataset.i);draw();card.scrollIntoView({behavior:'smooth',block:'nearest'});};
     card.addEventListener('click',select);
     card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select();}});
   });
   buttons.forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
 }
 buttons.forEach(btn=>btn.addEventListener('click',()=>{mode=btn.dataset.mode;active=0;draw();}));
 draw();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
})();