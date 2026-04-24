// ===== WANDERLUST TRAVEL — SHARED JS =====

// ─── NAVBAR SCROLL EFFECT ───
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ─── HAMBURGER MENU ───
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ─── ACTIVE NAV LINK ───
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ─── FADE-UP OBSERVER ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ─── BACK TO TOP ───
const btt = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  btt?.classList.toggle('show', window.scrollY > 400);
});
btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── COUNTER ANIMATION ───
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.counted) {
      e.target.dataset.counted = '1';
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ─── FORM VALIDATION (shared) ───
function validateField(input) {
  const errEl = input.parentElement.querySelector('.form-error');
  let valid = true;
  input.classList.remove('error');
  if (errEl) errEl.classList.remove('show');
  if (!input.value.trim()) {
    valid = false;
    input.classList.add('error');
    if (errEl) { errEl.textContent = 'This field is required.'; errEl.classList.add('show'); }
  } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
    valid = false;
    input.classList.add('error');
    if (errEl) { errEl.textContent = 'Please enter a valid email.'; errEl.classList.add('show'); }
  } else if (input.type === 'tel' && !/^\+?[\d\s\-()]{7,15}$/.test(input.value)) {
    valid = false;
    input.classList.add('error');
    if (errEl) { errEl.textContent = 'Please enter a valid phone number.'; errEl.classList.add('show'); }
  }
  return valid;
}

// ─── IMAGE SLIDER ───
function initSlider(sliderEl) {
  if (!sliderEl) return;
  const slides = sliderEl.querySelectorAll('.slide');
  const dots   = sliderEl.querySelectorAll('.slider-dot');
  const prev   = sliderEl.querySelector('.slider-prev');
  const next   = sliderEl.querySelector('.slider-next');
  let current = 0;
  function go(n) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }
  go(0);
  prev?.addEventListener('click', () => go(current - 1));
  next?.addEventListener('click', () => go(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
  setInterval(() => go(current + 1), 5000);
}