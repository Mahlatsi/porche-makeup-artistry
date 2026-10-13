// Porche: quote builder. Calculates the total and 50% deposit from the poster prices
// and builds a ready-to-send WhatsApp booking message.
import { BRAND, waLink, money } from './config.js';

export function initPlanner() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const serviceSel = form.querySelector('#q-service');
  const locationSel = form.querySelector('#q-location');
  const dateInput = form.querySelector('#q-date');
  const timeInput = form.querySelector('#q-time');
  const facesVal = form.querySelector('#q-faces');
  const addonWrap = form.querySelector('#q-addons');
  const out = document.getElementById('quote-out');
  const sendBtn = document.getElementById('quote-send');

  let faces = 1;

  serviceSel.innerHTML = BRAND.services
    .map((s) => `<option value="${s.id}">${s.title} (${money(s.price)})</option>`)
    .join('');

  locationSel.innerHTML = [
    `<option value="studio">I'll come to Porche (Phuthaditjhaba)</option>`,
    ...BRAND.houseCalls.map((a, i) =>
      `<option value="${i}">House call: ${a.name} (${a.fee === null ? 'quote' : '+' + money(a.fee)})</option>`)
  ].join('');

  addonWrap.innerHTML = BRAND.addOns.map((a) => `
    <label class="chip">
      <input type="checkbox" value="${a.id}" />
      <span>${a.title} +${money(a.price)}</span>
    </label>`).join('');

  const today = new Date();
  dateInput.min = today.toISOString().split('T')[0];

  function render() {
    const service = BRAND.services.find((s) => s.id === serviceSel.value) || BRAND.services[0];
    const chosenAddons = [...addonWrap.querySelectorAll('input:checked')]
      .map((i) => BRAND.addOns.find((a) => a.id === i.value));
    const loc = locationSel.value === 'studio' ? null : BRAND.houseCalls[Number(locationSel.value)];

    const serviceTotal = service.price * faces;
    const addonTotal = chosenAddons.reduce((sum, a) => sum + a.price, 0) * faces;
    const travel = loc ? loc.fee : 0;
    const travelKnown = !loc || loc.fee !== null;
    const total = serviceTotal + addonTotal + (travelKnown ? travel : 0);
    const deposit = Math.round(total * BRAND.deposit.percent / 100);

    out.innerHTML = `
      <div class="quote__row"><span>${service.title} × ${faces}</span><span>${money(serviceTotal)}</span></div>
      ${chosenAddons.map((a) => `<div class="quote__row"><span>${a.title} × ${faces}</span><span>${money(a.price * faces)}</span></div>`).join('')}
      <div class="quote__row"><span>${loc ? 'House call: ' + loc.name : 'Studio visit'}</span><span>${loc ? (travelKnown ? money(travel) : 'Quoted') : 'R0'}</span></div>
      <div class="quote__row quote__row--total"><span>Total${travelKnown ? '' : ' (+ travel)'}</span><span>${money(total)}</span></div>
      <div class="quote__row quote__row--deposit"><span>50% deposit to secure</span><span>${money(deposit)}</span></div>
      <p class="quote__note">Deposit is non-refundable. Late fee: ${BRAND.lateFee}. Prices effective ${BRAND.pricesEffective}.</p>`;

    const dateText = dateInput.value
      ? new Date(dateInput.value + 'T00:00').toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
      : 'to be confirmed';

    const lines = [
      'Hi Porche! I would like to book:',
      '',
      `Service: ${service.title} × ${faces} (${money(serviceTotal)})`,
      chosenAddons.length ? `Add-ons: ${chosenAddons.map((a) => a.title).join(', ')} (${money(addonTotal)})` : null,
      `Location: ${loc ? 'House call, ' + loc.name : 'I will come to you (Phuthaditjhaba)'}`,
      `Date: ${dateText}${timeInput.value ? ' at ' + timeInput.value : ''}`,
      '',
      `Estimated total: ${money(total)}${travelKnown ? '' : ' + travel (please quote)'}`,
      `50% deposit: ${money(deposit)}`,
      '',
      'Please confirm availability and I will send proof of payment.'
    ].filter((l) => l !== null);

    sendBtn.href = waLink(lines.join('\n'));
  }

  form.querySelector('#q-minus').addEventListener('click', () => { if (faces > 1) { faces--; facesVal.textContent = faces; render(); } });
  form.querySelector('#q-plus').addEventListener('click', () => { if (faces < 15) { faces++; facesVal.textContent = faces; render(); } });
  form.addEventListener('change', render);
  form.addEventListener('input', render);
  form.addEventListener('submit', (e) => e.preventDefault());

  // Allow other sections (e.g. Bridal card) to preselect a service and navigate smoothly
  document.querySelectorAll('[data-quote-service]').forEach((el) => {
    const handleSelect = () => {
      const targetServiceId = el.dataset.quoteService;
      if (targetServiceId && serviceSel) {
        serviceSel.value = targetServiceId;
        render();
      }
      const quoteSec = document.getElementById('quote-section');
      if (quoteSec) {
        quoteSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          serviceSel.focus();
          serviceSel.classList.add('pulse-focus');
          setTimeout(() => serviceSel.classList.remove('pulse-focus'), 1400);
        }, 400);
      }
    };

    el.addEventListener('click', (e) => {
      e.preventDefault();
      handleSelect();
    });
  });

  render();
}
