/**
 * Text and Image One Component GSAP Animations
 * Variants: slide-parallax, reveal-stagger, magnetic-hover, overlay-reveal
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createAdaptiveTimeline } from './horizontal-animations.js';

// Slide Parallax Variant
function initTextAndImageOneSlideParallax(element) {
    const image = element.querySelector('img');
    const title = element.querySelector('.c-text-and-image-one__title');
    const subtitle = element.querySelector('.c-text-and-image-one__subtitle');
    const text = element.querySelector('.c-text-and-image-one__text');

    // Set initial states
    gsap.set(image, { x: -100, opacity: 0 });
    gsap.set([title, subtitle, text], { x: 100, opacity: 0 });

    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        // Parallax image and text
        timeline.to(image, {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
        })
        .to([title, subtitle], {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.8")
        .to(text, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });

    // Parallax on scroll (only in vertical mode)
    if (image && document.body && !document.body.classList.contains('horizontal-scroll-active')) {
        gsap.to(image, {
            yPercent: -20,
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

// Reveal Stagger Variant
function initTextAndImageOneRevealStagger(element) {
    const image = element.querySelector('img');
    const subtitle = element.querySelector('.c-text-and-image-one__subtitle');
    const title = element.querySelector('.c-text-and-image-one__title');
    const text = element.querySelector('.c-text-and-image-one__text');

    // Set initial states
    gsap.set(image, { scale: 0.8, opacity: 0 });
    gsap.set([subtitle, title, text], { y: 30, opacity: 0 });

    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        // Stagger reveal
        timeline.to(image, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        })
        .to([subtitle, title], {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out"
        }, "-=0.5")
        .to(text, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

// Magnetic Hover Variant
function initTextAndImageOneMagneticHover(element) {
    const image = element.querySelector('img');
    const subtitle = element.querySelector('.c-text-and-image-one__subtitle');
    const title = element.querySelector('.c-text-and-image-one__title');
    const text = element.querySelector('.c-text-and-image-one__text');

    // Set initial states
    gsap.set(image, { scale: 1.1, opacity: 0 });
    gsap.set([subtitle, title, text], { opacity: 0, y: 20 });

    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(image, {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out"
        })
        .to([subtitle, title, text], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.6");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });

    // Magnetic hover on image
    if (image) {
        image.addEventListener('mousemove', (e) => {
            const rect = image.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

            gsap.to(image, {
                x: x * 20,
                y: y * 20,
                rotation: x * 5,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        image.addEventListener('mouseleave', () => {
            gsap.to(image, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    }
}

// Overlay Reveal Variant
function initTextAndImageOneOverlayReveal(element) {
    const image = element.querySelector('img');
    const subtitle = element.querySelector('.c-text-and-image-one__subtitle');
    const title = element.querySelector('.c-text-and-image-one__title');
    const text = element.querySelector('.c-text-and-image-one__text');

    // Create overlay
    const imageContainer = image?.parentElement;
    if (imageContainer && !imageContainer.querySelector('.gsap-overlay')) {
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
        if (imageContainer.style.position !== 'relative') {
            imageContainer.style.position = 'relative';
        }
        imageContainer.appendChild(overlay);
    }

    // Set initial states
    gsap.set(image, { opacity: 0, scale: 1.1 });
    gsap.set(imageContainer?.querySelector('.gsap-overlay'), { x: '0%' });
    gsap.set([subtitle, title, text], { opacity: 0, y: 30 });

    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(image, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out"
        })
        .to(imageContainer?.querySelector('.gsap-overlay'), {
            x: '100%',
            duration: 1.2,
            ease: "power3.inOut"
        }, "-=0.8")
        .to([subtitle, title, text], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
        }, "-=0.6");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

// Main initialization function
export function initTextAndImageOne(element, variant = 'default') {
    const variants = {
        'slide-parallax': initTextAndImageOneSlideParallax,
        'reveal-stagger': initTextAndImageOneRevealStagger,
        'magnetic-hover': initTextAndImageOneMagneticHover,
        'overlay-reveal': initTextAndImageOneOverlayReveal,
        'default': initTextAndImageOneRevealStagger
    };

    const initFn = variants[variant] || variants['default'];
    initFn(element);
}

