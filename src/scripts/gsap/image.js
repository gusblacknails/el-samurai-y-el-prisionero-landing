/**
 * Image Component GSAP Animations
 * Variants: fade-scale, parallax, reveal-overlay, ken-burns
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createAdaptiveTimeline } from './horizontal-animations.js';

function initImageFadeScale(element) {
    const img = element.querySelector('img');
    
    gsap.set(img, { opacity: 0, scale: 1.2 });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to(img, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out"
        });
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

function initImageParallax(element) {
    const img = element.querySelector('img');
    
    gsap.set(img, { opacity: 0 });
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to(img, {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        });
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
    
    // Parallax effect (only in vertical mode)
    if (img && document.body && !document.body.classList.contains('horizontal-scroll-active')) {
        gsap.to(img, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }
}

function initImageRevealOverlay(element) {
    const img = element.querySelector('img');
    const picture = element.querySelector('picture');
    
    if (picture && !picture.querySelector('.gsap-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'gsap-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--color-bg-primary, #17617f);
            z-index: 2;
        `;
        if (picture.style.position !== 'relative') {
            picture.style.position = 'relative';
        }
        picture.appendChild(overlay);
    }
    
    gsap.set(img, { opacity: 0 });
    gsap.set(picture?.querySelector('.gsap-overlay'), { x: '0%' });
    
    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(img, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        })
        .to(picture?.querySelector('.gsap-overlay'), {
            x: '100%',
            duration: 1.2,
            ease: "power3.inOut"
        }, "-=0.6");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

function initImageKenBurns(element) {
    const img = element.querySelector('img');
    
    gsap.set(img, { opacity: 0, scale: 1.3 });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to(img, {
            opacity: 1,
            scale: 1.1,
            duration: 1.5,
            ease: "power2.out"
        });
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
    
    const container = img.parentElement;
    if (container) {
        container.addEventListener('mouseenter', () => {
            gsap.to(img, {
                scale: 1.15,
                duration: 2,
                ease: "power1.inOut"
            });
        });
        container.addEventListener('mouseleave', () => {
            gsap.to(img, {
                scale: 1.1,
                duration: 2,
                ease: "power1.inOut"
            });
        });
    }
}

export function initImage(element, variant = 'default') {
    const variants = {
        'fade-scale': initImageFadeScale,
        'parallax': initImageParallax,
        'reveal-overlay': initImageRevealOverlay,
        'ken-burns': initImageKenBurns,
        'default': initImageFadeScale
    };
    const initFn = variants[variant] || variants['default'];
    initFn(element);
}

