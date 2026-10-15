/* ==========================================================================
   CONFIG — every tweakable value in one place
   ========================================================================== */
window.PORTFOLIO_CONFIG = {

  /* 3D float + cursor-facing tilt */
  tilt: {
    perspective: 900,        // px — lower = stronger 3D
    followSpeed: 9,          // how fast an element turns toward the cursor
    returnSpeed: 5,          // how fast it settles back
    hoverSlop: 10,           // px of grace around an element (stops edge flicker)
    formFocusMaxAngle: 5,    // max tilt (deg) while typing in the contact form
    // max = max tilt (deg) | amp = float height (px) | rot = float wobble (deg)
    // scale = hover zoom | dur = [min,max] float loop seconds (each element gets its own)
    // perspective = optional per-preset override
    presets: {
      button:  { max: 14, amp: 5, rot: 0.8, scale: 1.05,  dur: [3.2, 4.4] },
      icon:    { max: 16, amp: 5, rot: 1.2, scale: 1.12,  dur: [2.8, 3.8] },
      image:   { max: 12, amp: 8, rot: 0.6, scale: 1.03,  dur: [4.2, 5.0] },
      card:    { max: 9,  amp: 7, rot: 0.4, scale: 1.015, dur: [4.0, 5.0] },
      chip:    { max: 12, amp: 5, rot: 0.6, scale: 1.04,  dur: [3.4, 4.4] },
      form:    { max: 6,  amp: 6, rot: 0.3, scale: 1.01,  dur: [4.4, 5.0] },
      heading: { max: 10, amp: 5, rot: 0.5, scale: 1.03,  dur: [3.4, 4.6], shadow: false },
      // "Hi, I'm Trisha…" — big element, so gentler perspective
      title:   { max: 11, amp: 7, rot: 0.5, scale: 1,     dur: [4.6, 5.4], shadow: false, perspective: 1400 }
    },
    // How the hero title behaves
    titleMotion: {
      followSpeed: 5,        // how quickly it turns toward the cursor (active mode)
      wanderSpeed: 1,        // speed of the look-around path (idle mode); 2 = twice as fast
      wanderFollow: 1.8      // how smoothly it eases along the look-around path
    }
  },

  /* Text hover shine */
  textShine: {
    sweepMs: 1100,           // duration of every shine sweep
    idlePulseMs: 5000,       // idle mode: title shine repeats this often
    staggerMs: 140           // delay between the title's text pieces (wave effect)
  },

  /* F1 car cursor */
  cursor: {
    idleMs: 7000,            // no activity for this long -> car roams (and the page counts as "idle")
    follow: 11.5,            // how tightly the car chases the mouse
    returnFollow: 4,         // chase speed right after roaming ends
    returnMs: 900,           // how long it takes to ease back to normal
    roamFollow: 7,
    roamSpeed: 260,          // px/s while roaming
    roamTurnRate: 2.1,       // rad/s max steering while roaming
    roamSparkTurnRate: 1.7,  // sharper turns than this throw light sparks
    fullThrottleSpeed: 1400, // px/s that counts as 100% throttle
    sparkThreshold: 0.3,     // throttle above which sparks fire
    maxSparks: 60,           // hard cap on the spark pool
    sparkLifeMs: [400, 600],
    maxScale: 1.18,          // car scale at full throttle
    maxStretch: 0.1,         // forward "lean" at full throttle
    shakePx: 1.6,            // engine shake at full throttle
    rearOffset: 34,          // px from car centre to exhaust
    // Idle drift + throttle burst
    driftEveryMs: 4000,      // a burst starts this often while idle
    driftMs: 900,            // length of each burst
    driftAngleDeg: 32,       // how far the body slides sideways (25-40 looks good)
    driftSpeedBoost: 4.2     // roaming speed multiplier at the peak of the burst (1 + this)
  },

  /* Formula 1 background */
  f1: {
    maxDpr: 1.5,
    carLenFactor: 0.17,      // car length as a fraction of screen width (clamped 120-250px)
    speedFactor: 0.75,       // scroll speed = screen width * this (px/s)
    shake: 2.2,              // max camera shake (px) during boosts
    nearScale: 1.12,         // car size while overtaking in the near lane
    driftFactor: 0.018,      // how far cars gain/lose ground on each other
    overtakeMode: 'all',     // 'all' = pass every car ahead | 'one' = pass the car directly ahead
    overtakeBaseMs: 1500,    // overtake duration = base + perCar * carsPassed
    overtakePerCarMs: 700,
    maxParticles: 320,       // smoke + sparks pool (raised: car sparks are heavier now)
    maxParticlesSmall: 120,
    crowdStep: 9,
    audio: { volume: 0.55, baseGain: 0.32 },

    // Dark mode only
    fireworks: {
      intervalMs: 6000,      // a volley every 6 s
      firstDelayMs: 2500,    // wait before the first volley after load / after switching to dark
      volleyMin: 3,          // fireworks per volley
      volleyMax: 6,
      bigCount: [180, 280],  // particles in a big burst
      smallCount: [50, 90],  // particles in a small burst
      maxParticles: 1800,    // hard cap
      maxParticlesSmall: 700,
      // CSS variable names (--x) are read from your palette; 'orange' = a 50/50 blend of red and yellow; hex works too
      colors: ['--accent-red', 'orange', '--accent-yellow', '#ff4fa3', '#3ad7ff', '#a37bff', '#ffffff']
    },

    // Original stylised cars (no real logos or sponsor marks). Order = starting grid.
    drivers: [
      { code: 'VER', name: 'Max Verstappen',  number: 1,  body: '#1B2B5A', accent: '#FF0026', trim: '#FFEA00', helmet: '#FFEA00' },
      { code: 'LEC', name: 'Charles Leclerc', number: 16, body: '#DC0000', accent: '#FFFFFF', trim: '#FFEA00', helmet: '#FFFFFF' },
      { code: 'HAM', name: 'Lewis Hamilton',  number: 44, body: '#8E0F1E', accent: '#161616', trim: '#C8A24A', helmet: '#FFD400' },
      { code: 'PIA', name: 'Oscar Piastri',   number: 81, body: '#FF8000', accent: '#0A1A3F', trim: '#EAF4FF', helmet: '#1E90FF' }
    ]
  }
};


/* ==========================================================================
   CORE — theme, page tabs, header, mobile menu, reveal (original logic)
   ========================================================================== */
(function () {
  'use strict';

  window.Portfolio = window.Portfolio || {};
  const htmlEl = document.documentElement;

  /* DARK / LIGHT THEME */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function applyTheme(theme, persist) {
    htmlEl.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    if (persist) {
      try { localStorage.setItem('f1_portfolio_theme', theme); } catch (e) { /* storage blocked */ }
    }
    document.dispatchEvent(new CustomEvent('portfolio:themechange', { detail: { theme: theme } }));
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem('f1_portfolio_theme'); } catch (e) { /* ignore */ }
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'), false);

  themeToggle.addEventListener('click', () => {
    applyTheme(htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  });

  /* PAGE TABS */
  window.switchPage = function (pageId) {
    const pageMain = document.getElementById('page-main');
    const pageShowcase = document.getElementById('page-showcase');
    const tabMain = document.getElementById('tab-main');
    const tabShowcase = document.getElementById('tab-showcase');

    function announce() {
      document.dispatchEvent(new CustomEvent('portfolio:pagechange', { detail: { page: pageId } }));
    }

    if (pageId === 'main') {
      pageShowcase.classList.remove('active');
      setTimeout(() => {
        pageShowcase.style.display = 'none';
        pageMain.style.display = 'block';
        setTimeout(() => { pageMain.classList.add('active'); announce(); }, 50);
      }, 300);
      tabMain.classList.add('active');
      tabShowcase.classList.remove('active');
    } else if (pageId === 'showcase') {
      pageMain.classList.remove('active');
      setTimeout(() => {
        pageMain.style.display = 'none';
        pageShowcase.style.display = 'block';
        setTimeout(() => { pageShowcase.classList.add('active'); announce(); }, 50);
      }, 300);
      tabShowcase.classList.add('active');
      tabMain.classList.remove('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.handleContactClick = function (event) {
    event.preventDefault();
    const pageMain = document.getElementById('page-main');
    if (!pageMain.classList.contains('active')) {
      window.switchPage('main');
      setTimeout(() => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      }, 400);
    } else {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* HEADER SCROLL */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* MOBILE MENU */
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.querySelector('i').className =
      navMenu.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered';
  });

  /* SCROLL REVEAL */
  const revealElements = document.querySelectorAll('.reveal');
  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el) => {
      if (el.getBoundingClientRect().top < windowHeight - 80) el.classList.add('active');
    });
  }
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  document.addEventListener('portfolio:pagechange', revealOnScroll);
  revealOnScroll();
})();


/* ==========================================================================
   SHARED IDLE STATE
   window.Portfolio.idle.isIdle()  -> true while the page is "idle"
   'portfolio:idlechange' CustomEvent fires on document when it flips.

   - Devices with the car cursor (fine pointer, >= 992px): the cursor module drives this.
     Idle starts when the car starts roaming (7 s without mouse move / scroll / key / click)
     and ends on the first activity.
   - Touch / small / no-fine-pointer devices have no car cursor and no pointer to follow,
     so the page is ALWAYS idle there (the hero title floats, wanders and pulses).
   It is declared here (before the modules that read it) so load order never matters.
   ========================================================================== */
(function () {
  'use strict';

  window.Portfolio = window.Portfolio || {};
  const fine = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 992;
  let idle = !fine;

  window.Portfolio.idle = {
    alwaysIdle: !fine,
    isIdle() { return idle; },
    set(value) {
      if (!fine || value === idle) return;
      idle = value;
      document.dispatchEvent(new CustomEvent('portfolio:idlechange', { detail: { idle: idle } }));
    }
  };
})();


/* ==========================================================================
   TEXT SHINE — wraps every text node so ALL text can sweep a shine on hover
   (CSS does the sweep; there is no lingering glow). Also runs the idle
   shine pulse on the hero title. Opt out of any element with data-no-shine.
   ========================================================================== */
(function () {
  'use strict';

  window.Portfolio = window.Portfolio || {};
  const CFG = window.PORTFOLIO_CONFIG.textShine;
  document.documentElement.style.setProperty('--shine-ms', CFG.sweepMs + 'ms');

  const EXCLUDE = 'script,style,noscript,textarea,input,select,option,svg,canvas,' +
                  '.cursor-f1-car,.f1-stage,[data-no-shine]';

  function wrap(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || parent.classList.contains('tx') || parent.closest(EXCLUDE)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const span = document.createElement('span');
      span.className = 'tx';
      node.parentNode.insertBefore(span, node);
      span.appendChild(node);
      span.parentElement.classList.add('shine-host');
    });
  }

  ['header', 'main', 'footer', '.lightbox'].forEach((sel) => wrap(document.querySelector(sel)));
  window.Portfolio.textShine = { wrap: wrap };

  /* ---------- IDLE SHINE PULSE on the hero title ---------- */
  const title = document.querySelector('.hero-title');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const Idle = window.Portfolio.idle;

  if (title && !reduce && Idle) {
    // Stagger the sweep across the title's pieces ("Hi, I'm" -> "Trisha" -> rest) for a travelling wave
    title.querySelectorAll('.tx').forEach((el, i) => {
      el.style.setProperty('--shine-delay', (i * CFG.staggerMs) + 'ms');
    });

    let visible = true;                                   // skip pulses while the title is off-screen / on the hidden page
    new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; }).observe(title);

    let timer = 0;
    function pulse() {
      if (!visible) return;
      title.classList.remove('shine-pulse');
      void title.offsetWidth;                             // force reflow so the CSS animation restarts
      title.classList.add('shine-pulse');
    }
    function startPulses() {
      if (timer) return;
      pulse();
      timer = setInterval(pulse, CFG.idlePulseMs);
    }
    function stopPulses() {
      clearInterval(timer);
      timer = 0;
      title.classList.remove('shine-pulse');              // stops instantly when the user is active again
    }
    function sync() { if (Idle.isIdle()) startPulses(); else stopPulses(); }

    document.addEventListener('portfolio:idlechange', sync);
    sync();
  }
})();


/* ==========================================================================
   LIGHTBOX — click an artwork to view it full size, 1:1, never stretched.
   Esc / backdrop closes, arrow keys navigate, focus is trapped, scroll is locked.
   ========================================================================== */
