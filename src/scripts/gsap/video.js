/**
 * Video Component GSAP Animations
 * Variants: play-on-scroll, modal-reveal, split-screen, immersive
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createAdaptiveTimeline } from './horizontal-animations.js';

// Play on Scroll Variant
function initVideoPlayOnScroll(element) {
    const title = element.querySelector('.c-intro__title');
    const videoContainer = element.querySelector('.c-video__video');
    const poster = element.querySelector('.c-video__poster');
    const playButton = element.querySelector('.c-video__play-button');

    // Set initial states
    gsap.set(title, { opacity: 0, y: 30 });
    gsap.set(videoContainer, { opacity: 0, scale: 0.9 });
    gsap.set(playButton, { scale: 0, opacity: 0 });

    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        })
        .to(videoContainer, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out"
        }, "-=0.4")
        .to(playButton, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.4)"
        }, "-=0.5");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });

    // Animate play button on hover
    if (playButton) {
        playButton.addEventListener('mouseenter', () => {
            gsap.to(playButton, {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        playButton.addEventListener('mouseleave', () => {
            gsap.to(playButton, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }
}

// Modal Reveal Variant
function initVideoModalReveal(element) {
    const title = element.querySelector('.c-intro__title');
    const videoContainer = element.querySelector('.c-video__video');
    const poster = element.querySelector('.c-video__poster');

    // Create overlay
    if (!videoContainer.querySelector('.gsap-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'gsap-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 2;
            pointer-events: none;
        `;
        if (videoContainer.style.position !== 'relative') {
            videoContainer.style.position = 'relative';
        }
        videoContainer.appendChild(overlay);
    }

    // Set initial states
    gsap.set(title, { opacity: 0, y: 30 });
    gsap.set(videoContainer, { opacity: 0, scale: 0.8 });
    gsap.set(videoContainer.querySelector('.gsap-overlay'), { opacity: 1 });

    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        })
        .to(videoContainer, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.4")
        .to(videoContainer.querySelector('.gsap-overlay'), {
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

// Split Screen Variant
function initVideoSplitScreen(element) {
    const title = element.querySelector('.c-intro__title');
    const videoContainer = element.querySelector('.c-video__video');

    // Set initial states
    gsap.set(title, { opacity: 0, x: -100 });
    gsap.set(videoContainer, { opacity: 0, x: 100, clipPath: "inset(0% 50% 0% 50%)" });

    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(title, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out"
        })
        .to(videoContainer, {
            opacity: 1,
            x: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.4");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

// Immersive Variant
function initVideoImmersive(element) {
    const title = element.querySelector('.c-intro__title');
    const videoContainer = element.querySelector('.c-video__video');
    const poster = element.querySelector('.c-video__poster');

    // Set initial states
    gsap.set(title, { opacity: 0, y: 50 });
    gsap.set(videoContainer, { opacity: 0, scale: 1.2, filter: "blur(20px)" });

    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        timeline.to(videoContainer, {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power2.out"
        })
        .to(title, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.8");
        
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
}

// Main initialization function
export function initVideo(element, variant = 'default') {
    const variants = {
        'play-on-scroll': initVideoPlayOnScroll,
        'modal-reveal': initVideoModalReveal,
        'split-screen': initVideoSplitScreen,
        'immersive': initVideoImmersive,
        'default': initVideoPlayOnScroll
    };

    const initFn = variants[variant] || variants['default'];
    initFn(element);
}

