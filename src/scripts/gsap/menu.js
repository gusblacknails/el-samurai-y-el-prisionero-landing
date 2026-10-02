/**
 * Menu Component GSAP Animations
 * Variants: slide-in, fade-blur, magnetic-links, minimalist
 * Note: GSAP only handles animations, menu.js handles the toggle functionality
 */

import { gsap } from 'gsap';

// Slide In Variant - Only adds animations, doesn't replace menu.js functionality
function initMenuSlideIn(menuElement) {
    const nav = menuElement.querySelector('.c-menu__nav');
    const links = menuElement.querySelectorAll('.c-menu__anchor');
    const mobileLogo = menuElement.querySelector('.c-menu__mobile-logo');
    
    if (!nav) return;

    // Check if we're on desktop (lg breakpoint = 1024px)
    const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

    let lastActiveState = nav.classList.contains('--is-active');
    
    const handleMenuOpen = () => {
        // On desktop, menu is always visible, no animation needed
        if (isDesktop()) return;
        
        // Don't animate nav position - let CSS handle it via right: 0
        gsap.set(nav, { clearProps: "x,xPercent,transform" });
        
        const tl = gsap.timeline();
        
        // Animate mobile logo and links together
        if (mobileLogo) {
            tl.to(mobileLogo, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out"
            }, 0.1);
        }
        
        tl.to(links, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
            force3D: false
        }, 0.15);
        
        // Ensure links remain visible
        tl.set(links, { opacity: 1, visibility: 'visible', clearProps: 'none' });
    };
    
    const handleMenuClose = () => {
        if (isDesktop()) {
            gsap.set([nav, links, mobileLogo], { clearProps: "all" });
            return;
        }
        
        const tl = gsap.timeline();
        tl.to(links, { opacity: 0, x: 30, duration: 0.2, stagger: 0.03, ease: "power2.in" });
        if (mobileLogo) tl.to(mobileLogo, { opacity: 0, y: -20, duration: 0.2, ease: "power2.in" }, "-=0.1");
        gsap.set(nav, { clearProps: "x,xPercent,transform" });
    };
    
    const observer = new MutationObserver((mutations) => {
        const hasActive = nav.classList.contains('--is-active');
        if (hasActive !== lastActiveState) {
            lastActiveState = hasActive;
            if (hasActive) {
                handleMenuOpen();
            } else {
                handleMenuClose();
            }
        }
    });
    
    observer.observe(nav, { attributes: true });

    // En desktop, limpiar cualquier estilo inline al cargar para evitar parpadeo/movimiento
    if (isDesktop()) {
        gsap.set([nav, links, mobileLogo], { clearProps: 'all' });
    }
}

