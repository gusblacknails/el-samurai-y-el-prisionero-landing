/**
 * Logos Component GSAP Animations
 * Variants: fade-stagger, scale-pop, slide-in, magnetic-hover
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createAdaptiveTimeline } from './horizontal-animations.js';

function initLogosFadeStagger(element) {
    const title = element.querySelector('.c-logos__title');
    const logos = element.querySelectorAll('.c-logos__img-container');
    
    gsap.set(title, { opacity: 0, y: 30 });
    gsap.set(logos, { opacity: 0, y: 30 });
    
    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
    })
    .to(logos, {
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

function initLogosScalePop(element) {
    const title = element.querySelector('.c-logos__title');
    const logos = element.querySelectorAll('.c-logos__img-container');
    
    gsap.set(title, { opacity: 0, scale: 0.8 });
    gsap.set(logos, { opacity: 0, scale: 0 });
    
    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(title, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.4)"
    })
    .to(logos, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(1.2)"
    }, "-=0.4");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

function initLogosSlideIn(element) {
    const title = element.querySelector('.c-logos__title');
    const logos = element.querySelectorAll('.c-logos__img-container');
    
    gsap.set(title, { opacity: 0, x: -50 });
    gsap.set(logos, { opacity: 0, x: (i) => (i % 2 === 0 ? -100 : 100) });
    
    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(title, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out"
    })
    .to(logos, {
        opacity: 1,
        x: 0,
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

function initLogosMagneticHover(element) {
    const title = element.querySelector('.c-logos__title');
    const logos = element.querySelectorAll('.c-logos__img-container');
    
    gsap.set(title, { opacity: 0, y: 30 });
    gsap.set(logos, { opacity: 0, scale: 0.8 });
    
    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
    })
    .to(logos, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.2)"
    }, "-=0.4");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
    
    logos.forEach(logo => {
        const img = logo.querySelector('img');
        if (img) {
            logo.addEventListener('mousemove', (e) => {
                const rect = logo.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
                const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
                
                gsap.to(img, {
                    x: x * 15,
                    y: y * 15,
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            logo.addEventListener('mouseleave', () => {
                gsap.to(img, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        }
    });
}

export function initLogos(element, variant = 'default') {
    const variants = {
        'fade-stagger': initLogosFadeStagger,
        'scale-pop': initLogosScalePop,
        'slide-in': initLogosSlideIn,
        'magnetic-hover': initLogosMagneticHover,
        'default': initLogosFadeStagger
    };
    const initFn = variants[variant] || variants['default'];
    initFn(element);
}

