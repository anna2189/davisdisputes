/**
 * Simple mobile submenu toggle
 * Works the same on iOS, Android and desktop.
 */

(function () {
    'use strict';
  
    function handleToggle(event) {
      const nav = document.querySelector('.main-navigation');
      if (!nav) return;
  
      // Only act when mobile menu is open and on small screens
      if (window.innerWidth > 768 || !nav.classList.contains('toggled')) {
        return;
      }
  
      const link = event.target.closest('.main-navigation .menu-item-has-children > a');
      if (!link) return;
  
      event.preventDefault();
      event.stopPropagation();
  
      const li = link.parentElement;
      if (!li) return;
  
      const isOpen = li.classList.contains('open');
  
      // Close other open submenus
      document
        .querySelectorAll('.main-navigation .menu-item-has-children.open')
        .forEach(function (item) {
          if (item !== li) item.classList.remove('open');
        });
  
      // Toggle this one
      if (isOpen) {
        li.classList.remove('open');
      } else {
        li.classList.add('open');
      }
    }
  
    // Attach listeners (script is in footer, so DOM is ready)
    document.addEventListener('click', handleToggle, { passive: false });
    document.addEventListener('touchstart', handleToggle, { passive: false });
  })();
  