// Porche: vanity mirror before/after slider.
// The left side shows "before"; dragging right reveals more "after" and lights more bulbs.

export function initVanityMirror() {
  const frame = document.getElementById('mirror-frame');
  const viewport = document.getElementById('mirror-viewport');
  const beforeWrap = document.getElementById('mirror-before');
  if (!frame || !viewport || !beforeWrap) return;

  // Place bulbs around the frame
  const bulbLayer = frame.querySelector('.mirror-bulbs');
  const perSide = { top: 5, right: 6, bottom: 5, left: 6 };
  const bulbs = [];
  const add = (style) => { const b = document.createElement('span'); b.className = 'vanity-bulb'; Object.assign(b.style, style); bulbLayer.appendChild(b); bulbs.push(b); };
  for (let i = 0; i < perSide.top; i++) add({ top: '4px', left: `${12 + (i * 76) / (perSide.top - 1)}%` });
  for (let i = 0; i < perSide.right; i++) add({ right: '4px', top: `${10 + (i * 80) / (perSide.right - 1)}%` });
  for (let i = perSide.bottom - 1; i >= 0; i--) add({ bottom: '4px', left: `${12 + (i * 76) / (perSide.bottom - 1)}%` });
  for (let i = perSide.left - 1; i >= 0; i--) add({ left: '4px', top: `${10 + (i * 80) / (perSide.left - 1)}%` });

  let pct = 50;
  let dragging = false;

  function set(p) {
    pct = Math.max(0, Math.min(100, p));
    beforeWrap.style.width = `${pct}%`;
    viewport.style.setProperty('--mirror-w', `${viewport.clientWidth}px`);
    const revealed = 100 - pct; // share of the "after" look showing
    const lit = Math.round((revealed / 100) * bulbs.length);
    bulbs.forEach((b, i) => b.classList.toggle('lit', i < lit));
    viewport.setAttribute('aria-valuenow', String(Math.round(revealed)));
  }

  const fromX = (x) => {
    const r = viewport.getBoundingClientRect();
    set(((x - r.left) / r.width) * 100);
  };

  viewport.addEventListener('pointerdown', (e) => { dragging = true; viewport.setPointerCapture(e.pointerId); fromX(e.clientX); });
  viewport.addEventListener('pointermove', (e) => { if (dragging) fromX(e.clientX); });
  ['pointerup', 'pointercancel'].forEach((t) => viewport.addEventListener(t, () => { dragging = false; }));

  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { set(pct + 5); e.preventDefault(); }
    if (e.key === 'ArrowRight') { set(pct - 5); e.preventDefault(); }
  });

  new ResizeObserver(() => set(pct)).observe(viewport);

  // Gentle hint animation the first time the mirror scrolls into view
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    io.disconnect();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let t = 0;
    const tick = () => { t += 0.03; set(50 - Math.sin(t) * 22); if (t < Math.PI) requestAnimationFrame(tick); else set(50); };
    requestAnimationFrame(tick);
  }, { threshold: 0.5 });
  io.observe(viewport);

  set(50);
}
