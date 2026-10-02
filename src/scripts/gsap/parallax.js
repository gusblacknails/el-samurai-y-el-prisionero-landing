/**
 * Parallax Component GSAP Animations
 * Variants: smooth-scroll, fast-parallax, reveal-parallax, depth-layered
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Check if horizontal scroll mode is active
function isHorizontalMode() {
    return document.body.classList.contains('horizontal-scroll-active');
}

function initParallaxSmoothScroll(element) {
    // Element is already .parallax-window
    
    if (isHorizontalMode()) {
        // Horizontal mode: parallax moves horizontally between sections
        gsap.set(element, { opacity: 1, xPercent: 0 });
        
        // Find which section this parallax belongs to
        // The parallax element is .parallax-window, which is inside .c-parallax
        const parallaxContainer = element.closest('.c-parallax') || element.parentElement;
        const main = document.querySelector('.c-main');
        
        if (main && parallaxContainer) {
            // Get all sections/components in order
            const allSections = Array.from(main.children).filter(child => {
                const tag = child.tagName.toLowerCase();
                return tag === 'section' || 
                       child.classList.contains('c-hero') || 
                       child.classList.contains('c-intro') ||
                       child.classList.contains('c-gallery-section') ||
                       child.classList.contains('c-quotes') ||
                       child.classList.contains('c-video') ||
                       child.classList.contains('c-details') ||
                       child.classList.contains('c-call-to-action') ||
                       child.classList.contains('c-logos') ||
                       child.classList.contains('c-share') ||
                       child.classList.contains('c-follow-us') ||
                       child.classList.contains('c-text-and-image-one') ||
                       child.classList.contains('c-text-and-image-two') ||
                       child.classList.contains('c-image') ||
                       child.classList.contains('c-ticketing') ||
                       child.classList.contains('c-parallax') ||
                       child.classList.contains('c-sorteo') ||
                       child.classList.contains('c-custom');
            });
            
            const parallaxSectionIndex = allSections.indexOf(parallaxContainer);
            
            if (parallaxSectionIndex !== -1) {
                // Create a function to update parallax based on current section
                function updateParallax() {
                    const currentIndex = window.__currentSectionIndex !== undefined ? window.__currentSectionIndex : 0;
                    const distance = Math.abs(currentIndex - parallaxSectionIndex);
                    
                    if (distance === 0) {
                        // Parallax is active - animate horizontally
                        gsap.to(element, {
                            xPercent: -30,
                            opacity: 1,
                            duration: 0.6,
                            ease: "power2.out"
                        });
                    } else {
                        // Parallax is not active - reset
                        gsap.to(element, {
                            xPercent: 0,
                            opacity: 0.3,
                            duration: 0.6,
                            ease: "power2.out"
                        });
                    }
                }
                
                // Listen to section changes via custom event
                window.addEventListener('sectionChanged', (e) => {
                    updateParallax();
                });
                
                // Initial update
                setTimeout(updateParallax, 500);
            }
        }
    } else {
        // Vertical mode: traditional parallax
        // Set initial state for smooth entry
        gsap.set(element, { opacity: 0 });
        
        // Fade in on entry
        gsap.to(element, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
        
        // Parallax effect during scroll
        gsap.to(element, {
            yPercent: -30,
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

function initParallaxFastParallax(element) {
    // Element is already .parallax-window
    
    if (isHorizontalMode()) {
        // Horizontal mode: faster horizontal parallax
        const parallaxContainer = element.closest('.c-parallax') || element.parentElement;
        const main = document.querySelector('.c-main');
        
        if (main && parallaxContainer) {
            const allSections = Array.from(main.children).filter(child => {
                const tag = child.tagName.toLowerCase();
                return tag === 'section' || 
                       child.classList.contains('c-hero') || 
                       child.classList.contains('c-intro') ||
                       child.classList.contains('c-gallery-section') ||
                       child.classList.contains('c-quotes') ||
                       child.classList.contains('c-video') ||
                       child.classList.contains('c-details') ||
                       child.classList.contains('c-call-to-action') ||
                       child.classList.contains('c-logos') ||
                       child.classList.contains('c-share') ||
                       child.classList.contains('c-follow-us') ||
                       child.classList.contains('c-text-and-image-one') ||
                       child.classList.contains('c-text-and-image-two') ||
                       child.classList.contains('c-image') ||
                       child.classList.contains('c-ticketing') ||
                       child.classList.contains('c-parallax') ||
                       child.classList.contains('c-sorteo') ||
                       child.classList.contains('c-custom');
            });
            
            const parallaxSectionIndex = allSections.indexOf(parallaxContainer);
            
            if (parallaxSectionIndex !== -1) {
                function updateParallax() {
                    const currentIndex = window.__currentSectionIndex !== undefined ? window.__currentSectionIndex : 0;
                    const distance = Math.abs(currentIndex - parallaxSectionIndex);
                    
                    if (distance === 0) {
                        gsap.to(element, {
                            xPercent: -50,
                            opacity: 1,
                            duration: 0.6,
                            ease: "power2.out"
                        });
                    } else {
                        gsap.to(element, {
                            xPercent: 0,
                            opacity: 0.3,
                            duration: 0.6,
                            ease: "power2.out"
                        });
                    }
                }
                
                window.addEventListener('sectionChanged', updateParallax);
                setTimeout(updateParallax, 500);
            }
        }
    } else {
        // Vertical mode
        gsap.to(element, {
            yPercent: -50,
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

function initParallaxRevealParallax(element) {
    // Element is already .parallax-window
    
    if (isHorizontalMode()) {
        // Horizontal mode: reveal with horizontal parallax
        const parallaxContainer = element.closest('.c-parallax') || element.parentElement;
        const main = document.querySelector('.c-main');
        
        if (main && parallaxContainer) {
            const allSections = Array.from(main.children).filter(child => {
                const tag = child.tagName.toLowerCase();
                return tag === 'section' || 
                       child.classList.contains('c-hero') || 
                       child.classList.contains('c-intro') ||
                       child.classList.contains('c-gallery-section') ||
                       child.classList.contains('c-quotes') ||
                       child.classList.contains('c-video') ||
                       child.classList.contains('c-details') ||
                       child.classList.contains('c-call-to-action') ||
                       child.classList.contains('c-logos') ||
                       child.classList.contains('c-share') ||
                       child.classList.contains('c-follow-us') ||
                       child.classList.contains('c-text-and-image-one') ||
                       child.classList.contains('c-text-and-image-two') ||
                       child.classList.contains('c-image') ||
                       child.classList.contains('c-ticketing') ||
                       child.classList.contains('c-parallax') ||
                       child.classList.contains('c-sorteo') ||
                       child.classList.contains('c-custom');
            });
            
            const parallaxSectionIndex = allSections.indexOf(parallaxContainer);
            
            if (parallaxSectionIndex !== -1) {
                gsap.set(element, { opacity: 0, scale: 1.2, xPercent: 0 });
                
                function updateParallax() {
                    const currentIndex = window.__currentSectionIndex !== undefined ? window.__currentSectionIndex : 0;
                    const distance = Math.abs(currentIndex - parallaxSectionIndex);
                    
                    if (distance === 0) {
                        gsap.to(element, {
                            xPercent: -30,
                            opacity: 1,
                            scale: 1,
                            duration: 0.6,
                            ease: "power2.out"
                        });
                    } else {
                        gsap.to(element, {
                            xPercent: 0,
                            opacity: 0.3,
                            scale: 1.1,
                            duration: 0.6,
                            ease: "power2.out"
                        });
                    }
                }
                
                window.addEventListener('sectionChanged', updateParallax);
                setTimeout(updateParallax, 500);
            }
        }
    } else {
        // Vertical mode
        gsap.set(element, { opacity: 0, scale: 1.2 });
        
        gsap.to(element, {
            opacity: 1,
            scale: 1,
            yPercent: -30,
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

function initParallaxDepthLayered(element) {
    // Element is already .parallax-window
    
    if (isHorizontalMode()) {
        // Horizontal mode: depth layered horizontal parallax
        const parallaxContainer = element.closest('.c-parallax') || element.parentElement;
        const main = document.querySelector('.c-main');
        
        if (main && parallaxContainer) {
            const allSections = Array.from(main.children).filter(child => {
                const tag = child.tagName.toLowerCase();
                return tag === 'section' || 
                       child.classList.contains('c-hero') || 
                       child.classList.contains('c-intro') ||
                       child.classList.contains('c-gallery-section') ||
                       child.classList.contains('c-quotes') ||
                       child.classList.contains('c-video') ||
                       child.classList.contains('c-details') ||
                       child.classList.contains('c-call-to-action') ||
                       child.classList.contains('c-logos') ||
                       child.classList.contains('c-share') ||
                       child.classList.contains('c-follow-us') ||
                       child.classList.contains('c-text-and-image-one') ||
                       child.classList.contains('c-text-and-image-two') ||
                       child.classList.contains('c-image') ||
                       child.classList.contains('c-ticketing') ||
                       child.classList.contains('c-parallax') ||
                       child.classList.contains('c-sorteo') ||
                       child.classList.contains('c-custom');
            });
            
            const parallaxSectionIndex = allSections.indexOf(parallaxContainer);
            
            if (parallaxSectionIndex !== -1) {
                function updateParallax() {
                    const currentIndex = window.__currentSectionIndex !== undefined ? window.__currentSectionIndex : 0;
                    const distance = Math.abs(currentIndex - parallaxSectionIndex);
                    
                    if (distance === 0) {
                        gsap.to(element, {
                            xPercent: -40,
                            scale: 1.1,
                            opacity: 1,
                            duration: 0.6,
                            ease: "power2.out"
                        });
                    } else {
                        gsap.to(element, {
                            xPercent: 0,
                            scale: 1,
                            opacity: 0.3,
                            duration: 0.6,
                            ease: "power2.out"
                        });
                    }
                }
                
                window.addEventListener('sectionChanged', updateParallax);
                setTimeout(updateParallax, 500);
            }
        }
    } else {
        // Vertical mode
        gsap.to(element, {
            yPercent: -40,
            scale: 1.1,
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

export function initParallax(element, variant = 'default') {
    // Ensure element exists
    if (!element) return;
    
    // In horizontal mode, use a different implementation
    if (isHorizontalMode()) {
        // Wait for DOM to be ready, especially document.body and the .c-parallax__image element
        // The element will be created by initParallaxHorizontal if it doesn't exist
        function initWhenReady() {
            if (document.body) {
                initParallaxHorizontal(element, variant);
            } else {
                // Try again after a short delay if body still doesn't exist
                setTimeout(initWhenReady, 100);
            }
        }
        setTimeout(initWhenReady, 200);
        return;
    }
    
    // Vertical mode: use traditional parallax
    const variants = {
        'smooth-scroll': initParallaxSmoothScroll,
        'fast-parallax': initParallaxFastParallax,
        'reveal-parallax': initParallaxRevealParallax,
        'depth-layered': initParallaxDepthLayered,
        'default': initParallaxSmoothScroll
    };
    const initFn = variants[variant] || variants['default'];
    initFn(element);
}

/**
 * Horizontal parallax implementation for horizontal-snap mode
 * Creates a smooth parallax effect that moves horizontally between sections
 */
