// Porche: price list (poster-style dotted rows) + service detail drawer
import { BRAND, waLink, telLink, money } from './config.js';

export function initPalette() {
  const list = document.getElementById('price-list');
  const addons = document.getElementById('addon-list');
  const drawer = document.getElementById('service-drawer');
  const content = document.getElementById('drawer-content');
  const closeBtn = document.getElementById('drawer-close');
  if (!list || !drawer || !content) return;

  list.innerHTML = BRAND.services.map((s) => `
    <button class="price-row" type="button" data-id="${s.id}" aria-haspopup="dialog">
      <span class="price-row__swatch" style="background: radial-gradient(circle at 35% 30%, #fff8 0%, ${s.tone} 45%, ${s.tone} 100%);"></span>
      <span>
        <span class="price-row__name">${s.title}</span>
        ${s.badge ? `<span class="price-row__sub">${s.badge}</span>` : ''}
      </span>
      <span class="price-row__dots" aria-hidden="true"></span>
      <span class="price-row__price">${money(s.price)}</span>
      <span class="price-row__chev" aria-hidden="true">›</span>
    </button>
  `).join('');

  if (addons) {
    addons.innerHTML = BRAND.addOns.map((a) => `
      <div class="addon-row">
        <span>${a.title}</span>
        <span class="price-row__dots" aria-hidden="true"></span>
        <span class="price-row__price">${money(a.price)}</span>
      </div>
    `).join('');
  }

  let lastFocus = null;

  function open(id) {
    const s = BRAND.services.find((x) => x.id === id);
    if (!s) return;
    const msg = `Hi Porche! I'd like to book ${s.title} (${money(s.price)}). My date is: `;
    content.innerHTML = `
      <img class="drawer__img" src="${s.image}" alt="${s.title} by Porche Makeup Artistry" />
      <div class="drawer__body">
        <div class="drawer__title-row">
          <h3 class="drawer__title" id="drawer-title">${s.title}</h3>
          <span class="drawer__price">${money(s.price)}</span>
        </div>
        ${s.badge ? `<span class="drawer__badge">${s.badge}</span>` : ''}
        <p style="margin-top:12px">${s.description}</p>
        <ul class="drawer__list">${s.includes.map((i) => `<li>${i}</li>`).join('')}</ul>
        <p style="font-size:0.82rem;margin:-8px 0 18px">Add strip lashes (R50) or eyebrow shaping (R30). House-call fees apply if I come to you.</p>
        <div class="drawer__actions">
          <a class="btn btn-wa btn-block" href="${waLink(msg)}" target="_blank" rel="noopener">Book ${s.title} on WhatsApp</a>
          <a class="btn btn-ghost btn-block" href="${telLink()}">Call ${BRAND.phoneFormatted}</a>
        </div>
      </div>`;
    lastFocus = document.activeElement;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }

  function close() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocus?.focus();
  }

  list.addEventListener('click', (e) => {
    const row = e.target.closest('.price-row');
    if (row) open(row.dataset.id);
  });

  // Gallery items can also open a service
  document.querySelectorAll('[data-open-service]').forEach((el) => {
    el.addEventListener('click', () => open(el.dataset.openService));
  });

  closeBtn?.addEventListener('click', close);
  drawer.addEventListener('click', (e) => { if (e.target === drawer) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.classList.contains('open')) close(); });
}
