/* Talent Inspirations — content + footer repair layer */
(function(){
  'use strict';

  const candidateCard=document.querySelector('.candidate-card');
  if(candidateCard){
    const head=candidateCard.querySelector('.pc-head');
    if(head){
      head.querySelector('b').textContent='FROM PROFILE TO PLACEMENT';
      head.querySelector('span').textContent='STRUCTURED CANDIDATE JOURNEY';
    }
    const flow=candidateCard.querySelector('.candidate-flow');
    if(flow){
      flow.innerHTML=''
        +'<div><span class="ti-step-no">01</span><b>Profile</b><small>Resume, skills & experience</small></div><div class="ti-flow-arrow" aria-hidden="true">→</div>'
        +'<div><span class="ti-step-no">02</span><b>Target</b><small>Roles, location & market</small></div><div class="ti-flow-arrow" aria-hidden="true">→</div>'
        +'<div><span class="ti-step-no">03</span><b>Position</b><small>ATS & recruiter-ready profile</small></div><div class="ti-flow-arrow" aria-hidden="true">→</div>'
        +'<div><span class="ti-step-no">04</span><b>Market</b><small>Applications & recruiter outreach</small></div><div class="ti-flow-arrow" aria-hidden="true">→</div>'
        +'<div><span class="ti-step-no">05</span><b>Interview</b><small>Preparation, scheduling & feedback</small></div><div class="ti-flow-arrow" aria-hidden="true">→</div>'
        +'<div><span class="ti-step-no">06</span><b>Placement</b><small>Offer review, joining & follow-through</small></div>';
    }
    const copy=candidateCard.nextElementSibling;
    if(copy){
      const title=copy.querySelector('h2');
      const para=copy.querySelector('p');
      if(title)title.innerHTML='From profile to <em>placement.</em>';
      if(para)para.textContent='A structured candidate journey that connects profile positioning, target-role strategy, applications, recruiter outreach, interview preparation and joining support. Every stage has a clear next step, so the job search feels organized instead of random.';
      const list=copy.querySelector('.mini-list');
      if(list)list.innerHTML='<span>✓ Profile & ATS readiness</span><span>✓ Target-role and market strategy</span><span>✓ Focused applications & outreach</span><span>✓ Follow-up and interview pipeline</span><span>✓ Interview preparation & coordination</span><span>✓ Offer review and joining support</span>';
    }
  }

  /* Repair the WhatsApp floating control with an inline scalable icon. */
  const wa=document.querySelector('.ti-whatsapp-float');
  if(wa){
    wa.innerHTML='<span class="wa-icon" aria-hidden="true"><svg viewBox="0 0 32 32" role="img"><path fill="currentColor" d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.4 28.6l6.4-1.7A12.8 12.8 0 1 0 16 3.2Zm0 22.8c-2.1 0-4.1-.6-5.8-1.8l-.4-.3-3.8 1 1-3.7-.3-.4A10.1 10.1 0 1 1 16 26Zm5.6-7.6c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.7.1-.3 0-.5-.1-.7l-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2 2.2.9 3 .9 4.1.8.7-.1 1.9-.8 2.1-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.6-.5Z"/></svg></span><span>WhatsApp Us</span>';
  }

  /* Create a consistent footer if the page does not already have one. */
  let footer=document.querySelector('footer,.site-footer');
  if(!footer){
    footer=document.createElement('footer');
    footer.className='site-footer';
    footer.innerHTML='<div class="ti-footer-grid">'
      +'<div class="ti-footer-brand"><a class="brand" href="#home"><span class="brand-mark">TI</span><span><b>Talent Inspirations</b><small>USA Staffing • Recruitment • Career Support</small></span></a><p>Structured recruitment support for candidates, employers and project teams — from profile or requirement intake through interviews, offers and onboarding.</p><a class="ti-footer-wa" href="https://wa.me/918563019149?text=Hi%20Talent%20Inspirations%2C%20I%20would%20like%20to%20discuss%20your%20services." target="_blank" rel="noopener noreferrer">💬 Chat on WhatsApp</a></div>'
      +'<div><h4>Explore</h4><a href="#services">Solutions</a><a href="#process">Process</a><a href="#industries">Industries</a><a href="#resources">Candidate Support</a><a href="#reviews">Success Stories</a></div>'
      +'<div><h4>Get Started</h4><a href="#book">Book a Consultation</a><a href="#faq">FAQ</a><a href="#home">Back to top ↑</a><a href="mailto:dineshmca500@gmail.com">Email Us</a></div>'
      +'<div><h4>Contact</h4><a href="tel:+918563019149">+91 85630 19149</a><a href="mailto:dineshmca500@gmail.com">dineshmca500@gmail.com</a><span>USA-focused recruitment support</span><span>Candidate • Employer • Project</span></div>'
      +'</div><div class="ti-footer-bottom"><span>© '+new Date().getFullYear()+' Talent Inspirations. All rights reserved.</span><span>Professional recruitment & career support</span></div>';
    document.body.appendChild(footer);
  }

  /* Stable reveal observer: only animate after intersection, preventing hidden sections. */
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
    const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('ti-scroll-reveal');reveal.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('main>section,.candidate-card,.solution,.industry-grid>div,.detail-grid article,.review-grid>*').forEach(el=>{if(!el.classList.contains('ti-scroll-reveal'))reveal.observe(el)});
  }
})();
