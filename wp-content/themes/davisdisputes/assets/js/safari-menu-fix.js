/**
 * iOS SAFARI SUBMENU FIX
 * Replace or add to your safari-menu-fix.js
 */

(function() {
    'use strict';
    
    console.log('iOS Submenu fix initializing...');
    
    // Detect Safari/iOS
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    function initSubmenus() {
        // Wait for menu to be toggled open
        const primaryNav = document.querySelector('.main-navigation');
        if (!primaryNav) return;
        
        // Find all parent menu items with submenus
        const parentItems = document.querySelectorAll(
            '.main-navigation .menu-item-has-children, .main-navigation .page_item_has_children'
        );
        
        console.log(`Found ${parentItems.length} parent menu items with submenus`);
        
        parentItems.forEach(function(parentItem) {
            const parentLink = parentItem.querySelector('> a');
            if (!parentLink) return;
            
            // Add visual indicator (arrow) to show it's expandable
            if (!parentLink.querySelector('.submenu-toggle')) {
                const arrow = document.createElement('span');
                arrow.className = 'submenu-toggle';
                arrow.innerHTML = ' ▼';
                arrow.style.cssText = 'font-size: 12px; margin-left: 5px; display: inline-block; transition: transform 0.3s;';
                parentLink.appendChild(arrow);
            }
            
            // Remove existing event listeners
            const newLink = parentLink.cloneNode(true);
            parentLink.parentNode.replaceChild(newLink, parentLink);
            
            // Handle clicks on parent items
            newLink.addEventListener('click', function(e) {
                // Only prevent default on mobile when menu is open
                if (window.innerWidth <= 768 && primaryNav.classList.contains('toggled')) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Toggle the open class
                    const isOpen = parentItem.classList.contains('open');
                    
                    // Close all other open submenus first
                    parentItems.forEach(item => {
                        if (item !== parentItem) {
                            item.classList.remove('open');
                            const arrow = item.querySelector('.submenu-toggle');
                            if (arrow) arrow.style.transform = 'rotate(0deg)';
                        }
                    });
                    
                    // Toggle this submenu
                    if (isOpen) {
                        parentItem.classList.remove('open');
                        const arrow = newLink.querySelector('.submenu-toggle');
                        if (arrow) arrow.style.transform = 'rotate(0deg)';
                    } else {
                        parentItem.classList.add('open');
                        const arrow = newLink.querySelector('.submenu-toggle');
                        if (arrow) arrow.style.transform = 'rotate(180deg)';
                    }
                    
                    // iOS Safari: Force submenu repaint
                    if (isIOS) {
                        const submenu = parentItem.querySelector('.sub-menu, > ul');
                        if (submenu) {
                            submenu.style.display = 'none';
                            submenu.offsetHeight; // Trigger reflow
                            submenu.style.display = '';
                        }
                    }
                    
                    console.log(`Submenu ${!isOpen ? 'opened' : 'closed'} for:`, newLink.textContent);
                }
            });
            
            // iOS specific: Also handle touchstart for better responsiveness
            if (isIOS) {
                let touchHandled = false;
                
                newLink.addEventListener('touchstart', function(e) {
                    if (window.innerWidth <= 768 && primaryNav.classList.contains('toggled') && !touchHandled) {
                        touchHandled = true;
                        e.preventDefault();
                        
                        // Trigger click event
                        newLink.click();
                        
                        setTimeout(() => { touchHandled = false; }, 500);
                    }
                }, { passive: false });
            }
        });
    }
    
    // Initialize submenus when menu is toggled
    function watchMenuToggle() {
        const menuButton = document.querySelector('.mobile-nav-toggle');
        const primaryNav = document.querySelector('.main-navigation');
        
        if (!menuButton || !primaryNav) return;
        
        // Watch for menu open/close
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (primaryNav.classList.contains('toggled')) {
                        // Menu opened, initialize submenus
                        setTimeout(initSubmenus, 100);
                    }
                }
            });
        });
        
        observer.observe(primaryNav, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        // Also reinitialize on menu button click
        menuButton.addEventListener('click', function() {
            setTimeout(initSubmenus, 100);
        });
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initSubmenus();
            watchMenuToggle();
        });
    } else {
        initSubmenus();
        watchMenuToggle();
    }
    
    // Debug function
    window.debugSubmenus = function() {
        console.log('=== Submenu Debug ===');
        const parentItems = document.querySelectorAll('.menu-item-has-children');
        parentItems.forEach((item, index) => {
            const isOpen = item.classList.contains('open');
            const submenu = item.querySelector('.sub-menu, > ul');
            console.log(`Parent ${index + 1}:`, {
                text: item.querySelector('> a')?.textContent,
                hasOpenClass: isOpen,
                submenuExists: !!submenu,
                submenuDisplay: submenu ? getComputedStyle(submenu).display : 'N/A'
            });
        });
    };
    
})();
