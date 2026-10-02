/**
 * Follow Us Component GSAP Animations (uses Share component styles)
 * Variants: fade-icons, scale-pop, rotate-in, magnetic
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createAdaptiveTimeline } from './horizontal-animations.js';

// Same as Share component since they share styles
function initFollowUsFadeIcons(element) {
    const title = element.querySelector('.c-share__title');
    const icons = element.querySelectorAll('.c-share__icon');
    
    gsap.set(title, { opacity: 0, y: 30 });
    gsap.set(icons, { opacity: 0, y: 30 });
    
    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
    })
    .to(icons, {
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

function initFollowUsScalePop(element) {
    const title = element.querySelector('.c-share__title');
    const icons = element.querySelectorAll('.c-share__icon');
    
    gsap.set(title, { opacity: 0, scale: 0.8 });
    gsap.set(icons, { opacity: 0, scale: 0 });
    
    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(title, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.4)"
    })
    .to(icons, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.4)"
    }, "-=0.4");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

function initFollowUsRotateIn(element) {
    const title = element.querySelector('.c-share__title');
    const icons = element.querySelectorAll('.c-share__icon');
    
    gsap.set(title, { opacity: 0, rotation: -10 });
    gsap.set(icons, { opacity: 0, rotation: 180, scale: 0.5 });
    
    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(title, {
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.4)"
    })
    .to(icons, {
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)"
    }, "-=0.4");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

function initFollowUsMagnetic(element) {
    const title = element.querySelector('.c-share__title');
    const icons = element.querySelectorAll('.c-share__icon');
    
    gsap.set(title, { opacity: 0, y: 30 });
    gsap.set(icons, { opacity: 0, scale: 0.8 });
    
    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
    })
    .to(icons, {
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
    
    icons.forEach(icon => {
        icon.addEventListener('mousemove', (e) => {
            const rect = icon.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            
            gsap.to(icon, {
                x: x * 20,
                y: y * 20,
                scale: 1.2,
                rotation: x * 15,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

export function initFollowUs(element, variant = 'default') {
    const variants = {
        'fade-icons': initFollowUsFadeIcons,
        'scale-pop': initFollowUsScalePop,
        'rotate-in': initFollowUsRotateIn,
        'magnetic': initFollowUsMagnetic,
        'default': initFollowUsFadeIcons
    };
    const initFn = variants[variant] || variants['default'];
    initFn(element);
}