function initParallaxHorizontal(element, variant = 'default') {
    // In horizontal mode, element is .parallax-window which also has .c-parallax class
    const parallaxContainer = element.classList.contains('c-parallax') ? element : element.closest('.c-parallax');
    const main = document.querySelector('.c-main');
    
    if (!parallaxContainer || !main) {
        console.warn('Horizontal parallax: Missing container or main');
        return;
    }
    
    // Get image source
    const imageSrc = element.getAttribute('data-parallax-image') || element.getAttribute('data-image-src');
    if (!imageSrc) {
        console.warn('Horizontal parallax: No image source found');
        return;
    }
    
    // Create unique ID for this parallax instance based on container's position in DOM
    const allParallax = document.querySelectorAll('.c-parallax');
    const parallaxIndex = Array.from(allParallax).indexOf(parallaxContainer);
    const parallaxId = `parallax-${parallaxIndex}`;
    
    // Check if image already exists for this parallax
    let parallaxImage = document.querySelector(`.c-parallax__image[data-parallax-id="${parallaxId}"]`);
    
    // If image element doesn't exist, create it and append to body for fixed positioning
    if (!parallaxImage && document.body) {
        parallaxImage = document.createElement('div');
        parallaxImage.className = 'c-parallax__image';
        parallaxImage.setAttribute('data-parallax-id', parallaxId);
        parallaxImage.style.backgroundImage = `url('${imageSrc}')`;
        parallaxImage.style.position = 'fixed';
        parallaxImage.style.top = '0';
        parallaxImage.style.left = '0';
        parallaxImage.style.width = '100vw';
        parallaxImage.style.height = '100vh';
        parallaxImage.style.backgroundSize = 'cover';
        parallaxImage.style.backgroundPosition = 'center';
        parallaxImage.style.backgroundRepeat = 'no-repeat';
        parallaxImage.style.zIndex = '1';
        parallaxImage.style.pointerEvents = 'none';
        parallaxImage.style.opacity = '0';
        // Append to body so it can be fixed and behind all content
        document.body.appendChild(parallaxImage);
    } else if (!document.body) {
        console.warn('Horizontal parallax: document.body not available yet');
        return; // Exit early if body doesn't exist
    }
    
    if (!parallaxImage) {
        console.warn('Horizontal parallax: Failed to create image element', {
            hasImageSrc: !!imageSrc,
            imageSrc: imageSrc,
            hasBody: !!document.body
        });
        return;
    }
    
    // Get all sections/components in order
    const allSections = Array.from(main.children).filter(child => {
        const tag = child.tagName.toLowerCase();
        return tag === 'section' || 
               child.classList.contains('c-hero') || 
               child.classList.contains('c-intro') ||
               child.classList.contains('c-gallery-section') ||
               child.classList.contains('c-quotes') ||
               child.classList.contains('c-video') ||
               child.classList.contains('c-details') ||
               child.classList.contains('c-call-to-action') ||
               child.classList.contains('c-logos') ||
               child.classList.contains('c-share') ||
               child.classList.contains('c-follow-us') ||
               child.classList.contains('c-text-and-image-one') ||
               child.classList.contains('c-text-and-image-two') ||
               child.classList.contains('c-image') ||
               child.classList.contains('c-ticketing') ||
               child.classList.contains('c-parallax') ||
               child.classList.contains('c-sorteo') ||
               child.classList.contains('c-custom');
    });
    
    const parallaxSectionIndex = allSections.indexOf(parallaxContainer);
    
    if (parallaxSectionIndex === -1) {
        console.warn('Horizontal parallax: Section not found');
        return;
    }
    
    // Set initial state - image starts hidden
    gsap.set(parallaxImage, {
        opacity: 0
    });
    
    // Function to update parallax based on current section
    function updateParallax() {
        if (!parallaxImage) return;
        
        const currentIndex = window.__currentSectionIndex !== undefined ? window.__currentSectionIndex : 0;
        const distance = Math.abs(currentIndex - parallaxSectionIndex);
        
        if (distance === 0) {
            // Parallax section is active - show fixed image behind content
            gsap.to(parallaxImage, {
                opacity: 1,
                duration: 0.3, // Faster appearance
                ease: "power2.out"
            });
            
            // Add active class to container
            parallaxContainer.classList.add('--is-active');
        } else if (distance === 1) {
            // Adjacent section - fade image quickly
            gsap.to(parallaxImage, {
                opacity: 0.6,
                duration: 0.3,
                ease: "power2.out"
            });
            
            parallaxContainer.classList.remove('--is-active');
        } else {
            // Far away - hide image quickly
            gsap.to(parallaxImage, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            
            parallaxContainer.classList.remove('--is-active');
        }
    }
    
    // Listen to section changes via custom event
    window.addEventListener('sectionChanged', (e) => {
        updateParallax();
    });
    
    // Initial update with delay to ensure horizontal scroll is initialized
    setTimeout(updateParallax, 600);
}

