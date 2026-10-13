// Porche: app entry point
import { BRAND, waLink, telLink } from './config.js';
import { initHero3D } from './hero3d.js';
import { initVanityMirror } from './mirror.js';
import { initPalette } from './palette.js';
import { initPlanner } from './planner.js';
import { initAreas } from './areas.js';

document.addEventListener('DOMContentLoaded', () => {
  wireContactLinks();
  intro();
  initHero3D();
  initPalette();
  initAreas();
  initVanityMirror();
  initPlanner();
  lipstickMeter();
  galleryFilter();
  copyButtons();
  reveal();
  document.getElementById('year').textContent = new Date().getFullYear();
});

function wireContactLinks() {
  document.querySelectorAll('[data-wa]').forEach((a) => {
    a.href = waLink(a.dataset.wa || undefined);
    a.target = '_blank';
    a.rel = 'noopener';
  });
  document.querySelectorAll('[data-call]').forEach((a) => { a.href = telLink(); });
  document.querySelectorAll('[data-phone]').forEach((el) => { el.textContent = BRAND.phoneFormatted; });
  document.querySelectorAll('[data-facebook]').forEach((a) => { a.href = BRAND.socials.facebook; });
}

function intro() {
  const el = document.getElementById('intro');
  if (!el) return;
  const hide = () => el.classList.add('hide');
  if (sessionStorage.getItem('porche_intro')) { el.remove(); return; }
  sessionStorage.setItem('porche_intro', '1');
  el.addEventListener('click', hide);
  setTimeout(hide, 1300);
  el.addEventListener('transitionend', () => el.remove(), { once: true });
}

function lipstickMeter() {
  const meter = document.getElementById('lipstick-meter');
  const bullet = document.getElementById('lipstick-bullet');
  if (!meter || !bullet) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    meter.classList.toggle('visible', scrollY > 200);
    bullet.style.height = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
  };
  addEventListener('scroll', update, { passive: true });
  update();
}

function galleryFilter() {
  const buttons = document.querySelectorAll('.filter');
  const looks = document.querySelectorAll('.look');
  buttons.forEach((btn) => btn.addEventListener('click', () => {
    const apply = () => {
      buttons.forEach((b) => { b.classList.toggle('active', b === btn); b.setAttribute('aria-pressed', b === btn); });
      looks.forEach((l) => l.classList.toggle('hidden', btn.dataset.filter !== 'all' && l.dataset.cat !== btn.dataset.filter));
    };
    // Smooth cross-fade where View Transitions are supported
    if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(apply);
    else apply();
  }));
}

function copyButtons() {
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = Object.assign(document.createElement('textarea'), { value: text });
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
      }
      const old = btn.textContent;
      btn.textContent = 'Copied';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = old; btn.classList.remove('copied'); }, 1600);
    });
  });
}

function reveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { items.forEach((i) => i.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach((i) => io.observe(i));
}
