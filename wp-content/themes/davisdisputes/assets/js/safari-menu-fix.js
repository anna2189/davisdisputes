/**
 * SIMPLE MOBILE SUBMENU TOGGLE (iOS-safe)
 * - No arrow functions
 * - No optional chaining
 * - No reliance on nav-open/toggled classes
 * - Only cares about screen width and clicks inside .main-navigation
 */
(function () {
    'use strict';
  
    console.log('SAFARI MENU FIX: LOADED (simple version)');
  
    // Wait until DOM is ready enough (we're in the footer, but be safe)
    function init() {
      var nav = document.querySelector('.main-navigation');
      if (!nav) {
        console.log('SAFARI MENU FIX: .main-navigation not found');
        return;
      }
  
      // Attach a single delegated click handler to the nav
      nav.addEventListener(
        'click',
        function (event) {
          // Only care about small screens
          if (window.innerWidth > 960) {
            return;
          }
  
          var target = event.target;
          var link = null;
  
          // Walk up DOM to find an <a> whose parent <li> has .menu-item-has-children
          while (target && target !== nav && target !== document.body) {
            if (
              target.nodeType === 1 &&
              target.tagName.toLowerCase() === 'a' &&
              target.parentNode &&
              target.parentNode.nodeType === 1 &&
              target.parentNode.classList &&
              target.parentNode.classList.contains('menu-item-has-children')
            ) {
              link = target;
              break;
            }
            target = target.parentNode;
          }
  
          if (!link) {
            return; // click on something else, ignore
          }
  
          event.preventDefault();
          event.stopPropagation();
  
          var li = link.parentNode;
          if (!li) return;
  
          var isOpen = li.classList.contains('open');
  
          // Close any other open siblings
          var openItems = nav.querySelectorAll('.menu-item-has-children.open');
          for (var i = 0; i < openItems.length; i++) {
            if (openItems[i] !== li) {
              openItems[i].classList.remove('open');
            }
          }
  
          // Toggle this one
          if (isOpen) {
            li.classList.remove('open');
            console.log('SAFARI MENU FIX: closed submenu for', link.textContent);
          } else {
            li.classList.add('open');
            console.log('SAFARI MENU FIX: opened submenu for', link.textContent);
          }
        },
        false
      );
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
  