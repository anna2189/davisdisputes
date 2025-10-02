/**
 * Modern Theme JavaScript
 * File: assets/js/modern-animations.js
 * GSAP-powered animations for Davis Dispute Advisory
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // ====================================
    // Header Scroll Effects
    // ====================================
    const header = document.getElementById('site-header') || document.querySelector('.site-header');
    let lastScroll = 0;
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // ====================================
    // Hero Section Animations
    // ====================================
    const heroTitle = document.querySelector('.hero-title');
    const heroTagline = document.querySelector('.hero-tagline');
    const heroDescription = document.querySelector('.hero-description');
    const heroCta = document.querySelector('.hero-cta');
    
    if (heroTitle || heroTagline || heroDescription || heroCta) {
        const heroTimeline = gsap.timeline({
            defaults: {
                ease: 'power3.out'
            }
        });
        
        if (heroTitle) {
            heroTimeline.to('.hero-title', {
                opacity: 1,
                y: 0,
                duration: 1.4
            });
        }
        
        if (heroTagline) {
            heroTimeline.to('.hero-tagline', {
                opacity: 1,
                y: 0,
                duration: 1.2
            }, '-=0.7');
        }
        
        if (heroDescription) {
            heroTimeline.to('.hero-description', {
                opacity: 1,
                y: 0,
                duration: 1.2
            }, '-=0.7');
        }
        
        if (heroCta) {
            heroTimeline.to('.hero-cta', {
                opacity: 1,
                y: 0,
                duration: 1.2
            }, '-=0.7');
        }
    }
    
    // Parallax effect for hero
    // Gentle fade-out of the hero as the user scrolls, to make it disappear more slowly
    if (document.querySelector('.hero')) {
        gsap.to('.hero', {
            opacity: 0, // Changed to 0 to make it disappear completely
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 5 // Increased scrub value further for a much slower, complete parallax fade-out
            }
        });
    }

    // Slow parallax on hero image
    if (document.querySelector('.hero-img')) {
        gsap.to('.hero-img', {
            yPercent: -12,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            }
        });
    }

    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        gsap.to('.hero-visual', {
            y: -100,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }
    
    // ====================================
    // Service Cards Animation
    // ====================================
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.fromTo(card, 
            {
                opacity: 0,
                y: 50,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                delay: index * 0.1
            }
        );
    });
    
    // Hover effects for service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // ====================================
    // Tab Functionality
    // ====================================
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab') || this.getAttribute('data-target');
            
            if (tabName) {
                // Remove active classes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active classes
                this.classList.add('active');
                const targetContent = document.getElementById(tabName);
                if (targetContent) {
                    targetContent.classList.add('active');
                    
                    // Animate content appearance
                    const caseCards = targetContent.querySelectorAll('.case-card');
                    if (caseCards.length > 0) {
                        gsap.fromTo(caseCards, 
                            {
                                opacity: 0,
                                y: 30
                            },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.5,
                                stagger: 0.1,
                                ease: 'power3.out'
                            }
                        );
                    }
                }
            }
        });
    });
    
    // ====================================
    // Case Cards Animation
    // ====================================
    gsap.utils.toArray('.case-card').forEach(card => {
        gsap.fromTo(card,
            {
                opacity: 0,
                x: -30
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // ====================================
    // Section Headers Animation
    // ====================================
    gsap.utils.toArray('.section-header').forEach(header => {
        const title = header.querySelector('.section-title');
        const subtitle = header.querySelector('.section-subtitle');
        
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
        
        if (title) {
            timeline.fromTo(title, 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
            );
        }
        
        if (subtitle) {
            timeline.fromTo(subtitle,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
                '-=0.4'
            );
        }
    });
    
    // ====================================
    // Accordion Functionality
    // ====================================
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        if (header && content) {
            header.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all items
                accordionItems.forEach(accItem => {
                    accItem.classList.remove('active');
                    const accContent = accItem.querySelector('.accordion-content');
                    if (accContent) {
                        gsap.to(accContent, {
                            maxHeight: 0,
                            duration: 0.3,
                            ease: 'power2.inOut'
                        });
                    }
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    gsap.to(content, {
                        maxHeight: content.scrollHeight,
                        duration: 0.3,
                        ease: 'power2.inOut'
                    });
                }
            });
        }
    });
    
    // ====================================
    // Team Member Animation
    // ====================================
    const memberPhoto = document.querySelector('.member-photo');
    const memberInfo = document.querySelector('.member-info');
    const teamMember = document.querySelector('.team-member');
    
    if (memberPhoto && teamMember) {
        gsap.fromTo('.member-photo',
            {
                opacity: 0,
                x: -50
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.team-member',
                    start: 'top 70%'
                }
            }
        );
    }
    
    if (memberInfo && teamMember) {
        gsap.fromTo('.member-info',
            {
                opacity: 0,
                x: 50
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.team-member',
                    start: 'top 70%'
                }
            }
        );
    }
    
    // ====================================
    // Mobile Menu Toggle
    // ====================================
    const mainMobileToggle = document.querySelector('.mobile-menu-toggle:not(.footer-mobile-toggle)');
    const mainNavigation = document.querySelector('.main-navigation:not(.footer-navigation)');
    const footerMobileToggle = document.querySelector('.footer-mobile-toggle');
    const footerNavigation = document.querySelector('.footer-navigation');

    let mainMenuOpen = false;
    let footerMenuOpen = false;

    function setupMenuToggle(toggleButton, navigationElement, menuOpenState, isFooter = false) {
        if (toggleButton && navigationElement) {
            toggleButton.addEventListener('click', function() {
                if (isFooter) {
                    footerMenuOpen = !footerMenuOpen;
                    menuOpenState = footerMenuOpen;
                } else {
                    mainMenuOpen = !mainMenuOpen;
                    menuOpenState = mainMenuOpen;
                }

                if (menuOpenState) {
                    // Create mobile menu if it doesn't exist
                    let mobileMenu = document.querySelector(isFooter ? '.mobile-footer-menu' : '.mobile-main-menu');
                    if (!mobileMenu) {
                        mobileMenu = document.createElement('div');
                        mobileMenu.className = isFooter ? 'mobile-menu mobile-footer-menu' : 'mobile-menu mobile-main-menu';
                        mobileMenu.innerHTML = navigationElement.innerHTML;
                        document.body.appendChild(mobileMenu);
                    }
                    
                    // Animate menu appearance
                    gsap.fromTo(mobileMenu,
                        {
                            x: '100%',
                            opacity: 0
                        },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        }
                    );
                    
                    // Animate hamburger to X
                    const toggleChildren = toggleButton.children;
                    if (toggleChildren.length >= 3) {
                        gsap.to(toggleChildren[0], {
                            rotation: 45,
                            y: 7,
                            duration: 0.3
                        });
                        gsap.to(toggleChildren[1], {
                            opacity: 0,
                            duration: 0.3
                        });
                        gsap.to(toggleChildren[2], {
                            rotation: -45,
                            y: -7,
                            duration: 0.3
                        });
                    }
                } else {
                    // Animate menu disappearance
                    const mobileMenu = document.querySelector(isFooter ? '.mobile-footer-menu' : '.mobile-main-menu');
                    if (mobileMenu) {
                        gsap.to(mobileMenu, {
                            x: '100%',
                            opacity: 0,
                            duration: 0.3,
                            ease: 'power2.in',
                            onComplete: () => mobileMenu.remove()
                        });
                    }
                    
                    // Animate X back to hamburger
                    const toggleChildren = toggleButton.children;
                    if (toggleChildren.length >= 3) {
                        gsap.to(toggleChildren[0], {
                            rotation: 0,
                            y: 0,
                            duration: 0.3
                        });
                        gsap.to(toggleChildren[1], {
                            opacity: 1,
                            duration: 0.3
                        });
                        gsap.to(toggleChildren[2], {
                            rotation: 0,
                            y: 0,
                            duration: 0.3
                        });
                    }
                }
            });
        }
    }

    setupMenuToggle(mainMobileToggle, mainNavigation, mainMenuOpen);
    setupMenuToggle(footerMobileToggle, footerNavigation, footerMenuOpen, true);
    
    // ====================================
    // Smooth Scroll for Anchor Links
    // ====================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menus if open
                    if (mainMenuOpen && window.innerWidth <= 768) {
                        mainMobileToggle.click();
                    }
                    if (footerMenuOpen && window.innerWidth <= 768) {
                        footerMobileToggle.click();
                    }
                }
            }
        });
    });
    
    // ====================================
    // Counter Animation for Statistics
    // ====================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    // Trigger counters when in view
    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                const target = parseInt(counter.getAttribute('data-counter'));
                animateCounter(counter, target);
            }
        });
    });
    
    // ====================================
    // Lazy Loading for Images
    // ====================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    
                    // Fade in animation
                    gsap.fromTo(img,
                        { opacity: 0 },
                        { opacity: 1, duration: 0.5, ease: 'power2.out' }
                    );
                    
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ====================================
    // AJAX Case Studies Loading
    // ====================================
    function loadCaseStudies(category) {
        const container = document.getElementById(category);
        
        if (container && typeof davisAjax !== 'undefined') {
            fetch(davisAjax.ajaxurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'load_case_studies',
                    nonce: davisAjax.nonce,
                    category: category
                })
            })
            .then(response => response.text())
            .then(data => {
                container.innerHTML = data;
                
                // Animate new content
                gsap.fromTo(`#${category} .case-card`,
                    { opacity: 0, y: 30 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.5, 
                        stagger: 0.1,
                        ease: 'power3.out'
                    }
                );
            })
            .catch(error => console.error('Error loading case studies:', error));
        }
    }
    
    // ====================================
    // Scroll Progress Indicator
    // ====================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-navy), var(--accent-gold));
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // ====================================
    // Text Split Animation
    // ====================================
    function splitText(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                element.appendChild(span);
                
                gsap.to(span, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: index * 0.02,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });
        });
    }
    
    // Apply text animation to specific elements
    if (window.innerWidth > 768) {
        const heroTitleElement = document.querySelector('.hero-title');
        if (heroTitleElement) {
            splitText('.hero-title');
        }
    }
    
    // ====================================
    // Cursor Follow Effect (Optional)
    // ====================================
    if (window.innerWidth > 1024) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--accent-gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Scale cursor on hover
        document.querySelectorAll('a, button, .service-card').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }
    
    // ====================================
    // Performance Optimization
    // ====================================
    
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Optimize resize events
    const optimizedResize = debounce(() => {
        ScrollTrigger.refresh();
    }, 250);
    
    window.addEventListener('resize', optimizedResize);
    
    // ====================================
    // General Animation Classes
    // ====================================
    
    // Fade in from bottom
    gsap.utils.toArray('.gsap-fade-in').forEach(element => {
        gsap.fromTo(element,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Fade in from left
    gsap.utils.toArray('.gsap-fade-in-left').forEach(element => {
        gsap.fromTo(element,
            {
                opacity: 0,
                x: -50
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Fade in from right
    gsap.utils.toArray('.gsap-fade-in-right').forEach(element => {
        gsap.fromTo(element,
            {
                opacity: 0,
                x: 50
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Scale in animation
    gsap.utils.toArray('.gsap-scale-in').forEach(element => {
        gsap.fromTo(element,
            {
                opacity: 0,
                scale: 0.8
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // ====================================
    // Button Hover Effects
    // ====================================
    document.querySelectorAll('.btn-modern, .btn-linkedin, .btn-cv, .hero-cta').forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // Click animation
        button.addEventListener('click', function() {
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        });
    });
    
    // ====================================
    // Initialize on Page Load Complete
    // ====================================
    window.addEventListener('load', () => {
        // Remove loading screen if exists
        const loader = document.querySelector('.page-loader');
        if (loader) {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => loader.remove()
            });
        }
        
        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
        
        // Add loaded class to body
        document.body.classList.add('page-loaded');
    });
    
    // ====================================
    // Utility Functions
    // ====================================
    
    // Refresh ScrollTrigger (useful for dynamic content)
    function refreshScrollTrigger() {
        ScrollTrigger.refresh();
    }
    
    // Animate new elements (for dynamic content)
    function animateNewElements(container) {
        const newCards = container.querySelectorAll('.service-card, .case-card');
        const newFadeElements = container.querySelectorAll('.gsap-fade-in');
        
        if (newCards.length) {
            gsap.fromTo(newCards,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out'
                }
            );
        }
        
        if (newFadeElements.length) {
            gsap.fromTo(newFadeElements,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out'
                }
            );
        }
    }
    
    // Export functions for external use
    window.davisAnimations = {
        refreshScrollTrigger,
        animateNewElements,
        loadCaseStudies
    };
    
    // Console log for debugging
    console.log('Davis Disputes Modern Animations Loaded');
    
});

// ====================================
// Mobile Menu Styles (add to CSS)
// ====================================
const mobileMenuStyles = `
.mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 400px;
    height: 100vh;
    background: var(--white);
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
    z-index: 999;
    padding: 80px 2rem 2rem;
    overflow-y: auto;
}

.mobile-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.mobile-menu li {
    margin-bottom: 1rem;
}

.mobile-menu a {
    display: block;
    padding: 1rem;
    color: var(--secondary-navy);
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 500;
    border-bottom: 1px solid var(--border-light);
    transition: var(--transition-base);
}

.mobile-menu a:hover {
    color: var(--accent-gold);
    padding-left: 1.5rem;
}

.page-loaded .hero-title,
.page-loaded .hero-tagline,
.page-loaded .hero-description,
.page-loaded .hero-cta {
    animation: none !important;
}

.custom-cursor {
    display: none;
}

@media (min-width: 1025px) {
    .custom-cursor {
        display: block;
    }
}
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);
