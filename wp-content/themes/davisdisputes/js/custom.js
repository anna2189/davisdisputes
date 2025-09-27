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
});