(function () {
  'use strict';

  window.Portfolio = window.Portfolio || {};

  const box = document.getElementById('lightbox');
  if (!box) return;

  const img = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const descEl = document.getElementById('lightboxDesc');
  const countEl = document.getElementById('lightboxCount');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  const items = Array.from(document.querySelectorAll('[data-lightbox]'));
  let index = -1;
  let lastFocus = null;

  function setText(el, text) {
    el.textContent = text || '';
    if (window.Portfolio.textShine) window.Portfolio.textShine.wrap(el);  // re-apply shine wrappers
  }

  function render(i, srcOverride) {
    const it = items[i];
    const data = it ? it.dataset : {};
    box.classList.add('loading');
    img.onload = () => box.classList.remove('loading');
    img.onerror = () => box.classList.remove('loading');
    img.src = srcOverride || data.full;
    img.alt = data.alt || data.title || 'Artwork full view';
    setText(titleEl, data.title);
    setText(descEl, data.desc);
    countEl.textContent = items.length > 1 && it ? (i + 1) + ' / ' + items.length : '';
    const multi = items.length > 1 && !!it;
    prevBtn.hidden = !multi;
    nextBtn.hidden = !multi;

    if (multi) {                                            // preload neighbours
      [(i + 1) % items.length, (i - 1 + items.length) % items.length].forEach((n) => {
        const pre = new Image();
        pre.src = items[n].dataset.full;
      });
    }
  }

  function lockScroll() {
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = sw > 0 ? sw + 'px' : '';
    document.body.classList.add('lightbox-open');
  }
  function unlockScroll() {
    document.body.style.paddingRight = '';
    document.body.classList.remove('lightbox-open');
  }

  function open(i, srcOverride) {
    lastFocus = document.activeElement;
    index = i;
    render(i, srcOverride);
    box.classList.add('active');
    box.setAttribute('aria-hidden', 'false');
    lockScroll();
    closeBtn.focus({ preventScroll: true });
  }

  function close() {
    if (!box.classList.contains('active')) return;
    box.classList.remove('active');
    box.setAttribute('aria-hidden', 'true');
    unlockScroll();
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function step(dir) {
    if (items.length < 2 || index < 0) return;
    index = (index + dir + items.length) % items.length;
    render(index);
  }

  items.forEach((it, i) => {
    it.addEventListener('click', () => open(i));
    it.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  box.addEventListener('click', (e) => {
    if (e.target === box || e.target.classList.contains('lightbox-stage')) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('active')) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'ArrowRight') { step(1); return; }
    if (e.key === 'ArrowLeft') { step(-1); return; }

    if (e.key === 'Tab') {                                  // focus trap
      const focusable = Array.from(box.querySelectorAll('button')).filter((b) => !b.hidden);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!box.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    }
  });

  window.openLightbox = function (src, title, desc) {       // backwards compatible with the old inline onclick
    const found = items.findIndex((it) => it.dataset.full === src);
    if (found >= 0) { open(found); return; }
    lastFocus = document.activeElement;
    index = -1;
    img.src = src;
    img.alt = title || 'Artwork full view';
    setText(titleEl, title);
    setText(descEl, desc);
    countEl.textContent = '';
    prevBtn.hidden = nextBtn.hidden = true;
    box.classList.add('active');
    box.setAttribute('aria-hidden', 'false');
    lockScroll();
    closeBtn.focus({ preventScroll: true });
  };

  window.Portfolio.lightbox = { open: open, close: close };
})();


/* ==========================================================================
   TILT — ONE reusable effect: gentle 3D float + turning to face the cursor.
   Usage: <div data-tilt="card">  (presets: button, icon, image, card, chip, form, heading, title)

   Float, tilt and hover scale are composed into ONE transform per element, so they
   can never fight each other (the reveal animation uses the CSS `translate` property).

   data-tilt="title" (the hero heading) is special:
     - ACTIVE (not idle): faces the cursor wherever it is on screen, not only on hover.
     - IDLE: ignores the pointer and wanders through the full tilt range on both axes.
   Disabled for prefers-reduced-motion; touch devices get float + the idle wander.
   ========================================================================== */
(function () {
  'use strict';

  window.Portfolio = window.Portfolio || {};

  const CFG = window.PORTFOLIO_CONFIG.tilt;
  const TM = CFG.titleMotion;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const els = Array.from(document.querySelectorAll('[data-tilt]'));
  if (!els.length) return;

  let shadowRGB = '0,0,0';
  function readShadowRGB() {
    shadowRGB = getComputedStyle(document.documentElement).getPropertyValue('--shadow-rgb').trim() || '0,0,0';
  }
  readShadowRGB();
  new MutationObserver(readShadowRGB).observe(document.documentElement, {
    attributes: true, attributeFilter: ['data-theme']
  });

  const items = els.map((el, i) => {
    const p = CFG.presets[el.dataset.tilt] || CFG.presets.card;
    const dur = p.dur[0] + ((i * 0.618034) % 1) * (p.dur[1] - p.dur[0]);   // own pace…
    return {
      el: el, p: p,
      amp: parseFloat(el.dataset.floatAmp) || p.amp,
      dur: dur,
      phase: ((i * 0.37) % 1) * Math.PI * 2,                              // …and own phase
      persp: p.perspective || CFG.perspective,
      shadow: p.shadow !== false && el.dataset.tiltShadow !== 'off',
      isForm: el.dataset.tilt === 'form',
      isTitle: el.dataset.tilt === 'title',
      visible: false, hover: false,
      nx: 0, ny: 0, cx: 0, cy: 0, mix: 0, sc: 1
    };
  });
  const byEl = new Map(items.map((it) => [it.el, it]));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { byEl.get(e.target).visible = e.isIntersecting; });
  }, { rootMargin: '80px' });
  els.forEach((el) => io.observe(el));

  let px = -1, py = -1, pointerValid = false, dirty = false;

  if (canHover) {
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      px = e.clientX; py = e.clientY;
      pointerValid = true; dirty = true;
    }, { passive: true });
    window.addEventListener('scroll', () => { dirty = true; }, { passive: true });
    document.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget) { pointerValid = false; dirty = true; }
    });
  }

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

  /* Regular elements: hover detection (the title is excluded, it follows the cursor anywhere) */
  function updateHover() {
    const top = pointerValid ? document.elementFromPoint(px, py) : null;
    const covered = top && top.closest('.lightbox, .header');
    const slop = CFG.hoverSlop;

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (it.isTitle) continue;
      if (!it.visible || !pointerValid) { it.hover = false; continue; }

      let hov = !!(top && it.el.contains(top));
      if (!hov && it.hover && !covered) {                    // hysteresis: no flicker at the edges
        const r = it.el.getBoundingClientRect();
        hov = px >= r.left - slop && px <= r.right + slop && py >= r.top - slop && py <= r.bottom + slop;
      }
      it.hover = hov;

      if (hov) {
        const r = it.el.getBoundingClientRect();
        it.nx = clamp((px - (r.left + r.width / 2)) / (r.width / 2 || 1), -1, 1);
        it.ny = clamp((py - (r.top + r.height / 2)) / (r.height / 2 || 1), -1, 1);
      }
    }
  }

  /* Title: direction from the title's centre to the pointer, normalised by the viewport and clamped.
     Only recomputed when the pointer / scroll changed (never every frame). */
  function updateTitleAim() {
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!it.isTitle || !it.visible) continue;
      if (!pointerValid) { it.nx = 0; it.ny = 0; continue; }
      const r = it.el.getBoundingClientRect();
      it.nx = clamp((px - (r.left + r.width / 2)) / (window.innerWidth * 0.5), -1, 1);
      it.ny = clamp((py - (r.top + r.height / 2)) / (window.innerHeight * 0.5), -1, 1);
    }
  }

  /* Idle "look everywhere" path: three incommensurate sine waves per axis never visibly repeat
     and sweep through the whole -1..1 range (left, right, up, down, diagonals). */
  const wv = { x: 0, y: 0 };
  function wander(t) {
    wv.x = clamp((Math.sin(t * 0.31 + 1.3) * 0.55 + Math.sin(t * 0.73 + 2.1) * 0.30 + Math.sin(t * 1.37 + 0.6) * 0.15) * 1.15, -1, 1);
    wv.y = clamp((Math.sin(t * 0.27 + 0.4) * 0.55 + Math.sin(t * 0.59 + 4.2) * 0.30 + Math.sin(t * 1.11 + 3.3) * 0.15) * 1.15, -1, 1);
  }

  let last = performance.now();

  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
    last = now;
    const t = now / 1000;

    if (dirty) { updateHover(); updateTitleAim(); dirty = false; }

    const active = document.activeElement;
    const Idle = window.Portfolio.idle;

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!it.visible) continue;
      const p = it.p;

      // ---- targets ----
      let tx, ty, tmix, tsc, speedK;
      if (it.isTitle) {
        if (Idle && Idle.isIdle()) {                           // idle: look around
          wander(t * TM.wanderSpeed);
          tx = wv.x; ty = wv.y; speedK = TM.wanderFollow;
        } else {                                               // active: face the cursor
          tx = it.nx; ty = it.ny; speedK = TM.followSpeed;
        }
        tmix = 0; tsc = 1;
      } else {
        tx = it.hover ? it.nx : 0;
        ty = it.hover ? it.ny : 0;
        tmix = it.hover ? 1 : 0;
        tsc = it.hover ? p.scale : 1;
        speedK = it.hover ? CFG.followSpeed : CFG.returnSpeed;
      }

      // ---- frame-rate independent smoothing ----
      const k = 1 - Math.exp(-dt * speedK);
      it.cx += (tx - it.cx) * k;
      it.cy += (ty - it.cy) * k;
      it.mix += (tmix - it.mix) * k;
      it.sc += (tsc - it.sc) * k;

      // ---- idle float ----
      const w = (Math.PI * 2) / it.dur;
      const s = Math.sin(t * w + it.phase);
      const c = Math.cos(t * w * 0.8 + it.phase);
      const calm = 1 - 0.6 * it.mix;                          // float calms while hovered
      const floatY = s * it.amp * calm;
      const floatRZ = c * p.rot * calm;
      const floatRX = s * p.rot * 0.6 * calm;

      let max = p.max;
      if (it.isForm && active && it.el.contains(active)) max = CFG.formFocusMaxAngle;
      const ry = it.cx * max;                                 // +rotateY faces a cursor on the right
      const rx = -it.cy * max + floatRX;                      // -rotateX faces a cursor below

      it.el.style.transform =
        'perspective(' + it.persp + 'px) ' +
        'translate3d(0,' + floatY.toFixed(2) + 'px,0) ' +
        'rotateX(' + rx.toFixed(2) + 'deg) ' +
        'rotateY(' + ry.toFixed(2) + 'deg) ' +
        'rotateZ(' + floatRZ.toFixed(2) + 'deg) ' +
        'scale(' + it.sc.toFixed(3) + ')';

      if (it.shadow) {
        const lift = -floatY;
        const sx = (-ry * 1.1).toFixed(1);
        const sy = (12 + lift * 0.8 - it.cy * max * 0.6).toFixed(1);
        const blur = (22 + lift * 1.2 + it.mix * 8).toFixed(1);
        const alpha = (0.26 + it.mix * 0.12).toFixed(2);
        it.el.style.setProperty('--tilt-shadow', sx + 'px ' + sy + 'px ' + blur + 'px -10px rgba(' + shadowRGB + ',' + alpha + ')');
      }
    }
  }
  requestAnimationFrame(frame);

  window.Portfolio.tilt = { refresh: function () { dirty = true; } };
  document.addEventListener('portfolio:pagechange', () => { dirty = true; });
})();


/* ==========================================================================
   F1 CAR CURSOR — throttle, glow, sparks, idle roaming + drift bursts
   - Scale / brightness / stretch / shake respond to speed; glow grows with speed.
   - Pooled sparks (hard cap from config) fire from the exhaust above a throttle threshold.
   - After 7 s with no activity the car roams on its own (this is the shared "idle" state),
     and every 4 s it throws a drift + full-throttle burst. Any activity cancels it
     immediately and the car eases back to your pointer.
   - Fine pointers >= 992px only.
   ========================================================================== */
