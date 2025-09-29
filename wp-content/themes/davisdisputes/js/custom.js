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

  // Mobile Navigation Toggle
  const navToggleBtn = document.querySelector('.mobile-nav-toggle');
  const primaryNav = document.querySelector('.main-navigation');

  if (navToggleBtn && primaryNav) {
    const toggleNav = (force) => {
      const shouldOpen = typeof force === 'boolean' ? force : !primaryNav.classList.contains('toggled');
      primaryNav.classList.toggle('toggled', shouldOpen);
      navToggleBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      document.body.classList.toggle('nav-open', shouldOpen);
      var headerEl = document.getElementById('site-header');
      if (headerEl) headerEl.classList.toggle('nav-open', shouldOpen);
    };

    // Click to open/close
    navToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
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
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('toggled')) {
        toggleNav(false);
        navToggleBtn.focus();
      }
    });

    // Reset when viewport grows beyond mobile breakpoint
    const mq = window.matchMedia('(min-width: 769px)');
    const handleMQ = () => {
      if (mq.matches) {
        toggleNav(false);
      }
    };
    if (mq.addEventListener) {
      mq.addEventListener('change', handleMQ);
    } else if (mq.addListener) {
      mq.addListener(handleMQ);
    }
  }
});
