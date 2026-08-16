(function(){
  const avatar=id=>`https://i.pravatar.cc/100?img=${id}`;
  const steps=[
    ['01','Profile Collection','Resume, experience, skills, visa, location and target roles.','Profile Ready'],
    ['02','Assessment & Skill Mapping','Map your background against USA market requirements and target roles.','Mapped'],
    ['03','ATS Resume & Profile','ATS keywords, recruiter positioning, LinkedIn/profile alignment and branding.','Optimized'],
    ['04','Job Targeting Strategy','Target roles, locations, contract/full-time, C2C and W2 strategy.','Targeted'],
    ['05','Daily Application Campaign','Targeted applications across portals, vendors and direct client career pages.','Campaign Live'],
    ['06','Recruiter & Vendor Outreach','Resume marketing, hotlists, staffing vendors and hiring-team outreach.','Outreach Active'],
    ['07','Follow-ups & Re-submission','Track responses, follow up, pitch profile and re-submit against new requirements.','Follow-up'],
    ['08','Interview Pipeline','Screening calls, assessments, technical rounds and client interview movement.','Interview'],
    ['09','Interview Support','Scheduling, JD explanation, preparation, resume alignment and interview guidance.','Support'],
    ['10','Offer & Job Confirmation','Rate/package discussion, offer review and job confirmation support.','Milestone']
  ];
  const reviews=[
    ['Rahul Sharma','Software Engineer','Got multiple recruiter responses after the profile and outreach strategy was improved.',1],
    ['Priya Patel','Data Engineer','The ATS optimization and targeted applications made the process much more structured.',5],
    ['Amit Kumar','DevOps Engineer','Loved the visibility into applications, recruiter outreach and follow-ups.',12],
    ['Neha Verma','QA Automation Engineer','Clear process, fast communication and useful interview support.',9],
    ['Vikram Singh','Java Developer','The resume positioning helped me target the right USA opportunities.',3],
    ['Ananya Mehta','Business Analyst','I liked having a defined roadmap instead of random applications.',6],
    ['Karan Shah','Cloud Engineer','Recruiter outreach and follow-up tracking were the most useful parts.',8],
    ['Sneha Reddy','Data Analyst','The team helped me understand where my profile fit in the USA market.',10],
    ['Arjun Rao','Full Stack Engineer','The campaign dashboard concept makes the job search feel measurable.',14],
    ['Meera Joshi','Product Analyst','Professional communication and a much cleaner job-search workflow.',2],
    ['Rohit Verma','Backend Engineer','Good focus on role targeting instead of applying everywhere blindly.',7],
    ['Pooja Nair','Software Engineer','The interview pipeline and follow-up approach gave me better visibility.',11]
  ];

  function injectStyles(){
    if(document.getElementById('showcase-css-link'))return;
    const l=document.createElement('link');l.id='showcase-css-link';l.rel='stylesheet';l.href='showcase.css';document.head.appendChild(l);
  }
  function roadmap(){
    const old=document.getElementById('process');if(!old)return;
    old.className='showcase-section roadmap-section';
    old.innerHTML=`<div class="showcase-kicker">02 / Candidate journey</div><h2 class="showcase-title">Your road from <span style="color:#38a7ff">profile</span> to <span style="color:#39d9a4">offer</span>.</h2><p class="showcase-sub">A visible, step-by-step marketing roadmap. Every milestone has a clear objective, activity and next move.</p><div class="roadmap-wrap"><div class="road"></div><div class="road-bottom"></div><div class="road-car">🚙</div><div class="road-car two">🚗</div><div class="road-nodes">${steps.slice(0,5).map((s,i)=>node(s,i)).join('')}</div><div class="road-nodes bottom">${steps.slice(5).map((s,i)=>node(s,i+5)).join('')}</div></div><div class="road-progress"></div><div class="road-legend"><span><b>Blue</b> profile & targeting</span><span><b>Green</b> active marketing</span><span><b>Orange</b> interviews</span><span><b>Red</b> offer milestone</span></div></div>`;
    old.querySelectorAll('.road-node').forEach((n,i)=>setTimeout(()=>n.classList.add('active'),i*260));
  }
  function node(s,i){return `<article class="road-node reveal-card"><div class="pin"><span>${s[0]}</span></div><h3>${s[1]}</h3><p>${s[2]}</p><span class="tag">${s[3]}</span></article>`}

  function ecosystem(){
    const pricing=document.getElementById('pricing');if(!pricing)return;
    const sec=document.createElement('section');sec.className='showcase-section ecosystem';sec.id='ecosystem';
    sec.innerHTML=`<div class="showcase-kicker">03 / Complete marketing ecosystem</div><h2 class="showcase-title">See what recruiters see — before they see you.</h2><p class="showcase-sub">We work across the profile, resume, application, outreach and interview layers so your job search looks consistent from every angle.</p><div class="ecosystem-tabs"><button class="eco-tab active" data-eco="ats">ATS & LENS View</button><button class="eco-tab" data-eco="resume">Resume Optimization</button><button class="eco-tab" data-eco="cover">Cover Letter</button><button class="eco-tab" data-eco="outreach">Recruiter Outreach</button><button class="eco-tab" data-eco="tracking">Application Tracking</button><button class="eco-tab" data-eco="interview">Interview Support</button></div><div class="eco-panel" id="ecoPanel">${ecoContent('ats')}</div><div class="campaign-dashboard"><div class="campaign-stat"><span>Applications sent</span><b>150+</b><div class="spark"></div></div><div class="campaign-stat"><span>Recruiter outreach</span><b>38</b><div class="spark"></div></div><div class="campaign-stat"><span>Responses tracked</span><b>12</b><div class="spark"></div></div><div class="campaign-stat"><span>Pipeline stages</span><b>10</b><div class="spark"></div></div></div></section>`;
    pricing.parentNode.insertBefore(sec,pricing);
    sec.querySelectorAll('.eco-tab').forEach(btn=>btn.addEventListener('click',()=>{sec.querySelectorAll('.eco-tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');document.getElementById('ecoPanel').innerHTML=ecoContent(btn.dataset.eco)}));
  }
  function ecoContent(type){
    const data={
      ats:{left:`<h4>ATS SCORE</h4><div class="score-ring"><b>92%</b></div><p style="font-size:9px;color:#7f98ba;text-align:center">Strong keyword and formatting compatibility</p>`,center:`<h4>LENS — RECRUITER VIEW</h4><div class="lens"><div class="lens-top"><img class="lens-avatar" src="${avatar(24)}"><div><b>Candidate Profile</b><br><small>Senior Software Engineer • USA Market</small></div></div><div class="lens-tags"><span>Java</span><span>Spring Boot</span><span>AWS</span><span>React</span><span>Microservices</span><span>Kubernetes</span><span>SQL</span></div><div class="lens-line w90"></div><div class="lens-line w80"></div><div class="lens-line w60"></div></div>`,right:`<h4>OPTIMIZATION CHECK</h4><p>✓ ATS compatible</p><p>✓ Keywords aligned</p><p>✓ Recruiter readable</p><p>✓ Skills prioritized</p><p>✓ Role positioning</p>`},
      resume:{left:`<h4>RESUME STRUCTURE</h4><p>01 Summary</p><p>02 Skills</p><p>03 Experience</p><p>04 Projects</p><p>05 Education</p>`,center:`<h4>RESUME REVIEW</h4><div class="lens"><b>Target Role: Senior Software Engineer</b><div class="lens-line w90"></div><div class="lens-line w80"></div><div class="lens-line w90"></div><div class="lens-line w60"></div><div class="lens-line w80"></div><div class="lens-line w60"></div></div>`,right:`<h4>KEYWORD MAP</h4><div class="keyword"><span>Spring Boot</span><b>95%</b></div><div class="bar"><i style="width:95%"></i></div><div class="keyword"><span>AWS</span><b>92%</b></div><div class="bar"><i style="width:92%"></i></div>`},
      cover:{left:`<h4>COVER LETTER</h4><p>Role-specific positioning</p><p>Company context</p><p>Relevant achievements</p>`,center:`<h4>PERSONALIZED LETTER</h4><div class="lens"><b>Why this candidate?</b><p style="font-size:10px;line-height:1.7">A concise recruiter-friendly narrative connecting experience, role requirements and business impact.</p><div class="lens-line w90"></div><div class="lens-line w80"></div><div class="lens-line w60"></div></div>`,right:`<h4>QUALITY CHECK</h4><p>✓ Role aligned</p><p>✓ Human readable</p><p>✓ Concise</p><p>✓ Achievement-led</p>`},
      outreach:{left:`<h4>OUTREACH LIST</h4><p>Recruiters</p><p>Staffing vendors</p><p>Hiring managers</p><p>Client contacts</p>`,center:`<h4>EMAIL MARKETING</h4><div class="lens"><b>Candidate Introduction</b><p style="font-size:10px;line-height:1.7">Subject: Senior Software Engineer — Java / Spring Boot / AWS</p><div class="lens-line w90"></div><div class="lens-line w80"></div><div class="lens-line w90"></div></div>`,right:`<h4>FOLLOW-UP</h4><p>Day 1 • Initial pitch</p><p>Day 3 • Follow-up</p><p>Requirement match</p><p>Re-submission</p>`},
      tracking:{left:`<h4>PIPELINE</h4><p>Applied</p><p>Viewed</p><p>Response</p><p>Screening</p><p>Interview</p>`,center:`<h4>APPLICATION TRACKER</h4><div class="lens"><b>Today's activity</b><div class="keyword"><span>Applications</span><b>150+</b></div><div class="keyword"><span>Responses</span><b>12</b></div><div class="keyword"><span>Follow-ups</span><b>24</b></div><div class="keyword"><span>Interviews</span><b>3</b></div></div>`,right:`<h4>STATUS</h4><p>● Active campaigns</p><p>● Follow-ups due</p><p>● Interview pipeline</p>`},
      interview:{left:`<h4>INTERVIEW PREP</h4><p>JD walkthrough</p><p>Resume alignment</p><p>Question bank</p><p>Mock discussion</p>`,center:`<h4>INTERVIEW SUPPORT</h4><div class="lens"><b>Upcoming interview</b><p style="font-size:10px">Senior Software Engineer • Client round</p><div class="lens-tags"><span>JD</span><span>Resume</span><span>Technical</span><span>Behavioral</span></div><div class="lens-line w90"></div><div class="lens-line w60"></div></div>`,right:`<h4>READY CHECK</h4><p>✓ JD understood</p><p>✓ Resume aligned</p><p>✓ Interview scheduled</p><p>✓ Support available</p>`}
    }[type];return `<div class="eco-card">${data.left}</div><div class="eco-card">${data.center}</div><div class="eco-card">${data.right}</div>`;
  }

  function reviews(){
    const book=document.getElementById('book');if(!book)return;
    const sec=document.createElement('section');sec.className='showcase-section review-section';sec.id='reviews';
    sec.innerHTML=`<div class="review-head"><div><div class="showcase-kicker">04 / Candidate feedback</div><h2 class="showcase-title">What candidates say about the process.</h2><p class="showcase-sub">Sample reviews are shown for design/demo purposes. Replace them with verified candidate feedback before publishing.</p></div><div class="review-actions"><button class="add-review" id="addReview">＋ Add Your Review</button></div></div><div class="review-grid" id="reviewGrid">${reviews.map(reviewCard).join('')}</div>`;
    book.parentNode.insertBefore(sec,book);
    sec.querySelector('#addReview').addEventListener('click',openReview);
    const stored=JSON.parse(localStorage.getItem('dy_reviews_demo')||'[]');stored.forEach(r=>sec.querySelector('#reviewGrid').insertAdjacentHTML('beforeend',reviewCard(r,true)));
  }
  function reviewCard(r,user){return `<article class="review-card"><div class="review-person"><img src="${avatar(r[3]||4)}" alt="Sample candidate avatar"><div><b>${esc(r[0])}</b><small>${esc(r[1])}</small></div></div><div class="stars">★★★★★</div><p>“${esc(r[2])}”</p><div class="review-meta">${user?'COMMUNITY REVIEW':'SAMPLE REVIEW'} • USA JOB SEARCH</div></article>`}
  function esc(v){return String(v||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
  function openReview(){
    let m=document.getElementById('reviewModal');if(!m){m=document.createElement('div');m.id='reviewModal';m.className='review-modal';m.innerHTML=`<form class="review-box" id="reviewForm"><h3>Share your experience</h3><p>Your review will appear on this browser as a community/demo review.</p><label>Name<input name="name" required maxlength="60" placeholder="Your name"></label><label>Role<input name="role" required maxlength="80" placeholder="Software Engineer"></label><label>Rating<select name="rating"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select></label><label>Review<textarea name="review" required maxlength="500" placeholder="Tell us about your experience..."></textarea></label><div class="review-box-actions"><button type="button" class="review-cancel">Cancel</button><button class="review-save">Publish Review</button></div></form>`;document.body.appendChild(m);m.querySelector('.review-cancel').onclick=()=>m.classList.remove('show');m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('show')});m.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));const arr=JSON.parse(localStorage.getItem('dy_reviews_demo')||'[]');arr.push([d.name,d.role,d.review,Math.floor(Math.random()*14)+1]);localStorage.setItem('dy_reviews_demo',JSON.stringify(arr));m.classList.remove('show');location.reload()})}m.classList.add('show')
  }
  function whatsapp(){
    const num='918563019149',text=encodeURIComponent('Hi Dinesh, I want to discuss USA Job Application Marketing / Career Support.');
    const wrap=document.createElement('div');wrap.innerHTML=`<div class="whatsapp-pop" id="waPop"><b>Need help with your USA job search?</b><p>Chat directly with Dinesh about job support, application marketing, recruiter outreach or career consulting.</p><a class="wa-go" href="https://wa.me/${num}?text=${text}" target="_blank" rel="noopener">Open WhatsApp • +91 85630 19149</a></div><a class="whatsapp-float" href="https://wa.me/${num}?text=${text}" target="_blank" rel="noopener"><strong>◉</strong><span>Chat on WhatsApp<small>+91 85630 19149</small></span></a>`;document.body.appendChild(wrap);setTimeout(()=>document.getElementById('waPop')?.classList.add('show'),4000);setTimeout(()=>document.getElementById('waPop')?.classList.remove('show'),12000)
  }
  function init(){injectStyles();roadmap();ecosystem();reviews();whatsapp()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
