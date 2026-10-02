/**
 * Call to Action Component GSAP Animations
 * Variants: slide-overlay, fade-scale, magnetic-button, reveal-stagger
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createAdaptiveTimeline } from './horizontal-animations.js';

function initCallToActionSlideOverlay(element) {
    const image = element.querySelector('img');
    const content = element.querySelector('.c-call-to-action__content');
    const title = element.querySelector('.c-call-to-action__title');
    const subtitle = element.querySelector('.c-call-to-action__subtitle');
    const button = element.querySelector('.c-call-to-action__button');
    
    gsap.set(content, { x: -100, opacity: 0 });
    gsap.set([title, subtitle, button], { opacity: 0, y: 30 });
    
    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(content, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    })
    .to([title, subtitle, button], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    }, "-=0.6");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

function initCallToActionFadeScale(element) {
    const image = element.querySelector('img');
    const content = element.querySelector('.c-call-to-action__content');
    const title = element.querySelector('.c-call-to-action__title');
    const subtitle = element.querySelector('.c-call-to-action__subtitle');
    const button = element.querySelector('.c-call-to-action__button');
    
    gsap.set(image, { scale: 1.1, opacity: 0 });
    gsap.set(content, { scale: 0.9, opacity: 0 });
    
    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(image, {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out"
        })
        .to(content, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6")
        .to([title, subtitle, button], {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out"
        }, "-=0.4");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

function initCallToActionMagneticButton(element) {
    const content = element.querySelector('.c-call-to-action__content');
    const title = element.querySelector('.c-call-to-action__title');
    const subtitle = element.querySelector('.c-call-to-action__subtitle');
    const button = element.querySelector('.c-call-to-action__button');
    
    gsap.set([title, subtitle, button], { opacity: 0, y: 30 });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to([title, subtitle, button], {
            opacity: 1,
            y: 0,
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
    
    if (button) {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            
            gsap.to(button, {
                x: x * 20,
                y: y * 20,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }
}

function initCallToActionRevealStagger(element) {
    const image = element.querySelector('img');
    const title = element.querySelector('.c-call-to-action__title');
    const subtitle = element.querySelector('.c-call-to-action__subtitle');
    const button = element.querySelector('.c-call-to-action__button');
    
    gsap.set(image, { opacity: 0 });
    gsap.set([title, subtitle, button], { opacity: 0, x: 50 });
    
    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(image, {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        })
        .to([title, subtitle, button], {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.6");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

export function initCallToAction(element, variant = 'default') {
    const variants = {
        'slide-overlay': initCallToActionSlideOverlay,
        'fade-scale': initCallToActionFadeScale,
        'magnetic-button': initCallToActionMagneticButton,
        'reveal-stagger': initCallToActionRevealStagger,
        'default': initCallToActionFadeScale
    };
    const initFn = variants[variant] || variants['default'];
    initFn(element);
}

