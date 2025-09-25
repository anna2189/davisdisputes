document.addEventListener('DOMContentLoaded', function () {
  // Initialize the AOS animation library
  AOS.init();

  // --- Hero Section Fade on Scroll Logic ---
  const hero = document.querySelector('.hero');

  function fadeHeroOnScroll() {
    if (!hero) return; // Only run if the hero section exists
    const scrollY = window.scrollY;
    const fadeUntil = 100; // Fades out over the first 100px of scrolling
    const opacity = Math.max(1 - scrollY / fadeUntil, 0);
    const translateY = Math.min(scrollY / 5, 50);

    hero.style.opacity = opacity;
    hero.style.transform = `translateY(-${translateY}px)`;
  }

  // Add a single scroll listener for effects that still need it
  window.addEventListener('scroll', () => {
    fadeHeroOnScroll();
  });

  // Run hero fade once on load to set its initial state
  fadeHeroOnScroll();
});