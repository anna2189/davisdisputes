/**
 * SAFARI-PROOF MOBILE MENU FIX
 * Add this to your theme or as a separate script
 * Ensures mobile menu works on iOS Safari
 */

(function() {
    'use strict';
    
    console.log('Safari-proof menu fix initializing...');
    
    // Detect Safari/iOS
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isSafari || isIOS) {
        console.log('Safari/iOS detected - applying fixes');
    }
    
    function initMenu() {
        const navToggleBtn = document.querySelector('.mobile-nav-toggle');
        const primaryNav = document.querySelector('.main-navigation');
        const body = document.body;
        
        if (!navToggleBtn || !primaryNav) {
            console.warn('Menu elements not found, retrying...');
            setTimeout(initMenu, 500);
            return;
        }
        
        console.log('Menu elements found, setting up handlers');
        
        // Fix logo visibility based on state
        function updateLogoVisibility() {
            const logo = document.querySelector('.site-logo.scroll-visible');
            const customLogo = document.querySelector('.custom-logo-link');
            const tagline = document.querySelector('.tagline.scroll-hidden');
            
            const isNavOpen = body.classList.contains('nav-open');
            const isScrolled = body.classList.contains('header-scrolled');
            
            // Should show logo when nav is open OR scrolled
            const shouldShowLogo = isNavOpen || isScrolled;
            
            if (logo) {
                logo.style.display = shouldShowLogo ? 'inline-block' : 'none';
                logo.style.visibility = shouldShowLogo ? 'visible' : 'hidden';
            }
            
            if (customLogo) {
                customLogo.style.display = shouldShowLogo ? 'inline-block' : 'none';
                customLogo.style.visibility = shouldShowLogo ? 'visible' : 'hidden';
                
                const img = customLogo.querySelector('img');
                if (img) {
                    img.style.display = 'block';
                    img.style.height = '48px';
                    img.style.width = 'auto';
                }
            }
            
            if (tagline) {
                tagline.style.display = shouldShowLogo ? 'none' : 'inline-block';
                tagline.style.visibility = shouldShowLogo ? 'hidden' : 'visible';
            }
        }
        
        // Toggle menu function
        function toggleMenu(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            const isOpening = !primaryNav.classList.contains('toggled');
            
            // Toggle classes
            primaryNav.classList.toggle('toggled', isOpening);
            body.classList.toggle('nav-open', isOpening);
            navToggleBtn.setAttribute('aria-expanded', isOpening ? 'true' : 'false');
            
            // Update logo visibility
            updateLogoVisibility();
            
            // Safari-specific: Force repaint
            if (isSafari || isIOS) {
                // Force Safari to repaint
                primaryNav.style.display = 'none';
                primaryNav.offsetHeight; // Trigger reflow
                primaryNav.style.display = '';
                
                // Ensure menu list is visible
                const menuList = primaryNav.querySelector('ul');
                if (menuList && isOpening) {
                    menuList.style.visibility = 'visible';
                    menuList.style.opacity = '1';
                    menuList.style.transform = 'translateX(0)';
                    menuList.style.webkitTransform = 'translateX(0)';
                    menuList.style.pointerEvents = 'auto';
                }
            }
            
            console.log(isOpening ? 'Menu opened' : 'Menu closed');
        }
        
        // Remove existing listeners to prevent duplicates
        navToggleBtn.replaceWith(navToggleBtn.cloneNode(true));
        const newToggleBtn = document.querySelector('.mobile-nav-toggle');
        
        // Handle both click and touch events for Safari
        if (isIOS) {
            // iOS Safari - use touchstart for better responsiveness
            let touchHandled = false;
            
            newToggleBtn.addEventListener('touchstart', function(event) {
                if (!touchHandled) {
                    touchHandled = true;
                    toggleMenu(event);
                    setTimeout(() => { touchHandled = false; }, 500);
                }
            }, { passive: false });
            
            // Fallback click handler
            newToggleBtn.addEventListener('click', function(event) {
                if (!touchHandled) {
                    toggleMenu(event);
                }
            });
        } else {
            // Regular browsers
            newToggleBtn.addEventListener('click', toggleMenu);
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!primaryNav.classList.contains('toggled')) return;
            
            const clickInsideNav = primaryNav.contains(event.target) || 
                                  newToggleBtn.contains(event.target);
            
            if (!clickInsideNav) {
                primaryNav.classList.remove('toggled');
                body.classList.remove('nav-open');
                newToggleBtn.setAttribute('aria-expanded', 'false');
                updateLogoVisibility();
            }
        });
        
        // Handle submenu items
        const menuItemsWithChildren = primaryNav.querySelectorAll(
            '.menu-item-has-children > a, .page_item_has_children > a'
        );
        
        menuItemsWithChildren.forEach(function(link) {
            link.addEventListener('click', function(event) {
                if (window.matchMedia('(max-width: 768px)').matches && 
                    primaryNav.classList.contains('toggled')) {
                    event.preventDefault();
                    const menuItem = this.parentNode;
                    menuItem.classList.toggle('open');
                    
                    // Safari: Force submenu repaint
                    if (isSafari || isIOS) {
                        const submenu = menuItem.querySelector('.sub-menu, ul');
                        if (submenu) {
                            submenu.style.display = 'none';
                            submenu.offsetHeight;
                            submenu.style.display = '';
                        }
                    }
                }
            });
        });
        
        // Watch for scroll to update logo
        let scrollTimer;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(updateLogoVisibility, 50);
        });
        
        // Initial logo state
        updateLogoVisibility();
        
        // iOS viewport height fix
        if (isIOS) {
            function setViewportHeight() {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            }
            
            setViewportHeight();
            window.addEventListener('resize', setViewportHeight);
            window.addEventListener('orientationchange', setViewportHeight);
        }
        
        console.log('Safari-proof menu initialized successfully');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMenu);
    } else {
        initMenu();
    }
    
    // Reinitialize after a delay for dynamic content
    setTimeout(initMenu, 1000);
    
    // Debug function
    window.debugSafariMenu = function() {
        console.log('=== Safari Menu Debug ===');
        console.log('Is Safari:', /^((?!chrome|android).)*safari/i.test(navigator.userAgent));
        console.log('Is iOS:', /iPad|iPhone|iPod/.test(navigator.userAgent));
        console.log('Nav open:', document.body.classList.contains('nav-open'));
        console.log('Menu toggled:', document.querySelector('.main-navigation.toggled') !== null);
        
        const logo = document.querySelector('.custom-logo-link');
        if (logo) {
            const styles = window.getComputedStyle(logo);
            console.log('Logo display:', styles.display);
            console.log('Logo visibility:', styles.visibility);
        }
    };
    
})();
