// Porche: floating 3D compact (black lacquer, gold trim, rose powder).
// Three.js loads on demand; falls back to a 2D canvas, or a static logo for reduced motion.

export function initHero3D() {
  const box = document.getElementById('hero3d-container');
  if (!box) return;

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    box.innerHTML = `<img src="./assets/svg/porche-logo.svg" alt="" style="width:46%;margin:27% auto 0" />`;
    return;
  }

  // Load 3D only once the hero is on screen and the browser is idle
  const start = () => import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js')
    .then((THREE) => threeScene(THREE, box))
    .catch(() => canvasFallback(box));

  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1500 });
  else setTimeout(start, 400);
}

function threeScene(THREE, box) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 5.2, 7.4);
  camera.lookAt(0, 0.4, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  box.innerHTML = '';
  box.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xfff4ec, 0xe8c9c0, 1.4));
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(4, 8, 5); scene.add(key);
  const rim = new THREE.PointLight(0xe7cfa0, 30, 20); rim.position.set(-4, 2, -3); scene.add(rim);

  const gold = new THREE.MeshStandardMaterial({ color: 0xc9a36a, metalness: 1, roughness: 0.25 });
  const lacquer = new THREE.MeshStandardMaterial({ color: 0x141114, metalness: 0.4, roughness: 0.18 });
  const powder = new THREE.MeshStandardMaterial({ color: 0xe3a9a0, roughness: 0.9 });
  const mirror = new THREE.MeshStandardMaterial({ color: 0xf4ece8, metalness: 1, roughness: 0.04 });

  const compact = new THREE.Group();
  scene.add(compact);

  const base = new THREE.Mesh(new THREE.CylinderGeometry(2, 1.92, 0.4, 72), lacquer);
  base.position.y = -0.2; compact.add(base);
  const baseRing = new THREE.Mesh(new THREE.TorusGeometry(2, 0.06, 16, 72), gold);
  baseRing.rotation.x = Math.PI / 2; compact.add(baseRing);
  const pan = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.65, 0.08, 64), powder);
  pan.position.y = 0.02; compact.add(pan);
  const panRing = new THREE.Mesh(new THREE.TorusGeometry(1.68, 0.04, 12, 64), gold);
  panRing.rotation.x = Math.PI / 2; panRing.position.y = 0.04; compact.add(panRing);

  // Lid hinged at the back edge
  const hinge = new THREE.Group();
  hinge.position.set(0, 0.02, -2);
  compact.add(hinge);
  const lid = new THREE.Group();
  lid.position.z = 2;
  hinge.add(lid);
  const lidShell = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 0.22, 72), lacquer);
  lidShell.position.y = 0.11; lid.add(lidShell);
  const lidRing = new THREE.Mesh(new THREE.TorusGeometry(2, 0.06, 16, 72), gold);
  lidRing.rotation.x = Math.PI / 2; lid.add(lidRing);
  const crest = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.05, 48), gold);
  crest.position.y = 0.24; lid.add(crest);
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, 0.02, 64), mirror);
  glass.position.y = -0.01; lid.add(glass);

  // Gold dust
  const n = 50, pos = new Float32Array(n * 3);
  for (let i = 0; i < n * 3; i++) pos[i] = (Math.random() - 0.5) * 7;
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xc9a36a, size: 0.07, transparent: true, opacity: 0.8 }));
  scene.add(dust);

  // Interaction: drag to spin, scroll to open the lid
  let spin = 0.6, spinVel = 0.004, dragging = false, lastX = 0, lidTarget = -0.5;
  const el = renderer.domElement;
  el.style.touchAction = 'pan-y';
  el.addEventListener('pointerdown', (e) => { dragging = true; lastX = e.clientX; el.setPointerCapture(e.pointerId); });
  el.addEventListener('pointermove', (e) => { if (!dragging) return; spinVel = (e.clientX - lastX) * 0.004; spin += spinVel * 2; lastX = e.clientX; });
  ['pointerup', 'pointercancel'].forEach((t) => el.addEventListener(t, () => { dragging = false; }));
  addEventListener('scroll', () => { lidTarget = -0.5 - Math.min(scrollY / 350, 1) * 1.4; }, { passive: true });

  const size = () => { const s = box.clientWidth || 180; renderer.setSize(s, s, false); };
  new ResizeObserver(size).observe(box);
  size();

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(box);

  const clock = new THREE.Clock();
  (function loop() {
    requestAnimationFrame(loop);
    if (!visible || document.hidden) return;
    const t = clock.getElapsedTime();
    if (!dragging) { spinVel += (0.004 - spinVel) * 0.03; spin += spinVel; }
    compact.rotation.set(0.35 + Math.sin(t * 0.8) * 0.05, spin, Math.sin(t * 0.6) * 0.04);
    compact.position.y = Math.sin(t * 1.4) * 0.12;
    hinge.rotation.x += (lidTarget - hinge.rotation.x) * 0.07;
    dust.rotation.y = t * 0.05;
    renderer.render(scene, camera);
  })();
}

function canvasFallback(box) {
  const c = document.createElement('canvas');
  c.width = c.height = 360;
  box.innerHTML = '';
  box.appendChild(c);
  const ctx = c.getContext('2d');
  let t = 0;
  (function draw() {
    ctx.clearRect(0, 0, 360, 360);
    const cy = 200 + Math.sin(t * 2) * 6;
    ctx.fillStyle = 'rgba(60,35,30,0.15)';
    ctx.beginPath(); ctx.ellipse(180, 285, 100, 16, 0, 0, Math.PI * 2); ctx.fill();
    const g = ctx.createLinearGradient(80, 0, 280, 0);
    g.addColorStop(0, '#E7CFA0'); g.addColorStop(0.5, '#B8925A'); g.addColorStop(1, '#8E6A35');
    ctx.lineWidth = 5; ctx.strokeStyle = g;
    ctx.fillStyle = '#141114';
    ctx.beginPath(); ctx.ellipse(180, cy + 30, 105, 50, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#E3A9A0';
    ctx.beginPath(); ctx.ellipse(180, cy + 28, 84, 38, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#141114';
    ctx.beginPath(); ctx.ellipse(180, cy - 60, 100, 44, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(244,236,232,0.85)';
    ctx.beginPath(); ctx.ellipse(180, cy - 58, 80, 32, 0, 0, Math.PI * 2); ctx.fill();
    t += 0.016;
    requestAnimationFrame(draw);
  })();
}
