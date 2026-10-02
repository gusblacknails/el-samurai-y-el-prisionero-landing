/**
 * Custom Component GSAP Animations
 * Variants: fade-in, slide-in, scale-reveal, stagger
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createAdaptiveTimeline } from './horizontal-animations.js';

function initCustomFadeIn(element) {
    const children = element.querySelectorAll('.container > *');
    
    gsap.set(children, { opacity: 0, y: 30 });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to(children, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

function initCustomSlideIn(element) {
    const children = element.querySelectorAll('.container > *');
    
    gsap.set(children, { opacity: 0, x: -100 });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to(children, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
        });
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

function initCustomScaleReveal(element) {
    const children = element.querySelectorAll('.container > *');
    
    gsap.set(children, { opacity: 0, scale: 0.8 });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to(children, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.2)"
        });
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

function initCustomStagger(element) {
    const children = element.querySelectorAll('.container > *');
    
    gsap.set(children, { opacity: 0 });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to(children, {
            opacity: 1,
            duration: 0.6,
            stagger: {
                amount: 1,
                from: "random"
            },
            ease: "power2.out"
        });
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

export function initCustom(element, variant = 'default') {
    const variants = {
        'fade-in': initCustomFadeIn,
        'slide-in': initCustomSlideIn,
        'scale-reveal': initCustomScaleReveal,
        'stagger': initCustomStagger,
        'default': initCustomFadeIn
    };
    const initFn = variants[variant] || variants['default'];
    initFn(element);
}

