/* =========================================================
   SafeCore Landing Page — main.js
   Vanilla JS ES6+, sin librerías externas.
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNavbarScroll();
  initSmoothScroll();
  initScrollAnimations();
  initContactForm();
  initDynamicYear();
  initThemeToggle();
  initClientsCarousel();
});

/* ---------------------------------------------------------
   Carrusel de cartera de clientes
--------------------------------------------------------- */
function initClientsCarousel() {
  const track = document.getElementById('clientsTrack');
  if (!track) return;

  const originalCards = Array.from(track.children);
  if (!originalCards.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // se queda estático, sin animación, por accesibilidad

  // Duplicar el set de tarjetas para lograr un loop continuo sin salto visible
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.setAttribute('tabindex', '-1');
    track.appendChild(clone);
  });

  let setWidth = 0;
  function measure() {
    setWidth = track.scrollWidth / 2; // ancho de un solo set (la mitad, ya duplicado)
  }
  measure();
  window.addEventListener('resize', measure);

  const SPEED_PX_PER_SEC = 70; // velocidad del recorrido continuo
  let isPaused = false;
  let lastTimestamp = null;

  function frame(timestamp) {
    if (lastTimestamp === null) lastTimestamp = timestamp;
    const deltaSeconds = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    if (!isPaused && setWidth > 0) {
      track.scrollLeft += SPEED_PX_PER_SEC * deltaSeconds;
      if (track.scrollLeft >= setWidth) {
        track.scrollLeft -= setWidth; // reinicio invisible: el clon calza exacto con el original
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  track.addEventListener('mouseenter', () => { isPaused = true; });
  track.addEventListener('mouseleave', () => { isPaused = false; });
  track.addEventListener('pointerdown', () => { isPaused = true; });
  track.addEventListener('pointerup', () => { isPaused = false; });
  track.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
  track.addEventListener('touchend', () => { isPaused = false; });
}

/* ---------------------------------------------------------
   Modo oscuro / claro
--------------------------------------------------------- */
function initThemeToggle() {
  const toggles = [document.getElementById('themeToggle'), document.getElementById('themeToggleMobile')];
  const root = document.documentElement;

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    document.querySelectorAll('.theme-toggle').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
      const icon = btn.querySelector('.theme-toggle__icon');
      if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
    try { localStorage.setItem('safecore-theme', theme); } catch (e) {}
  };

  let current = 'light';
  try {
    current = localStorage.getItem('safecore-theme') === 'dark' ? 'dark' : 'light';
  } catch (e) {}
  applyTheme(current);

  toggles.forEach((toggle) => {
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark');
    });
  });
}

/* ---------------------------------------------------------
   Menú móvil
--------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ---------------------------------------------------------
   Navbar: apariencia al hacer scroll
--------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const toggleScrolled = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  toggleScrolled();
  window.addEventListener('scroll', toggleScrolled, { passive: true });
}

/* ---------------------------------------------------------
   Smooth scroll para enlaces internos
--------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ---------------------------------------------------------
   Animaciones al hacer scroll (Intersection Observer)
--------------------------------------------------------- */
function initScrollAnimations() {
  const items = document.querySelectorAll('[data-animate]');
  if (!items.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = (index % 4) * 70;
          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   Formulario de contacto: validación y estado de éxito
--------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const successBox = document.getElementById('formSuccess');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const currentLang = () => document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'es';
  const t = (key) => (typeof safecoreGetDictValue === 'function' && safecoreGetDictValue(key, currentLang())) || '';

  const setError = (input, errorId, message) => {
    const errorEl = document.getElementById(errorId);
    const field = input.closest('.form-field');
    if (errorEl) errorEl.textContent = message;
    if (field) field.classList.toggle('has-error', Boolean(message));
  };

  const validate = () => {
    let isValid = true;

    if (!nameInput.value.trim()) {
      setError(nameInput, 'nameError', t('form.errorName'));
      isValid = false;
    } else {
      setError(nameInput, 'nameError', '');
    }

    if (!emailInput.value.trim()) {
      setError(emailInput, 'emailError', t('form.errorEmail'));
      isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      setError(emailInput, 'emailError', t('form.errorEmailInvalid'));
      isValid = false;
    } else {
      setError(emailInput, 'emailError', '');
    }

    if (!messageInput.value.trim()) {
      setError(messageInput, 'messageError', t('form.errorMessage'));
      isValid = false;
    } else {
      setError(messageInput, 'messageError', '');
    }

    return isValid;
  };

  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener('blur', validate);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (successBox) successBox.classList.remove('is-visible');

    if (!validate()) return;

    // Demostración frontend: no existe backend real conectado.
    // Para producción, reemplazar este bloque por una llamada fetch()
    // a un servicio o endpoint real de envío de formularios.
    if (successBox) {
      successBox.classList.add('is-visible');
      successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    form.reset();
  });
}

/* ---------------------------------------------------------
   Año dinámico en el footer
--------------------------------------------------------- */
function initDynamicYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
