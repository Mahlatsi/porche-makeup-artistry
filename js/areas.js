// Porche: house-call fees list
import { BRAND, waLink, money } from './config.js';

export function initAreas() {
  const list = document.getElementById('area-list');
  if (!list) return;

  list.innerHTML = BRAND.houseCalls
    .filter((a) => a.fee !== null)
    .map((a) => `
      <div class="area-row">
        <span class="area-row__pin" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>
        </span>
        <span class="area-row__name">${a.name}</span>
        <span class="price-row__dots" aria-hidden="true"></span>
        <span class="area-row__fee">${money(a.fee)}</span>
      </div>`)
    .join('');

  const gautengBtn = document.getElementById('gauteng-quote');
  if (gautengBtn) {
    gautengBtn.href = waLink("Hi Porche! I'm in Gauteng and would like a house-call quote. My area is: ");
  }
}
