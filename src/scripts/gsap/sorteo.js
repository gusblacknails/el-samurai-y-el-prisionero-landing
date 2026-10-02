/**
 * Sorteo Component GSAP Animations
 * Variants: fade-in, slide-up, scale-reveal, form-focus
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createAdaptiveTimeline } from './horizontal-animations.js';

function initSorteoFadeIn(element) {
    const title = element.querySelector('.sorteo_title');
    const form = element.querySelector('form');
    
    gsap.set([title, form], { opacity: 0, y: 50 });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to([title, form], {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        });
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

function initSorteoSlideUp(element) {
    const title = element.querySelector('.sorteo_title');
    const form = element.querySelector('form');
    
    gsap.set(title, { opacity: 0, y: 100 });
    gsap.set(form, { opacity: 0, y: 100 });
    
    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    })
    .to(form, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.4");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

function initSorteoScaleReveal(element) {
    const title = element.querySelector('.sorteo_title');
    const form = element.querySelector('form');
    
    gsap.set([title, form], { opacity: 0, scale: 0.8 });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to([title, form], {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)"
        });
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

function initSorteoFormFocus(element) {
    const title = element.querySelector('.sorteo_title');
    const form = element.querySelector('form');
    const inputs = form?.querySelectorAll('input, select');
    
    gsap.set([title, form], { opacity: 0 });
    gsap.set(inputs, { opacity: 0, y: 20 });
    
    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        })
        .to(form, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        }, "-=0.2")
        .to(inputs, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out"
        }, "-=0.2");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

export function initSorteo(element, variant = 'default') {
    const variants = {
        'fade-in': initSorteoFadeIn,
        'slide-up': initSorteoSlideUp,
        'scale-reveal': initSorteoScaleReveal,
        'form-focus': initSorteoFormFocus,
        'default': initSorteoFadeIn
    };
    const initFn = variants[variant] || variants['default'];
    initFn(element);
}

