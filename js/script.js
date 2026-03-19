/* =============================================
   PORTFOLIO JAVASCRIPT
   Handles: Preloader, Particles, Typed.js, AOS,
   GSAP, Skill bars, Counter, Theme, Cursor,
   Contact form, Scroll effects, Navigation
   ============================================= */

'use strict';

/* ===== UTILITY ===== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

/* ===== PRELOADER ===== */
(function initPreloader() {
  const loader = $('#preloader');
  if (!loader) return;
  document.body.classList.add('loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');

      // Trigger hero entrance after preloader
      triggerHeroEntrance();
    }, 2800);
  });
})();

/* ===== HERO ENTRANCE (GSAP) ===== */
function triggerHeroEntrance() {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero-greeting', { y: 30, opacity: 0, duration: 0.7, delay: 0.2 })
    .from('.hero-name', { y: 40, opacity: 0, duration: 0.8, skewX: -3 }, '-=0.4')
    .from('.hero-typed-wrapper', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.hero-bio', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
    .from('.hero-cta .btn', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.3')
    .from('.hero-socials .social-icon', { scale: 0, opacity: 0, duration: 0.4, stagger: 0.07 }, '-=0.3')
    .from('.hero-img-wrapper', { scale: 0.85, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }, '-=1.2');

  // Navbar entrance
  gsap.from('#navbar', { y: -80, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.1 });
}

/* ===== PARTICLES CANVAS ===== */
(function initParticles() {
  const canvas = $('#particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -999, y: -999 };
  const PARTICLE_COUNT = window.innerWidth < 768 ? 50 : 110;
  const MAX_DIST = 130;
  const ACCENT = '0, 212, 255';
  const ACCENT2 = '168, 85, 247';

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.r = Math.random() * 2 + 0.8;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.6 ? ACCENT2 : ACCENT;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.fill();
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];

      // Mouse connection
      const mDist = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (mDist < MAX_DIST * 1.5) {
        const alpha = (1 - mDist / (MAX_DIST * 1.5)) * 0.4;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }

      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    animate();
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  init();
})();

/* ===== TYPED.JS ===== */
(function initTyped() {
  const el = $('#typed-text');
  if (!el || typeof Typed === 'undefined') return;

  new Typed('#typed-text', {
    strings: [
      'Full Stack Developer',
      'MERN Stack Developer',
      'Web Developer',
      'UI/UX Enthusiast',
      'Problem Solver'
    ],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 1800,
    startDelay: 3000,
    loop: true,
    cursorChar: '|',
    smartBackspace: true
  });
})();

/* ===== AOS INIT ===== */
(function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({
    duration: 750,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    once: true,
    offset: 80,
    delay: 0
  });
})();

/* ===== NAVBAR ===== */
(function initNavbar() {
  const navbar = $('#navbar');
  const hamburger = $('#hamburger');
  const navLinks = $('#nav-links');
  const overlay = $('#mobileOverlay');
  if (!navbar) return;

  // Scroll state
  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    updateActiveLink();
  }

  on(window, 'scroll', handleScroll, { passive: true });
  handleScroll();

  // Hamburger
  function toggleMenu() {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    overlay.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  on(hamburger, 'click', toggleMenu);
  on(overlay, 'click', closeMenu);

  // Close on nav link click
  $$('.nav-link').forEach(link => on(link, 'click', closeMenu));

  // Active link tracking
  function updateActiveLink() {
    const sections = $$('section[id]');
    const scrollPos = window.scrollY + 72 + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = $(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
      }
    });
  }

  // Smooth scroll for anchor links
  $$('a[href^="#"]').forEach(link => {
    on(link, 'click', e => {
      const target = $(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        window.scrollTo({
          top: target.offsetTop - navH,
          behavior: 'smooth'
        });
      }
    });
  });
})();

// Fix variable in function
function var_(name, fallback) {
  return parseInt(getComputedStyle(document.documentElement).getPropertyValue(name)) || fallback;
}

/* ===== SCROLL PROGRESS BAR ===== */
(function initScrollProgress() {
  const bar = $('#scroll-bar');
  if (!bar) return;
  on(window, 'scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / total * 100) + '%';
  }, { passive: true });
})();

