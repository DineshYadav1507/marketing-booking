(() => {
  const injectCss = () => {
    if (document.querySelector('link[data-dy-recruitment-roadmap]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'recruitment-roadmap.css?v=20260818';
    link.dataset.dyRecruitmentRoadmap = '1';
    document.head.appendChild(link);
  };

  const modes = {
    candidate: {
      eyebrow: 'CANDIDATE JOURNEY',
      title: 'From <span>profile</span> to <strong>placement</strong>',
      subtitle: 'A recruiter-led journey built around positioning, targeted sourcing, interviews and offer support.',
      steps: [
        ['01','Profile Intake','We collect your resume, target role, experience, location, work authorization and job preferences.','INTAKE','Profile is complete'],
        ['02','Career & Skill Audit','We map your skills, seniority, domain experience and target roles against current USA hiring patterns.','ASSESS','Best-fit roles defined'],
        ['03','Resume & Positioning','We refine ATS structure, keywords, achievements, LinkedIn positioning and role-specific messaging.','POSITION','Market-ready profile'],
        ['04','Job & Market Targeting','We define locations, employment model and target employers, vendors and recruiter channels.','TARGET','Search campaign launched'],
        ['05','Recruitment Marketing','Applications, recruiter outreach, hotlists and requirement-based pitching move your profile into active pipelines.','MARKET','Profile reaches recruiters'],
        ['06','Screening & Interviews','Recruiter screens, technical rounds and client interviews are tracked with preparation and follow-up support.','INTERVIEW','Interview pipeline advances'],
        ['07','Offer & Negotiation','We help organize offer details, rate/package discussions, start-date questions and next-step coordination.','OFFER','Offer ready for decision'],
        ['08','Placement & Onboarding','After confirmation, we support joining coordination and the transition into the new role.','PLACEMENT','JOB CONFIRMED']
      ]
    },
    employer: {
      eyebrow: 'EMPLOYER HIRING JOURNEY',
      title: 'From <span>requirement</span> to <strong>the right hire</strong>',
      subtitle: 'A structured recruiting workflow for direct hire, contract, contract-to-hire and recurring staffing needs.',
      steps: [
        ['01','Requirement Discovery','Understand the role, business problem, must-have skills, location, work model, timeline and hiring constraints.','BRIEF','Hiring brief approved'],
        ['02','Role Calibration','Turn the requirement into a practical scorecard, sourcing strategy and candidate profile.','DEFINE','Search criteria locked'],
        ['03','Talent Sourcing','Search targeted networks, talent pools, referrals and recruiter channels for relevant professionals.','SOURCE','Qualified pipeline built'],
        ['04','Screening & Evaluation','Review experience, skills, communication, availability, location and work authorization before submission.','SCREEN','Shortlist ready'],
        ['05','Client Shortlist','Present aligned profiles with concise recruiter notes, fit rationale and availability.','SHORTLIST','Hiring manager review'],
        ['06','Interview Coordination','Coordinate screening, technical, panel and client interviews with candidate communication.','INTERVIEW','Finalists selected'],
        ['07','Offer & Close','Support offer coordination, compensation/rate discussion, notice period and acceptance.','CLOSE','Offer accepted'],
        ['08','Onboarding & Follow-through','Coordinate joining, documentation and post-placement communication for a smooth transition.','ONBOARD','Hire successfully onboarded']
      ]
    },
    project: {
      eyebrow: 'PROJECT / RESOURCE RECRUITMENT',
      title: 'From <span>project scope</span> to <strong>ready-to-deliver talent</strong>',
      subtitle: 'Project-based recruiting for urgent delivery teams, staff augmentation and defined workforce needs.',
      steps: [
        ['01','Project Scope','Understand deliverables, milestones, duration, budget, locations and the skills required to deliver the project.','SCOPE','Resource plan defined'],
        ['02','Skill Matrix','Break the project into roles, levels, technologies, certifications and availability requirements.','MATRIX','Skill map approved'],
        ['03','Resource Sourcing','Build a targeted pool of consultants and professionals across the required skill areas.','SOURCE','Talent bench created'],
        ['04','Technical Screening','Validate hands-on experience, project relevance, communication and availability.','VERIFY','Technically aligned profiles'],
        ['05','Client Review','Submit the strongest profiles with project-fit notes, rates and availability.','PRESENT','Client shortlist'],
        ['06','Interview / Assessment','Coordinate technical panels, practical assessments and stakeholder interviews.','ASSESS','Resource selected'],
        ['07','Deployment','Coordinate start date, paperwork, access and project onboarding.','DEPLOY','Resource starts'],
        ['08','Delivery Support','Maintain communication and replacement/escalation coordination when the project requires it.','SUPPORT','Project continuity']
      ]
    }
  };

  const human = (type = 'professional') => `<div class="rr-human ${type}" aria-hidden="true"><span class="rr-head"></span><span class="rr-hair"></span><span class="rr-neck"></span><span class="rr-torso"></span><span class="rr-arm rr-arm-a"></span><span class="rr-arm rr-arm-b"></span><span class="rr-leg rr-leg-a"></span><span class="rr-leg rr-leg-b"></span><span class="rr-shoe rr-shoe-a"></span><span class="rr-shoe rr-shoe-b"></span></div>`;

  const render = () => {
    injectCss();
    const road = document.querySelector('.road');
    if (!road) return;
    road.className = 'road rr-roadmap';
    road.innerHTML = `<div class="rr-shell">
      <div class="rr-heading">
        <div><div class="rr-kicker">RECRUITMENT WORKFLOW</div><h2 id="rrTitle"></h2><p id="rrSubtitle"></p></div>
        <div class="rr-mode-switch" role="tablist" aria-label="Recruitment journey type">
          <button class="active" data-mode="candidate">For Candidates</button>
          <button data-mode="employer">For Employers</button>
          <button data-mode="project">Project Recruiting</button>
        </div>
      </div>
      <div class="rr-legend"><span><i class="dot blue"></i>Profile / Requirement</span><span><i class="dot cyan"></i>Sourcing & Matching</span><span><i class="dot green"></i>Interview / Selection</span><span><i class="dot gold"></i>Offer / Deployment</span></div>
      <div class="rr-board">
        <svg class="rr-svg" viewBox="0 0 1200 510" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs><linearGradient id="rrRoadGradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1688ff"/><stop offset=".5" stop-color="#35c9ff"/><stop offset=".78" stop-color="#2bd99b"/><stop offset="1" stop-color="#ffbd3a"/></linearGradient><path id="rrPath" d="M95 145 H1105 Q1150 145 1150 190 V320 Q1150 365 1105 365 H95 Q50 365 50 320 V190 Q50 145 95 145"/></defs>
          <use href="#rrPath" class="rr-road-shadow"></use><use href="#rrPath" class="rr-road-surface"></use><use href="#rrPath" class="rr-road-dash"></use><use href="#rrPath" class="rr-road-progress"></use>
          <g class="rr-road-lights"><circle cx="95" cy="145" r="6"/><circle cx="340" cy="145" r="6"/><circle cx="585" cy="145" r="6"/><circle cx="830" cy="145" r="6"/><circle cx="1105" cy="190" r="6"/><circle cx="830" cy="365" r="6"/><circle cx="585" cy="365" r="6"/><circle cx="340" cy="365" r="6"/><circle cx="95" cy="320" r="6"/></g>
        </svg>
        <div class="rr-road-label start">START</div><div class="rr-road-label finish">OUTCOME</div>
        <div class="rr-car" aria-hidden="true"><span class="rr-car-window"></span><i></i><i></i></div>
        <div class="rr-nodes"></div>
      </div>
      <div class="rr-detail" id="rrDetail"></div>
    </div>`;

    let currentMode = 'candidate';
    let active = 0;
    let timer;
    const title = road.querySelector('#rrTitle');
    const subtitle = road.querySelector('#rrSubtitle');
    const nodes = road.querySelector('.rr-nodes');
    const detail = road.querySelector('#rrDetail');
    const car = road.querySelector('.rr-car');
    const path = road.querySelector('#rrPath');

    const drawDetail = (step) => {
      detail.innerHTML = `<div class="rr-detail-person">${human(active > 5 ? 'success' : 'professional')}</div><div class="rr-detail-copy"><div class="rr-detail-stage">STAGE ${step[0]} · ${step[3]}</div><h3>${step[1]}</h3><p>${step[2]}</p><div class="rr-next"><span><b>WHAT WE DO</b>${step[2]}</span><span><b>WHAT HAPPENS NEXT</b>${active === modes[currentMode].steps.length - 1 ? 'Placement / delivery is confirmed and the engagement moves into the next phase.' : modes[currentMode].steps[active + 1][1]}</span><span><b>STAGE OUTCOME</b>${step[4]}</span></div></div>`;
    };

    const paint = () => {
      const data = modes[currentMode];
      title.innerHTML = data.title;
      subtitle.textContent = data.subtitle;
      nodes.innerHTML = data.steps.map((s, i) => `<button class="rr-node ${i < 4 ? 'top' : 'bottom'} ${i === active ? 'active' : ''}" data-i="${i}" style="--i:${i}"><span class="rr-pin">${s[0]}</span><span class="rr-person">${human(i === data.steps.length - 1 ? 'success' : 'professional')}</span><span class="rr-card"><small>${s[3]}</small><b>${s[1]}</b><em>${s[2]}</em></span></button>`).join('');
      nodes.querySelectorAll('.rr-node').forEach((node) => {
        const go = () => { active = Number(node.dataset.i); paint(); };
        node.addEventListener('mouseenter', go); node.addEventListener('focus', go); node.addEventListener('click', go);
      });
      drawDetail(data.steps[active]);
    };

    const setMode = (mode) => { currentMode = mode; active = 0; road.querySelectorAll('.rr-mode-switch button').forEach(b => b.classList.toggle('active', b.dataset.mode === mode)); paint(); };
    road.querySelectorAll('.rr-mode-switch button').forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));

    const animateCar = () => {
      if (!path || !car) return;
      const length = path.getTotalLength();
      let progress = 0, last = performance.now();
      const tick = now => {
        const dt = Math.min(60, now - last); last = now; progress = (progress + dt / 18000) % 1;
        const p = path.getPointAtLength(progress * length); const p2 = path.getPointAtLength(((progress * length) + 2) % length);
        const svg = path.ownerSVGElement, rect = svg.getBoundingClientRect(), board = road.querySelector('.rr-board').getBoundingClientRect(), vb = svg.viewBox.baseVal;
        const x = p.x * rect.width / vb.width + rect.left - board.left, y = p.y * rect.height / vb.height + rect.top - board.top;
        car.style.left = `${x}px`; car.style.top = `${y}px`; car.style.transform = `translate(-50%,-50%) rotate(${Math.atan2(p2.y-p.y,p2.x-p.x)*180/Math.PI}deg)`;
        requestAnimationFrame(tick);
      }; requestAnimationFrame(tick);
    };

    paint();
    clearInterval(timer); timer = setInterval(() => { active = (active + 1) % modes[currentMode].steps.length; paint(); }, 2600);
    road.addEventListener('mouseenter', () => clearInterval(timer));
    road.addEventListener('mouseleave', () => { clearInterval(timer); timer = setInterval(() => { active = (active + 1) % modes[currentMode].steps.length; paint(); }, 2600); });
    animateCar();

    document.title = 'Dinesh Yadav Talent & Recruitment | USA Staffing & Career Solutions';
    const brand = document.querySelector('.brand b'); if (brand) brand.textContent = 'Dinesh Yadav Talent & Recruitment';
    const brandSmall = document.querySelector('.brand small'); if (brandSmall) brandSmall.textContent = 'USA Staffing • Recruitment • Career Support';
    const heroH = document.querySelector('.hero h2'); if (heroH) heroH.textContent = 'USA Staffing, Job Recruitment & Career Support';
    const heroP = document.querySelector('.hero p'); if (heroP) heroP.textContent = 'Recruitment support for candidates and employers — from profile positioning and targeted sourcing to screening, project staffing, interviews, offers and onboarding.';
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true }); else render();
})();
