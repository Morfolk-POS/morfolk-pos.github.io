const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.querySelector('span').textContent = '＋'; }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.querySelector('span').textContent = open ? '−' : '＋'; });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) { document.body.classList.add('motion-ready'); const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, {threshold: 0.08}); document.querySelectorAll('.reveal').forEach(element => observer.observe(element)); }

const header = document.querySelector('.header');
function updateHeaderVisibility() {
  const visible = window.scrollY > 32;
  header.classList.toggle('is-visible', visible);
  header.inert = !visible;
  if (!visible) closeMenu();
}
window.addEventListener('scroll', updateHeaderVisibility, { passive: true });
window.addEventListener('pageshow', updateHeaderVisibility);
updateHeaderVisibility();

// Keep the current section when changing language.
document.querySelectorAll('.language-switch a').forEach(link => {
  link.addEventListener('click', () => {
    const sections = [...document.querySelectorAll('main > section')];
    const current = sections.filter(section => section.getBoundingClientRect().top <= 160).pop();
    if (current && current.id !== 'home') link.href = link.getAttribute('href').split('#')[0] + '#' + current.id;
  });
});
