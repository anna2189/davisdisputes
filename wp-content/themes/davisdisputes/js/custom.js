(function () {
  function init() {
    console.log('DavisDisputes custom.js init');

    // ============================================================
    // Hero Section Fade on Scroll
    // ============================================================
    const hero = document.querySelector('.hero');

    function fadeHeroOnScroll() {
      if (!hero) return;

      const scrollY = window.scrollY;
      const fadeUntil = 100; // Fades out over the first 100px of scrolling
      const opacity = Math.max(1 - scrollY / fadeUntil, 0);
      const translateY = Math.min(scrollY / 5, 50);

      if (typeof gsap !== 'undefined') {
        gsap.set(hero, {
          opacity: opacity,
          y: -translateY,
        });
      } else {
        hero.style.opacity = opacity;
        hero.style.transform = `translateY(-${translateY}px)`;
      }
    }

    window.addEventListener('scroll', fadeHeroOnScroll);
    fadeHeroOnScroll();

    // ============================================================
    // Header Mobile Navigation
    // ============================================================
    const navToggleBtn = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('.main-navigation');

    console.log('Header nav toggle button found:', !!navToggleBtn);
    console.log('Header primary nav found:', !!primaryNav);

    if (!navToggleBtn || !primaryNav) {
      return;
    }

    // Open / close main menu
    navToggleBtn.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      const isOpening = !primaryNav.classList.contains('toggled');

      primaryNav.classList.toggle('toggled', isOpening);
      document.body.classList.toggle('nav-open', isOpening);
      navToggleBtn.setAttribute('aria-expanded', isOpening ? 'true' : 'false');

      console.log(isOpening ? 'Header menu OPENED' : 'Header menu CLOSED');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
      if (!primaryNav.classList.contains('toggled')) return;

      const clickInsideNav =
        primaryNav.contains(event.target) ||
        navToggleBtn.contains(event.target);

      if (!clickInsideNav) {
        primaryNav.classList.remove('toggled');
        document.body.classList.remove('nav-open');
        navToggleBtn.setAttribute('aria-expanded', 'false');
        console.log('Clicked outside header - closing menu');
      }
    });

    // Mobile submenus (tap to open)
    const menuItemsWithChildren = primaryNav.querySelectorAll(
      '.menu-item-has-children > a, .page_item_has_children > a'
    );

    for (const link of menuItemsWithChildren) {
      link.addEventListener('click', function (event) {
        // Only intercept on mobile when menu is open
        if (
          window.matchMedia('(max-width: 768px)').matches &&
          primaryNav.classList.contains('toggled')
        ) {
          event.preventDefault();
          const menuItem = this.parentNode;
          menuItem.classList.toggle('open');
        }
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && primaryNav.classList.contains('toggled')) {
        primaryNav.classList.remove('toggled');
        document.body.classList.remove('nav-open');
        navToggleBtn.setAttribute('aria-expanded', 'false');
        navToggleBtn.focus();
      }
    });

    // Reset nav when going back to desktop width
    const mq = window.matchMedia('(min-width: 769px)');
    mq.addEventListener('change', function (e) {
      if (e.matches && primaryNav.classList.contains('toggled')) {
        primaryNav.classList.remove('toggled');
        document.body.classList.remove('nav-open');
        navToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Run init whether DOMContentLoaded already fired or not
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
