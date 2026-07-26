/**
 * Kanachur Islamic Education Trust (R) - Main Application Script (Updated)
 * Vanilla JavaScript (ES6+) for interactive UI, slideshow, gallery marquee, and floating controls.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initActiveNav();
  initHeroSlider();
  initScrollReveal();
  initAnimatedCounters();
  initBackToTop();
});

/**
 * Handles header state changes on page scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Toggle & Interactive Overlay
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  let navOverlay = document.querySelector('.nav-overlay');

  if (!toggleBtn || !navMenu) return;

  // Create overlay dynamically if missing
  if (!navOverlay) {
    navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
  }

  const closeMenu = () => {
    navMenu.classList.remove('open');
    navOverlay.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  const openMenu = () => {
    navMenu.classList.add('open');
    navOverlay.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking overlay backdrop
  navOverlay.addEventListener('click', closeMenu);

  // Close when clicking nav links
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking close buttons inside menu
  const closeBtns = navMenu.querySelectorAll('.nav-menu-close');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      toggleBtn.focus();
    }
  });
}

/**
 * Automatic Image Slideshow for Hero Section
 */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  if (!slides.length) return;

  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds

  const goToSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  };

  const nextSlide = () => {
    let next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  };

  let timer = setInterval(nextSlide, slideInterval);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goToSlide(index);
      timer = setInterval(nextSlide, slideInterval);
    });
  });
}

/**
 * Highlights active page navigation links
 */
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/**
 * Intersection Observer for Smooth Scroll Reveal Animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Count-up animation for verified institutional statistics
 */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('.stat-number[data-target]');
  if (!counterElements.length) return;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const easeProgress = progress * (2 - progress);
          const currentVal = Math.floor(easeProgress * target);

          el.textContent = currentVal + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = target + suffix;
          }
        };

        requestAnimationFrame(updateCount);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => counterObserver.observe(el));
}

/**
 * Back to Top Floating Button
 */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
