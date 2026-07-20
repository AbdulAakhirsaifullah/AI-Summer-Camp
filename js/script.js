/* =========================================================
   AI Summer Camp — shared site behavior
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Page loader ---------- */
  const loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hide'), 250);
    });
    // fallback in case load already fired
    setTimeout(() => loader.classList.add('hide'), 1200);
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const mobilePanel = document.querySelector('.mobile-panel');
  if (navToggle && mobilePanel) {
    navToggle.addEventListener('click', () => {
      mobilePanel.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', mobilePanel.classList.contains('open'));
    });
    mobilePanel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobilePanel.classList.remove('open'));
    });
  }

  /* ---------- Dark mode toggle ---------- */
  const THEME_KEY = 'ai-summer-camp-theme';
  const themeBtn = document.querySelector('.theme-toggle');
  const root = document.documentElement;

  function applyTheme(theme) {
    root.classList.toggle('dark', theme === 'dark');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark' ? sunIcon() : moonIcon();
    }
  }
  function moonIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  }
  function sunIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>';
  }

  let saved;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) { saved = null; }
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = root.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- Sticky navbar shadow on scroll ---------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 8 ? '0 6px 20px rgba(15,23,42,0.06)' : 'none';
    }, { passive: true });
  }

  /* ---------- Scroll to top button ---------- */
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('show', window.scrollY > 480);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Fade-in on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Button ripple effect ---------- */
  document.querySelectorAll('.btn, .chip-filter').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 1.3;
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.style.position = btn.style.position || 'relative';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* ---------- Activity search + filter (track pages) ---------- */
  const searchInput = document.querySelector('#activitySearch');
  const activityCards = document.querySelectorAll('.activity-card');
  const filterChips = document.querySelectorAll('.chip-filter');
  const noResults = document.querySelector('.no-results');
  let activeDifficulty = 'all';

  function applyFilters() {
    if (!activityCards.length) return;
    const q = (searchInput ? searchInput.value : '').trim().toLowerCase();
    let visibleCount = 0;
    activityCards.forEach(card => {
      const title = (card.dataset.title || '').toLowerCase();
      const desc = (card.dataset.desc || '').toLowerCase();
      const diff = card.dataset.difficulty || '';
      const matchesText = !q || title.includes(q) || desc.includes(q);
      const matchesDiff = activeDifficulty === 'all' || diff === activeDifficulty;
      const visible = matchesText && matchesDiff;
      card.style.display = visible ? '' : 'none';
      if (visible) visibleCount++;
    });
    if (noResults) noResults.classList.toggle('show', visibleCount === 0);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (filterChips.length) {
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeDifficulty = chip.dataset.difficulty || 'all';
        applyFilters();
      });
    });
  }
  applyFilters();

});
