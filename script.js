document.addEventListener('DOMContentLoaded',()=>{
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if(menuToggle && nav){
    menuToggle.addEventListener('click',()=>{
      const visible = nav.style.display === 'flex';
      nav.style.display = visible ? 'none' : 'flex';
    });
  }

  const revealTargets = [
    '.hero-copy',
    '.hero-panel',
    '#about',
    '#team',
    '.section-head',
    '.card',
    '#contact',
    '.services',
    '.stats',
    '.process'
  ];

  const revealElements = document.querySelectorAll(revealTargets.join(','));
  revealElements.forEach((element, index) => {
    element.classList.add('reveal');
    element.setAttribute('data-reveal-delay', String((index % 4) + 1));
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduceMotion && 'IntersectionObserver' in window){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
        }else{
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    revealElements.forEach(element => observer.observe(element));
  }else{
    revealElements.forEach(element => element.classList.add('is-visible'));
  }

  /* Project filters */
  const filterButtons = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project');
  function applyFilter(filter){
    projects.forEach(p=>{
      const tags = p.getAttribute('data-filter-tags') || '';
      if(filter === 'all' || tags.indexOf(filter) !== -1){
        p.style.display = '';
      }else{
        p.style.display = 'none';
      }
    });
  }
  filterButtons.forEach(btn=>{
    btn.addEventListener('click',()=>{
      filterButtons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  // Apply initial filter state (respect active button)
  const activeBtn = document.querySelector('.filter.active');
  if(activeBtn){
    applyFilter(activeBtn.getAttribute('data-filter'));
  }else{
    applyFilter('all');
  }

  /* Expand technical details (accessible) */
  document.querySelectorAll('.expand').forEach((btn, i)=>{
    const details = btn.nextElementSibling;
    if(!details) return;
    // assign ids for aria-controls
    const detailsId = details.id || `details-${i}`;
    details.id = detailsId;
    details.setAttribute('role','region');
    details.setAttribute('aria-hidden','true');
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-controls', detailsId);

    function closeDetails(){
      details.classList.remove('open');
      details.style.maxHeight = null;
      details.setAttribute('aria-hidden','true');
      btn.setAttribute('aria-expanded','false');
    }
    function openDetails(){
      details.classList.add('open');
      details.style.maxHeight = details.scrollHeight + 'px';
      details.setAttribute('aria-hidden','false');
      btn.setAttribute('aria-expanded','true');
    }

    btn.addEventListener('click',()=>{
      const isOpen = details.classList.contains('open');
      if(isOpen) closeDetails(); else openDetails();
    });

    btn.addEventListener('keydown',(e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        btn.click();
      }
    });
  });

  /* Menu toggle for small screens */
  if(menuToggle && nav){
    // keep previous handler; ensure aria
    menuToggle.addEventListener('click',()=>{
      const visible = nav.style.display === 'flex';
      nav.style.display = visible ? 'none' : 'flex';
      menuToggle.setAttribute('aria-expanded', String(!visible));
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const t = document.querySelector(href);
        if(t) t.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });
});
