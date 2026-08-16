(() => {
  const load = () => {
    const road = document.querySelector('.road');
    if (!road) return;

    const steps = [
      ['01','Profile Collection','Resume, skills, experience, visa, location and target roles.','PROFILE'],
      ['02','Skill Mapping','Match your background to USA demand and role requirements.','ASSESS'],
      ['03','ATS + Resume','Optimize keywords, structure and recruiter readability.','OPTIMIZE'],
      ['04','Job Targeting','Define roles, locations and employment strategy.','TARGET'],
      ['05','Daily Applications','Run targeted applications across relevant channels.','APPLY'],
      ['06','Recruiter Outreach','Market your profile to recruiters, vendors and hiring teams.','OUTREACH'],
      ['07','Follow-ups','Track responses, follow up and re-submit to matching needs.','FOLLOW UP'],
      ['08','Interviews','Move screening, technical and client rounds forward.','INTERVIEW'],
      ['09','Interview Support','Prepare around the JD, resume, questions and format.','SUPPORT'],
      ['10','Offer & Confirmation','Support offer review, rate discussion and confirmation.','OFFER']
    ];

    road.className = 'road road-v3';
    road.innerHTML = `
      <div class="journey-topline-v3"><span>THE CANDIDATE JOURNEY</span><b>10 milestones · Profile → Offer</b></div>
      <svg class="journey-svg-v3" viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid meet" role="img" aria-label="USA job marketing roadmap">
        <defs>
          <linearGradient id="roadGradientV3" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1688ff"/><stop offset=".35" stop-color="#31cfff"/><stop offset=".62" stop-color="#2bd6a1"/><stop offset=".82" stop-color="#ffb52e"/><stop offset="1" stop-color="#ff6674"/></linearGradient>
          <filter id="roadGlowV3"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <path id="journeyPathV3" d="M85 135 H1115 Q1160 135 1160 180 V190 Q1160 235 1115 235 H85 Q40 235 40 280 V390 Q40 435 85 435 H1115"/>
        </defs>
        <use href="#journeyPathV3" class="road-shadow-v3"/>
        <use href="#journeyPathV3" class="road-surface-v3"/>
        <use href="#journeyPathV3" class="road-center-v3"/>
        <use href="#journeyPathV3" class="road-progress-v3"/>
        <g class="road-markers-v3"><circle cx="85" cy="135" r="7"/><circle cx="360" cy="135" r="7"/><circle cx="635" cy="135" r="7"/><circle cx="910" cy="135" r="7"/><circle cx="1115" cy="190" r="7"/><circle cx="910" cy="235" r="7"/><circle cx="635" cy="235" r="7"/><circle cx="360" cy="235" r="7"/><circle cx="85" cy="280" r="7"/><circle cx="1115" cy="435" r="7"/></g>
        <g class="journey-car-v3" aria-label="Animated campaign vehicle">
          <rect x="-24" y="-10" width="48" height="20" rx="7"/><rect x="-12" y="-16" width="24" height="11" rx="4"/><circle cx="-14" cy="11" r="5"/><circle cx="14" cy="11" r="5"/>
          <animateMotion dur="15s" repeatCount="indefinite" rotate="auto"><mpath href="#journeyPathV3"/></animateMotion>
        </g>
      </svg>
      <div class="journey-nodes-v3 top"></div><div class="journey-nodes-v3 bottom"></div>
      <div class="journey-start-v3"><span>START HERE</span><b>PROFILE</b></div>
      <div class="journey-finish-v3"><span>DESTINATION</span><b>JOB CONFIRMED</b><i>✓</i></div>`;

    const top = road.querySelector('.journey-nodes-v3.top');
    const bottom = road.querySelector('.journey-nodes-v3.bottom');
    const makeNode = (s, i) => `<article class="journey-node-v3 n${i+1}" tabindex="0"><button type="button" class="node-pin-v3"><span>${s[0]}</span></button><div class="node-card-v3"><small>${s[3]}</small><h3>${s[1]}</h3><p>${s[2]}</p></div></article>`;
    steps.slice(0,5).forEach((s,i) => top.insertAdjacentHTML('beforeend', makeNode(s,i)));
    steps.slice(5).forEach((s,i) => bottom.insertAdjacentHTML('beforeend', makeNode(s,i+5)));

    const all = [...road.querySelectorAll('.journey-node-v3')];
    all.forEach((node,i) => {
      const activate = () => { all.forEach((n,j) => n.classList.toggle('active', j === i)); };
      node.addEventListener('mouseenter', activate);
      node.addEventListener('focusin', activate);
      node.addEventListener('click', activate);
    });
    all[0]?.classList.add('active');
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load, {once:true}); else load();
})();
