/* =====================================================
   خدماتي المنيا — js/effects.js v2.0
   🎨 تأثيرات حركية وضوئية تفاعلية
   ===================================================== */
'use strict';

/* ══════════════════════════════════════════════════════
   🌊 RIPPLE EFFECT — تأثير موجة عند الضغط
   ══════════════════════════════════════════════════════ */
function addRipple(el) {
  el.style.position = 'relative';
  el.style.overflow = 'hidden';
  el.addEventListener('click', function(e) {
    const r = document.createElement('span');
    r.className = 'ripple-wave';
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    r.style.cssText = `width:${size}px;height:${size}px;top:${e.clientY - rect.top - size/2}px;right:${rect.right - e.clientX - size/2}px`;
    el.appendChild(r);
    setTimeout(() => r.remove(), 700);
  });
}

/* Apply ripple to cards and buttons */
function initRipples() {
  document.querySelectorAll('.cat-card, .ocard, .vcard, .scrd, .bitem, .qbtn, .map-cta, .reg-cta, .em-cta').forEach(el => {
    addRipple(el);
  });
}

/* ══════════════════════════════════════════════════════
   🔢 COUNTER ANIMATION — أرقام إحصائية
   ══════════════════════════════════════════════════════ */
function animateCount(el, target, duration = 1800) {
  const raw = target.replace(/[^0-9]/g, '');
  const suffix = target.replace(/[0-9,]/g, '');
  const num = parseInt(raw.replace(/,/g, ''), 10);
  if (isNaN(num)) return;
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    // Ease out expo
    const eased = 1 - Math.pow(2, -10 * progress);
    const current = Math.round(eased * num);
    el.textContent = current.toLocaleString('ar-EG') + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('.sn[data-count]');
  if (!counters.length) {
    // Auto-detect stat numbers
    document.querySelectorAll('.stat-pill .sn').forEach(el => {
      const original = el.textContent.trim();
      el.dataset.original = original;
      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          animateCount(el, original);
          obs.disconnect();
        }
      }, { threshold: 0.5 });
      obs.observe(el);
    });
  }
}

/* ══════════════════════════════════════════════════════
   📸 SCROLL REVEAL — ظهور عند التمرير
   ══════════════════════════════════════════════════════ */
function initScrollReveal() {
  const revealElements = [
    { selector: '.section',        cls: 'reveal',       delay: 0 },
    { selector: '.cat-card',       cls: 'reveal',       delay: 50 },
    { selector: '.vcard',          cls: 'reveal-scale', delay: 80 },
    { selector: '.scrd',           cls: 'reveal',       delay: 70 },
    { selector: '.bitem',          cls: 'reveal',       delay: 40 },
    { selector: '.map-cta',        cls: 'reveal-scale', delay: 0 },
    { selector: '.reg-cta',        cls: 'reveal-scale', delay: 0 },
    { selector: '.bourse',         cls: 'reveal-scale', delay: 0 },
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.revealDelay || 0;
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(({ selector, cls, delay }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      if (!el.classList.contains('reveal') && !el.classList.contains('reveal-scale')) {
        el.classList.add(cls);
        el.dataset.revealDelay = delay * i;
        observer.observe(el);
      }
    });
  });
}

/* ══════════════════════════════════════════════════════
   ⏱️ OFFER COUNTDOWN TIMERS — عداد تنازلي
   ══════════════════════════════════════════════════════ */