(function () {
  'use strict';

  const CFG = window.PORTFOLIO_CONFIG.cursor;
  const car = document.getElementById('cursorCar');
  const bodyEl = car && car.querySelector('.cursor-car-body');
  const tip = document.getElementById('cursorTooltip');
  const canvas = document.getElementById('trailCanvas');
  if (!car || !bodyEl || !canvas) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 992;
  if (!fine || reduce) return;

  const Idle = window.Portfolio.idle;
  const TAU = Math.PI * 2;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rand = (a, b) => a + Math.random() * (b - a);

  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  let W = window.innerWidth, H = window.innerHeight;
  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  /* theme colours cached (no style reads inside the loop) */
  let trailRGB = [102, 116, 163];
  let glowRGB = '255,234,0';
  function readTheme() {
    const root = document.documentElement;
    const hex = getComputedStyle(root).getPropertyValue('--trail-color').trim();
    const m = /^#([0-9a-f]{6})$/i.exec(hex);
    if (m) trailRGB = [parseInt(m[1].slice(0, 2), 16), parseInt(m[1].slice(2, 4), 16), parseInt(m[1].slice(4, 6), 16)];
    glowRGB = root.getAttribute('data-theme') === 'light' ? '255,0,38' : '255,234,0';
  }
  readTheme();
  new MutationObserver(readTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  let mouseX = W / 2, mouseY = H / 2;
  let carX = mouseX, carY = mouseY, prevX = carX, prevY = carY;
  let angle = 0, speed = 0, throttle = 0;
  let lastActivity = performance.now();
  let roaming = false;
  let returning = 0;
  const ghost = { x: 0, y: 0, h: 0, wx: 0, wy: 0, turn: 0 };

  /* idle drift burst state */
  const drift = { active: false, start: 0, dir: 1 };
  let driftOffset = 0;                    // smoothed sideways body swing (radians)
  let nextDriftAt = 0;

  let skid = [];
  let smoke = [];

  const sparks = Array.from({ length: CFG.maxSparks }, () => ({ on: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 1, size: 1, hot: 0 }));
  let sparkCursor = 0;

  function emitSpark(x, y, vx, vy) {
    for (let n = 0; n < sparks.length; n++) {                // pool full -> drop (hard cap respected)
      const s = sparks[(sparkCursor + n) % sparks.length];
      if (!s.on) {
        sparkCursor = (sparkCursor + n + 1) % sparks.length;
        s.on = true; s.x = x; s.y = y; s.vx = vx; s.vy = vy;
        s.life = 0;
        s.max = rand(CFG.sparkLifeMs[0], CFG.sparkLifeMs[1]) / 1000;
        s.size = rand(1, 2.2);
        s.hot = Math.random();
        return;
      }
    }
  }

  function revealCar() { car.classList.add('ready'); }

  /* any real activity: end roaming + cancel a running drift instantly, then ease back to the pointer */
  function activity() {
    lastActivity = performance.now();
    if (roaming) {
      roaming = false;
      returning = 1;
      drift.active = false;
      if (Idle) Idle.set(false);
    }
  }

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    mouseX = e.clientX; mouseY = e.clientY;
    revealCar();
    activity();
  }, { passive: true });
  ['pointerdown', 'keydown', 'wheel', 'scroll'].forEach((ev) => window.addEventListener(ev, activity, { passive: true }));

  function pickWaypoint() {
    const m = 70;
    for (let i = 0; i < 8; i++) {
      ghost.wx = rand(m, W - m);
      ghost.wy = rand(m, H - m);
      if (Math.hypot(ghost.wx - ghost.x, ghost.wy - ghost.y) > 260) break;
    }
  }

  function startRoam(now) {
    roaming = true;
    ghost.x = carX; ghost.y = carY;
    ghost.h = angle - Math.PI / 2;
    drift.active = false;
    nextDriftAt = now + CFG.driftEveryMs;                    // first burst 4 s after idle begins
    pickWaypoint();
    revealCar();
    if (Idle) Idle.set(true);
  }

  function startDrift(now) {
    drift.active = true;
    drift.start = now;
    drift.dir = Math.random() < 0.5 ? -1 : 1;
    nextDriftAt = now + CFG.driftEveryMs;                    // bursts repeat every 4 s while idle
  }

  function stepGhost(dt, now, driftEnv) {
    if (Math.hypot(ghost.wx - ghost.x, ghost.wy - ghost.y) < 100) pickWaypoint();
    const want = Math.atan2(ghost.wy - ghost.y, ghost.wx - ghost.x);
    let diff = want - ghost.h;
    while (diff > Math.PI) diff -= TAU;
    while (diff < -Math.PI) diff += TAU;
    const maxTurn = CFG.roamTurnRate * dt;
    const turn = clamp(diff, -maxTurn, maxTurn);
    // during a drift the path also arcs hard to one side
    ghost.h += turn + drift.dir * driftEnv * 2.4 * dt;
    ghost.turn = Math.abs(turn) / dt;
    const v = CFG.roamSpeed * (0.85 + 0.35 * Math.sin(now * 0.0011)) * (1 + CFG.driftSpeedBoost * driftEnv);
    ghost.x += Math.cos(ghost.h) * v * dt;
    ghost.y += Math.sin(ghost.h) * v * dt;
    if (ghost.x < 40 || ghost.x > W - 40 || ghost.y < 40 || ghost.y > H - 40) {
      ghost.x = clamp(ghost.x, 40, W - 40);
      ghost.y = clamp(ghost.y, 40, H - 40);
      pickWaypoint();
    }
  }

  /* hover label ("VIEW") */
  const HOVER_SEL = 'a, button, input, textarea, label, .showcase-card, .hero-art-card, [data-lightbox], [data-cursor-label]';
  let domLabel = null;
  let bgLabel = null;

  function applyLabel() {
    const label = domLabel || bgLabel;
    if (label && tip.textContent !== label) tip.textContent = label;
    document.body.classList.toggle('hovering', !!label);
  }

  document.addEventListener('pointerover', (e) => {
    const t = e.target.closest ? e.target.closest(HOVER_SEL) : null;
    domLabel = t ? (t.getAttribute('data-cursor-label') || 'VIEW') : null;
    applyLabel();
  });
  document.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget) { domLabel = null; applyLabel(); }
  });
  window.addEventListener('f1:carhover', (e) => {          // sent by the F1 background
    bgLabel = e.detail && e.detail.label ? e.detail.label : null;
    applyLabel();
  });

  let last = performance.now();
  let lastFilter = '';

  function frame(now) {
    requestAnimationFrame(frame);
    const dt = clamp((now - last) / 1000, 0.001, 0.05);
    last = now;

    if (!roaming && now - lastActivity > CFG.idleMs) startRoam(now);

    /* ----- idle drift burst envelope (0 -> 1 -> 0 over driftMs) ----- */
    let driftEnv = 0, driftU = 0;
    if (roaming) {
      if (!drift.active && now >= nextDriftAt) startDrift(now);
      if (drift.active) {
        driftU = (now - drift.start) / CFG.driftMs;
        if (driftU >= 1) { drift.active = false; driftU = 0; }
        else driftEnv = Math.sin(Math.PI * driftU);
      }
    }

    let tX = mouseX, tY = mouseY, follow = CFG.follow;
    if (roaming) {
      stepGhost(dt, now, driftEnv);
      tX = ghost.x; tY = ghost.y; follow = CFG.roamFollow;
    } else if (returning > 0) {
      returning = Math.max(0, returning - (dt * 1000) / CFG.returnMs);
      follow = lerp(CFG.follow, CFG.returnFollow, returning);
    }

    const k = 1 - Math.exp(-follow * dt);
    carX += (tX - carX) * k;
    carY += (tY - carY) * k;
    const vx = (carX - prevX) / dt;
    const vy = (carY - prevY) / dt;
    prevX = carX; prevY = carY;
    speed += (Math.hypot(vx, vy) - speed) * (1 - Math.exp(-dt * 10));
    throttle = clamp(speed / CFG.fullThrottleSpeed, 0, 1);
    if (driftEnv > 0) throttle = Math.max(throttle, 0.55 + 0.45 * driftEnv);   // burst = ~100% throttle at its peak

    if (speed > 25) {
      const target = Math.atan2(vy, vx) + Math.PI / 2;
      let diff = target - angle;
      while (diff < -Math.PI) diff += TAU;
      while (diff > Math.PI) diff -= TAU;
      angle += diff * (1 - Math.exp(-dt * 15));
    }

    /* oversteer: the body swings out sideways relative to the direction of travel, then recovers.
       Smoothed, so cancelling a drift also recovers smoothly. */
    const targetOffset = drift.active
      ? drift.dir * (CFG.driftAngleDeg * Math.PI / 180) * Math.sin(Math.PI * Math.pow(driftU, 0.75))
      : 0;
    driftOffset += (targetOffset - driftOffset) * (1 - Math.exp(-dt * 14));
    const drawAngle = angle + driftOffset;

    const fwdX = Math.sin(drawAngle), fwdY = -Math.cos(drawAngle);
    const rearX = carX - fwdX * CFG.rearOffset;
    const rearY = carY - fwdY * CFG.rearOffset;
    const heavy = driftEnv > 0.05;

    /* rev: scale / forward stretch / shake */
    const sc = 1 + (CFG.maxScale - 1) * throttle;
    const stretch = 1 + CFG.maxStretch * throttle;
    const jx = (Math.random() - 0.5) * 2 * CFG.shakePx * throttle;
    const jy = (Math.random() - 0.5) * 2 * CFG.shakePx * throttle;
    const jr = (Math.random() - 0.5) * 0.04 * throttle;
    car.style.transform = 'translate3d(' + (carX - 20).toFixed(1) + 'px,' + (carY - 40).toFixed(1) + 'px,0)';
    bodyEl.style.transform =
      'translate(' + jx.toFixed(2) + 'px,' + jy.toFixed(2) + 'px) rotate(' + (drawAngle + jr).toFixed(4) + 'rad) ' +
      'scale(' + sc.toFixed(3) + ',' + (sc * stretch).toFixed(3) + ')';

    /* glow: faint at rest, brighter with speed; gentle pulse while roaming; stronger in a burst */
    const glow = clamp(throttle + (roaming ? 0.22 + 0.1 * Math.sin(now / 260) : 0) + driftEnv * 0.3, 0, 1);
    const filter =
      'drop-shadow(0 4px 8px rgba(0,0,0,0.7)) ' +
      'drop-shadow(0 0 ' + (3 + glow * 14).toFixed(1) + 'px rgba(' + glowRGB + ',' + (0.14 + glow * 0.55).toFixed(2) + ')) ' +
      'brightness(' + (1 + throttle * 0.35).toFixed(2) + ')';
    if (filter !== lastFilter) { bodyEl.style.filter = filter; lastFilter = filter; }

    /* tyre trail + smoke (darker, thicker and heavier during a drift) */
    if (speed > 40) {
      const wheelSep = 14;
      const cosA = Math.cos(drawAngle), sinA = Math.sin(drawAngle);
      const rx = carX - fwdX * 25, ry = carY - fwdY * 25;
      const a0 = heavy ? 0.8 : 0.4, sz = heavy ? 3.6 : 2.5;
      skid.push({ x: rx - cosA * wheelSep / 2, y: ry - sinA * wheelSep / 2, a: a0, s: sz });
      skid.push({ x: rx + cosA * wheelSep / 2, y: ry + sinA * wheelSep / 2, a: a0, s: sz });
      if ((speed > 480 || heavy) && Math.random() < (heavy ? 1 : 0.6)) {
        const n = heavy ? 2 : 1;
        for (let i = 0; i < n; i++) {
          smoke.push({
            x: rx + rand(-4, 4), y: ry + rand(-4, 4),
            vx: rand(-0.75, 0.75), vy: rand(-0.75, 0.75),
            r: heavy ? rand(5, 11) : rand(3, 8), a: heavy ? 0.55 : 0.35
          });
        }
      }
    }

    /* sparks (only above the throttle threshold, never when stationary; a drift throws lots) */
    if (throttle > CFG.sparkThreshold) {
      const n = heavy ? 5 : throttle > 0.7 ? 3 : throttle > 0.5 ? 2 : 1;
      for (let i = 0; i < n; i++) {
        if (Math.random() < (heavy ? 0.95 : 0.75)) emitSpark(
          rearX + rand(-7, 7) * Math.cos(drawAngle), rearY + rand(-7, 7) * Math.sin(drawAngle),
          -fwdX * (140 + throttle * 260 + rand(0, 120)) + rand(-90, 90),
          -fwdY * (140 + throttle * 260 + rand(0, 120)) + rand(-90, 90)
        );
      }
    }
    if (roaming && ghost.turn > CFG.roamSparkTurnRate && speed > 120 && Math.random() < 0.5) {
      emitSpark(rearX, rearY, -fwdX * 150 + rand(-70, 70), -fwdY * 150 + rand(-70, 70));
    }

    /* draw */
    ctx.clearRect(0, 0, W, H);

    let w = 0;
    for (let i = 0; i < skid.length; i++) {
      const p = skid[i];
      ctx.fillStyle = 'rgba(' + trailRGB[0] + ',' + trailRGB[1] + ',' + trailRGB[2] + ',' + Math.min(1, p.a).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, TAU); ctx.fill();
      p.a -= dt * 0.3;
      if (p.a > 0) skid[w++] = p;
    }
    skid.length = w;

    w = 0;
    for (let i = 0; i < smoke.length; i++) {
      const sp = smoke[i];
      ctx.fillStyle = 'rgba(' + trailRGB[0] + ',' + trailRGB[1] + ',' + trailRGB[2] + ',' + sp.a.toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.r, 0, TAU); ctx.fill();
      sp.x += sp.vx; sp.y += sp.vy; sp.r += 12 * dt; sp.a -= dt * 0.9;
      if (sp.a > 0) smoke[w++] = sp;
    }
    smoke.length = w;

    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    for (let i = 0; i < sparks.length; i++) {
      const s = sparks[i];
      if (!s.on) continue;
      s.life += dt;
      if (s.life >= s.max) { s.on = false; continue; }
      const f = 1 - s.life / s.max;                        // fades and shrinks
      s.x += s.vx * dt; s.y += s.vy * dt;
      s.vx *= 0.96; s.vy *= 0.96;
      ctx.strokeStyle = 'rgba(255,' + ((120 + s.hot * 114) | 0) + ',0,' + (f * 0.95).toFixed(2) + ')';
      ctx.lineWidth = s.size * f + 0.2;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx * 0.035, s.y - s.vy * 0.035);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
  }
  requestAnimationFrame(frame);
})();


/* ==========================================================================
   F1 BACKGROUND — endless side-view race on a fixed canvas (N cars) + dark-mode
   night lighting (pole glow, crowd light sticks, car lights) + fireworks.
   Click a car that is behind another one to make it overtake; click the
   leader for a victory rev. Light mode = daytime, dark mode = night race.
   Pauses when the tab is hidden. Crowd sound is muted until the user opts in.
   ========================================================================== */
