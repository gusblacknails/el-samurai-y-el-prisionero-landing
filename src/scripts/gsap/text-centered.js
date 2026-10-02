/**
 * Text Centered Component GSAP Animations
 * Variants: split-text, fade-up-stagger, morphing-text, typewriter
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '../gsap-init.js';
import { createAdaptiveTimeline } from './horizontal-animations.js';

// Check if horizontal scroll mode is active
function isHorizontalMode() {
    return document.body && document.body.classList.contains('horizontal-scroll-active');
}

// Split Text Variant (simulated)
function initTextCenteredSplitText(element) {
    const title = element.querySelector('.c-intro__title');
    const text = element.querySelector('.c-intro__text');

    // Set initial states
    gsap.set(title, { opacity: 0, y: 30 });
    gsap.set(text, { opacity: 0, y: 30 });

    // Create timeline with ScrollTrigger
    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();

        // Animate title with split effect (using clip-path)
        if (title) {
            gsap.set(title, { clipPath: "inset(0% 100% 0% 0%)" });
            timeline.to(title, {
                clipPath: "inset(0% 0% 0% 0%)",
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        }

        // Animate text
        if (text) {
            timeline.to(text, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }, "-=0.6");
        }
        
        return timeline;
    }, {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none"
    });
}

// Fade Up Stagger Variant
function initTextCenteredFadeUpStagger(element) {
    const title = element.querySelector('.c-intro__title');
    const text = element.querySelector('.c-intro__text');
    const paragraphs = text?.querySelectorAll('p') || [];

    // Set initial states
    gsap.set([title, text, ...paragraphs], { opacity: 0, y: 50 });

    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        // Stagger animation
        const elements = title ? [title, ...paragraphs.length ? paragraphs : [text]] : [text];
        
        timeline.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
        
        return timeline;
    }, {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none"
    });
}

// Morphing Text Variant
function initTextCenteredMorphingText(element) {
    const title = element.querySelector('.c-intro__title');
    const text = element.querySelector('.c-intro__text');

    // Set initial states with scale
    gsap.set(title, { opacity: 0, scale: 0.8, rotationX: 90 });
    gsap.set(text, { opacity: 0, scale: 0.9 });

    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        if (title) {
            timeline.to(title, {
            opacity: 1,
            scale: 1,
            rotationX: 0,
            duration: 1,
            ease: "back.out(1.4)"
        });
    }

    if (text) {
        tl.to(text, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5");
        }
        
        return timeline;
    }, {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none"
    });
}

// AutoSplit with ScrollTrigger Variant
function initTextCenteredAutoSplit(element) {
    if (!SplitText) {
        console.warn('SplitText plugin not available. Falling back to default animation.');
        return initTextCenteredFadeUpStagger(element);
    }

    // Ensure document.body is available
    if (!document.body) {
        setTimeout(() => initTextCenteredAutoSplit(element), 50);
        return;
    }

    const title = element.querySelector('.c-intro__title');
    const text = element.querySelector('.c-intro__text');

    // Check mode early to avoid unnecessary ScrollTrigger creation in horizontal mode
    const isHorizontal = isHorizontalMode();

    // Set initial opacity to 1 so text is visible before SplitText processes it
    gsap.set([title, text].filter(Boolean), { opacity: 1 });

    // Wait for fonts to load before splitting
    document.fonts.ready.then(() => {
        // Double-check document.body is still available
        if (!document.body) {
            return;
        }
        
        // Process title if it exists
        if (title) {
            let titleAnimation;
            SplitText.create(title, {
                type: "words,lines",
                mask: "lines",
                linesClass: "line",
                autoSplit: true,
                onSplit: (instance) => {
                    // Kill previous animation if it exists
                    if (titleAnimation) {
                        titleAnimation.kill();
                    }
                    
                    if (isHorizontal) {
                        // In horizontal mode, create a paused timeline that will be triggered
                        const timeline = gsap.timeline({ paused: true });
                        timeline.from(instance.lines, {
                            yPercent: 120,
                            stagger: 0.1,
                            duration: 1.2,
                            ease: "power3.out"
                        });
                        
                        // Store animation to be triggered when section becomes active
                        if (!element.__horizontalAnimations) {
                            element.__horizontalAnimations = [];
                        }
                        element.__horizontalAnimations.push({
                            timeline: timeline,
                            played: false
                        });
                        
                        titleAnimation = timeline;
                    } else {
                        // In vertical mode, use ScrollTrigger with scrub
                        // Verify document.body exists before creating ScrollTrigger
                        if (document.body && element && element.isConnected) {
                            titleAnimation = gsap.from(instance.lines, {
                                yPercent: 120,
                                stagger: 0.1,
                                scrollTrigger: {
                                    trigger: element,
                                    start: "clamp(top center)",
                                    end: "clamp(bottom center)",
                                    scrub: true,
                                    invalidateOnRefresh: true
                                }
                            });
                        }
                    }
                    
                    return titleAnimation;
                }
            });
        }

        // Process text if it exists
        if (text) {
            let textAnimation;
            SplitText.create(text, {
                type: "words,lines",
                mask: "lines",
                linesClass: "line",
                autoSplit: true,
                onSplit: (instance) => {
                    // Kill previous animation if it exists
                    if (textAnimation) {
                        textAnimation.kill();
                    }
                    
                    if (isHorizontal) {
                        // In horizontal mode, create a paused timeline that will be triggered
                        const timeline = gsap.timeline({ paused: true });
                        timeline.from(instance.lines, {
                            yPercent: 120,
                            stagger: 0.1,
                            duration: 1.2,
                            ease: "power3.out"
                        });
                        
                        // Store animation to be triggered when section becomes active
                        if (!element.__horizontalAnimations) {
                            element.__horizontalAnimations = [];
                        }
                        element.__horizontalAnimations.push({
                            timeline: timeline,
                            played: false
                        });
                        
                        textAnimation = timeline;
                    } else {
                        // In vertical mode, use ScrollTrigger with scrub
                        // Verify document.body exists before creating ScrollTrigger
                        if (document.body && element && element.isConnected) {
                            textAnimation = gsap.from(instance.lines, {
                                yPercent: 120,
                                stagger: 0.1,
                                scrollTrigger: {
                                    trigger: element,
                                    start: "clamp(top center)",
                                    end: "clamp(bottom center)",
                                    scrub: true,
                                    invalidateOnRefresh: true
                                }
                            });
                        }
                    }
                    
                    return textAnimation;
                }
            });
        }
    });
}

// Typewriter Variant (simulated)
function initTextCenteredTypewriter(element) {
    const title = element.querySelector('.c-intro__title');
    const text = element.querySelector('.c-intro__text');

    // Set initial states
    gsap.set(title, { opacity: 0 });
    gsap.set(text, { opacity: 0 });

    const tl = createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        
        // Typewriter effect using clip-path
        if (title) {
            gsap.set(title, { clipPath: "inset(0% 100% 0% 0%)" });
            timeline.to(title, {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut"
        });
    }

    // Text fade in
    if (text) {
        tl.to(text, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.7");
        }
        
        return timeline;
    }, {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none"
    });
}

/**
 * Calculate optimal font size for text to fit within container constraints
 * @param {HTMLElement} textElement - The text element to adjust
 * @param {HTMLElement} containerElement - The container element
 */
