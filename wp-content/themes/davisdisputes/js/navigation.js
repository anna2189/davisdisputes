/**
 * File navigation.js.
 *
 * Handles toggling the footer navigation menu for small screens
 * and enables basic open/close behavior for footer dropdown items.
 */

(function () {
	'use strict';
  
	// Optional: reference to header nav so footer button can close it if open
	const siteNavigation = document.getElementById('site-navigation');
  
	/* ============================================================ */
	/* ==================== FOOTER NAVIGATION ===================== */
	/* ============================================================ */
  
	const footerNavigation = document.querySelector('.footer-navigation');
	const footerButton = document.querySelector('.footer-mobile-toggle');
	const footerMenu = document.getElementById('footer-menu');
  
	console.log('Footer elements found:', {
	  footerNavigation: !!footerNavigation,
	  footerButton: !!footerButton,
	  footerMenu: !!footerMenu,
	});
  
	if (footerNavigation && footerButton && footerMenu) {
	  console.log('Setting up footer toggle functionality...');
  
	  // Toggle the .toggled class and the aria-expanded value each time the button is clicked.
	  footerButton.addEventListener('click', function (event) {
		event.preventDefault();
		event.stopPropagation();
		console.log('Footer toggle button clicked!');
  
		// Close header menu if open (header logic handled in custom.js)
		if (siteNavigation) {
		  siteNavigation.classList.remove('toggled');
		  const headerButton = siteNavigation.getElementsByTagName('button')[0];
		  if (headerButton) {
			headerButton.setAttribute('aria-expanded', 'false');
		  }
		  siteNavigation.style.display = 'none';
		}
  
		// Toggle footer menu
		footerNavigation.classList.toggle('toggled');
		console.log('Footer nav toggled! Classes:', footerNavigation.className);
  
		const isOpen = footerNavigation.classList.contains('toggled');
  
		// Update button state and body class
		document.body.classList.toggle('footer-menu-open', isOpen);
		footerButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  
		console.log(isOpen ? 'Footer menu OPENED' : 'Footer menu CLOSED');
	  });
  
	  // Remove the .toggled class when clicking outside the footer navigation
	  document.addEventListener('click', function (event) {
		const isClickInside = footerNavigation.contains(event.target);
  
		if (!isClickInside && footerNavigation.classList.contains('toggled')) {
		  console.log('Clicked outside footer - closing menu');
		  footerNavigation.classList.remove('toggled');
		  footerButton.setAttribute('aria-expanded', 'false');
		  document.body.classList.remove('footer-menu-open');
		}
	  });
  
	  // Footer submenu items (tap to open/close)
	  const footerLinksWithChildren = footerMenu.querySelectorAll(
		'.menu-item-has-children > a, .page_item_has_children > a'
	  );
  
	  for (const link of footerLinksWithChildren) {
		link.addEventListener('click', function (event) {
		  toggleFocus(event, footerMenu);
		});
	  }
	} else {
	  console.error('Footer toggle setup failed - missing elements:', {
		footerNavigation: !!footerNavigation,
		footerButton: !!footerButton,
		footerMenu: !!footerMenu,
	  });
	}
  
	/**
	 * Handles click on a footer link with children: toggles .open on its <li>.
	 */
	function toggleFocus(event, rootMenu) {
	  const link = event.currentTarget;
  
	  if (event.type === 'click') {
		const menuItem = link.parentNode;
  
		// Only operate inside the footer menu
		let self = menuItem;
		while (self && self !== rootMenu) {
		  self = self.parentNode;
		}
		if (!self) return; // clicked outside footer menu
  
		event.preventDefault();
		menuItem.classList.toggle('open');
	  }
	}
  })();
  