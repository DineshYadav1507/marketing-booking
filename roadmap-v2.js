(() => {
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'final-polish.css';
  document.head.appendChild(css);

  const boot = () => {
    const road = document.querySelector('.road');
    if (!road) return;

    const steps = [
      ['01','Profile','Collect resume, skills, experience, visa, location and target roles.','PROFILE'],
      ['02','Skill Mapping','Match your background to USA demand and role requirements.','ASSESS'],
      ['03','ATS + Resume','Optimize keywords, structure, positioning and recruiter readability.','OPTIMIZE'],
      ['04','Job Targeting','Define roles, locations and contract / W2 / full-time strategy.','TARGET'],
      ['05','Applications','Run targeted application campaigns across relevant channels.','APPLY'],
      ['06','Recruiter Outreach','Market your profile to recruiters, vendors and hiring teams.','OUTREACH'],
      ['07','Follow-ups','Track responses, follow up and re-submit against matching needs.','FOLLOW UP'],
      ['08','Interviews','Move screening, technical and client rounds through the pipeline.','INTERVIEW'],
      ['09','Interview Support','Prepare around the JD, resume, questions and interview format.','SUPPORT'],
      ['10','Offer','Support rate/package discussion, offer review and job confirmation.','OFFER']
    ];

    road.className = 'road road-v2';
    road.innerHTML = `
      <div class="journey-topline"><span>LIVE CANDIDATE JOURNEY</span><b>10 milestones · one connected process</b></div>
      <svg class="journey-svg" viewBox="0 0 1200 560" aria-label="Candidate journey roadmap from profile to offer" role="img">
        <defs>
          <linearGradient id="journeyRoad" x1="0" x2="1"><stop offset="0" stop-color="#2d91ff"/><stop offset=".42" stop-color="#2ad7aa"/><stop offset=".72" stop-color="#ffb52e"/><stop offset="1" stop-color="#ff6674"/></linearGradient>
          <filter id="roadGlow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <path id="journeyPath" class="road-shadow" d="M85 135 H1115 Q1160 135 1160 180 V190 Q1160 235 1115 235 H85 Q40 235 40 280 V390 Q40 435 85 435 H1115"/>
        <path class="road-surface" d="M85 135 H1115 Q1160 135 1160 180 V190 Q1160 235 1115 235 H85 Q40 235 40 280 V390 Q40 435 85 435 H1115"/>
        <path class="road-dashes" pathLength="1000" d="M85 135 H1115 Q1160 135 1160 180 V190 Q1160 235 1115 235 H85 Q40 235 40 280 V390 Q40 435 85 435 H1115"/>
        <path class="journey-progress" pathLength="1000" d="M85 135 H1115 Q1160 135 1160 180 V190 Q1160 235 1115 235 H85 Q40 235 40 280 V390 Q40 435 85 435 H1115"/>
        <g class="road-marker"><circle cx="85" cy="135" r="7"/><circle cx="360" cy="135" r="7"/><circle cx="635" cy="135" r="7"/><circle cx="910" cy="135" r="7"/><circle cx="1115" cy="190" r="7"/><circle cx="910" cy="235" r="7"/><circle cx="635" cy="235" r="7"/><circle cx="360" cy="235" r="7"/><circle cx="85" cy="280" r="7"/><circle cx="1115" cy="435" r="7"/></g>
        <g class="svg-road-car" aria-label="Animated campaign progress car">
          <rect x="-17" y="-9" width="34" height="18" rx="6" fill="#ff5261" stroke="#ffd0d4" stroke-width="2"/>
          <rect x="-7" y="-6" width="13" height="8" rx="2" fill="#d9f4ff"/>
          <circle cx="-10" cy="9" r="4" fill="#101b2c"/><circle cx="10" cy="9" r="4" fill="#101b2c"/>
          <animateMotion dur="14s" repeatCount="indefinite" rotate="auto"><mpath href="#journeyPath"/></animateMotion>
        </g>
      </svg>
      <div class="journey-nodes journey-top"></div><div class="journey-nodes journey-bottom"></div>
      <div class="journey-start"><span>START</span><b>PROFILE</b></div>
      <div class="journey-finish"><span>FINAL MILESTONE</span><b>JOB CONFIRMED</b><i>✓</i></div>`;

    const top = road.querySelector('.journey-top');
    const bottom = road.querySelector('.journey-bottom');
    const node = (s, index) => `<article class="journey-node node-${index + 1}" data-index="${index}"><div class="node-pin"><span>${s[0]}</span></div><div class="node-card"><div class="node-label">${s[3]}</div><h3>${s[1]}</h3><p>${s[2]}</p></div></article>`;
    steps.slice(0,5).forEach((s,i) => top.insertAdjacentHTML('beforeend', node(s,i)));
    steps.slice(5).forEach((s,i) => bottom.insertAdjacentHTML('beforeend', node(s,i+5)));

    const all = [...road.querySelectorAll('.journey-node')];
    let active = 0;
    const paint = () => all.forEach((n,i) => n.classList.toggle('active', i <= active));
    const activate = () => { paint(); active = (active + 1) % all.length; };
    all.forEach((n,i) => {
      n.addEventListener('mouseenter', () => { active = i; paint(); });
      n.addEventListener('click', () => { active = i; paint(); });
    });
    paint();
    setInterval(activate, 1800);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