function calculateOptimalFontSize(textElement, containerElement) {
    if (!textElement || !containerElement) return;
    
    // Ensure element is visible and rendered
    if (!textElement.offsetWidth || !textElement.offsetHeight) {
        // Retry after a short delay if element not yet rendered
        setTimeout(() => calculateOptimalFontSize(textElement, containerElement), 100);
        return;
    }
    
    const isMobile = window.innerWidth < 768; // md breakpoint
    const maxHeightMobile = window.innerHeight * 0.8; // 80% of viewport height on mobile
    const maxHeightDesktop = window.innerHeight * 0.5; // 50% of viewport height on desktop
    const maxHeight = isMobile ? maxHeightMobile : maxHeightDesktop;
    
    const containerWidth = containerElement.offsetWidth || window.innerWidth;
    const padding = 40; // Account for padding (20px each side)
    const availableWidth = containerWidth - padding;
    
    // Get current computed styles
    const computedStyle = getComputedStyle(textElement);
    const currentFontSize = parseFloat(computedStyle.fontSize) || 16;
    const currentLineHeight = parseFloat(computedStyle.lineHeight);
    const lineHeightRatio = currentLineHeight && !isNaN(currentLineHeight) 
        ? currentLineHeight / currentFontSize 
        : 1.6;
    
    // Create a temporary element for measurement
    const measureEl = document.createElement('div');
    measureEl.style.position = 'absolute';
    measureEl.style.visibility = 'hidden';
    measureEl.style.width = `${availableWidth}px`;
    measureEl.style.top = '-9999px';
    measureEl.style.left = '-9999px';
    measureEl.style.whiteSpace = 'normal';
    measureEl.style.wordWrap = 'break-word';
    measureEl.style.overflowWrap = 'break-word';
    measureEl.style.wordBreak = 'normal';
    measureEl.style.hyphens = 'none';
    measureEl.style.fontFamily = computedStyle.fontFamily;
    measureEl.style.fontWeight = computedStyle.fontWeight;
    measureEl.style.fontStyle = computedStyle.fontStyle;
    measureEl.style.letterSpacing = computedStyle.letterSpacing;
    measureEl.style.textAlign = computedStyle.textAlign;
    measureEl.innerHTML = textElement.innerHTML;
    document.body.appendChild(measureEl);
    
    // Binary search for optimal font size
    let minSize = isMobile ? 12 : 14;
    let maxSize = isMobile ? 28 : 36;
    let optimalSize = currentFontSize;
    const tolerance = 0.1; // 0.1px tolerance
    
    // Function to test if a font size fits
    const testFontSize = (size) => {
        measureEl.style.fontSize = `${size}px`;
        measureEl.style.lineHeight = `${size * lineHeightRatio}px`;
        
        // Force reflow
        measureEl.offsetHeight;
        
        return measureEl.offsetHeight <= maxHeight;
    };
    
    // Perform binary search
    while (maxSize - minSize > tolerance) {
        const testSize = (minSize + maxSize) / 2;
        
        if (testFontSize(testSize)) {
            optimalSize = testSize;
            minSize = testSize;
        } else {
            maxSize = testSize;
        }
    }
    
    // Clean up
    document.body.removeChild(measureEl);
    
    // Apply optimal size with smooth transition
    textElement.style.transition = 'font-size 0.3s ease, line-height 0.3s ease';
    textElement.style.fontSize = `${optimalSize}px`;
    textElement.style.lineHeight = `${optimalSize * lineHeightRatio}px`;
}

