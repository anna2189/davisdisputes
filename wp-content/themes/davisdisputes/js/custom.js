(function () {
  function init() {
    console.log('DavisDisputes custom.js init');

    // ============================================================
    // Hero Section Fade on Scroll + Header on Scroll
    // ============================================================
    const hero   = document.querySelector('.hero');
    const header = document.getElementById('site-header');

    function fadeHeroOnScroll() {
      if (!hero) return;

      const scrollY    = window.scrollY;
      const fadeUntil  = 100; // Fades out over the first 100px of scrolling
      const opacity    = Math.max(1 - scrollY / fadeUntil, 0);
      const translateY = Math.min(scrollY / 5, 50);

      hero.style.opacity         = opacity.toString();
      hero.style.transform       = `translateY(${translateY}px)`;
      hero.style.pointerEvents   = opacity <= 0 ? 'none' : 'auto';
    }

    function updateHeaderOnScroll() {
      if (!header) return;
      const threshold = 10; // px from top before switching
      const isScrolled = window.scrollY > threshold;
    
      header.classList.toggle('scrolled', isScrolled);
      document.body.classList.toggle('header-scrolled', isScrolled);
    }

    function onScroll() {
      fadeHeroOnScroll();
      updateHeaderOnScroll();
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // run once on load

    // ============================================================
    // Header Mobile Navigation - FIXED FOR SAFARI
    // ============================================================
    const navToggleBtn = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('.main-navigation');

    console.log('Header nav toggle button found:', !!navToggleBtn);
    console.log('Header primary nav found:', !!primaryNav);

    if (!navToggleBtn || !primaryNav) {
      return;
    }

    // Open / close main menu with Safari fixes
    function toggleMenu(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      const isOpening = !primaryNav.classList.contains('toggled');

      // Toggle classes
      primaryNav.classList.toggle('toggled', isOpening);
      document.body.classList.toggle('nav-open', isOpening);
      navToggleBtn.setAttribute('aria-expanded', isOpening ? 'true' : 'false');

      // Safari-specific: force repaint
      if (window.navigator.userAgent.indexOf('Safari') > -1) {
        primaryNav.style.display = 'none';
        primaryNav.offsetHeight; // Trigger reflow
        primaryNav.style.display = '';
      }

      console.log(isOpening ? 'Header menu OPENED' : 'Header menu CLOSED');
    }

    // Use both click and touchstart for better Safari support
    navToggleBtn.addEventListener('click', toggleMenu);
    
    // Add touchstart for iOS Safari (but prevent double-firing)
    let touchHandled = false;
    navToggleBtn.addEventListener('touchstart', function(event) {
      if (!touchHandled) {
        touchHandled = true;
        setTimeout(() => { touchHandled = false; }, 500); // Reset flag after delay
        toggleMenu(event);
      }
    }, { passive: false });

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

    // Mobile submenus (tap to open) with Safari fixes
    const menuItemsWithChildren = primaryNav.querySelectorAll(
      '.menu-item-has-children > a, .page_item_has_children > a'
    );

    for (const link of menuItemsWithChildren) {
      // Prevent default behavior on mobile
      link.addEventListener('click', function (event) {
        // Only intercept on mobile when menu is open
        if (
          window.matchMedia('(max-width: 768px)').matches &&
          primaryNav.classList.contains('toggled')
        ) {
          event.preventDefault();
          event.stopPropagation();
          const menuItem = this.parentNode;
          menuItem.classList.toggle('open');
          
          // Safari: Force repaint of submenu
          const submenu = menuItem.querySelector('.sub-menu, ul');
          if (submenu && window.navigator.userAgent.indexOf('Safari') > -1) {
            submenu.style.display = 'none';
            submenu.offsetHeight; // Trigger reflow
            submenu.style.display = '';
          }
        }
      });

      // Add touch support for Safari
      link.addEventListener('touchend', function (event) {
        if (
          window.matchMedia('(max-width: 768px)').matches &&
          primaryNav.classList.contains('toggled')
        ) {
          event.preventDefault();
          const menuItem = this.parentNode;
          menuItem.classList.toggle('open');
        }
      }, { passive: false });
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

    // Safari iOS viewport height fix
    function setViewportHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Set initial viewport height and update on resize
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
  }

  // Run init whether DOMContentLoaded already fired or not
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* =========================================================
   MOBILE SUBMENU TOGGLE (works on iOS / Android / desktop)
   ========================================================= */
   (function () {
    'use strict';
  
    console.log('DD mobile submenu toggle init');
  
    function onNavClick(event) {
      var nav = document.querySelector('.main-navigation');
      if (!nav) return;
  
      // Only act on small screens
      if (window.innerWidth > 960) return;
  
      // Only when mobile menu is open
      if (!nav.classList.contains('toggled')) return;
  
      var target = event.target;
      var link = null;
  
      // Walk up to find an <a> whose parent <li> has children
      while (target && target !== nav && target !== document.body) {
        if (
          target.nodeType === 1 &&
          target.tagName.toLowerCase() === 'a' &&
          target.parentNode &&
          target.parentNode.nodeType === 1 &&
          target.parentNode.classList &&
          (target.parentNode.classList.contains('menu-item-has-children') ||
            target.parentNode.classList.contains('page_item_has_children'))
        ) {
          link = target;
          break;
        }
        target = target.parentNode;
      }
  
      if (!link) return; // click on a normal item
  
      event.preventDefault();
      event.stopPropagation();
  
      var li = link.parentNode;
      if (!li) return;
  
      var isOpen = li.classList.contains('open');
  
      // Close other open submenus
      var openItems = nav.querySelectorAll(
        '.menu-item-has-children.open, .page_item_has_children.open'
      );
      for (var i = 0; i < openItems.length; i++) {
        if (openItems[i] !== li) {
          openItems[i].classList.remove('open');
        }
      }
  
      // Toggle this one
      if (isOpen) {
        li.classList.remove('open');
        console.log('DD submenu closed:', link.textContent);
      } else {
        li.classList.add('open');
        console.log('DD submenu opened:', link.textContent);
      }
    }
  
    // Delegate click events from the whole document
    document.addEventListener('click', onNavClick, false);
  })();
  