(function () {
  'use strict';

  const CFG = window.PORTFOLIO_CONFIG.f1;
  const FW = CFG.fireworks;
  const canvas = document.getElementById('f1Canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: false });

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TAU = Math.PI * 2;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rand = (a, b) => a + Math.random() * (b - a);
  const randInt = (a, b) => Math.floor(rand(a, b + 1));
  const mod = (v, m) => ((v % m) + m) % m;
  const hash = (i, j) => { const x = Math.sin(i * 127.1 + (j || 0) * 311.7) * 43758.5453; return x - Math.floor(x); };
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  /* PALETTES (night = dark theme, day = light theme; blended by `mix`) */
  const PAL = {
    night: { skyTop: [5, 7, 20], skyBot: [22, 30, 72], skyline: [16, 22, 50], standBack: [20, 26, 56], standFront: [14, 18, 40],
             roof: [10, 12, 28], asphalt: [22, 24, 38], asphaltHi: [36, 40, 62], dash: [150, 160, 200], tower: [30, 36, 70] },
    day:   { skyTop: [96, 152, 224], skyBot: [206, 226, 246], skyline: [138, 154, 186], standBack: [104, 114, 146], standFront: [84, 94, 126],
             roof: [60, 68, 100], asphalt: [72, 76, 92], asphaltHi: [100, 104, 124], dash: [235, 238, 246], tower: [120, 130, 158] }
  };
  const cur = {};
  Object.keys(PAL.night).forEach((k) => { cur[k] = [0, 0, 0]; });
  const rgb = (c, a) => 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + (a === undefined ? 1 : a) + ')';

  const themeTarget = () => (document.documentElement.getAttribute('data-theme') === 'light' ? 1 : 0);
  const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';
  let mix = themeTarget();

  function updatePalette() {
    for (const k in cur) for (let i = 0; i < 3; i++) cur[k][i] = lerp(PAL.night[k][i], PAL.day[k][i], mix);
  }

  const CROWD = [[255, 0, 38], [255, 234, 0], [240, 242, 250], [102, 116, 163], [255, 128, 32], [70, 110, 210]];
  const WALL = [[27, 43, 90], [255, 0, 38], [255, 234, 0], [102, 116, 163], [235, 238, 246]];

  /* STATE */
  let W = 0, H = 0, dpr = 1, small = false;
  let carLen = 200, gapPx = 300, driftAmp = 10;
  let standTop = 0, wallY = 0, wallH = 0, fenceH = 0, trackTop = 0, groundMain = 0, groundNear = 0, dashY = 0;
  let rows = 6, rowH = 20, crowdStep = 9;
  let buckets = [], counts = new Int32Array(CROWD.length);
  let pLimit = 100;

  let t = 0, worldX = 0, worldSpeed = 0;
  let mulSmooth = 1, prevMul = 1, accelS = 0;
  let evtType = 0, evtLeft = 0, evtTimer = rand(3, 6);
  let boostMax = 0, revMax = 0, brake = 0;
  let crowdBoost = 0;                              // extra crowd excitement (fireworks volleys)
  let busy = false;
  let hoverCar = null;

  const cars = CFG.drivers.map((d, i) => ({
    d: d, idx: i, slot: 0, x: 0, laneBlend: 0, wheel: 0, ph: i * 2.3 + 0.7,
    rev: 0, boost: 0, driftMix: 1, ot: null,
    hit: { x: 0, y: 0, w: 0, h: 0 },
    smokeAcc: 0, sparkAcc: 0, tagText: '', tagW: 0
  }));
  let order = cars.slice();                       // order[0] = leader
  let drawn = cars.slice();

  const parts = Array.from({ length: CFG.maxParticles }, () => ({ on: 0, type: 0, x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 1, size: 1 }));
  let partCursor = 0;
  let streaks = [];
  let boostStreaks = [];

  /* FIREWORKS STATE (dark mode only; drawn on #fireworksCanvas) */
  const fwCanvas = document.getElementById('fireworksCanvas');
  const fctx = fwCanvas ? fwCanvas.getContext('2d') : null;
  const fwEnabled = !!fctx && !reduce;
  const fwPool = fwEnabled
    ? Array.from({ length: FW.maxParticles }, () => ({ on: 0, x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 1, size: 1, r: 255, g: 255, b: 255, tw: 0, drag: 1.5 }))
    : [];
  let fwLimit = 0, fwCursor = 0, fdpr = 1;
  let rockets = [], flashes = [], pendingLaunches = [];
  let fwCountdown = FW.firstDelayMs / 1000;
  let fwWasDark = false, fwHadContent = false, fwLive = 0;
  let fwPalette = [[255, 0, 38], [255, 117, 19], [255, 234, 0]];

  /* NIGHT LIGHTING QUEUE (dark mode).
     Glows and light cones are queued while the scene is drawn, then painted on the overlay canvas
     (above the dark scrim) with additive blending. In light mode the overlay is hidden, so
     everything turns off on its own. */
  const STICK_SHARE = 0.32;                         // share of arm-wavers who hold a light stick
  const STICKS = [[255, 90, 170], [70, 225, 255], [255, 236, 90], [255, 255, 255], [120, 255, 160]];
  const lq = [];                                    // flat: x, y, radius, R, G, B, alpha
  const cones = [];                                 // flat: ax, ay, bx, by, cx, cy, R, G, B, alpha
  const sprites = {};
  function glow(x, y, r, c, a) { lq.push(x, y, r, c[0], c[1], c[2], a); }
  function cone(ax, ay, bx, by, cx, cy, c, a) { cones.push(ax, ay, bx, by, cx, cy, c[0], c[1], c[2], a); }
  function getSprite(r, g, b) {
    const key = (r | 0) + ',' + (g | 0) + ',' + (b | 0);
    let s = sprites[key];
    if (!s) {
      s = document.createElement('canvas'); s.width = s.height = 64;
      const g2 = s.getContext('2d');
      const gr = g2.createRadialGradient(32, 32, 0, 32, 32, 32);
      gr.addColorStop(0, 'rgba(' + key + ',1)');
      gr.addColorStop(0.25, 'rgba(' + key + ',0.55)');
      gr.addColorStop(1, 'rgba(' + key + ',0)');
      g2.fillStyle = gr; g2.fillRect(0, 0, 64, 64);
      sprites[key] = s;
    }
    return s;
  }
  function renderLights() {
    for (let i = 0; i < cones.length; i += 10) {
      const col = cones[i + 6] + ',' + cones[i + 7] + ',' + cones[i + 8];
      const g = fctx.createLinearGradient(cones[i], cones[i + 1], (cones[i + 2] + cones[i + 4]) / 2, (cones[i + 3] + cones[i + 5]) / 2);
      g.addColorStop(0, 'rgba(' + col + ',' + cones[i + 9].toFixed(3) + ')');
      g.addColorStop(1, 'rgba(' + col + ',0)');
      fctx.fillStyle = g;
      fctx.beginPath();
      fctx.moveTo(cones[i], cones[i + 1]); fctx.lineTo(cones[i + 2], cones[i + 3]); fctx.lineTo(cones[i + 4], cones[i + 5]);
      fctx.closePath(); fctx.fill();
    }
    for (let i = 0; i < lq.length; i += 7) {
      const r = lq[i + 2];
      fctx.globalAlpha = Math.min(1, lq[i + 6]);
      fctx.drawImage(getSprite(lq[i + 3], lq[i + 4], lq[i + 5]), lq[i] - r, lq[i + 1] - r, r * 2, r * 2);
    }
    fctx.globalAlpha = 1;
  }

  /* LAYOUT */
  const slotX = (rank) => (W - carLen * 0.62) - rank * gapPx;

  function newStreak(init) {
    return {
      x: init ? rand(0, W) : W + rand(0, 240),
      y: H * (0.3 + Math.pow(Math.random(), 0.7) * 0.68),
      len: rand(60, 260), sp: rand(1.4, 3.0), a: rand(0.06, 0.22), w: rand(0.8, 1.8)
    };
  }

  function resize() {
    small = window.innerWidth < 992 || window.matchMedia('(pointer: coarse)').matches;
    dpr = Math.min(window.devicePixelRatio || 1, small ? 1 : CFG.maxDpr);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (fctx) {                                     // overlay canvas also carries the night lighting, so it exists even with reduced motion
      fdpr = Math.min(window.devicePixelRatio || 1, small ? 1 : CFG.maxDpr);
      fwCanvas.width = Math.round(W * fdpr);
      fwCanvas.height = Math.round(H * fdpr);
      fctx.setTransform(fdpr, 0, 0, fdpr, 0, 0);
      fwLimit = Math.min(fwPool.length, small ? FW.maxParticlesSmall : FW.maxParticles);
    }

    /* N cars: spread the grid across the screen. Never closer than 1.15 car lengths;
       on narrow screens the last car(s) may sit partly off-screen. */
    carLen = clamp(W * CFG.carLenFactor, 120, 250);
    const n = cars.length;
    gapPx = n > 1 ? Math.max((W - carLen * 1.2) / (n - 1), carLen * 1.15) : carLen * 1.2;
    // drift amplitude is capped so two neighbours drifting towards each other still keep >= 1.08 car lengths apart
    driftAmp = Math.max(0, Math.min(W * CFG.driftFactor, (gapPx - carLen * 1.08) * 0.45));

    standTop = H * 0.5;
    wallY = H * 0.69;
    wallH = Math.max(14, H * 0.05);
    fenceH = H * 0.045;
    trackTop = wallY + wallH;
    groundMain = H * 0.865;
    groundNear = H * 0.955;
    dashY = (groundMain + groundNear) / 2 + 2;

    rows = small ? 4 : 6;
    rowH = (wallY - standTop - 4) / rows;
    crowdStep = small ? 13 : CFG.crowdStep;
    const maxPeople = (Math.ceil(W / crowdStep) + 8) * rows;
    buckets = CROWD.map(() => new Float32Array(maxPeople * 3));

    pLimit = Math.min(parts.length, small ? CFG.maxParticlesSmall : CFG.maxParticles);
    streaks = Array.from({ length: small ? 18 : 40 }, () => newStreak(true));
    boostStreaks = Array.from({ length: small ? 10 : 24 }, () => newStreak(true));

    cars.forEach((c) => {
      c.slot = slotX(order.indexOf(c));
      if (!c.ot) c.x = c.slot;
      c.tagText = '';
    });
  }

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => cars.forEach((c) => { c.tagText = ''; }));

  /* PARTICLES (tyre smoke = 0, sparks = 1) */
  function spawn(type, x, y, vx, vy, max, size) {
    for (let n = 0; n < pLimit; n++) {
      const p = parts[(partCursor + n) % pLimit];
      if (!p.on) {
        partCursor = (partCursor + n + 1) % pLimit;
        p.on = 1; p.type = type; p.x = x; p.y = y; p.vx = vx; p.vy = vy; p.life = 0; p.max = max; p.size = size;
        return;
      }
    }
  }

  /* Car sparks: thrown from the exhaust or a rear wheel while throttling, hovered, or clicked */
  function carSpark(car, power) {
    const L = carLen * lerp(1, CFG.nearScale, car.laneBlend);
    const gy = lerp(groundMain, groundNear, car.laneBlend);
    const pipe = Math.random() < 0.6;                                // exhaust or rear wheel
    spawn(1, car.x - L * (pipe ? 0.41 : 0.30) + rand(-3, 3), gy - (pipe ? L * 0.12 : 2),
          -rand(140, 420) * (0.5 + power), -rand(30, 260) * (0.5 + power * 0.7),
          rand(0.3, 0.65), rand(1.6, 3.2));
  }

  /* CAR SHAPES (unit space: x 0..100 rear->front, y 0 = ground, up = negative) */
  const SH = {
    body: new Path2D('M12 -9 L13.5 -17 L24 -21 L35 -26 L42 -26 L47 -21.5 L53 -18.6 L62 -17.6 L71 -14 L85 -11 L98 -8.2 L99.5 -6.4 L86 -5.2 L62 -4.6 L14 -4.6 Z'),
    sidepod: new Path2D('M38 -18 L61 -15.6 L63 -8.5 L60 -5.6 L36 -5.6 Z'),
    engineStripe: new Path2D('M13.6 -16.2 L24 -20.2 L35 -25 L35.8 -23.2 L25 -18.4 L14.2 -14.4 Z'),
    noseStripe: new Path2D('M72 -13.2 L85 -10.2 L98 -7.7 L98.8 -6.7 L85 -9 L72 -11.6 Z'),
    airbox: new Path2D('M36 -25 L41.5 -25 L42.5 -21.8 L34.6 -22 Z'),
    rearPlane: new Path2D('M0.5 -28 L13 -28 L13 -25.4 L0.5 -25.4 Z'),
    rearEndplate: new Path2D('M1.2 -30 L11.5 -30 L13 -19 L6.5 -12.5 L1.2 -12.5 Z'),
    frontPlane: new Path2D('M90 -4.6 L103 -4 L103 -2.6 L90 -3 Z'),
    frontEndplate: new Path2D('M101 -8.6 L103.4 -8.6 L103.4 -2.4 L101 -2.4 Z'),
    floor: new Path2D('M10 -3.6 L93 -2.8 L93 -1.2 L10 -1.6 Z'),
    halo: new Path2D('M62 -17.7 L60.8 -23.6 Q53 -28.6 47.6 -19.4')
  };

  function drawWheel(cx, cy, r, ang, car) {
    ctx.fillStyle = '#0b0d1c';
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.fill();
    ctx.strokeStyle = car.d.trim; ctx.lineWidth = 1.1;
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.86, 0, TAU); ctx.stroke();
    ctx.fillStyle = '#8a93b5';
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.56, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#12142D'; ctx.lineWidth = 1.1;
    ctx.beginPath();
    for (let k = 0; k < 5; k++) {
      const a = ang + (k * TAU) / 5;
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * r * 0.55, cy + Math.sin(a) * r * 0.55);
    }
    ctx.stroke();
    ctx.fillStyle = 'rgba(18,20,45,0.38)';
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.56, 0, TAU); ctx.fill();
    ctx.fillStyle = car.d.accent;
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.12, 0, TAU); ctx.fill();
  }

  function flameShape(len, color, w, jit) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(9, -12 - w);
    ctx.quadraticCurveTo(9 - len * 0.55, -12 - w * 0.6 + jit, 9 - len, -12 + jit);
    ctx.quadraticCurveTo(9 - len * 0.55, -12 + w * 0.6 + jit, 9, -12 + w);
    ctx.closePath();
    ctx.fill();
  }

  function drawExhaust(car) {
    ctx.fillStyle = 'rgba(255,' + (200 + 40 * mix | 0) + ',140,' + (0.05 + 0.03 * (1 - mix)).toFixed(3) + ')';
    for (let k = 0; k < 4; k++) {                                   // heat shimmer
      ctx.beginPath();
      ctx.ellipse(6 - k * 9, -14 + Math.sin(t * 16 + k * 1.6 + car.ph) * 1.8 - k * 1.4, 6 + k * 2.6, 2 + k * 0.8, 0, 0, TAU);
      ctx.fill();
    }
    const fl = Math.max(car.boost, car.rev * 0.8, Math.max(0, accelS - 0.5) * 0.6);
    if (fl > 0.05) {                                                // nitro flame / afterfire
      const jit = (Math.random() - 0.5) * 1.6;
      const len = (8 + Math.random() * 6 + fl * 24) * Math.min(1, fl + 0.25);
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const gl = ctx.createRadialGradient(8, -12, 0, 8, -12, 16 * fl + 6);
      gl.addColorStop(0, 'rgba(255,170,40,0.55)');
      gl.addColorStop(1, 'rgba(255,170,40,0)');
      ctx.fillStyle = gl;
      ctx.fillRect(-24, -40, 48, 56);
      flameShape(len, 'rgba(255,110,20,0.85)', 3.2, jit);
      flameShape(len * 0.72, 'rgba(255,224,60,0.9)', 2.2, jit);
      flameShape(len * 0.4, 'rgba(200,230,255,0.95)', 1.2, jit);
      ctx.restore();
    }
  }

  function pill(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawCar(car, rank) {
    const lb = car.laneBlend;
    const sc = lerp(1, CFG.nearScale, lb);
    const gy = lerp(groundMain, groundNear, lb);
    const L = carLen * sc;
    const u = L / 100;
    const bounce = Math.sin(t * (15 + car.idx * 1.7) + car.ph) * (0.35 + 0.25 * Math.min(1, worldSpeed / (W * 0.9))) +
                   car.rev * Math.sin(t * 40) * 0.5;
    const pitch = clamp(-accelS * 0.012, -0.035, 0.035) - car.boost * 0.035;
    const lit = 1 - mix;                                              // 1 at night, 0 by day
    const brk = Math.max(brake, clamp(-accelS * 0.9, 0, 1));          // braking zone or hard lift

    car.hit.x = car.x - L * 0.5; car.hit.y = gy - L * 0.32; car.hit.w = L; car.hit.h = L * 0.36;

    ctx.fillStyle = 'rgba(0,0,0,0.34)';
    ctx.beginPath(); ctx.ellipse(car.x, gy + 1.5 * sc, L * 0.52, L * 0.032, 0, 0, TAU); ctx.fill();

    if (hoverCar === car && !busy) {                                // "click me" glow
      const hg = ctx.createRadialGradient(car.x, gy, 0, car.x, gy, L * 0.7);
      hg.addColorStop(0, 'rgba(255,234,0,0.30)');
      hg.addColorStop(1, 'rgba(255,234,0,0)');
      ctx.fillStyle = hg;
      ctx.fillRect(car.x - L * 0.75, gy - L * 0.5, L * 1.5, L * 0.7);
    }

    ctx.save();
    ctx.translate(car.x - 50 * u, gy - bounce * u);
    ctx.scale(u, u);
    ctx.translate(20, 0); ctx.rotate(pitch); ctx.translate(-20, 0);

    drawExhaust(car);

    ctx.strokeStyle = '#12142D'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(8, -25); ctx.lineTo(13.5, -12); ctx.stroke();
    ctx.fillStyle = car.d.body; ctx.fill(SH.rearEndplate);
    ctx.strokeStyle = '#12142D'; ctx.lineWidth = 0.6; ctx.stroke(SH.rearEndplate);
    ctx.fillStyle = car.d.accent; ctx.fill(SH.rearPlane);

    ctx.fillStyle = '#0b0d1c'; ctx.fill(SH.floor);
    ctx.strokeStyle = '#12142D'; ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.moveTo(26, -9); ctx.lineTo(20, -11.5);
    ctx.moveTo(70, -9.5); ctx.lineTo(79, -10);
    ctx.stroke();

    ctx.fillStyle = car.d.body; ctx.fill(SH.body);
    const shade = ctx.createLinearGradient(0, -27, 0, -4);
    shade.addColorStop(0, 'rgba(255,255,255,0.24)');
    shade.addColorStop(1, 'rgba(0,0,0,0.30)');
    ctx.fillStyle = shade; ctx.fill(SH.body);
    ctx.fillStyle = 'rgba(0,0,0,0.20)'; ctx.fill(SH.sidepod);
    ctx.fillStyle = car.d.accent; ctx.fill(SH.engineStripe);
    ctx.fillStyle = car.d.trim; ctx.fill(SH.noseStripe);
    ctx.fillStyle = 'rgba(11,13,28,0.85)'; ctx.fill(SH.airbox);
    ctx.beginPath(); ctx.ellipse(60.5, -11, 2.2, 3.2, 0, 0, TAU); ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 6.5px Orbitron, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(String(car.d.number), 49, -9.4);

    ctx.fillStyle = car.d.helmet;
    ctx.beginPath(); ctx.arc(54, -20.8, 3.1, 0, TAU); ctx.fill();
    ctx.fillStyle = '#12142D'; ctx.fillRect(55.4, -22.6, 2.5, 1.9);
    ctx.strokeStyle = '#12142D'; ctx.lineWidth = 1.3; ctx.stroke(SH.halo);

    /* tail light: dim red at night, bright stop light when braking */
    const tail = Math.max(brk > 0.15 ? brk : 0, 0.55 * lit);
    if (tail > 0.05) {
      ctx.fillStyle = 'rgba(255,30,30,' + Math.min(1, tail + 0.15).toFixed(2) + ')';
      ctx.fillRect(12.4, -20, 2.2, 3.4);
    }
    /* indicators blink while overtaking */
    if (car.ot && Math.sin(t * 16) > 0) {
      ctx.fillStyle = '#FFB000';
      ctx.fillRect(13.2, -12.6, 1.8, 2);
      ctx.fillRect(96.5, -6.6, 2.2, 1.4);
    }
    /* headlight lens: glows at night, plain by day */
    ctx.fillStyle = lit > 0.02 ? 'rgba(255,248,222,' + (0.4 + 0.6 * lit).toFixed(2) + ')' : 'rgba(210,218,240,0.55)';
    ctx.beginPath(); ctx.ellipse(98.2, -8, 2.4, 1.1, -0.1, 0, TAU); ctx.fill();

    ctx.fillStyle = '#0b0d1c'; ctx.fill(SH.frontPlane);
    ctx.fillStyle = car.d.accent; ctx.fill(SH.frontEndplate);

    drawWheel(20, -11.5, 11.5, car.wheel, car);
    drawWheel(79, -10, 10, car.wheel * 1.12, car);
    ctx.restore();

    /* night lights: cones and glows are queued and painted on the overlay canvas (above the scrim) */
    if (lit > 0.02) {
      const oy = gy - bounce * u;
      const nx = car.x + 49 * u, ny = oy - 8 * u;                     // nose
      const rx = car.x - 37.6 * u, ry = oy - 18 * u;                  // tail light
      const fl = 0.96 + 0.04 * Math.sin(t * 30 + car.ph);
      cone(nx, ny, nx + L, ny - 0.12 * L, nx + L, oy + 0.03 * L, [255, 246, 214], 0.34 * lit * fl);
      glow(nx, ny, 0.22 * L, [255, 248, 220], 0.8 * lit);
      glow(nx + 0.55 * L, oy - 0.01 * L, 0.35 * L, [255, 240, 200], 0.16 * lit);
      glow(rx, ry, (0.07 + 0.18 * brk) * L, [255, 30, 30], Math.min(1, (0.45 + 0.55 * brk) * lit));
      glow(rx - 0.15 * L, oy, 0.2 * L, [255, 20, 20], 0.2 * brk * lit);
      if (car.ot && Math.sin(t * 16) > 0) {
        glow(rx, oy - 0.11 * L, 0.06 * L, [255, 176, 0], 0.9 * lit);
        glow(nx - 0.02 * L, oy - 0.06 * L, 0.06 * L, [255, 176, 0], 0.9 * lit);
      }
    }

    /* name tag (screen space) */
    const label = 'P' + (rank + 1) + '  ' + car.d.code + '  #' + car.d.number;
    ctx.font = '700 11px Orbitron, Arial, sans-serif';
    ctx.textAlign = 'left';
    if (label !== car.tagText) { car.tagW = ctx.measureText(label).width; car.tagText = label; }
    const pw = car.tagW + 26, ph = 20;
    const px = car.x - pw / 2, py = gy - L * 0.31 - 28;
    const hot = hoverCar === car && !busy;
    pill(px, py, pw, ph, 10);
    ctx.fillStyle = 'rgba(18,20,45,0.86)'; ctx.fill();
    ctx.lineWidth = 1.5; ctx.strokeStyle = hot ? '#FFEA00' : car.d.accent; ctx.stroke();
    ctx.fillStyle = car.d.body; ctx.fillRect(px + 8, py + 4, 4, ph - 8);
    ctx.fillStyle = '#ffffff'; ctx.fillText(label, px + 17, py + 14);
    if (hot) {
      ctx.font = '800 9px Orbitron, Arial, sans-serif';
      ctx.fillStyle = '#FFEA00'; ctx.textAlign = 'center';
      ctx.fillText(rank === 0 ? 'CLICK TO REV' : 'CLICK TO OVERTAKE', car.x, py - 6);
    }
    ctx.textAlign = 'left';
  }

  /* SCENE LAYERS */
  function drawSky() {
    const g = ctx.createLinearGradient(0, 0, 0, standTop + 30);
    g.addColorStop(0, rgb(cur.skyTop));
    g.addColorStop(1, rgb(cur.skyBot));
    ctx.fillStyle = g;
    ctx.fillRect(-24, -24, W + 48, H + 48);

    if (mix > 0.02) {                                               // sun + clouds
      const sg = ctx.createRadialGradient(W * 0.8, H * 0.13, 0, W * 0.8, H * 0.13, H * 0.35);
      sg.addColorStop(0, 'rgba(255,248,214,' + (0.85 * mix).toFixed(3) + ')');
      sg.addColorStop(1, 'rgba(255,248,214,0)');
      ctx.fillStyle = sg;
      ctx.fillRect(0, 0, W, standTop + 30);
      ctx.fillStyle = 'rgba(255,255,255,' + (0.55 * mix).toFixed(3) + ')';
      const span = W * 1.5;
      for (let k = 0; k < 6; k++) {
        const x = mod(hash(k, 3) * span - t * (5 + hash(k, 4) * 6) - worldX * 0.015, span) - span * 0.25;
        const y = H * (0.06 + hash(k, 5) * 0.24);
        const s = 26 + hash(k, 6) * 34;
        ctx.beginPath();
        ctx.arc(x, y, s, 0, TAU);
        ctx.arc(x + s * 0.9, y + s * 0.15, s * 0.75, 0, TAU);
        ctx.arc(x - s * 0.9, y + s * 0.2, s * 0.65, 0, TAU);
        ctx.fill();
      }
    }
    if (mix < 0.98) {                                               // stars
      const n = small ? 40 : 80;
      for (let k = 0; k < n; k++) {
        const tw = 0.5 + 0.5 * Math.sin(t * (1 + hash(k, 9) * 2) + k);
        ctx.fillStyle = 'rgba(255,255,255,' + ((1 - mix) * (0.25 + 0.6 * tw)).toFixed(3) + ')';
        ctx.fillRect(hash(k, 7) * W, hash(k, 8) * standTop * 0.8, 1.6, 1.6);
      }
    }
  }

  function drawSkyline() {
    const colW = 34, off = worldX * 0.05;
    const first = Math.floor(off / colW) - 1;
    const cols = Math.ceil(W / colW) + 3;
    ctx.fillStyle = rgb(cur.skyline);
    ctx.beginPath();
    for (let i = 0; i < cols; i++) {
      const idx = first + i;
      const h = H * (0.04 + hash(idx, 1) * 0.12) * (hash(idx, 5) > 0.8 ? 1.6 : 1);
      ctx.rect(idx * colW - off, standTop - h + 10, colW + 1, h + 10);
    }
    ctx.fill();
    if (mix < 0.95) {                                               // lit windows at night
      ctx.fillStyle = 'rgba(255,220,130,' + (0.5 * (1 - mix)).toFixed(3) + ')';
      ctx.beginPath();
      for (let i = 0; i < cols; i++) {
        const idx = first + i;
        if (hash(idx, 9) < 0.5) continue;
        const h = H * (0.04 + hash(idx, 1) * 0.12) * (hash(idx, 5) > 0.8 ? 1.6 : 1);
        const x = idx * colW - off;
        for (let w = 0; w < 3; w++) ctx.rect(x + 6 + w * 9, standTop - h + 18 + hash(idx, 20 + w) * h * 0.5, 3, 4);
      }
      ctx.fill();
    }
  }

  /* LIGHT POLES (floodlight towers): lamps are OFF by day and switch ON with dark mode */
  function drawTowers() {
    const sp = 620, off = worldX * 0.14;
    const first = Math.floor(off / sp) - 1;
    const top = H * 0.1, base = standTop + 14;
    const lit = Math.pow(1 - mix, 1.4);                 // 0 in light mode, fades in with the theme switch
    for (let i = 0; i < Math.ceil(W / sp) + 3; i++) {
      const idx = first + i;
      const x = idx * sp - off + hash(idx, 2) * 140;
      if (x < -H * 0.35 || x > W + H * 0.35) continue;

      ctx.fillStyle = rgb(cur.tower);
      ctx.fillRect(x - 2.5, top, 5, base - top);
      ctx.fillRect(x - 22, top - 6, 44, 12);
      ctx.fillStyle = 'rgba(150,158,182,0.55)';          // lamps OFF
      for (let k = 0; k < 4; k++) ctx.fillRect(x - 19 + k * 10, top - 4, 7, 8);

      if (lit > 0.02) {                                  // lamps ON
        const flick = 1 - 0.06 * Math.sin(t * 9 + idx * 1.7) - (hash(Math.floor(t * 3) + idx, idx) > 0.97 ? 0.15 : 0);
        const I = lit * flick;
        ctx.fillStyle = 'rgba(255,244,210,' + Math.min(1, 0.3 + 0.7 * I).toFixed(2) + ')';
        for (let k = 0; k < 4; k++) ctx.fillRect(x - 19 + k * 10, top - 4, 7, 8);
        glow(x, top, H * 0.17, [255, 222, 150], 0.7 * I);             // bloom
        glow(x, top, H * 0.05, [255, 248, 225], 0.9 * I);             // hot core
        cone(x, top + 2, x - H * 0.3, trackTop + H * 0.05, x + H * 0.3, trackTop + H * 0.05, [255, 226, 160], 0.16 * I);
        glow(x, groundMain, H * 0.25, [255, 214, 140], 0.12 * I);     // pool of light on the road
      }
    }
  }

  function drawStands() {
    for (let r = 0; r < rows; r++) {
      ctx.fillStyle = rgb((r & 1) ? cur.standFront : cur.standBack);
      ctx.fillRect(-10, standTop + r * rowH, W + 20, rowH + 1);
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(-10, standTop + r * rowH, W + 20, 1);
    }
  }

  function drawCrowd() {
    const step = crowdStep, off = worldX * 0.35;
    const first = Math.floor(off / step) - 2;
    const cols = Math.ceil(W / step) + 5;
    const cheer = reduce ? 0 : 0.55 + 0.45 * Math.min(1, boostMax * 1.2 + revMax + crowdBoost);
    const light = 0.5 + 0.5 * mix;
    const hw = rowH * 0.17, bodyH = rowH * 0.36, headR = rowH * 0.15;

    counts.fill(0);
    for (let r = 0; r < rows; r++) {
      const baseY = standTop + (r + 1) * rowH - 2;
      for (let i = 0; i < cols; i++) {
        const idx = first + i;
        const h = hash(idx, r + 1);
        const x = idx * step - off + (r & 1) * step * 0.5;
        if (x < -12 || x > W + 12) continue;
        const ci = (h * CROWD.length) | 0;
        const bob = Math.abs(Math.sin(t * (4 + h * 4) + h * 60)) * rowH * 0.1 * cheer;
        const arr = buckets[ci];
        const n = counts[ci]++;
        arr[n * 3] = x;
        arr[n * 3 + 1] = baseY - bob;
        arr[n * 3 + 2] = hash(idx, r + 50);
      }
    }

    for (let c = 0; c < CROWD.length; c++) {                        // bodies + heads
      const col = CROWD[c], arr = buckets[c], n = counts[c];
      ctx.fillStyle = 'rgb(' + (col[0] * light | 0) + ',' + (col[1] * light | 0) + ',' + (col[2] * light | 0) + ')';
      ctx.beginPath();
      for (let k = 0; k < n; k++) {
        const x = arr[k * 3], y = arr[k * 3 + 1];
        ctx.rect(x - hw, y - bodyH, hw * 2, bodyH);
        ctx.moveTo(x + headR, y - bodyH - headR);
        ctx.arc(x, y - bodyH - headR, headR, 0, TAU);
      }
      ctx.fill();
    }

    ctx.strokeStyle = 'rgba(' + (230 * light | 0) + ',' + (190 * light | 0) + ',' + (160 * light | 0) + ',0.9)';
    ctx.lineWidth = Math.max(1, rowH * 0.07);
    ctx.lineCap = 'round';
    ctx.beginPath();                                                // waving arms
    for (let c = 0; c < CROWD.length; c++) {
      const arr = buckets[c], n = counts[c];
      for (let k = 0; k < n; k++) {
        const h2 = arr[k * 3 + 2];
        if (h2 < 0.5) continue;
        const x = arr[k * 3], y = arr[k * 3 + 1];
        const wave = Math.sin(t * (7 + h2 * 5) + h2 * 30) * rowH * 0.18 * cheer;
        const sy = y - bodyH + rowH * 0.04, ty = y - bodyH - headR * 2.4;
        ctx.moveTo(x - hw, sy); ctx.lineTo(x - hw - rowH * 0.1 + wave, ty);
        ctx.moveTo(x + hw, sy); ctx.lineTo(x + hw + rowH * 0.1 - wave, ty);
      }
    }
    ctx.stroke();

    /* LIGHT STICKS (dark mode): some of the arm-wavers hold a glowing stick that follows their hand.
       Which people hold one is decided by their stable per-person hash, so it never flickers. */
    const glowK = 1 - mix;
    if (glowK > 0.03) {
      ctx.lineCap = 'round';
      for (let c = 0; c < CROWD.length; c++) {
        const arr = buckets[c], n = counts[c];
        for (let k = 0; k < n; k++) {
          const h2 = arr[k * 3 + 2];
          if (h2 < 0.5 || h2 >= 0.94 || (h2 * 997) % 1 > STICK_SHARE) continue;
          const x = arr[k * 3], y = arr[k * 3 + 1];
          const side = ((h2 * 53) % 1) < 0.5 ? -1 : 1;
          const wave = Math.sin(t * (7 + h2 * 5) + h2 * 30) * rowH * 0.18 * cheer;   // same wave as the arm
          const sy = y - bodyH + rowH * 0.04;
          const ty = y - bodyH - headR * 2.4;
          const tx = x + side * (hw + rowH * 0.1) - side * wave;                      // hand position
          let dx = tx - (x + side * hw), dy = ty - sy;
          const dl = Math.hypot(dx, dy) || 1; dx /= dl; dy /= dl;
          const ex = tx + dx * rowH * 0.55, ey = ty + dy * rowH * 0.55;               // stick tip
          const col = STICKS[(((h2 * 131) % 1) * STICKS.length) | 0];
          const pulse = 0.75 + 0.25 * Math.sin(t * 5 + h2 * 40);

          ctx.strokeStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + (0.85 * glowK * pulse).toFixed(2) + ')';
          ctx.lineWidth = Math.max(1.4, rowH * 0.09);
          ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(ex, ey); ctx.stroke();
          glow(ex, ey, rowH * 1.1, col, 0.38 * glowK * pulse);                        // faint glow
          glow((tx + ex) / 2, (ty + ey) / 2, rowH * 0.55, col, 0.2 * glowK * pulse);
          if (!small) {
            for (let j = 0; j < 2; j++) {                                             // sparkles
              const tw = Math.sin(t * (6 + j * 3) + h2 * 90 + j * 2);
              if (tw > 0.35) {
                const a = t * 1.8 + h2 * 50 + j * 3.1;
                glow(ex + Math.cos(a) * rowH * 0.5, ey + Math.sin(a) * rowH * 0.5, 3.2, [255, 255, 255], 0.55 * ((tw - 0.35) / 0.65) * glowK);
              }
            }
          }
        }
      }
    }

    for (let c = 0; c < CROWD.length; c++) {                        // waving flags
      const col = CROWD[c], arr = buckets[c], n = counts[c];
      ctx.fillStyle = 'rgb(' + (col[0] * light | 0) + ',' + (col[1] * light | 0) + ',' + (col[2] * light | 0) + ')';
      ctx.beginPath();
      for (let k = 0; k < n; k++) {
        if (arr[k * 3 + 2] < 0.94) continue;
        const x = arr[k * 3], y = arr[k * 3 + 1] - bodyH - headR * 2.4;
        const wave = Math.sin(t * 9 + x * 0.1) * rowH * 0.12 * cheer;
        ctx.moveTo(x, y);
        ctx.lineTo(x + rowH * 0.55 + wave, y - rowH * 0.1);
        ctx.lineTo(x, y - rowH * 0.34);
      }
      ctx.fill();
    }

    ctx.fillStyle = rgb(cur.roof);                                  // canopy + posts
    ctx.fillRect(-10, standTop - 10, W + 20, 10);
    const pSp = 280, pOff = worldX * 0.35;
    const pFirst = Math.floor(pOff / pSp) - 1;
    for (let i = 0; i < Math.ceil(W / pSp) + 3; i++) {
      ctx.fillRect((pFirst + i) * pSp - pOff, standTop - 10, 6, wallY - standTop + 10);
    }

    if (mix < 0.9) {                                                // camera flashes at night
      for (let k = 0; k < 14; k++) {
        const slice = Math.floor(t * 6 + k * 3);
        if (hash(slice, k) < 0.55) continue;
        ctx.fillStyle = 'rgba(255,255,255,' + (0.8 * (1 - mix)).toFixed(2) + ')';
        ctx.fillRect(hash(slice, k + 20) * W, standTop + hash(slice, k + 40) * (wallY - standTop - 10), 2.2, 2.2);
      }
    }
  }

  function drawWall() {
    const pw = 130, off = worldX * 0.85;
    const first = Math.floor(off / pw) - 1;
    const dim = 0.62 + 0.38 * mix;
    for (let i = 0; i < Math.ceil(W / pw) + 3; i++) {
      const idx = first + i;
      const x = idx * pw - off;
      const col = WALL[(hash(idx, 11) * WALL.length) | 0];
      ctx.fillStyle = 'rgb(' + (col[0] * dim | 0) + ',' + (col[1] * dim | 0) + ',' + (col[2] * dim | 0) + ')';
      ctx.fillRect(x, wallY, pw + 1, wallH);
      ctx.fillStyle = 'rgba(255,255,255,0.16)';
      ctx.fillRect(x + 8, wallY + wallH * 0.36, pw - 16, wallH * 0.22);
    }
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillRect(-10, wallY, W + 20, 2);

    ctx.strokeStyle = 'rgba(255,255,255,' + (0.10 + 0.05 * mix).toFixed(3) + ')';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const fs = 14;
    for (let x = -mod(off, fs); x < W + fs; x += fs) { ctx.moveTo(x, wallY - fenceH); ctx.lineTo(x, wallY); }
    ctx.moveTo(0, wallY - fenceH); ctx.lineTo(W, wallY - fenceH);
    ctx.stroke();
  }

  function drawTrack() {
    const g = ctx.createLinearGradient(0, trackTop, 0, H);
    g.addColorStop(0, rgb(cur.asphaltHi));
    g.addColorStop(0.35, rgb(cur.asphalt));
    g.addColorStop(1, rgb(cur.asphalt));
    ctx.fillStyle = g;
    ctx.fillRect(-24, trackTop, W + 48, H - trackTop + 24);

    const kw = 52, kh = Math.max(7, H * 0.014);
    const kFirst = Math.floor(worldX / kw) - 1;
    ctx.globalAlpha = 0.75 + 0.25 * mix;
    for (let i = 0; i < Math.ceil(W / kw) + 3; i++) {
      const idx = kFirst + i;
      ctx.fillStyle = (idx & 1) ? '#FF0026' : '#f2f4fa';
      ctx.fillRect(idx * kw - worldX, trackTop, kw + 1, kh);
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = 'rgba(0,0,0,0.16)';
    ctx.fillRect(0, groundMain - 5, W, 12);
    ctx.fillRect(0, groundNear - 5, W, 14);
    const dl = 70, per = 132;
    ctx.fillStyle = rgb(cur.dash, 0.5);
    for (let x = -mod(worldX, per); x < W; x += per) ctx.fillRect(x, dashY, dl, 3);

    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    const n = small ? 6 : 12;
    for (let k = 0; k < n; k++) {
      const len = 120 + hash(k, 21) * 260;
      const span = W + len;
      const x = mod(hash(k, 22) * span - worldX * (1.2 + hash(k, 23) * 0.8), span) - len;
      ctx.fillRect(x, trackTop + 8 + hash(k, 20) * (H - trackTop - 8), len, 1);
    }
  }

  function drawHaze() {
    ctx.fillStyle = 'rgba(255,255,255,' + (0.03 + 0.03 * mix).toFixed(3) + ')';
    ctx.beginPath();
    ctx.moveTo(-10, trackTop + 14);
    for (let x = -10; x <= W + 24; x += 24) ctx.lineTo(x, trackTop - 8 + Math.sin(x * 0.03 + t * 2.5) * 3);
    ctx.lineTo(W + 24, trackTop + 14);
    ctx.closePath();
    ctx.fill();
    const g = ctx.createLinearGradient(0, H * 0.93, 0, H);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(0,0,0,0.28)');
    ctx.fillStyle = g;
    ctx.fillRect(-10, H * 0.93, W + 20, H * 0.07 + 10);
  }

  function drawParticles(type) {
    const smokeA = [lerp(150, 210, mix), lerp(160, 214, mix), lerp(190, 226, mix)];
    if (type === 1) { ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round'; }
    for (let i = 0; i < pLimit; i++) {
      const p = parts[i];
      if (!p.on || p.type !== type) continue;
      const f = 1 - p.life / p.max;
      if (type === 0) {
        ctx.fillStyle = 'rgba(' + (smokeA[0] | 0) + ',' + (smokeA[1] | 0) + ',' + (smokeA[2] | 0) + ',' + (f * 0.3).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, TAU); ctx.fill();
      } else {
        /* sparks: orange halo + hot yellow-white core, clearly visible in both themes */
        const tx = p.x - p.vx * 0.045, ty = p.y - p.vy * 0.045;
        ctx.strokeStyle = 'rgba(255,120,20,' + (f * 0.35).toFixed(2) + ')';
        ctx.lineWidth = p.size * f * 3.2 + 1;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(tx, ty); ctx.stroke();
        ctx.strokeStyle = 'rgba(255,' + (190 + 60 * f | 0) + ',' + (80 + 120 * f | 0) + ',' + f.toFixed(2) + ')';
        ctx.lineWidth = p.size * f + 0.6;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(tx, ty); ctx.stroke();
      }
    }
    if (type === 1) ctx.globalCompositeOperation = 'source-over';
  }

  function drawStreaks() {
    ctx.lineCap = 'round';
    const sf = Math.min(1.4, worldSpeed / (W * 0.75));
    for (let i = 0; i < streaks.length; i++) {
      const s = streaks[i];
      ctx.strokeStyle = 'rgba(255,255,255,' + Math.min(0.5, s.a * (0.7 + sf * 0.5)).toFixed(3) + ')';
      ctx.lineWidth = s.w;
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x + s.len * (0.7 + 0.3 * sf), s.y); ctx.stroke();
    }
    if (boostMax > 0.04) {                                          // extra speed lines while boosting
      for (let i = 0; i < boostStreaks.length; i++) {
        const s = boostStreaks[i];
        ctx.strokeStyle = 'rgba(255,240,200,' + (s.a * 2.2 * boostMax).toFixed(3) + ')';
        ctx.lineWidth = s.w + 0.6;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x + s.len * 1.8, s.y); ctx.stroke();
      }
    }
  }

  /* ======================================================================
     FIREWORKS (dark mode only)
     A volley of 3-6 rockets every 6 s, staggered so bursts overlap: rocket +
     fading trail -> burst of coloured particles (big + small, some ring shells),
     additive blending with a soft halo. Drawn on the overlay canvas that sits
     above the scrim and below the content.
     ====================================================================== */
  function parseHex(h) {
    const m = /^#?([0-9a-f]{6})$/i.exec((h || '').trim());
    return m ? [parseInt(m[1].slice(0, 2), 16), parseInt(m[1].slice(2, 4), 16), parseInt(m[1].slice(4, 6), 16)] : null;
  }
  function readCssColor(name, fallback) {
    return parseHex(getComputedStyle(document.documentElement).getPropertyValue(name)) || fallback;
  }
  function buildFwPalette() {
    const red = readCssColor('--accent-red', [255, 0, 38]);
    const yellow = readCssColor('--accent-yellow', [255, 234, 0]);
    fwPalette = FW.colors.map((c) => {
      if (c === 'orange') return [(red[0] + yellow[0]) / 2, (red[1] + yellow[1]) / 2, (red[2] + yellow[2]) / 2];
      if (c.indexOf('--') === 0) return readCssColor(c, [255, 200, 0]);
      return parseHex(c) || [255, 200, 0];
    });
  }

  function fwAlloc() {
    for (let n = 0; n < fwLimit; n++) {
      const p = fwPool[(fwCursor + n) % fwLimit];
      if (!p.on) { fwCursor = (fwCursor + n + 1) % fwLimit; return p; }
    }
    return null;                                                    // pool full -> skip (hard cap)
  }

  function fwReset() {
    rockets.length = 0; flashes.length = 0; pendingLaunches.length = 0;
    for (let i = 0; i < fwPool.length; i++) fwPool[i].on = 0;
    fwLive = 0;
    if (fctx) fctx.clearRect(0, 0, W, H);
    fwHadContent = false;
  }

  function fwLaunch(big) {
    const x0 = rand(W * 0.12, W * 0.88);
    rockets.push({
      x: x0, y: H * 0.7, x0: x0, y0: H * 0.7,
      tx: clamp(x0 + rand(-W * 0.12, W * 0.12), W * 0.08, W * 0.92),
      ty: rand(H * 0.08, H * 0.4),                                  // upper sky, above the grandstand / skyline
      t: 0, dur: rand(0.85, 1.25), big: big, trail: []
    });
  }

  function fwBurst(x, y, big) {
    const base = fwPalette[(Math.random() * fwPalette.length) | 0];
    const alt = fwPalette[(Math.random() * fwPalette.length) | 0];
    const n = big ? randInt(FW.bigCount[0], FW.bigCount[1]) : randInt(FW.smallCount[0], FW.smallCount[1]);
    const ring = big && Math.random() < 0.35;                       // some big shells burst as a ring
    const vmax = big ? rand(340, 500) : rand(160, 240);

    for (let i = 0; i < n; i++) {
      const p = fwAlloc();
      if (!p) break;
      const a = Math.random() * TAU;
      const sp = ring ? vmax * rand(0.94, 1) : vmax * (0.35 + 0.65 * Math.sqrt(Math.random()));
      const c = Math.random() < 0.25 ? alt : base;
      p.on = 1; p.x = x; p.y = y;
      p.vx = Math.cos(a) * sp; p.vy = Math.sin(a) * sp;
      p.life = 0; p.max = big ? rand(1.9, 3.0) : rand(1.2, 1.9);
      p.size = big ? rand(2, 3.6) : rand(1.4, 2.4);
      p.r = clamp(c[0] + rand(-10, 10), 0, 255);
      p.g = clamp(c[1] + rand(-25, 25), 0, 255);
      p.b = clamp(c[2] + rand(-10, 10), 0, 255);
      p.tw = rand(0, TAU);
      p.drag = big ? 1.5 : 1.8;
    }
    if (big) flashes.push({ x: x, y: y, life: 0, max: 0.5, r: vmax * 0.7 });   // white-hot flash at the centre
    Snd.pop(big ? 1 : 0.5);
  }

  function fwVolley() {
    const n = randInt(FW.volleyMin, FW.volleyMax);
    for (let i = 0; i < n; i++) {
      const big = i === 0 ? true : i === 1 ? false : Math.random() < 0.5;   // always a mix of big and small
      pendingLaunches.push({ at: i === 0 ? 0 : rand(0.1, 2.0), big: big });  // staggered so bursts overlap
    }
    crowdBoost = 1;                                                 // the crowd goes wild
    Snd.cheer(0.7);
  }

  function fwUpdate(dt) {
    if (!fwEnabled) return;
    const dark = isDark();
    if (dark && !fwWasDark) fwCountdown = FW.firstDelayMs / 1000;   // entering dark mode: restart the timer
    if (!dark && fwWasDark) fwReset();                              // leaving dark mode: clear everything at once
    fwWasDark = dark;
    if (!dark) return;

    fwCountdown -= dt;
    if (fwCountdown <= 0) { fwCountdown = FW.intervalMs / 1000; fwVolley(); }

    for (let i = pendingLaunches.length - 1; i >= 0; i--) {
      const p = pendingLaunches[i];
      p.at -= dt;
      if (p.at <= 0) { fwLaunch(p.big); pendingLaunches.splice(i, 1); }
    }

    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.t += dt;
      const u = Math.min(1, r.t / r.dur);
      const e = 1 - Math.pow(1 - u, 2.2);                           // decelerates as it climbs
      r.x = lerp(r.x0, r.tx, e) + Math.sin(r.t * 14) * 1.6 * (1 - u);
      r.y = lerp(r.y0, r.ty, e);
      r.trail.push(r.x, r.y);
      if (r.trail.length > 24) r.trail.splice(0, 2);
      if (u >= 1) { fwBurst(r.tx, r.ty, r.big); rockets.splice(i, 1); }
    }

    for (let i = flashes.length - 1; i >= 0; i--) {
      flashes[i].life += dt;
      if (flashes[i].life >= flashes[i].max) flashes.splice(i, 1);
    }

    fwLive = 0;
    for (let i = 0; i < fwLimit; i++) {
      const p = fwPool[i];
      if (!p.on) continue;
      p.life += dt;
      if (p.life >= p.max) { p.on = 0; continue; }
      const d = Math.exp(-p.drag * dt);                             // drag slows the burst down
      p.vx *= d;
      p.vy = p.vy * d + 70 * dt;                                    // light gravity
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      fwLive++;
    }
  }

  /* Overlay render: night lighting (always, in dark mode) + fireworks */
  function fwRender() {
    if (!fctx) return;
    if (!isDark()) {
      if (fwHadContent) { fctx.clearRect(0, 0, W, H); fwHadContent = false; }
      return;
    }
    fwHadContent = true;
    fctx.clearRect(0, 0, W, H);
    fctx.globalCompositeOperation = 'lighter';                      // additive: overlapping light and sparks glow
    fctx.lineCap = 'round';

    renderLights();                                                 // pole glow, light sticks, car lights

    // rocket trails + heads
    for (let i = 0; i < rockets.length; i++) {
      const r = rockets[i], tr = r.trail, n = tr.length / 2;
      for (let j = 1; j < n; j++) {
        const f = j / n;
        fctx.strokeStyle = 'rgba(255,190,90,' + (f * 0.85).toFixed(2) + ')';
        fctx.lineWidth = 1 + f * 3;
        fctx.beginPath();
        fctx.moveTo(tr[(j - 1) * 2], tr[(j - 1) * 2 + 1]);
        fctx.lineTo(tr[j * 2], tr[j * 2 + 1]);
        fctx.stroke();
      }
      fctx.fillStyle = 'rgba(255,245,210,0.95)';
      fctx.beginPath(); fctx.arc(r.x, r.y, 3.2, 0, TAU); fctx.fill();
    }

    // white-hot centre flash (big bursts)
    for (let i = 0; i < flashes.length; i++) {
      const f = flashes[i];
      const k = f.life / f.max, a = 1 - k, rad = f.r * (0.4 + 0.6 * k);
      const g = fctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, rad);
      g.addColorStop(0, 'rgba(255,255,235,' + a.toFixed(2) + ')');
      g.addColorStop(0.35, 'rgba(255,190,80,' + (a * 0.5).toFixed(2) + ')');
      g.addColorStop(1, 'rgba(255,120,30,0)');
      fctx.fillStyle = g;
      fctx.fillRect(f.x - rad, f.y - rad, rad * 2, rad * 2);
    }

    // burst particles: longer streaks with a soft halo; they twinkle, shrink and fade
    for (let i = 0; i < fwLimit; i++) {
      const p = fwPool[i];
      if (!p.on) continue;
      const f = 1 - p.life / p.max;
      const alpha = Math.min(1, Math.pow(f, 0.8) * (0.8 + 0.2 * Math.sin(p.life * 22 + p.tw)) * 1.15);
      const col = (p.r | 0) + ',' + (p.g | 0) + ',' + (p.b | 0);
      const w = p.size * (0.5 + 0.5 * f);
      const tx = p.x - p.vx * 0.05, ty = p.y - p.vy * 0.05;
      if (!small) {                                                 // soft halo
        fctx.strokeStyle = 'rgba(' + col + ',' + (alpha * 0.25).toFixed(2) + ')';
        fctx.lineWidth = w * 3.4;
        fctx.beginPath(); fctx.moveTo(p.x, p.y); fctx.lineTo(tx, ty); fctx.stroke();
      }
      fctx.strokeStyle = 'rgba(' + col + ',' + alpha.toFixed(2) + ')';
      fctx.lineWidth = w;
      fctx.beginPath(); fctx.moveTo(p.x, p.y); fctx.lineTo(tx, ty); fctx.stroke();
    }
    fctx.globalCompositeOperation = 'source-over';
  }

  /* OVERTAKES */
  const banner = document.getElementById('overtakeBanner');
  const bannerTitle = banner && banner.querySelector('.ob-title');
  const bannerSub = banner && banner.querySelector('.ob-sub');

  function showBanner(title, sub) {
    if (!banner) return;
    bannerTitle.textContent = title;
    bannerSub.textContent = sub;
    banner.classList.remove('show');
    void banner.offsetWidth;
    banner.classList.add('show');
  }

  function startOvertake(car) {
    const rank = order.indexOf(car);
    const toRank = CFG.overtakeMode === 'one' ? rank - 1 : 0;
    const passes = rank - toRank;
    car.ot = {
      t: 0, dur: (CFG.overtakeBaseMs + CFG.overtakePerCarMs * passes) / 1000,
      startX: car.x, endX: slotX(toRank), toRank: toRank, swapped: false
    };
    car.driftMix = 0;
    busy = true;
    showBanner('OVERTAKE!', car.d.name.toUpperCase() + '   P' + (rank + 1) + ' \u2192 P' + (toRank + 1));
    Snd.cheer(1);
  }

  function updateOvertake(car, dt) {
    const o = car.ot;
    o.t += dt;
    const u = clamp(o.t / o.dur, 0, 1);

    let lb;                                                          // dive out, hold, merge back
    if (u < 0.16) lb = easeOut(u / 0.16);
    else if (u < 0.78) lb = 1;
    else lb = 1 - easeInOut((u - 0.78) / 0.22);
    car.laneBlend = lb;

    car.x = lerp(o.startX, o.endX, easeInOut(u));
    car.slot = car.x;
    car.boost = u < 0.1 ? u / 0.1 : u < 0.8 ? 1 : Math.max(0, 1 - (u - 0.8) / 0.2);

    if (!o.swapped && u >= 0.52) {                                   // the pass: rankings change here
      order.splice(order.indexOf(car), 1);
      order.splice(o.toRank, 0, car);
      o.swapped = true;
    }
    if (u >= 1) {
      car.ot = null;
      car.boost = 0;
      car.laneBlend = 0;
      car.slot = slotX(order.indexOf(car));
      busy = false;
    }
  }

  function onCarClick(car) {
    for (let i = 0; i < 22; i++) carSpark(car, 1);                   // interaction = spark burst (even mid-overtake)
    if (busy) return;                                                // no spam while an overtake runs
    const rank = order.indexOf(car);
    if (rank === 0) {
      car.rev = 1;
      showBanner('FULL THROTTLE!', car.d.name.toUpperCase() + '   LEADING P1');
      Snd.cheer(0.55);
      for (let i = 0; i < 14; i++) {
        spawn(1, car.x - carLen * 0.3 + rand(-20, 20), groundMain - 4, rand(-320, -60), rand(-260, -80), rand(0.25, 0.5), rand(1, 2.2));
      }
    } else {
      startOvertake(car);
    }
  }

  /* POINTER: hover + click on cars (page content sits above the canvas, so we listen on the document
     and only count clicks on empty background, not on cards / buttons / text / images) */
  const NON_BG = 'a,button,input,textarea,select,label,summary,img,svg,.f1-card,.hero-art-card,.lightbox,.header,' +
                 '.nav-menu,.sound-toggle,[data-tilt],.overtake-banner';
  const TEXT_TAGS = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'STRONG', 'EM', 'LI', 'I', 'SMALL', 'B', 'FIGCAPTION']);

  function isBackground(target) {
    if (!target || target === canvas) return true;
    if (TEXT_TAGS.has(target.tagName)) return false;
    return !target.closest(NON_BG);
  }

  function carAt(x, y) {
    for (let i = drawn.length - 1; i >= 0; i--) {                    // front-most first
      const h = drawn[i].hit;
      if (x >= h.x - 6 && x <= h.x + h.w + 6 && y >= h.y - 6 && y <= h.y + h.h + 6) return drawn[i];
    }
    return null;
  }

  function setHover(c) {
    if (c === hoverCar) return;
    hoverCar = c;
    document.body.classList.toggle('f1-car-hover', !!c);
    window.dispatchEvent(new CustomEvent('f1:carhover', {
      detail: { label: c ? (order.indexOf(c) === 0 ? 'REV' : 'OVERTAKE') : null }
    }));
  }

  let mx = -1, my = -1, pointerMoved = false;
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    mx = e.clientX; my = e.clientY; pointerMoved = true;
  }, { passive: true });
  window.addEventListener('scroll', () => { pointerMoved = true; }, { passive: true });

  document.addEventListener('click', (e) => {
    if (e.button !== 0 || !isBackground(e.target)) return;
    const c = carAt(e.clientX, e.clientY);
    if (c) onCarClick(c);
  });

  /* SOUND: crowd ambience via Web Audio, MUTED until the user taps the toggle */
  const Snd = (function () {
    let ac = null, master = null, crowdGain = null, band = null;
    let enabled = false;
    const A = CFG.audio;

    function build() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      ac = new AC();
      master = ac.createGain();
      master.gain.value = 0;
      master.connect(ac.destination);

      const len = ac.sampleRate * 3;                                 // brown-ish noise -> stadium roar
      const buf = ac.createBuffer(1, len, ac.sampleRate);
      const d = buf.getChannelData(0);
      let lastV = 0;
      for (let i = 0; i < len; i++) {
        lastV = (lastV + 0.04 * (Math.random() * 2 - 1)) / 1.04;
        d[i] = lastV * 6;
      }
      const src = ac.createBufferSource();
      src.buffer = buf; src.loop = true;

      band = ac.createBiquadFilter();
      band.type = 'bandpass'; band.frequency.value = 900; band.Q.value = 0.5;
      const hp = ac.createBiquadFilter();
      hp.type = 'highpass'; hp.frequency.value = 180;

      crowdGain = ac.createGain();
      crowdGain.gain.value = A.baseGain;

      const lfo = ac.createOscillator();                             // slow swell like a real crowd
      lfo.frequency.value = 0.23;
      const lfoGain = ac.createGain();
      lfoGain.gain.value = A.baseGain * 0.45;
      lfo.connect(lfoGain); lfoGain.connect(crowdGain.gain);

      src.connect(band); band.connect(hp); hp.connect(crowdGain); crowdGain.connect(master);
      src.start(); lfo.start();
      return true;
    }

    return {
      get on() { return enabled; },
      enable() {
        if (!ac && !build()) return false;
        ac.resume();
        master.gain.setTargetAtTime(A.volume, ac.currentTime, 0.2);
        enabled = true;
        return true;
      },
      disable() {
        enabled = false;
        if (!ac) return;
        master.gain.setTargetAtTime(0, ac.currentTime, 0.1);
        setTimeout(() => { if (!enabled && ac) ac.suspend(); }, 500);
      },
      cheer(power) {
        if (!enabled || !ac) return;
        const now = ac.currentTime;
        crowdGain.gain.setTargetAtTime(A.baseGain * (1 + 1.6 * power), now, 0.12);
        crowdGain.gain.setTargetAtTime(A.baseGain, now + 1.1, 0.5);
        band.frequency.setTargetAtTime(1500, now, 0.1);
        band.frequency.setTargetAtTime(900, now + 1.1, 0.6);
      },
      pop(power) {                                                   // soft firework "thump" (silent while muted)
        if (!enabled || !ac) return;
        const now = ac.currentTime;
        const len = Math.floor(ac.sampleRate * 0.18);
        const buf = ac.createBuffer(1, len, ac.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
        const src = ac.createBufferSource();
        src.buffer = buf;
        const lp = ac.createBiquadFilter();
        lp.type = 'lowpass'; lp.frequency.value = 900;
        const g = ac.createGain();
        g.gain.value = 0.45 * power;
        src.connect(lp); lp.connect(g); g.connect(master);
        src.start(now);
      },
      pause() { if (ac && enabled) ac.suspend(); },
      resume() { if (ac && enabled) ac.resume(); }
    };
  })();

  const soundBtn = document.getElementById('soundToggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const turnOn = !Snd.on;
      if (turnOn && !Snd.enable()) return;
      if (!turnOn) Snd.disable();
      soundBtn.setAttribute('aria-pressed', String(turnOn));
      soundBtn.setAttribute('aria-label', turnOn ? 'Mute crowd sound' : 'Unmute crowd sound');
      soundBtn.querySelector('i').className = turnOn ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
    });
  }

  /* UPDATE + RENDER */
  function updateSpeed(dt) {
    evtTimer -= dt;                                                  // random acceleration bursts + braking zones
    if (evtLeft > 0) {
      evtLeft -= dt;
      if (evtLeft <= 0) { evtType = 0; evtTimer = rand(5, 10); }
    } else if (evtTimer <= 0) {
      evtType = Math.random() < 0.6 ? 1 : -1;
      evtLeft = evtType > 0 ? 1.6 : 1.0;
    }
    const base = 1 + 0.16 * Math.sin(t * 0.37) + 0.08 * Math.sin(t * 0.93 + 1.3);
    const target = base * (evtType > 0 ? 1.4 : evtType < 0 ? 0.55 : 1);
    mulSmooth += (target - mulSmooth) * (1 - Math.exp(-dt * (target > mulSmooth ? 2.2 : 3.2)));
    const accel = (mulSmooth - prevMul) / Math.max(dt, 0.001);
    prevMul = mulSmooth;
    accelS += (accel - accelS) * (1 - Math.exp(-dt * 6));
    brake += ((evtType < 0 ? 1 : 0) - brake) * (1 - Math.exp(-dt * 8));

    boostMax = 0; revMax = 0;
    for (let i = 0; i < cars.length; i++) {
      boostMax = Math.max(boostMax, cars[i].boost);
      revMax = Math.max(revMax, cars[i].rev);
    }
    const slow = reduce ? 0.35 : 1;
    worldSpeed = Math.max(500, W * CFG.speedFactor) * mulSmooth * (1 + 0.8 * boostMax) * slow;
  }

  function update(dt) {
    mix += (themeTarget() - mix) * (1 - Math.exp(-dt * 3));
    if (Math.abs(themeTarget() - mix) < 0.002) mix = themeTarget();
    crowdBoost = Math.max(0, crowdBoost - dt * 0.45);

    updateSpeed(dt);
    worldX += worldSpeed * dt;

    if (pointerMoved) {
      pointerMoved = false;
      let c = null;
      if (!busy && mx >= 0) {
        const target = document.elementFromPoint(mx, my);
        if (isBackground(target)) c = carAt(mx, my);
      }
      setHover(c);
    }

    for (let i = 0; i < cars.length; i++) {
      const car = cars[i];
      car.wheel += Math.min(worldSpeed / (carLen * 0.115), 34) * dt * (1 + car.rev * 0.6);
      car.rev = Math.max(0, car.rev - dt * 1.4);

      if (car.ot) {
        updateOvertake(car, dt);
      } else {
        car.slot += (slotX(order.indexOf(car)) - car.slot) * (1 - Math.exp(-dt * 3.5));
        car.driftMix += (1 - car.driftMix) * (1 - Math.exp(-dt * 2));
        const drift = (Math.sin(t * 0.45 + car.ph) + 0.6 * Math.sin(t * 0.17 + car.ph * 2)) * driftAmp * 0.62;
        car.x = car.slot + drift * car.driftMix;
        car.laneBlend += (0 - car.laneBlend) * (1 - Math.exp(-dt * 6));
      }

      const sc = lerp(1, CFG.nearScale, car.laneBlend);
      const L = carLen * sc;
      const gy = lerp(groundMain, groundNear, car.laneBlend);
      const smokeRate = (car.rev > 0.15 ? 55 : 0) + car.boost * 70 + Math.max(0, accelS) * 18 + (brake > 0.4 ? 14 : 0) + 7;
      car.smokeAcc += smokeRate * dt;
      while (car.smokeAcc >= 1) {
        car.smokeAcc -= 1;
        spawn(0, car.x - L * 0.3 + rand(-6, 6), gy - 3, rand(-40, 10), rand(-30, -8), rand(0.8, 1.4), rand(3, 6));
      }

      /* sparks: while throttling (boost / rev / acceleration) OR while the car is hovered */
      const thr = Math.max(car.boost, car.rev, clamp(accelS * 2.5, 0, 1), hoverCar === car ? 0.55 : 0);
      car.sparkAcc += (thr > 0.12 ? 18 + 70 * thr : 0) * dt;
      while (car.sparkAcc >= 1) { car.sparkAcc -= 1; carSpark(car, thr); }
    }

    for (let i = 0; i < pLimit; i++) {
      const p = parts[i];
      if (!p.on) continue;
      p.life += dt;
      if (p.life >= p.max) { p.on = 0; continue; }
      if (p.type === 0) {
        p.x += (p.vx - worldSpeed * 0.8) * dt;
        p.y += p.vy * dt;
        p.size += 14 * dt;
      } else {
        p.vy += 700 * dt;
        p.x += (p.vx - worldSpeed * 0.15) * dt;
        p.y += p.vy * dt;
      }
    }

    for (let i = 0; i < streaks.length; i++) {
      const s = streaks[i];
      s.x -= worldSpeed * s.sp * dt;
      if (s.x + s.len < 0) streaks[i] = newStreak(false);
    }
    if (boostMax > 0.04) {
      for (let i = 0; i < boostStreaks.length; i++) {
        const s = boostStreaks[i];
        s.x -= worldSpeed * (s.sp + 1.5) * dt;
        if (s.x + s.len * 1.8 < 0) boostStreaks[i] = newStreak(false);
      }
    }

    fwUpdate(dt);
  }

  function render() {
    lq.length = 0; cones.length = 0;                                 // reset the lighting queue for this frame

    const shakeAmt = reduce ? 0 : Math.min(3, CFG.shake * (boostMax + Math.max(0, accelS) * 0.15 + revMax * 0.5));
    ctx.save();
    if (shakeAmt > 0.05) ctx.translate((Math.random() - 0.5) * 2 * shakeAmt, (Math.random() - 0.5) * 2 * shakeAmt);

    updatePalette();
    drawSky();
    drawSkyline();
    drawTowers();
    drawStands();
    drawCrowd();
    drawWall();
    drawTrack();
    drawHaze();
    drawParticles(0);

    drawn = cars.slice().sort((a, b) =>
      lerp(groundMain, groundNear, a.laneBlend) - lerp(groundMain, groundNear, b.laneBlend));
    for (let i = 0; i < drawn.length; i++) drawCar(drawn[i], order.indexOf(drawn[i]));

    drawParticles(1);
    drawStreaks();
    ctx.restore();

    fwRender();                                                      // overlay canvas, unaffected by camera shake
  }

  /* LOOP (pauses when the tab is hidden) */
  let raf = 0, running = false, last = 0;

  function frame(now) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (dt <= 0) return;
    t += dt;
    update(dt);
    render();
  }

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { stop(); Snd.pause(); } else { start(); Snd.resume(); }
  });

  buildFwPalette();
  resize();
  update(0.016);
  render();
  start();
})();