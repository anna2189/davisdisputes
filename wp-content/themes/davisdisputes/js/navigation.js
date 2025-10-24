/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
( function() {
	const siteNavigation = document.getElementById( 'site-navigation' );

	// Return early if the navigation doesn't exist.
	if ( ! siteNavigation ) {
		return;
	}

	const button = siteNavigation.getElementsByTagName( 'button' )[ 0 ];

	// Return early if the button doesn't exist.
	if ( 'undefined' === typeof button ) {
		return;
	}

	const menu = siteNavigation.getElementsByTagName( 'ul' )[ 0 ];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	if ( ! menu.classList.contains( 'nav-menu' ) ) {
		menu.classList.add( 'nav-menu' );
	}

	// Toggle the .toggled class and the aria-expanded value each time the button is clicked.
	button.addEventListener( 'click', function(event) { // Added event parameter
		event.stopPropagation(); // Stop event propagation
		console.log('Header toggle button clicked!'); // Debug log
		
		// Reset inline style to allow normal display
		siteNavigation.style.display = '';
		
		siteNavigation.classList.toggle( 'toggled' );

		if ( button.getAttribute( 'aria-expanded' ) === 'true' ) {
			button.setAttribute( 'aria-expanded', 'false' );
		} else {
			button.setAttribute( 'aria-expanded', 'true' );
		}
	} );

	// Remove the .toggled class and set aria-expanded to false when the user clicks outside the navigation.
	document.addEventListener( 'click', function( event ) {
		const isClickInside = siteNavigation.contains( event.target );

		if ( ! isClickInside ) {
			siteNavigation.classList.remove( 'toggled' );
			button.setAttribute( 'aria-expanded', 'false' );
		}
	} );

	// Get all the link elements within the menu.
	const links = menu.getElementsByTagName( 'a' );

	// Get all the link elements with children within the menu.
	const linksWithChildren = menu.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

	// Toggle focus each time a menu link is focused or blurred.
	for ( const link of links ) {
		link.addEventListener( 'focus', toggleFocus, true );
		link.addEventListener( 'blur', toggleFocus, true );
	}

	// Toggle focus each time a menu link with children receive a click event.
	for ( const link of linksWithChildren ) {
		link.addEventListener( 'click', toggleFocus, false );
	}

	/* ============================================================ */
	/* ==================== FOOTER NAVIGATION ===================== */
	/* ============================================================ */

	const footerNavigation = document.querySelector( '.footer-navigation' );
	const footerButton = document.querySelector( '.footer-mobile-toggle' );
	const footerMenu = document.getElementById( 'footer-menu' );

	console.log('Footer elements found:', {
		footerNavigation: !!footerNavigation,
		footerButton: !!footerButton,
		footerMenu: !!footerMenu
	});

	if ( footerNavigation && footerButton && footerMenu ) {
		// Toggle the .toggled class and the aria-expanded value each time the button is clicked.
		footerButton.addEventListener( 'click', function(event) { // Added event parameter
			event.preventDefault(); // Prevent default behavior
			event.stopPropagation(); // Stop event propagation
			console.log('Footer toggle button clicked!'); // Debug log
			
			// FORCE hide header menu
			siteNavigation.classList.remove( 'toggled' );
			button.setAttribute( 'aria-expanded', 'false' );
			siteNavigation.style.display = 'none';

			footerNavigation.classList.toggle( 'toggled' );

			// Add/remove body class to prevent header menu interference
			if ( footerNavigation.classList.contains( 'toggled' ) ) {
				document.body.classList.add( 'footer-menu-open' );
				footerButton.setAttribute( 'aria-expanded', 'true' );
			} else {
				document.body.classList.remove( 'footer-menu-open' );
				footerButton.setAttribute( 'aria-expanded', 'false' );
			}
		} );

		// Remove the .toggled class and set aria-expanded to false when the user clicks outside the navigation.
		document.addEventListener( 'click', function( event ) {
			const isClickInside = footerNavigation.contains( event.target );

			if ( ! isClickInside ) {
				footerNavigation.classList.remove( 'toggled' );
				footerButton.setAttribute( 'aria-expanded', 'false' );
			}
		} );

		const footerLinksWithChildren = footerMenu.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

		for ( const link of footerLinksWithChildren ) {
			link.addEventListener( 'click', toggleFocus, false );
		}
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		if ( event.type === 'focus' || event.type === 'blur' ) {
			let self = this;
			// Move up through the ancestors of the current link until we hit .nav-menu or .footer-links.
			while ( ! self.classList.contains( 'nav-menu' ) && ! self.classList.contains( 'footer-links' ) ) {
				// On li elements toggle the class .focus.
				if ( 'li' === self.tagName.toLowerCase() ) {
					self.classList.toggle( 'focus' );
				}
				self = self.parentNode;
			}
		}

		if ( event.type === 'click' ) { // Changed from 'touchstart' to 'click'
			const menuItem = this.parentNode;
			event.preventDefault(); // Prevent default link navigation
			// Simplified: just toggle 'open' on the current item.
			// Siblings can be handled by a more comprehensive close function if needed.
			menuItem.classList.toggle( 'open' ); // Toggle 'open' on the current item
		}
	}
}() );
