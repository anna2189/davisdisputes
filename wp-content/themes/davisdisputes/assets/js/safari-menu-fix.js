/**
 * Simple mobile submenu toggle
 * Works on iOS, Android, desktop.
 */
(function () {
    'use strict';
  
    function handleTap(event) {
      var nav = document.querySelector('.main-navigation');
      if (!nav) return;
  
      // Only act on mobile when the hamburger menu is open
      var isMobile = window.innerWidth <= 768;
      var menuOpen =
        nav.classList.contains('toggled') ||
        document.body.classList.contains('nav-open');
  
      if (!isMobile || !menuOpen) {
        return;
      }
  
      // Did we tap a parent link that has children?
      var link = event.target.closest('.menu-item-has-children > a');
      if (!link || !nav.contains(link)) return;
  
      event.preventDefault();
      event.stopPropagation();
  
      var li = link.parentElement;
      if (!li) return;
  
      var isOpen = li.classList.contains('open');
  
      // Close all other open submenus
      var openParents = nav.querySelectorAll('.menu-item-has-children.open');
      for (var i = 0; i < openParents.length; i++) {
        if (openParents[i] !== li) {
          openParents[i].classList.remove('open');
        }
      }
  
      // Toggle this one
      if (isOpen) {
        li.classList.remove('open');
      } else {
        li.classList.add('open');
      }
    }
  
    // Script is loaded in footer, DOM is ready
    document.addEventListener('click', handleTap, false);
    document.addEventListener('touchend', handleTap, false);
  })();
  