/* =========================================================
   ELB Car Detailing – JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll behaviour ──────────────────────────── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveLink();
  }

  function highlightActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ── Mobile menu ──────────────────────────────────────── */
  const hamburger   = document.getElementById('hamburger');
  const mobileNav   = document.getElementById('mobileNav');
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  function toggleMobileMenu(open) {
    hamburger.classList.toggle('open', open);
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.contains('open');
      toggleMobileMenu(!isOpen);
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  /* ── Smooth scroll for anchor links ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Intersection Observer for fade-up animations ────── */
  const fadeEls = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => observer.observe(el));

  /* ── Counter animation (hero stats) ──────────────────── */
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el      = entry.target;
        const target  = parseInt(el.dataset.count, 10);
        const suffix  = el.dataset.suffix || '';
        const duration = 1800;
        const step    = Math.ceil(target / (duration / 16));
        let current   = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current.toLocaleString() + suffix;
        }, 16);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  /* ── Booking form validation & submit ────────────────── */
  const form = document.getElementById('bookingForm');

  function validateField(field) {
    const group = field.closest('.form-group');
    const value = field.value.trim();
    let valid = true;

    if (field.required && !value) {
      valid = false;
    } else if (field.type === 'email' && value) {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (field.type === 'tel' && value) {
      valid = /^[\d\s\-\+\(\)]{7,20}$/.test(value);
    }

    group.classList.toggle('has-error', !valid);
    return valid;
  }

  if (form) {
    // Live validation on blur
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.form-group').classList.contains('has-error')) {
          validateField(field);
        }
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();

      const fields   = form.querySelectorAll('input, select, textarea');
      let allValid   = true;

      fields.forEach(field => {
        if (!validateField(field)) allValid = false;
      });

      if (!allValid) return;

      // Simulate async submission
      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      setTimeout(() => {
        form.style.display = 'none';
        const successMsg = document.getElementById('formSuccess');
        if (successMsg) successMsg.style.display = 'block';
      }, 1200);
    });
  }

  /* ── Gallery lightbox (simple) ───────────────────────── */
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const label = item.querySelector('.gallery-overlay span')?.textContent || 'Detail Shot';
      // Simple message – in production replace with a real lightbox library
      console.log('Gallery item clicked:', label);
    });
  });

  /* ── Service card book button ────────────────────────── */
  document.querySelectorAll('[data-service]').forEach(btn => {
    btn.addEventListener('click', () => {
      const service = btn.dataset.service;
      const select  = document.getElementById('serviceSelect');
      if (select) {
        select.value = service;
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => select.focus(), 600);
      }
    });
  });

});
