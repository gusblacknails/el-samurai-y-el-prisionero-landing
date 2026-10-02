/**
 * Horizontal Scroll Animation Adapter
 * Adapts ScrollTrigger-based animations to work in horizontal scroll mode
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Check if horizontal scroll mode is active
 */
function isHorizontalMode() {
    return document.body && document.body.classList.contains('horizontal-scroll-active');
}

/**
 * Get the index of a section in the horizontal scroll non-parallax sections
 */
function getSectionIndex(element) {
    if (!window.__horizontalScrollNonParallaxSections) {
        return -1;
    }
    return window.__horizontalScrollNonParallaxSections.indexOf(element);
}

/**
 * Create a timeline that works in both vertical and horizontal modes
 * @param {HTMLElement} element - The element to animate
 * @param {Function} createTimeline - Function that creates the GSAP timeline (without ScrollTrigger)
 * @param {Object} scrollTriggerConfig - ScrollTrigger configuration (for vertical mode)
 */
export function createAdaptiveTimeline(element, createTimeline, scrollTriggerConfig = {}) {
    // Check mode at runtime
    const isHorizontal = typeof document !== 'undefined' && isHorizontalMode();
    
    if (isHorizontal) {
        // In horizontal mode, create timeline without ScrollTrigger
        // Store it to be triggered when section becomes active
        const timeline = createTimeline();
        
        // Pause timeline initially (will be played when section becomes active)
        timeline.pause();
        
        // Mark this element as having animations
        if (!element.__horizontalAnimations) {
            element.__horizontalAnimations = [];
        }
        element.__horizontalAnimations.push({
            timeline: timeline,
            played: false
        });
        
        // If this is the hero section (index 0), play immediately
        const sectionIndex = getSectionIndex(element);
        if (sectionIndex === 0) {
            // Small delay to ensure layout is ready
            setTimeout(() => {
                if (timeline) {
                    timeline.play();
                    if (element.__horizontalAnimations && element.__horizontalAnimations.length > 0) {
                        element.__horizontalAnimations[0].played = true;
                    }
                }
            }, 500);
        }
        
        return timeline;
    } else {
        // In vertical mode, return timeline as-is (ScrollTrigger should be handled by the caller)
        // Actually, we need to wrap it with ScrollTrigger config
        // Since we can't modify the timeline creation, we'll create it with ScrollTrigger wrapper
        const timeline = createTimeline();
        
        // Attach ScrollTrigger configuration
        // Verify document.body exists before creating ScrollTrigger
        if (ScrollTrigger && typeof ScrollTrigger.create === 'function' && document.body && element && element.isConnected) {
            ScrollTrigger.create({
                trigger: scrollTriggerConfig.trigger || element,
                start: scrollTriggerConfig.start || "top 75%",
                toggleActions: scrollTriggerConfig.toggleActions || "play none none none",
                animation: timeline
            });
        }
        
        return timeline;
    }
}

/**
 * Initialize horizontal animation system
 * Listens to section changes and triggers animations
 */
export function initHorizontalAnimations() {
    if (!isHorizontalMode()) {
        return;
    }
    
    // Listen for section changes (activeSection es .section-screen; las animaciones están en su contenido)
    window.addEventListener('sectionChanged', (e) => {
        const currentIndex = e.detail.index;
        const sections = window.__horizontalScrollNonParallaxSections || [];
        if (currentIndex < 0 || currentIndex >= sections.length) return;
        const activeScreen = sections[currentIndex];
        const contentEl = activeScreen && activeScreen.querySelector('.section-screen__content > *');
        if (contentEl && contentEl.__horizontalAnimations) {
            contentEl.__horizontalAnimations.forEach(anim => {
                if (!anim.played) {
                    anim.timeline.play();
                    anim.played = true;
                }
            });
        }
    });

    // Al cargar, disparar animaciones de la sección actual
    setTimeout(() => {
        const currentIndex = window.__currentSectionIndex ?? 0;
        const sections = window.__horizontalScrollNonParallaxSections || [];
        if (currentIndex < 0 || currentIndex >= sections.length) return;
        const activeScreen = sections[currentIndex];
        const contentEl = activeScreen && activeScreen.querySelector('.section-screen__content > *');
        if (contentEl && contentEl.__horizontalAnimations) {
            contentEl.__horizontalAnimations.forEach(anim => {
                if (!anim.played) {
                    anim.timeline.play();
                    anim.played = true;
                }
            });
        }
    }, 500);
}

/**
 * Helper to create a simple adaptive animation with ScrollTrigger config
 * @param {HTMLElement} element - Element to animate
 * @param {Array|HTMLElement} targets - Elements to animate
 * @param {Object} fromProps - Initial properties
 * @param {Object} toProps - Final properties
 * @param {Object} options - Additional options (duration, stagger, ease, etc.)
 */
export function createAdaptiveAnimation(element, targets, fromProps, toProps, options = {}) {
    const createTimeline = () => {
        const tl = gsap.timeline();
        
        // Set initial states
        gsap.set(targets, fromProps);
        
        // Create animation
        tl.to(targets, {
            ...toProps,
            duration: options.duration || 0.8,
            stagger: options.stagger || 0,
            ease: options.ease || "power2.out"
        });
        
        return tl;
    };
    
    return createAdaptiveTimeline(element, createTimeline, {
        start: options.start || "top 75%",
        toggleActions: options.toggleActions || "play none none none"
    });
}