// Fade Blur Variant
function initMenuFadeBlur(menuElement) {
    const nav = menuElement.querySelector('.c-menu__nav');
    const links = menuElement.querySelectorAll('.c-menu__anchor');
    const mobileLogo = menuElement.querySelector('.c-menu__mobile-logo');
    
    if (!nav) return;

    // Check if we're on desktop (lg breakpoint = 1024px)
    const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

    let lastActiveState = nav.classList.contains('--is-active');

    const handleMenuOpen = () => {
        if (isDesktop()) return;
        gsap.set(nav, { clearProps: "x,xPercent,transform" });
        const tl = gsap.timeline();
        if (mobileLogo) tl.to(mobileLogo, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.1);
        tl.to(links, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", force3D: false }, 0.2);
        tl.set(links, { opacity: 1, visibility: 'visible', clearProps: 'none' });
    };
    
    const handleMenuClose = () => {
        if (isDesktop()) {
            gsap.set([nav, links, mobileLogo], { clearProps: "all" });
            return;
        }
        const tl = gsap.timeline();
        tl.to(links, { opacity: 0, y: -20, duration: 0.3, stagger: 0.05, ease: "power2.in" });
        if (mobileLogo) tl.to(mobileLogo, { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" }, "-=0.2");
        gsap.set(nav, { clearProps: "x,xPercent,transform" });
    };
    
    const observer = new MutationObserver((mutations) => {
        const hasActive = nav.classList.contains('--is-active');
        if (hasActive !== lastActiveState) {
            lastActiveState = hasActive;
            if (hasActive) {
                handleMenuOpen();
            } else {
                handleMenuClose();
            }
        }
    });
    
    observer.observe(nav, { attributes: true });

    if (isDesktop()) {
        gsap.set([nav, links, mobileLogo], { clearProps: 'all' });
    }
}

// Magnetic Links Variant
function initMenuMagneticLinks(menuElement) {
    const nav = menuElement.querySelector('.c-menu__nav');
    const links = menuElement.querySelectorAll('.c-menu__anchor');
    const mobileLogo = menuElement.querySelector('.c-menu__mobile-logo');
    
    if (!nav) return;

    // Check if we're on desktop (lg breakpoint = 1024px)
    const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

    let lastActiveState = nav.classList.contains('--is-active');

    const handleMenuOpen = () => {
        if (isDesktop()) return;
        gsap.set(nav, { clearProps: "x,xPercent,transform" });
        const tl = gsap.timeline();
        if (mobileLogo) tl.to(mobileLogo, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)" }, 0.1);
        tl.to(links, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.08, ease: "back.out(1.2)", force3D: false }, 0.15);
        tl.set(links, { opacity: 1, visibility: 'visible', clearProps: 'none' });
    };
    
    const handleMenuClose = () => {
        if (isDesktop()) {
            gsap.set([nav, links, mobileLogo], { clearProps: "all" });
            return;
        }
        const tl = gsap.timeline();
        tl.to(links, { opacity: 0, scale: 0.8, duration: 0.2, stagger: 0.03, ease: "power2.in" });
        if (mobileLogo) tl.to(mobileLogo, { opacity: 0, scale: 0.9, duration: 0.2, ease: "power2.in" }, "-=0.15");
        gsap.set(nav, { clearProps: "x,xPercent,transform" });
    };
    
    const observer = new MutationObserver((mutations) => {
        const hasActive = nav.classList.contains('--is-active');
        if (hasActive !== lastActiveState) {
            lastActiveState = hasActive;
            if (hasActive) {
                handleMenuOpen();
            } else {
                handleMenuClose();
            }
        }
    });
    
    observer.observe(nav, { attributes: true });

    if (isDesktop()) {
        gsap.set([nav, links, mobileLogo], { clearProps: 'all' });
    }
    
    // Magnetic effect on links (works on all screen sizes)
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, { scale: 1.1, x: 10, duration: 0.3, ease: "power2.out" });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(link, { scale: 1, x: 0, duration: 0.3, ease: "power2.out" });
        });
    });
}

// Minimalist Variant
function initMenuMinimalist(menuElement) {
    const nav = menuElement.querySelector('.c-menu__nav');
    const links = menuElement.querySelectorAll('.c-menu__anchor');
    const mobileLogo = menuElement.querySelector('.c-menu__mobile-logo');
    
    if (!nav) return;

    // Check if we're on desktop (lg breakpoint = 1024px)
    const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

    let lastActiveState = nav.classList.contains('--is-active');

    const handleMenuOpen = () => {
        if (isDesktop()) return;
        gsap.set(nav, { clearProps: "x,xPercent,transform" });
        const tl = gsap.timeline();
        if (mobileLogo) tl.to(mobileLogo, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0.1);
        tl.to(links, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", force3D: false }, 0.15);
        tl.set(links, { opacity: 1, visibility: 'visible', clearProps: 'none' });
    };
    
    const handleMenuClose = () => {
        if (isDesktop()) {
            gsap.set([nav, links, mobileLogo], { clearProps: "all" });
            return;
        }
        const tl = gsap.timeline();
        tl.to(links, { opacity: 0, y: 10, duration: 0.2, stagger: 0.03, ease: "power2.in" });
        if (mobileLogo) tl.to(mobileLogo, { opacity: 0, duration: 0.2, ease: "power2.in" }, "-=0.15");
        gsap.set(nav, { clearProps: "x,xPercent,transform" });
    };
    
    const observer = new MutationObserver((mutations) => {
        const hasActive = nav.classList.contains('--is-active');
        if (hasActive !== lastActiveState) {
            lastActiveState = hasActive;
            if (hasActive) {
                handleMenuOpen();
            } else {
                handleMenuClose();
            }
        }
    });
    
    observer.observe(nav, { attributes: true });

    if (isDesktop()) {
        gsap.set([nav, links, mobileLogo], { clearProps: 'all' });
    }
}

// Main initialization function
export function initMenu(menuElement, variant = 'default') {
    if (!menuElement) return;
    // En desktop no usar GSAP en el menú: lo controla solo CSS (body.hero-logo-not-loaded)
    if (window.matchMedia('(min-width: 1024px)').matches) {
        return;
    }
    const variants = {
        'slide-in': initMenuSlideIn,
        'fade-blur': initMenuFadeBlur,
        'magnetic-links': initMenuMagneticLinks,
        'minimalist': initMenuMinimalist,
        'default': initMenuSlideIn
    };
    const initFn = variants[variant] || variants['default'];
    initFn(menuElement);
}