/* ===== BACK TO TOP ===== */
(function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;
  on(window, 'scroll', () => btn.classList.toggle('visible', window.scrollY > 500), { passive: true });
  on(btn, 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ===== ANIMATED COUNTERS ===== */
(function initCounters() {
  const counters = $$('.stat-number[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const duration = 1800;
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ===== SKILL BARS ===== */
(function initSkillBars() {
  const bars = $$('.skill-bar[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      bar.style.width = bar.dataset.width + '%';
      observer.unobserve(bar);
    });
  }, { threshold: 0.3 });

  bars.forEach(b => observer.observe(b));
})();

/* ===== SKILL FILTER ===== */
(function initSkillFilter() {
  const buttons = $$('.skill-cat-btn');
  const cards = $$('.skill-card[data-cat]');

  buttons.forEach(btn => {
    on(btn, 'click', () => {
      const cat = btn.dataset.cat;
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach((card, i) => {
        const match = cat === 'all' || card.dataset.cat === cat;
        if (match) {
          card.classList.remove('hidden');
          card.style.animation = `fadeIn 0.4s ease ${i * 0.04}s both`;
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

/* ===== CUSTOM CURSOR ===== */
(function initCursor() {
  const dot = $('#cursorDot');
  const outline = $('#cursorOutline');
  if (!dot || !outline) return;
  if (window.innerWidth < 640) return;

  let mouseX = 0, mouseY = 0;
  let outX = 0, outY = 0;

  on(document, 'mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Smooth outline follow
  (function animateCursor() {
    outX += (mouseX - outX) * 0.12;
    outY += (mouseY - outY) * 0.12;
    outline.style.left = outX + 'px';
    outline.style.top = outY + 'px';
    requestAnimationFrame(animateCursor);
  })();

  // Hover effects
  const interactables = 'a, button, .skill-card, .project-card, .service-card, input, textarea';
  on(document, 'mouseover', e => {
    if (e.target.closest(interactables)) {
      dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
      outline.style.width = '54px';
      outline.style.height = '54px';
      outline.style.borderColor = 'rgba(0, 212, 255, 0.8)';
    }
  });
  on(document, 'mouseout', e => {
    if (e.target.closest(interactables)) {
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      outline.style.width = '36px';
      outline.style.height = '36px';
      outline.style.borderColor = 'rgba(0, 212, 255, 0.5)';
    }
  });
})();

/* ===== THEME TOGGLE ===== */
(function initTheme() {
  const toggle = $('#themeToggle');
  const icon = $('#themeIcon');
  const html = document.documentElement;
  if (!toggle) return;

  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateIcon(saved);

  on(toggle, 'click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    updateIcon(next);
  });

  function updateIcon(theme) {
    if (!icon) return;
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
})();

/* ===== CONTACT FORM ===== */
(function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;

  on(form, 'submit', async e => {
    e.preventDefault();
    const btn = $('#submitBtn');
    const btnText = $('#btnText');
    const btnLoading = $('#btnLoading');
    const success = $('#formSuccess');

    // Show loading
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    btn.disabled = true;

    // Simulate send (replace with real API)
    await new Promise(r => setTimeout(r, 1600));

    btnText.style.display = 'flex';
    btnLoading.style.display = 'none';
    btn.disabled = false;
    success.classList.add('show');
    form.reset();

    setTimeout(() => success.classList.remove('show'), 5000);
  });

  // Input focus animations
  $$('.form-input').forEach(input => {
    on(input, 'focus', () => {
      input.closest('.input-wrap')?.querySelector('.input-icon')?.style
        && (input.closest('.input-wrap').querySelector('.input-icon').style.color = 'var(--accent)');
    });
    on(input, 'blur', () => {
      if (!input.value) {
        const icon = input.closest('.input-wrap')?.querySelector('.input-icon');
        if (icon) icon.style.color = '';
      }
    });
  });
})();

/* ===== FOOTER YEAR ===== */
(function setYear() {
  const el = $('#year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ===== GSAP SCROLL ANIMATIONS ===== */
(function initGSAPScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Stats parallax
  gsap.to('.stats-section', {
    scrollTrigger: {
      trigger: '.stats-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    },
    backgroundPositionY: '30%'
  });

  // Service card entrance
  $$('.service-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.07,
      ease: 'power2.out'
    });
  });

  // Section titles magnetic feel
  $$('.section-title').forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      x: -30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });
})();

/* ===== NAVBAR ACTIVE UPDATE (INTERSECTION OBSERVER) ===== */
(function initActiveNavObserver() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(s => observer.observe(s));
})();

/* ===== PROJECT CARD TILT EFFECT ===== */
(function initTilt() {
  if (window.innerWidth < 768) return;

  $$('.project-card, .service-card').forEach(card => {
    on(card, 'mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });

    on(card, 'mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ===== GLOWING MOUSE TRAIL ===== */
(function initMouseGlow() {
  if (window.innerWidth < 768) return;

  const hero = $('.hero');
  if (!hero) return;

  on(hero, 'mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    hero.style.setProperty('--mouse-x', x + 'px');
    hero.style.setProperty('--mouse-y', y + 'px');
  });
})();

/* ===== LAZY LOAD IMAGES ===== */
(function initLazyImages() {
  const images = $$('img[src]');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.transition = 'opacity 0.5s ease';
        img.style.opacity = '1';
        observer.unobserve(img);
      }
    });
  }, { threshold: 0.1 });

  images.forEach(img => {
    img.style.opacity = '0';
    observer.observe(img);
  });
})();

/* ===== SKILL CARD RIPPLE EFFECT ===== */
(function initRipple() {
  $$('.skill-card').forEach(card => {
    on(card, 'click', e => {
      const rect = card.getBoundingClientRect();
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: 4px; height: 4px;
        background: rgba(0,212,255,0.4);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        left: ${e.clientX - rect.left}px;
        top: ${e.clientY - rect.top}px;
        animation: rippleEffect 0.6s ease-out forwards;
        pointer-events: none; z-index: 10;
      `;
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add keyframe if not present
  if (!document.querySelector('#rippleStyle')) {
    const style = document.createElement('style');
    style.id = 'rippleStyle';
    style.textContent = `
      @keyframes rippleEffect {
        to { width: 200px; height: 200px; opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
})();

/* ===== PAGE TRANSITION ===== */
(function initPageTransition() {
  // Add transition overlay
  const overlay = document.createElement('div');
  overlay.className = 'page-transition';
  document.body.appendChild(overlay);

  // Entrance
  if (typeof gsap !== 'undefined') {
    gsap.from(overlay, {
      y: '100%', duration: 0, ease: 'none'
    });
  }
})();

/* ===== CONSOLE BRANDING ===== */
console.log(
  '%c Portfolio %c Built with ♥ ',
  'background: linear-gradient(135deg, #00d4ff, #a855f7); color: #000; padding: 6px 16px; border-radius: 4px 0 0 4px; font-weight: bold; font-size: 14px;',
  'background: #0a1020; color: #00d4ff; padding: 6px 16px; border-radius: 0 4px 4px 0; font-size: 14px;'
);


/* ===== GOOGLE SHEET INTEGRATION (FINAL WORKING - NO CORS FIX) ===== */
(function sendToGoogleSheet() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function () {

    // ✅ Values capture immediately (important)
    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email")?.value;
    const subject = document.getElementById("subject")?.value;
    const message = document.getElementById("message")?.value;

    // ✅ Delay taaki tera existing animation complete ho
    setTimeout(() => {

      fetch("https://script.google.com/macros/s/AKfycbzlDWGyrjyphcXY08CAg6Xmyk4GpYkKF2cwNBTc2jQoUdjL1X8LK886YmfoKSNzHjwU/exec", {
        method: "POST",
        mode: "no-cors", // 🔥 MOST IMPORTANT
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          name: name,
          email: email,
          subject: subject,
          message: message
        })
      });

      console.log("✅ Data sent to Google Sheet");

    }, 2000); // delay important

  });
})();