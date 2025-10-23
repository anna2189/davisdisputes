document.addEventListener('DOMContentLoaded', function () {
  // Modern animations are now handled by modern-animations.js with GSAP
  // This file is for any additional custom functionality
  
  console.log('DavisDisputes custom.js loaded - Modern animations active');

  // --- Hero Section Fade on Scroll Logic (Enhanced with GSAP if available) ---
  const hero = document.querySelector('.hero');

  function fadeHeroOnScroll() {
    if (!hero) return; // Only run if the hero section exists
    
    const scrollY = window.scrollY;
    const fadeUntil = 100; // Fades out over the first 100px of scrolling
    const opacity = Math.max(1 - scrollY / fadeUntil, 0);
    const translateY = Math.min(scrollY / 5, 50);

    // Use GSAP if available for smoother animations, otherwise fallback to CSS
    if (typeof gsap !== 'undefined') {
      gsap.set(hero, {
        opacity: opacity,
        y: -translateY
      });
    } else {
      hero.style.opacity = opacity;
      hero.style.transform = `translateY(-${translateY}px)`;
    }
  }

  // Add a single scroll listener for effects that still need it
  window.addEventListener('scroll', () => {
    fadeHeroOnScroll();
  });

  // Run hero fade once on load to set its initial state
  fadeHeroOnScroll();
  
  // Add any additional custom functionality here
  // The modern animations (cards, buttons, etc.) are handled by modern-animations.js

  // ============================================================
  // Header Mobile Navigation Toggle
  // ============================================================
  const navToggleBtn = document.querySelector('.mobile-nav-toggle');
  const primaryNav = document.querySelector('.main-navigation');

  console.log('Nav toggle button found:', !!navToggleBtn);
  console.log('Primary nav found:', !!primaryNav);

    // Setup accordion-style submenus on mobile
    const setupMobileSubmenus = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches && primaryNav.classList.contains('toggled');
      const parents = primaryNav.querySelectorAll('.menu-item-has-children > a');
      parents.forEach(a => {
        a.setAttribute('aria-expanded', 'false');
        // avoid multiple handlers
        a._submenuBound && a.removeEventListener('click', a._submenuBound);
        const handler = (e) => {
          if (!window.matchMedia('(max-width: 768px)').matches || !primaryNav.classList.contains('toggled')) return;
          const li = a.parentElement;
          const isOpen = li.classList.contains('open');
          e.preventDefault(); // first tap toggles, second tap on same link will navigate after open state
          // close others
          primaryNav.querySelectorAll('.menu-item-has-children.open').forEach(el => { if (el !== li) el.classList.remove('open'); });
          li.classList.toggle('open', !isOpen);
          a.setAttribute('aria-expanded', (!isOpen).toString());
        };
        a._submenuBound = handler;
        a.addEventListener('click', handler);
      });
    };


  if (navToggleBtn && primaryNav) {
    const toggleNav = (force) => {
      const footerNav = document.querySelector('.footer-navigation');
      const footerBtn = document.querySelector('.footer-mobile-toggle');
      const shouldOpen = typeof force === 'boolean' ? force : !primaryNav.classList.contains('toggled');
      
      console.log('Toggling nav, shouldOpen:', shouldOpen);
      
      primaryNav.classList.toggle('toggled', shouldOpen);
      navToggleBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      document.body.classList.toggle('nav-open', shouldOpen);
      if (shouldOpen) setupMobileSubmenus();
      
      // Close footer menu when opening header
      if (shouldOpen && footerNav && footerNav.classList.contains('toggled')) {
        footerNav.classList.remove('toggled');
        if (footerBtn) footerBtn.setAttribute('aria-expanded', 'false');
      }
      
      var headerEl = document.getElementById('site-header');
      if (headerEl) {
        headerEl.classList.toggle('nav-open', shouldOpen);
      }
      
      // Debug: Check if menu ul exists
      const menuUl = primaryNav.querySelector('ul');
      console.log('Menu UL found:', !!menuUl);
      if (menuUl) {
        console.log('Menu UL display:', window.getComputedStyle(menuUl).display);
        console.log('Menu items count:', menuUl.querySelectorAll('li').length);
      }
    };

    // Click to open/close
    navToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Toggle button clicked');
      toggleNav();
    });

    // Keyboard support (Enter/Space)
    navToggleBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleNav();
      }
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
      const clickedToggle = e.target.closest('.mobile-nav-toggle');
      const clickedNav = e.target.closest('.main-navigation');
      if (!clickedToggle && !clickedNav && primaryNav.classList.contains('toggled')) {
        toggleNav(false);
        primaryNav && primaryNav.querySelectorAll('.menu-item-has-children.open').forEach(el => el.classList.remove('open'));
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('toggled')) {
        toggleNav(false);
        primaryNav && primaryNav.querySelectorAll('.menu-item-has-children.open').forEach(el => el.classList.remove('open'));
        navToggleBtn.focus();
      }
    });

    // Reset when viewport grows beyond mobile breakpoint
    const mq = window.matchMedia('(min-width: 769px)');
    const handleMQ = () => {
      if (mq.matches) {
        toggleNav(false);
        primaryNav && primaryNav.querySelectorAll('.menu-item-has-children.open').forEach(el => el.classList.remove('open'));
      }
    };
    if (mq.addEventListener) {
      mq.addEventListener('change', handleMQ);
    } else if (mq.addListener) {
      mq.addListener(handleMQ);
    }
  }

  // ============================================================
  // Footer Mobile Navigation Toggle
  // ============================================================
  const footerNavToggleBtn = document.querySelector('.footer-mobile-toggle');
  const footerNav = document.querySelector('.footer-navigation');

  console.log('Footer nav toggle button found:', !!footerNavToggleBtn);
  console.log('Footer nav found:', !!footerNav);

  if (footerNavToggleBtn && footerNav) {
    const toggleFooterNav = (force) => {
      const primaryNav = document.querySelector('.main-navigation');
      const navToggleBtn = document.querySelector('.mobile-nav-toggle');
      const shouldOpen = typeof force === 'boolean' ? force : !footerNav.classList.contains('toggled');
      
      console.log('Toggling footer nav, shouldOpen:', shouldOpen);
      
      footerNav.classList.toggle('toggled', shouldOpen);
      
      // Close header flyout when opening footer
      if (shouldOpen && primaryNav && primaryNav.classList.contains('toggled')) {
        primaryNav.classList.remove('toggled');
        document.body.classList.remove('nav-open');
        if (navToggleBtn) navToggleBtn.setAttribute('aria-expanded', 'false');
      }
      footerNavToggleBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    };

    // Click to open/close
    footerNavToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Footer toggle button clicked');
      toggleFooterNav();
    });

    // Keyboard support (Enter/Space)
    footerNavToggleBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFooterNav();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && footerNav.classList.contains('toggled')) {
        toggleFooterNav(false);
        footerNavToggleBtn.focus();
      }
    });

    // Reset when viewport grows beyond mobile breakpoint
    const footerMq = window.matchMedia('(min-width: 769px)');
    const handleFooterMQ = () => {
      if (footerMq.matches) {
        toggleFooterNav(false);
      }
    };
    if (footerMq.addEventListener) {
      footerMq.addEventListener('change', handleFooterMQ);
    } else if (footerMq.addListener) {
      footerMq.addListener(handleFooterMQ);
    }
  }
});