function initTimers() {
  const timers = document.querySelectorAll('.tclock');
  timers.forEach(el => {
    const text = el.closest('.otimer')?.textContent || '';
    const hoursMatch = text.match(/(\d+)\s*ساعة/);
    if (!hoursMatch) return;
    let totalSecs = parseInt(hoursMatch[1]) * 3600;
    const tick = () => {
      if (totalSecs <= 0) { el.textContent = 'انتهى!'; return; }
      const h = Math.floor(totalSecs / 3600);
      const m = Math.floor((totalSecs % 3600) / 60);
      const s = totalSecs % 60;
      el.textContent = `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
      totalSecs--;
    };
    tick();
    setInterval(tick, 1000);
  });
}

/* ══════════════════════════════════════════════════════
   🎠 AUTO BANNER SLIDER
   ══════════════════════════════════════════════════════ */
function initBannerSlider() {
  const wrap = document.getElementById('bannersWrap');
  if (!wrap) return;
  const slides = wrap.querySelectorAll('.bslide');
  const dots   = document.querySelectorAll('.sdot');
  if (slides.length < 2) return;

  let current = 0;
  let autoTimer;

  function goTo(idx) {
    current = (idx + slides.length) % slides.length;
    const slideW = wrap.offsetWidth + 12; // gap
    wrap.scrollTo({ left: current * slideW, behavior: 'smooth' });
    dots.forEach((d, i) => {
      d.classList.toggle('a', i === current);
      d.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 4000);
  }

  wrap.addEventListener('touchstart', () => clearInterval(autoTimer), { passive: true });
  wrap.addEventListener('touchend',   () => startAuto(), { passive: true });
  wrap.addEventListener('scroll', () => {
    const idx = Math.round(wrap.scrollLeft / (wrap.offsetWidth + 12));
    dots.forEach((d, i) => {
      d.classList.toggle('a', i === idx);
      d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });
    current = idx;
  }, { passive: true });

  // Dot clicks
  dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(autoTimer); goTo(i); startAuto(); }));

  startAuto();
}

/* ══════════════════════════════════════════════════════
   ✨ PARTICLE SPARKS — جزيئات متطايرة عند الضغط
   ══════════════════════════════════════════════════════ */
function createSparks(x, y, color = '#F4A261') {
  const colors = [color, '#2D6A4F', '#74C69D', '#FFD700'];
  for (let i = 0; i < 8; i++) {
    const spark = document.createElement('div');
    const angle = (i / 8) * 360;
    const dist  = 30 + Math.random() * 30;
    const size  = 4 + Math.random() * 4;
    spark.style.cssText = `
      position:fixed; left:${x}px; top:${y}px; width:${size}px; height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:50%; z-index:9999; pointer-events:none;
      transform-origin:center;
      animation: sparkFly .6s ease-out forwards;
      --dx:${Math.cos(angle * Math.PI/180) * dist}px;
      --dy:${Math.sin(angle * Math.PI/180) * dist}px;
    `;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 700);
  }
}

/* Inject sparkFly keyframe dynamically */
const sparkStyle = document.createElement('style');
sparkStyle.textContent = `
  @keyframes sparkFly {
    0%   { transform:translate(0,0) scale(1); opacity:1; }
    100% { transform:translate(var(--dx),var(--dy)) scale(0); opacity:0; }
  }
`;
document.head.appendChild(sparkStyle);

/* Apply sparks to emergency and important buttons */
function initSparks() {
  document.querySelectorAll('.f-em, .nctr-btn, .map-cta-btn, .reg-btn').forEach(el => {
    el.addEventListener('click', e => {
      createSparks(e.clientX, e.clientY, '#F4A261');
    });
  });
  document.querySelectorAll('.vcbtn.phn').forEach(el => {
    el.addEventListener('click', e => createSparks(e.clientX, e.clientY, '#2D6A4F'));
  });
  document.querySelectorAll('.vcbtn.wa').forEach(el => {
    el.addEventListener('click', e => createSparks(e.clientX, e.clientY, '#25D366'));
  });
}

/* ══════════════════════════════════════════════════════
   💡 GLOW TRAIL — ذيل ضوئي للمس
   ══════════════════════════════════════════════════════ */
function initGlowTrail() {
  // Only on mobile touch
  if (!('ontouchstart' in window)) return;
  document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const glow = document.createElement('div');
    glow.style.cssText = `
      position:fixed; left:${touch.clientX - 8}px; top:${touch.clientY - 8}px;
      width:16px; height:16px; background:rgba(244,162,97,.35);
      border-radius:50%; pointer-events:none; z-index:9998;
      animation: glowFade .5s ease-out forwards;
    `;
    document.body.appendChild(glow);
    setTimeout(() => glow.remove(), 500);
  }, { passive: true });

  const glowFade = document.createElement('style');
  glowFade.textContent = `
    @keyframes glowFade {
      from { transform:scale(1); opacity:.6; }
      to   { transform:scale(2); opacity:0; }
    }
  `;
  document.head.appendChild(glowFade);
}

/* ══════════════════════════════════════════════════════
   🌙 DARK MODE TOGGLE
   ══════════════════════════════════════════════════════ */
function initDarkMode() {
  const saved = localStorage.getItem('darkMode');
  if (saved === 'true') document.documentElement.classList.add('dark');
}

/* ══════════════════════════════════════════════════════
   🎭 LOGO HOVER EASTER EGG
   ══════════════════════════════════════════════════════ */
function initLogoEgg() {
  const logo = document.querySelector('.logo-icon');
  if (!logo) return;
  let clicks = 0;
  logo.addEventListener('click', () => {
    clicks++;
    if (clicks === 5) {
      clicks = 0;
      createSparks(logo.getBoundingClientRect().left + 20, logo.getBoundingClientRect().top + 20, '#FFD700');
      logo.style.animation = 'rotateSlow .5s linear 3, glowPulse 1s ease';
      setTimeout(() => { logo.style.animation = 'glowPulse 3s ease-in-out infinite, bounceIn .7s var(--t-bounce) both'; }, 1500);
    }
  });
}

/* ══════════════════════════════════════════════════════
   🔄 PULL TO REFRESH HINT
   ══════════════════════════════════════════════════════ */
function initPullRefresh() {
  let startY = 0;
  document.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
  document.addEventListener('touchmove', e => {
    const diff = e.touches[0].clientY - startY;
    if (diff > 80 && window.scrollY === 0) {
      showToastSafe('🔄 أفلت للتحديث');
    }
  }, { passive: true });
}

function showToastSafe(msg) {
  if (window.showToast) window.showToast(msg);
}

/* ══════════════════════════════════════════════════════
   🚀 INIT ALL
   ══════════════════════════════════════════════════════ */
function initAllEffects() {
  initDarkMode();
  initRipples();
  initScrollReveal();
  initCounters();
  initBannerSlider();
  initTimers();
  initSparks();
  initGlowTrail();
  initLogoEgg();
  initPullRefresh();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllEffects);
} else {
  initAllEffects();
}

window.KhedmatyEffects = { createSparks, animateCount, addRipple };

/* ══════════════════════════════════════════════════════
   ✨ v3.0 — تأثيرات حركية وضوئية متقدمة
   خدماتي المنيا — إضافات فوق الكود الموجود
   ══════════════════════════════════════════════════════ */

/* ── شاشة بداية Splash Screen ── */
function initSplashScreen() {
  if (sessionStorage.getItem('splashShown')) return;
  const splash = document.createElement('div');
  splash.id = 'app-splash';
  splash.innerHTML = `
    <div class="sl-logo">
      <div class="sl-icon">خ</div>
      <div class="sl-txt">خدماتي المنيا</div>
      <div class="sl-sub">كل حاجة في مكان واحد</div>
      <div class="sl-dots">
        <div class="sl-dot"></div>
        <div class="sl-dot"></div>
        <div class="sl-dot"></div>
      </div>
    </div>
  `;
  document.body.prepend(splash);
  sessionStorage.setItem('splashShown', '1');
  setTimeout(() => splash.classList.add('hidden'), 1800);
  setTimeout(() => splash.remove(), 2400);
}

/* ── مؤشر تقدم التمرير ── */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const pct = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
    bar.style.transform = `scaleX(${pct})`;
  }, { passive: true });
}

/* ── نجوم Canvas في الهيرو ── */
function initHeroCanvas() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const canvas = document.createElement('canvas');
  canvas.id = 'hero-canvas';
  hero.prepend(canvas);
  const ctx = canvas.getContext('2d');

  const stars = Array.from({ length: 55 }, () => ({
    x: Math.random(), y: Math.random(),
    r: .5 + Math.random() * 1.5,
    a: Math.random() * Math.PI * 2,
    speed: .003 + Math.random() * .006,
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: .02 + Math.random() * .04,
    opacity: .3 + Math.random() * .7
  }));

  function resize() {
    canvas.width  = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.twinkle += s.twinkleSpeed;
      const alpha = s.opacity * (.5 + .5 * Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,215,80,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  new ResizeObserver(resize).observe(hero);
  draw();
}

/* ── تأثير Aurora في الهيرو ── */
function initHeroAurora() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const aurora = document.createElement('div');
  aurora.className = 'hero-aurora';
  hero.prepend(aurora);
}

/* ── 3D Tilt على بطاقات الأقسام ── */
function initTiltCards() {
  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(300px) rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg) translateY(-3px) scale(1.04)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ── Magnetic Buttons للأزرار المهمة ── */
function initMagneticButtons() {
  document.querySelectorAll('.map-cta-btn, .reg-btn, .nctr-btn, .em-cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${dx * .25}px, ${dy * .25}px) scale(1.05)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform .4s cubic-bezier(.34,1.56,.64,1)';
    });
  });
}

/* ── شريط تغذية البورصة المتحركة (Ticker) ── */
function initBourseTicker() {
  const bourse = document.querySelector('.bourse');
  if (!bourse) return;
  const items = [
    { name: 'طماطم', price: '8 ج', dir: 'dn', change: '↓2' },
    { name: 'بصل',   price: '12 ج', dir: 'up', change: '↑1' },
    { name: 'بطاطس', price: '7 ج',  dir: 'dn', change: '↓3' },
    { name: 'ثوم',   price: '45 ج', dir: 'up', change: '↑5' },
    { name: 'كوسة',  price: '6 ج',  dir: 'dn', change: '↓1' },
    { name: 'ذرة',   price: '4 ج',  dir: 'up', change: '↑1' },
    { name: 'جزر',   price: '9 ج',  dir: 'dn', change: '↓2' },
    { name: 'باذنجان', price: '5 ج', dir: 'up', change: '↑0' },
  ];
  const doubled = [...items, ...items];
  const html = doubled.map(i => `
    <span class="ticker-item">
      <span class="ti-name">${i.name}</span>
      <span class="${i.dir === 'up' ? 'ti-up' : 'ti-dn'}">${i.price} ${i.change}</span>
    </span>
  `).join('');

  const ticker = document.createElement('div');
  ticker.className = 'bourse-ticker';
  ticker.innerHTML = `<div class="bourse-ticker-inner">${html}</div>`;
  bourse.prepend(ticker);
}

/* ── عداد تصاعدي محسّن مع تأثير ترتد ── */
function initCountersV3() {
  document.querySelectorAll('.sn[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      let current = 0;
      const step = Math.ceil(target / 40);
      const tick = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current.toLocaleString('ar-EG');
        el.classList.add('counting');
        setTimeout(() => el.classList.remove('counting'), 300);
        if (current >= target) {
          clearInterval(tick);
          el.textContent = target.toLocaleString('ar-EG');
        }
      }, 40);
    }, { threshold: 0.5 });
    obs.observe(el);
  });
}

/* ── مؤقت العروض — إضافة "عاجل" عند <1 ساعة ── */
function initTimersV3() {
  document.querySelectorAll('.tclock').forEach(el => {
    const timer = setInterval(() => {
      const text = el.textContent;
      if (text.includes(':')) {
        const parts = text.split(':').map(Number);
        if (parts[0] === 0 && parts[1] < 60) {
          el.classList.add('urgent');
        }
      }
    }, 60000);
  });
}

/* ── تأثير موجة على ضغط البطاقات (موبايل) ── */
function initTouchWave() {
  document.querySelectorAll('.cat-card, .vcard, .scrd, .ocard').forEach(el => {
    el.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const rect = el.getBoundingClientRect();
      const glow = document.createElement('div');
      const size = Math.max(rect.width, rect.height) * 2;
      glow.style.cssText = `
        position:absolute;
        width:${size}px; height:${size}px;
        left:${touch.clientX - rect.left - size/2}px;
        top:${touch.clientY - rect.top - size/2}px;
        background:radial-gradient(circle, rgba(244,162,97,.3) 0%, transparent 65%);
        border-radius:50%;
        pointer-events:none;
        z-index:10;
        animation:touchGlow .6s ease-out forwards;
      `;
      el.style.position = 'relative';
      el.style.overflow = 'hidden';
      el.appendChild(glow);
      setTimeout(() => glow.remove(), 700);
    }, { passive: true });
  });

  if (!document.getElementById('touchGlowStyle')) {
    const s = document.createElement('style');
    s.id = 'touchGlowStyle';
    s.textContent = `
      @keyframes touchGlow {
        0%   { transform:scale(0); opacity:1; }
        100% { transform:scale(1); opacity:0; }
      }
    `;
    document.head.appendChild(s);
  }
}

/* ── تأثير دخول الصفحة — Stagger الأقسام ── */
function initPageEntrance() {
  const sections = document.querySelectorAll('.section, .banners, .qfilters');
  sections.forEach((sec, i) => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(20px)';
    setTimeout(() => {
      sec.style.transition = 'opacity .5s ease, transform .5s cubic-bezier(.34,1.2,.64,1)';
      sec.style.opacity = '1';
      sec.style.transform = 'translateY(0)';
    }, 300 + i * 80);
  });
}

/* ── تلميح التمرير — Scroll Hint ── */
function initScrollHint() {
  if (sessionStorage.getItem('scrollHintShown')) return;
  sessionStorage.setItem('scrollHintShown', '1');
  setTimeout(() => {
    if (window.showToast) window.showToast('👆 مرر لأعلى لاكتشاف المزيد', 'ok', 3000);
  }, 3000);
}

/* ── Header gradient border bottom ── */
function initHeaderBorder() {
  const header = document.querySelector('.header');
  if (header) header.style.position = 'sticky';
}

/* ── تهيئة طبقة التأثيرات v3 ── */
function initEffectsV3() {
  initSplashScreen();
  initScrollProgress();
  initHeroCanvas();
  initHeroAurora();
  initBourseTicker();
  initCountersV3();
  initTimersV3();
  initTouchWave();
  initPageEntrance();

  // تأخير لأن الصفحة تكتمل أولاً
  setTimeout(() => {
    initTiltCards();
    initMagneticButtons();
    initScrollHint();
  }, 500);
}

/* ── تشغيل V3 ── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEffectsV3);
} else {
  initEffectsV3();
}

/* تصدير للصفحات الأخرى */
window.KhedmatyEffects = Object.assign(window.KhedmatyEffects || {}, {
  initHeroCanvas, initBourseTicker, initTouchWave, initScrollProgress
});
