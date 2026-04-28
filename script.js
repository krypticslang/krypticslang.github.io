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
    '.section-head',
    '.card',
    '#contact'
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
