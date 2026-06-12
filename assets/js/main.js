/* ============================================================
   UNIVERSO VISTORIAS — main.js
   Módulos:
   1. Navbar scroll
   2. Menu mobile (hamburger)
   3. Scroll reveal
   4. Smooth scroll para âncoras
   5. Animação de contadores
   ============================================================ */

/* ── 1. NAVBAR SCROLL ── */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ── 2. MENU MOBILE ── */
function toggleMenu() {
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!ham || !menu) return;

  ham.classList.toggle('open');
  menu.classList.toggle('active');
  document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}


/* ── 3. SCROLL REVEAL ── */
(function () {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();


/* ── 4. SMOOTH SCROLL ── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();


/* ── 5. ANIMAÇÃO DE CONTADORES ── */
(function () {
  const statsEl = document.querySelector('.hero-stats');
  if (!statsEl) return;

  function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
      const text = el.textContent;
      const num  = parseFloat(text.replace(/[^0-9.]/g, ''));
      if (isNaN(num)) return;

      let start = 0;
      const duration = 1800;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        const cur      = Math.floor(eased * num);

        el.textContent = text.replace(/[0-9]+/, cur.toLocaleString('pt-BR'));
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = text;
      };

      requestAnimationFrame(step);
    });
  }

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObserver.unobserve(statsEl);
    }
  }, { threshold: 0.5 });

  statsObserver.observe(statsEl);
})();
