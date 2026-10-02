/**
 * Ticketing Component GSAP Animations
 * Variants: fade-in, scale-reveal, slide-up, overlay
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createAdaptiveTimeline } from './horizontal-animations.js';

function initTicketingFadeIn(element) {
    const wrapper = element.querySelector('.c-ticketing__wrapper');
    gsap.set(wrapper, { opacity: 0, y: 50 });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to(wrapper, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        });
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

function initTicketingScaleReveal(element) {
    const wrapper = element.querySelector('.c-ticketing__wrapper');
    gsap.set(wrapper, { opacity: 0, scale: 0.8 });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to(wrapper, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)"
        });
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

function initTicketingSlideUp(element) {
    const wrapper = element.querySelector('.c-ticketing__wrapper');
    gsap.set(wrapper, { opacity: 0, y: 100 });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to(wrapper, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        });
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

function initTicketingOverlay(element) {
    const wrapper = element.querySelector('.c-ticketing__wrapper');
    gsap.set(wrapper, { opacity: 0 });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to(wrapper, {
            opacity: 1,
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

export function initTicketing(element, variant = 'default') {
    const variants = {
        'fade-in': initTicketingFadeIn,
        'scale-reveal': initTicketingScaleReveal,
        'slide-up': initTicketingSlideUp,
        'overlay': initTicketingOverlay,
        'default': initTicketingFadeIn
    };
    const initFn = variants[variant] || variants['default'];
    initFn(element);
}

