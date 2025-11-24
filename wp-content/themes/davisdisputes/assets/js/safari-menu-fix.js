/**
 * SIMPLE MOBILE SUBMENU TOGGLE
 * Works on iOS, Android, desktop.
 */
(function () {
    'use strict';
  
    // Find a parent <a> whose <li> has .menu-item-has-children
    function findParentMenuLink(target, nav) {
      var el = target;
  
      while (el && el !== nav && el !== document.body) {
        // If it's an element
        if (el.nodeType === 1 && el.tagName.toLowerCase() === 'a') {
          var parentLi = el.parentNode;
          if (
            parentLi &&
            parentLi.nodeType === 1 &&
            parentLi.classList.contains('menu-item-has-children')
          ) {
            return el;
          }
        }
        el = el.parentNode;
      }
      return null;
    }
  
    function handleClick(event) {
      var nav = document.querySelector('.main-navigation');
      if (!nav) return;
  
      // Only act on small screens
      var isMobile = window.innerWidth <= 768;
      if (!isMobile) return;
  
      // Only act when mobile menu is open
      var menuOpen =
        nav.classList.contains('toggled') ||
        document.body.classList.contains('nav-open');
      if (!menuOpen) return;
  
      // Find the relevant parent menu link, safely (works even if target is text)
      var link = findParentMenuLink(event.target, nav);
      if (!link) return;
  
      event.preventDefault();
      event.stopPropagation();
  
      var li = link.parentNode;
      if (!li) return;
  
      var isOpen = li.classList.contains('open');
  
      // Close all other open submenus
      var openItems = nav.querySelectorAll('.menu-item-has-children.open');
      for (var i = 0; i < openItems.length; i++) {
        if (openItems[i] !== li) {
          openItems[i].classList.remove('open');
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
    document.addEventListener('click', handleClick, false);
  })();
  