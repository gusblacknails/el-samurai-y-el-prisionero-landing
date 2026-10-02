/**
 * Footer Component GSAP Animations
 * Variants: fade-up, slide-in, stagger-reveal, minimal
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createAdaptiveTimeline } from './horizontal-animations.js';

function initFooterFadeUp(element) {
    const sections = element.querySelectorAll('.c-footer__section');
    
    gsap.set(sections, { opacity: 0, y: 50 });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to(sections, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });
        return timeline;
    }, {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none"
    });
}

function initFooterSlideIn(element) {
    const sections = element.querySelectorAll('.c-footer__section');
    
    gsap.set(sections, { opacity: 0, x: (i) => (i % 2 === 0 ? -100 : 100) });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to(sections, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
        });
        return timeline;
    }, {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none"
    });
}

function initFooterStaggerReveal(element) {
    const sections = element.querySelectorAll('.c-footer__section');
    const allElements = element.querySelectorAll('.c-footer__section *');
    
    gsap.set(sections, { opacity: 0, scale: 0.9 });
    gsap.set(allElements, { opacity: 0 });
    
    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(sections, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out"
    })
    .to(allElements, {
        opacity: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out"
    }, "-=0.3");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none"
    });
}

function initFooterMinimal(element) {
    const sections = element.querySelectorAll('.c-footer__section');
    
    gsap.set(sections, { opacity: 0 });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to(sections, {
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
        return timeline;
    }, {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none"
    });
}

export function initFooter(element, variant = 'default') {
    const variants = {
        'fade-up': initFooterFadeUp,
        'slide-in': initFooterSlideIn,
        'stagger-reveal': initFooterStaggerReveal,
        'minimal': initFooterMinimal,
        'default': initFooterFadeUp
    };
    const initFn = variants[variant] || variants['default'];
    initFn(element);
}

