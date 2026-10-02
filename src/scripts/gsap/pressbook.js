/**
 * Pressbook Component GSAP Animations
 */

import { gsap } from 'gsap';
import { createAdaptiveTimeline } from './horizontal-animations.js';

function initPressbookFadeUp(element) {
    const items = element.querySelectorAll(
        '.c-pressbook__header, .c-pressbook__figure, .c-pressbook__body, .c-pressbook__cast-card, .c-pressbook__qa, .c-pressbook__credits-group'
    );

    gsap.set(items, { opacity: 0, y: 28 });

    createAdaptiveTimeline(
        element,
        () => {
            const timeline = gsap.timeline();
            timeline.to(items, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: 'power2.out'
            });
            return timeline;
        },
        {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    );
}

export function initPressbook(element, variant = 'fade-up') {
    const variants = {
        'fade-up': initPressbookFadeUp,
        default: initPressbookFadeUp
    };

    const initFn = variants[variant] || variants.default;
    initFn(element);
}