/**
 * Initialize scrollable text container for text-centered component
 * Creates a scrollable wrapper if text is too long
 */
function initTextCenteredScrollable(element) {
    if (!isHorizontalMode()) return;
    
    const textElement = element.querySelector('.c-intro__text');
    const wrapperElement = element.querySelector('.c-intro__text-wrapper');
    
    if (!textElement || !wrapperElement || !textElement.textContent.trim()) return;
    
    const checkAndSetupScroll = () => {
        requestAnimationFrame(() => {
            // No scroll interno: dejar que el CSS controle max-height (100vh) y overflow
            wrapperElement.style.maxHeight = '';
            wrapperElement.style.overflowY = '';
            element.removeAttribute('data-has-internal-scroll');
        });
    };
    
    // Wait for fonts and DOM to be ready
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            setTimeout(checkAndSetupScroll, 300);
        });
    } else {
        if (document.readyState === 'complete') {
            setTimeout(checkAndSetupScroll, 300);
        } else {
            window.addEventListener('load', () => {
                setTimeout(checkAndSetupScroll, 300);
            });
        }
    }
    
    // Recalculate on resize
    let resizeTimeout;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkAndSetupScroll, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Store cleanup
    if (!element.__scrollableCleanup) {
        element.__scrollableCleanup = () => {
            window.removeEventListener('resize', handleResize);
        };
    }
}

/**
 * Check if a text-centered element has active internal scroll
 * @param {HTMLElement} element - The section element
 * @returns {boolean} - True if has scrollable content and scroll is not at bottom
 */
export function hasActiveInternalScroll(element) {
    if (!element || !element.hasAttribute('data-has-internal-scroll')) {
        return false;
    }
    
    const scrollElement = element.__internalScrollElement || element.querySelector('.c-intro__text-wrapper');
    if (!scrollElement) return false;
    
    const scrollTop = scrollElement.scrollTop;
    const scrollHeight = scrollElement.scrollHeight;
    const clientHeight = scrollElement.clientHeight;
    
    // Check if scroll is not at bottom (with small tolerance)
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
    
    return !isAtBottom;
}

/**
 * Scroll internal scroll element
 * @param {HTMLElement} element - The section element
 * @param {number} deltaY - Scroll delta
 * @returns {boolean} - True if scroll was consumed
 */
export function scrollInternalScroll(element, deltaY) {
    if (!element || !element.hasAttribute('data-has-internal-scroll')) {
        return false;
    }
    
    const scrollElement = element.__internalScrollElement || element.querySelector('.c-intro__text-wrapper');
    if (!scrollElement) return false;
    
    const scrollTop = scrollElement.scrollTop;
    const scrollHeight = scrollElement.scrollHeight;
    const clientHeight = scrollElement.clientHeight;
    const maxScroll = scrollHeight - clientHeight;
    
    // Check if we can scroll in the requested direction
    const canScrollDown = deltaY > 0 && scrollTop < maxScroll;
    const canScrollUp = deltaY < 0 && scrollTop > 0;
    
    if (canScrollDown || canScrollUp) {
        const scrollAmount = Math.abs(deltaY) * 0.5; // Smooth scroll amount
        const newScrollTop = deltaY > 0 
            ? Math.min(scrollTop + scrollAmount, maxScroll)
            : Math.max(scrollTop - scrollAmount, 0);
        
        scrollElement.scrollTop = newScrollTop;
        return true;
    }
    
    return false;
}

/**
 * Font size: controlado por CSS fluid (clamp + vw) para que sea proporcional al viewport.
 * No se aplica cálculo JS para no pisar el tamaño fluido.
 */
function initTextCenteredFontSize(_element) {
    // Dejamos que el tamaño lo defina solo el CSS (clamp + vw) en todos los modos
}

// Main initialization function
export function initTextCentered(element, variant = 'default') {
    const variants = {
        'split-text': initTextCenteredSplitText,
        'fade-up-stagger': initTextCenteredFadeUpStagger,
        'morphing-text': initTextCenteredMorphingText,
        'typewriter': initTextCenteredTypewriter,
        'autosplit': initTextCenteredAutoSplit,
        'default': initTextCenteredFadeUpStagger
    };

    const initFn = variants[variant] || variants['default'];
    initFn(element);
    
    // Initialize scrollable wrapper if in horizontal mode
    initTextCenteredScrollable(element);
    
    // Initialize font size adjustment (only if not scrollable)
    initTextCenteredFontSize(element);
}

