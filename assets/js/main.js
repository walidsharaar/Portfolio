// Walid Sharaar · Portfolio
// Theme toggle, mobile menu, header border, active nav link, reveal on scroll.
// The saved theme is applied earlier by a one-line script in <head> to avoid a flash.
(() => {
  const root = document.documentElement;
  root.classList.add('js');

  // Theme toggle
  document.querySelector('.theme-toggle')?.addEventListener('click', () => {
    const current = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
  });

  // Mobile menu
  const menuBtn = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (menuBtn && links) {
    const setOpen = (open) => {
      links.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    };
    menuBtn.addEventListener('click', () => setOpen(!links.classList.contains('open')));
    links.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  }

  // Header border once the page is scrolled
  const header = document.querySelector('.site-header');
  const onScroll = () => header?.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('in'));
    return;
  }

  // Highlight the nav link of the section in view
  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) navLinks.forEach((a) => a.classList.toggle('active', a.hash === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('section[id]').forEach((s) => spy.observe(s));

  // Fade sections in as they enter the screen
  const reveal = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); obs.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el) => reveal.observe(el));
})();
