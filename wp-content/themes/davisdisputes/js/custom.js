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
  
  // ============================================================
  // Header Mobile Navigation - Simplified to match working footer
  // ============================================================
  const navToggleBtn = document.querySelector('.mobile-nav-toggle');
  const primaryNav = document.querySelector('.main-navigation');

  console.log('Header nav toggle button found:', !!navToggleBtn);
  console.log('Header primary nav found:', !!primaryNav);

  if (navToggleBtn && primaryNav) {
    // Simple toggle function - matching footer style
    navToggleBtn.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      console.log('Header toggle button clicked!');
      
      // Close footer menu if open
      const footerNav = document.querySelector('.footer-navigation');
      if (footerNav && footerNav.classList.contains('toggled')) {
        footerNav.classList.remove('toggled');
        document.body.classList.remove('footer-menu-open');
        const footerBtn = document.querySelector('.footer-mobile-toggle');
        if (footerBtn) {
          footerBtn.setAttribute('aria-expanded', 'false');
        }
      }
      
      // Toggle header menu
      primaryNav.classList.toggle('toggled');
      console.log('Header nav toggled! Classes:', primaryNav.className);
      
      // Update button state and body class
      if (primaryNav.classList.contains('toggled')) {
        document.body.classList.add('nav-open');
        navToggleBtn.setAttribute('aria-expanded', 'true');
        console.log('Header menu OPENED');
      } else {
        document.body.classList.remove('nav-open');
        navToggleBtn.setAttribute('aria-expanded', 'false');
        console.log('Header menu CLOSED');
      }
    });

    // Remove the .toggled class when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = primaryNav.contains(event.target) || navToggleBtn.contains(event.target);
      
      if (!isClickInside && primaryNav.classList.contains('toggled')) {
        console.log('Clicked outside header - closing menu');
        primaryNav.classList.remove('toggled');
        navToggleBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });

    // Handle submenus on mobile
    const menuItemsWithChildren = primaryNav.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');
    
    for (const link of menuItemsWithChildren) {
      link.addEventListener('click', function(event) {
        // Only prevent default on mobile when menu is open
        if (window.matchMedia('(max-width: 768px)').matches && primaryNav.classList.contains('toggled')) {
          event.preventDefault();
          const menuItem = this.parentNode;
          menuItem.classList.toggle('open');
        }
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && primaryNav.classList.contains('toggled')) {
        primaryNav.classList.remove('toggled');
        navToggleBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
        navToggleBtn.focus();
      }
    });

    // Reset when viewport changes to desktop
    const mediaQuery = window.matchMedia('(min-width: 769px)');
    mediaQuery.addEventListener('change', function() {
      if (mediaQuery.matches && primaryNav.classList.contains('toggled')) {
        primaryNav.classList.remove('toggled');
        navToggleBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });
  }
});