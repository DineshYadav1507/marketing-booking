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

function addCareerSupportSection(){
 if(document.getElementById('careerSupportFeature'))return;
 const anchor=document.querySelector('.process-intro');
 if(!anchor)return;
 const section=document.createElement('section');
 section.id='careerSupportFeature';
 section.className='career-feature';
 section.innerHTML=`
 <div class="career-feature-inner">
   <div class="career-feature-copy">
     <div class="career-kicker">USA CAREER & JOB SUPPORT</div>
     <h2>You focus on your <span>future.</span><br>We help you find the <strong>right opportunity.</strong></h2>
     <p>One structured support layer for professionals targeting USA opportunities — profile review, job matching, resume positioning, interview preparation and ongoing career guidance.</p>
     <div class="career-actions"><a class="career-btn primary" href="#book">Talk to an Expert <b>→</b></a><a class="career-btn secondary" href="#resources">See Candidate Toolkit</a></div>
   </div>
   <div class="career-dashboard" aria-label="Candidate support overview">
     <div class="career-dashboard-top"><span><i></i> CANDIDATE SUPPORT</span><b>USA MARKET</b></div>
     <div class="career-profile">
       <div class="career-avatar">ST</div>
       <div><small>PROFILE REVIEW</small><strong>Market-ready candidate</strong><span>Resume · Skills · Target roles · Work status</span></div>
       <em>READY</em>
     </div>
     <div class="career-checks">
       <div><b>✓</b><span><strong>Resume & ATS</strong>Structure, keywords and positioning</span></div>
       <div><b>✓</b><span><strong>Job Matching</strong>Role, location and employment model</span></div>
       <div><b>✓</b><span><strong>Recruiter Outreach</strong>Targeted vendors and hiring contacts</span></div>
       <div><b>✓</b><span><strong>Interview Support</strong>JD alignment, preparation and scheduling</span></div>
     </div>
     <div class="career-meter"><div><span>Candidate readiness</span><strong>86%</strong></div><i><b></b></i></div>
   </div>
 </div>
 <div class="career-steps">
   <div><b>01</b><strong>Profile</strong><span>Resume + experience review</span></div><i>→</i>
   <div><b>02</b><strong>Match</strong><span>Target roles + USA market</span></div><i>→</i>
   <div><b>03</b><strong>Market</strong><span>Applications + outreach</span></div><i>→</i>
   <div><b>04</b><strong>Interview</strong><span>Prep + coordination</span></div><i>→</i>
   <div><b>05</b><strong>Opportunity</strong><span>Offer + joining support</span></div>
 </div>
 <div class="career-disclaimer">Support is process-focused and outcome-oriented. Hiring decisions remain with employers and clients; no job or offer is guaranteed.</div>`;
 const style=document.createElement('style');
 style.textContent=`
 .career-feature{position:relative;overflow:hidden;padding:82px 24px 28px;background:linear-gradient(180deg,#f7fbff 0%,#eef5fc 100%);border-top:1px solid #dbe7f2;border-bottom:1px solid #dbe7f2}
 .career-feature:before{content:'';position:absolute;width:520px;height:520px;right:-220px;top:-260px;border-radius:50%;background:radial-gradient(circle,rgba(30,112,242,.14),transparent 68%);pointer-events:none}
 .career-feature-inner{max-width:1180px;margin:auto;display:grid;grid-template-columns:1.02fr .98fr;gap:54px;align-items:center;position:relative;z-index:1}
 .career-kicker{font-size:10px;letter-spacing:2.2px;font-weight:800;color:#176ff2;margin-bottom:14px}
 .career-feature-copy h2{margin:0;color:#0a2442;font:800 clamp(34px,4.3vw,62px)/.99 Manrope,Arial,sans-serif;letter-spacing:-2.7px}
 .career-feature-copy h2 span{color:#176ff2}.career-feature-copy h2 strong{color:#12a58c}
 .career-feature-copy p{max-width:650px;margin:22px 0 0;color:#61758d;font-size:15px;line-height:1.75}
 .career-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:28px}.career-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 18px;border-radius:10px;text-decoration:none;font-size:11px;font-weight:800}.career-btn.primary{background:#176ff2;color:#fff;box-shadow:0 12px 25px rgba(23,111,242,.2)}.career-btn.secondary{background:#fff;color:#24435f;border:1px solid #d4e1ee}
 .career-dashboard{background:#fff;border:1px solid #cfdfed;border-radius:22px;padding:18px;box-shadow:0 24px 70px rgba(23,64,105,.12);position:relative}
 .career-dashboard-top{display:flex;justify-content:space-between;align-items:center;padding:3px 2px 15px;color:#6d8094;font-size:9px;font-weight:800;letter-spacing:.8px}.career-dashboard-top i{display:inline-block;width:7px;height:7px;border-radius:50%;background:#19b986;margin-right:5px;box-shadow:0 0 0 4px #e8f9f3}.career-dashboard-top b{font-size:8px;background:#eef5ff;color:#176ff2;padding:7px 9px;border-radius:7px}
 .career-profile{display:grid;grid-template-columns:48px 1fr auto;gap:12px;align-items:center;padding:14px;border:1px solid #dbe7f2;border-radius:15px;background:#f8fbff}.career-avatar{width:48px;height:48px;border-radius:13px;display:grid;place-items:center;background:linear-gradient(135deg,#176ff2,#0b4fb8);color:#fff;font-weight:900}.career-profile small{display:block;color:#8a9aad;font-size:7px;font-weight:800;letter-spacing:1px}.career-profile strong{display:block;color:#173653;font-size:13px;margin:4px 0}.career-profile span{display:block;color:#72859a;font-size:8px}.career-profile em{font-style:normal;color:#0d9a72;background:#e8faf4;border:1px solid #c8eee1;border-radius:999px;padding:6px 8px;font-size:7px;font-weight:900}
 .career-checks{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.career-checks>div{display:flex;gap:9px;padding:12px;border:1px solid #e2ebf3;border-radius:12px;background:#fff}.career-checks b{flex:0 0 22px;width:22px;height:22px;border-radius:7px;background:#e9f9f4;color:#0aa278;display:grid;place-items:center;font-size:10px}.career-checks strong{display:block;color:#25435f;font-size:9px;margin-bottom:3px}.career-checks span{color:#7a8da0;font-size:8px;line-height:1.45}
 .career-meter{margin-top:12px;padding:12px;border-radius:12px;background:#f5f9fd}.career-meter div{display:flex;justify-content:space-between;color:#667b91;font-size:8px;font-weight:800}.career-meter strong{color:#176ff2;font-size:10px}.career-meter>i{display:block;height:7px;margin-top:8px;border-radius:99px;background:#dfeaf4;overflow:hidden}.career-meter>i b{display:block;width:86%;height:100%;border-radius:inherit;background:linear-gradient(90deg,#176ff2,#17b89a)}
 .career-steps{max-width:1180px;margin:28px auto 0;display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr auto 1fr;gap:9px;align-items:center;position:relative;z-index:1}.career-steps>div{min-width:0;padding:12px;border:1px solid #d7e4ef;background:#fff;border-radius:13px}.career-steps b{display:inline-grid;place-items:center;width:25px;height:25px;border-radius:7px;background:#eaf3ff;color:#176ff2;font-size:8px;margin-bottom:8px}.career-steps strong{display:block;color:#1b3b58;font-size:10px}.career-steps span{display:block;color:#8192a4;font-size:8px;line-height:1.35;margin-top:3px}.career-steps>i{font-style:normal;color:#176ff2;font-weight:900;font-size:18px;text-align:center}.career-disclaimer{max-width:1180px;margin:18px auto 0;text-align:center;color:#8a9aaa;font-size:8px;line-height:1.5}
 @media(max-width:900px){.career-feature{padding:64px 18px 24px}.career-feature-inner{grid-template-columns:1fr;gap:30px}.career-steps{grid-template-columns:1fr 1fr;gap:9px}.career-steps>i{display:none}}
 @media(max-width:560px){.career-feature-copy h2{letter-spacing:-1.4px}.career-feature-copy p{font-size:13px}.career-dashboard{padding:13px;border-radius:18px}.career-checks{grid-template-columns:1fr}.career-profile{grid-template-columns:42px 1fr}.career-avatar{width:42px;height:42px}.career-profile em{grid-column:2;justify-self:start}.career-steps{grid-template-columns:1fr}.career-steps>div{padding:11px}.career-actions{display:grid;grid-template-columns:1fr}.career-btn{width:100%;box-sizing:border-box}}
 `;
 document.head.appendChild(style);
 anchor.parentNode.insertBefore(section,anchor.nextSibling);
}

function render(){
 const container=document.querySelector('.process-intro .roadmap');
 if(!container)return;
 addStyles();
 addCareerSupportSection();
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