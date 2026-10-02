/**
 * Details Component GSAP Animations
 * Variants: accordion-reveal, stagger-list, card-flip, morphing-specs
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createAdaptiveTimeline } from './horizontal-animations.js';

// Accordion Reveal Variant
function initDetailsAccordionReveal(element) {
    const poster = element.querySelector('.c-details__poster');
    const specsItems = element.querySelectorAll('.c-details__specs-item');

    // Set initial states
    gsap.set(poster, { opacity: 0, x: -50 });
    gsap.set(specsItems, { opacity: 0, height: 0, y: -20 });

    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(poster, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out"
        })
        .to(specsItems, {
            opacity: 1,
            height: "auto",
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.5");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

// Stagger List Variant
function initDetailsStaggerList(element) {
    const poster = element.querySelector('.c-details__poster');
    const specsItems = element.querySelectorAll('.c-details__specs-item');

    if (!poster || !specsItems.length) {
        return;
    }

    // Set initial states - hide everything initially
    gsap.set(poster, { opacity: 0, scale: 0.9, y: 30 });
    gsap.set(specsItems, { opacity: 0, y: 30 });

    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        // Animate poster first
        timeline.to(poster, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        })
        // Then animate each spec item with stagger (labels and values animate with their parent item)
        .to(specsItems, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.4");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

// Card Flip Variant
function initDetailsCardFlip(element) {
    const poster = element.querySelector('.c-details__poster');
    const specsItems = element.querySelectorAll('.c-details__specs-item');

    // Set initial states
    gsap.set(poster, { opacity: 0, rotationY: -90 });
    gsap.set(specsItems, { opacity: 0, rotationY: 90, scale: 0.8 });

    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(poster, {
            opacity: 1,
            rotationY: 0,
            duration: 1,
            ease: "power2.out"
        })
        .to(specsItems, {
            opacity: 1,
            rotationY: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.5");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

// Morphing Specs Variant
function initDetailsMorphingSpecs(element) {
    const poster = element.querySelector('.c-details__poster');
    const specsItems = element.querySelectorAll('.c-details__specs-item');

    // Set initial states
    gsap.set(poster, { opacity: 0, scale: 0.5, rotation: 180 });
    gsap.set(specsItems, { opacity: 0, scale: 0, rotation: 180 });

    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(poster, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "back.out(1.4)"
        })
        .to(specsItems, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            stagger: {
                amount: 1,
                from: "random"
            },
            ease: "back.out(1.2)"
        }, "-=0.6");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

// Main initialization function
export function initDetails(element, variant = 'default') {
    const variants = {
        'accordion-reveal': initDetailsAccordionReveal,
        'stagger-list': initDetailsStaggerList,
        'card-flip': initDetailsCardFlip,
        'morphing-specs': initDetailsMorphingSpecs,
        'default': initDetailsStaggerList
    };

    const initFn = variants[variant] || variants['default'];
    initFn(element);
}
