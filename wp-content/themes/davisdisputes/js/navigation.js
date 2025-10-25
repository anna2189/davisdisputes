/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
( function() {
	/* ============================================================ */
	/* ==================== HEADER NAVIGATION ===================== */
	/* ============================================================ */
	const siteNavigation = document.getElementById( 'site-navigation' );

	// Only setup header navigation if it exists
	if ( siteNavigation ) {
		const button = siteNavigation.getElementsByTagName( 'button' )[ 0 ];

		if ( button ) {
			const menu = siteNavigation.getElementsByTagName( 'ul' )[ 0 ];

			// Hide menu toggle button if menu is empty
			if ( 'undefined' === typeof menu ) {
				button.style.display = 'none';
			} else {
				if ( ! menu.classList.contains( 'nav-menu' ) ) {
					menu.classList.add( 'nav-menu' );
				}

				// Toggle the .toggled class and the aria-expanded value each time the button is clicked.
				button.addEventListener( 'click', function(event) {
					event.stopPropagation();
					console.log('Header toggle button clicked!');
					
					siteNavigation.style.display = '';
					siteNavigation.classList.toggle( 'toggled' );

					if ( button.getAttribute( 'aria-expanded' ) === 'true' ) {
						button.setAttribute( 'aria-expanded', 'false' );
					} else {
						button.setAttribute( 'aria-expanded', 'true' );
					}
				} );

				// Remove the .toggled class when clicking outside
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
			}
		}
	}

	/* ============================================================ */
	/* ==================== FOOTER NAVIGATION ===================== */
	/* ============================================================ */
	
	// Footer navigation is independent - runs regardless of header nav
	const footerNavigation = document.querySelector( '.footer-navigation' );
	const footerButton = document.querySelector( '.footer-mobile-toggle' );
	const footerMenu = document.getElementById( 'footer-menu' );

	console.log('Footer elements found:', {
		footerNavigation: !!footerNavigation,
		footerButton: !!footerButton,
		footerMenu: !!footerMenu
	});

	if ( footerNavigation && footerButton && footerMenu ) {
		console.log('Setting up footer toggle functionality...');
		
		// Toggle the .toggled class and the aria-expanded value each time the button is clicked.
		footerButton.addEventListener( 'click', function(event) {
			event.preventDefault();
			event.stopPropagation();
			console.log('Footer toggle button clicked!');
			
			// Close header menu if open (only if header nav exists)
			if (siteNavigation) {
				siteNavigation.classList.remove( 'toggled' );
				const headerButton = siteNavigation.getElementsByTagName( 'button' )[ 0 ];
				if (headerButton) {
					headerButton.setAttribute( 'aria-expanded', 'false' );
				}
				siteNavigation.style.display = 'none';
			}

			// Toggle footer menu
			footerNavigation.classList.toggle( 'toggled' );
			console.log('Footer nav toggled! Classes:', footerNavigation.className);

			// Update button state and body class
			if ( footerNavigation.classList.contains( 'toggled' ) ) {
				document.body.classList.add( 'footer-menu-open' );
				footerButton.setAttribute( 'aria-expanded', 'true' );
				console.log('Footer menu OPENED');
			} else {
				document.body.classList.remove( 'footer-menu-open' );
				footerButton.setAttribute( 'aria-expanded', 'false' );
				console.log('Footer menu CLOSED');
			}
		} );

		// Remove the .toggled class when clicking outside the navigation
		document.addEventListener( 'click', function( event ) {
			const isClickInside = footerNavigation.contains( event.target );

			if ( ! isClickInside && footerNavigation.classList.contains( 'toggled' ) ) {
				console.log('Clicked outside footer - closing menu');
				footerNavigation.classList.remove( 'toggled' );
				footerButton.setAttribute( 'aria-expanded', 'false' );
				document.body.classList.remove( 'footer-menu-open' );
			}
		} );

		const footerLinksWithChildren = footerMenu.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

		for ( const link of footerLinksWithChildren ) {
			link.addEventListener( 'click', toggleFocus, false );
		}
	} else {
		console.error('Footer toggle setup failed - missing elements:', {
			footerNavigation: !!footerNavigation,
			footerButton: !!footerButton,
			footerMenu: !!footerMenu
		});
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

		if ( event.type === 'click' ) {
			const menuItem = this.parentNode;
			event.preventDefault();
			menuItem.classList.toggle( 'open' );
		}
	}
}() );