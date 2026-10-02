//
// JS entry point
// ================================================================================

import { menu } from './menu.js';
import { quotes } from './quotes.js';
// import { revealAnimations } from './reveal-animations'; // Replaced by GSAP
import { scrollPosition } from './scroll-position';
import { initVideoPlayers } from './video.js';
import { initArrowScroll } from './arrow-scroll.js';
import { initDetailsLayout } from './details-layout.js';
import { initAnalytics } from './analytics.js';
import { initGSAP } from './gsap-init.js';
import { initGSAPModules } from './gsap/index.js';
import { initSorteoComponent } from './sorteo.js';
import { initTicketingComponent } from './ticketing.js';
import { initHorizontalScroll } from './gsap/horizontal-scroll.js';



function autorun(){
    const body = document.body;
    // Ocultar botones del navbar en desktop hasta que cargue el logo del hero (clase + regla inyectada)
    const isDesktop = body && window.matchMedia('(min-width: 1024px)').matches;
    const isHorizontal = body && body.classList.contains('horizontal-scroll-active');
    if (body && isHorizontal && isDesktop) {
        body.classList.add('hero-logo-not-loaded');
        const style = document.createElement('style');
        style.id = 'hero-logo-nav-hide';
        style.textContent = '@media (min-width:1024px){body.hero-logo-not-loaded .c-menu__nav .c-menu__anchor{visibility:hidden!important;opacity:0!important}}';
        (document.head || document.documentElement).appendChild(style);
    }

    // Prevent parallax.js library from initializing in horizontal mode
    if (body && body.classList.contains('horizontal-scroll-active')) {
        // Remove data-parallax attributes to prevent external library from initializing
        document.querySelectorAll('[data-parallax]').forEach(el => {
            el.removeAttribute('data-parallax');
        });
    }
    
    // Initialize GSAP first
    initGSAP();
    
    // Check if horizontal scroll mode is active
    const isHorizontalActive = body && body.classList.contains('horizontal-scroll-active');
    
    if (isHorizontalActive) {
        // Determine mode from data attribute on body or HTML structure
        const main = document.querySelector('.c-main');
        const bodyDataMode = body.getAttribute('data-scroll-mode');
        // For horizontal-snap, we should not have smooth-wrapper
        const hasSmoothWrapper = document.querySelector('#smooth-wrapper');
        
        // Force snap mode if data.json says horizontal-snap (even if HTML has old structure)
        // If bodyDataMode is null, check if smooth-wrapper exists to determine mode
        let mode;
        if (bodyDataMode === 'horizontal-snap') {
            mode = 'horizontal-snap'; // Force snap mode
            // Remove smooth-wrapper if it exists (old HTML structure)
            if (hasSmoothWrapper) {
                const wrapper = hasSmoothWrapper;
                const parent = wrapper.parentNode;
                while (wrapper.firstChild) {
                    parent.insertBefore(wrapper.firstChild, wrapper);
                }
                parent.removeChild(wrapper);
            }
        } else if (bodyDataMode === 'horizontal') {
            mode = 'horizontal';
        } else {
            // Fallback: use HTML structure to determine mode
            mode = hasSmoothWrapper ? 'horizontal' : 'horizontal-snap';
        }
        
        // Initialize horizontal scroll (should be initialized before other modules)
        initHorizontalScroll(mode);
    }
    
    // Initialize menu functionality
    menu();
    
    // Initialize GSAP modules based on variants
    initGSAPModules();
    
    // Other functionality
    // revealAnimations(); // Replaced by GSAP - commented out but kept for reference
    scrollPosition();
    initVideoPlayers();
    initArrowScroll();
    initDetailsLayout();
    initAnalytics();
    initSorteoComponent();
    initTicketingComponent();
    
   
    console.log('Scripts Loaded!');
};

if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;
