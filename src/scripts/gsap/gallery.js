/**
 * Gallery Component GSAP Animations
 * Multiple variants: 1 (vertical-slider), 2 (observer)
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable, InertiaPlugin } from '../gsap-init.js';
import { createAdaptiveTimeline } from './horizontal-animations.js';

// Observer is loaded from CDN (premium plugin)  
// Get Observer from gsap-init.js
import { Observer } from '../gsap-init.js';

/**
 * Initialize vertical slider gallery
 */
function initGalleryVerticalSlider(element) {
    const wrapper = element.querySelector('.c-gallery-section__wrapper');
    const title = element.querySelector('.c-gallery-section__title');
    const slides = element.querySelectorAll('.gallery-slide');
    const container = element.querySelector('#panelWrap');
    const masterWrap = element.querySelector('#masterWrap');
    const dotsContainer = element.querySelector('.dots');
    const downArrow = element.querySelector('#gallery-downArrow');
    const upArrow = element.querySelector('#gallery-upArrow');
    const thumbnailsWrapper = element.querySelector('.c-gallery-section__thumbnails');
    const thumbnailWrappers = element.querySelectorAll('.c-gallery-section__thumbnail-wrapper');
    
    if (!slides.length || !container || !wrapper) {
        return;
    }
    
    // Entry animation with ScrollTrigger - fade in title and wrapper
    gsap.set([title, wrapper], { opacity: 0, y: 30 });
    
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.to([title, wrapper], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
    
    let oldSlide = 0;
    let activeSlide = 0;
    let navDots = [];
    let dur = 0.6;
    let offsets = [];
    let ih = wrapper.offsetHeight; // Use wrapper height instead of window height
    
    // Create nav dots
    for (let i = 0; i < slides.length; i++) {
        let newDot = document.createElement('div');
        newDot.className = 'dot';
        newDot.index = i;
        navDots.push(newDot);
        newDot.addEventListener('click', slideAnim);
        dotsContainer.appendChild(newDot);
        offsets.push(-slides[i].offsetTop);
    }
    
    // Side screen animation with nav dots
    const dotAnim = gsap.timeline({ paused: true });
    dotAnim.to(
        navDots,
        {
            stagger: { each: 1, yoyo: true, repeat: 1 },
            scale: 2.1,
            rotation: 0.1,
            ease: 'none'
        },
        0.5
    );
    dotAnim.time(1);
    
    // Set initial styles
    gsap.set(dotsContainer, { yPercent: -50 });
    
    // Figure out which nav control called the function
    function slideAnim(e) {
        oldSlide = activeSlide;
        
        // Dragging the panels
        if (this.id === 'dragger') {
            activeSlide = offsets.indexOf(this.endY);
        } else {
            if (gsap.isTweening(container)) {
                return;
            }
            // Up/down arrow clicks
            if (this.id === 'gallery-downArrow' || this.id === 'gallery-upArrow') {
                activeSlide = this.id === 'gallery-downArrow' ? (activeSlide += 1) : (activeSlide -= 1);
            } else if (this.className === 'dot') {
                // Click on a dot
                activeSlide = this.index;
            } else {
                // Scrollwheel
                activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
            }
        }
        
        // Make sure we're not past the end or beginning slide
        activeSlide = activeSlide < 0 ? 0 : activeSlide;
        activeSlide = activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
        
        if (oldSlide === activeSlide) {
            return;
        }
        
        // If we're dragging we don't animate the container
        if (this.id !== 'dragger') {
            gsap.to(container, dur, { y: offsets[activeSlide], ease: 'power2.inOut', onUpdate: tweenDot });
        }
        
        // Update active dot
        updateActiveDot();
    }
    
    // Arrow event listeners
    if (downArrow) {
        downArrow.addEventListener('click', (e) => {
            e.preventDefault();
            slideAnim.call(downArrow, e);
        });
    }
    if (upArrow) {
        upArrow.addEventListener('click', (e) => {
            e.preventDefault();
            slideAnim.call(upArrow, e);
        });
    }
    
    // Wheel event listener (scoped to wrapper - only works when mouse is over the gallery)
    wrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        slideAnim.call(wrapper, e);
    }, { passive: false });
    
    // Resize handler
    const resizeHandler = () => newSize();
    window.addEventListener('resize', resizeHandler);
    
    // Update active dot styling and thumbnails
    function updateActiveDot() {
        navDots.forEach((dot, i) => {
            if (i === activeSlide) {
                gsap.to(dot, { scale: 1.5, opacity: 1 });
            } else {
                gsap.to(dot, { scale: 1, opacity: 0.6 });
            }
        });
        if (thumbnailWrappers.length > 0) {
            updateThumbnails();
        }
    }
    
    function updateThumbnails() {
        if (!thumbnailWrappers.length) return;
        thumbnailWrappers.forEach((wrapper, index) => {
            if (index === activeSlide) {
                wrapper.classList.add('active');
                // Centrar la miniatura activa solo dentro del strip (sin mover el scroll de la página)
                if (thumbnailsWrapper) {
                    const strip = thumbnailsWrapper;
                    const thumb = wrapper;
                    const thumbLeft = thumb.offsetLeft;
                    const thumbWidth = thumb.offsetWidth;
                    const stripWidth = strip.offsetWidth;
                    const scrollLeft = thumbLeft - (stripWidth / 2) + (thumbWidth / 2);
                    strip.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
                }
            } else {
                wrapper.classList.remove('active');
            }
        });
    }
    
    // Add click handlers to thumbnails
    if (thumbnailWrappers.length) {
        thumbnailWrappers.forEach((wrapper, index) => {
            wrapper.addEventListener('click', () => {
                if (gsap.isTweening(container)) {
                    return;
                }
                oldSlide = activeSlide;
                activeSlide = index;
                
                // Make sure we're within bounds
                activeSlide = activeSlide < 0 ? 0 : activeSlide;
                activeSlide = activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
                
                if (oldSlide === activeSlide) {
                    return;
                }
                
                // Animate to the selected slide
                gsap.to(container, dur, { y: offsets[activeSlide], ease: 'power2.inOut', onUpdate: tweenDot });
                
                // Update active dot and thumbnails
                updateActiveDot();
            });
        });
    }
    
    // Make the container a draggable element
    let dragMe = Draggable.create(container, {
        type: 'y',
        edgeResistance: 1,
        onDragEnd: slideAnim,
        onDrag: tweenDot,
        onThrowUpdate: tweenDot,
        snap: offsets,
        inertia: true,
        zIndexBoost: false,
        allowNativeTouchScrolling: false,
        bounds: masterWrap || container.parentElement
    });
    
    if (dragMe[0]) {
        dragMe[0].id = 'dragger';
    }
    
    // Resize all panels and refigure draggable snap array
    function newSize() {
        offsets = [];
        ih = wrapper.offsetHeight; // Use wrapper height instead of window height
        gsap.set(container, { height: slides.length * ih });
        gsap.set(slides, { height: ih });
        // Force layout recalculation
        container.offsetHeight;
        for (let i = 0; i < slides.length; i++) {
            offsets.push(-slides[i].offsetTop);
        }
        gsap.set(container, { y: offsets[activeSlide] });
        if (dragMe[0]) {
            dragMe[0].vars.snap = offsets;
        }
    }
    
    // Tween the dot animation as the draggable moves
    function tweenDot() {
        gsap.set(dotAnim, {
            time: Math.abs(gsap.getProperty(container, 'y') / ih) + 1
        });
    }
    
    // Initialize - wait for layout to be ready
    requestAnimationFrame(() => {
        newSize();
        updateActiveDot();
        if (thumbnailWrappers.length) {
            updateThumbnails();
        }
    });
}

/**
 * Initialize Observer gallery variant
 */
function initGalleryObserver(element) {
    const title = element.querySelector('.c-gallery-section__title');
    const main = element.querySelector('.c-gallery-section__main');
    const pics = element.querySelectorAll('.c-gallery-section__pic');
    const boxes = element.querySelectorAll('.c-gallery-section__box');
    const lockBox = element.querySelector('.c-gallery-section__lock-box');
    const counter = element.querySelector('.c-gallery-section__counter');
    const prevBtn = element.querySelector('.c-gallery-section__prev');
    const nextBtn = element.querySelector('.c-gallery-section__next');
    const thumbnailsWrapper = element.querySelector('.c-gallery-section__thumbnails');
    const thumbnailWrappers = element.querySelectorAll('.c-gallery-section__thumbnail-wrapper');
    
    if (!pics.length || !main) return;
    
    // Entry animation with ScrollTrigger - fade in title and main container
    if (title && main) {
        gsap.set([title, main], { opacity: 0, y: 30 });
        
        const entryTL = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });
        
        entryTL.to([title, main], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });
    }
    
    if (!Observer) {
        console.error('Observer plugin not loaded. Please include Observer from GSAP CDN before scripts.js');
        console.log('Observer should be available at:', typeof window !== 'undefined' ? window.Observer : 'undefined');
        return;
    }
    
    const max = pics.length;
    let val = 1;
    
    // Set initial opacity values
    gsap.set(pics, { opacity: (i) => (i > 0) ? 0 : 1 });
    gsap.set(boxes, { opacity: (i) => [0.3, 1, 0.3, 0][i] });
    
    // Create a looping timeline animation of thumbnail boxes
    const thumbsTL = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: 'none' } })
        .to(boxes, { x: -50, opacity: (i) => [0, 0.3, 1, 0.3, 0][i] }, 0)
        .to('.c-gallery-section__box-0', { scale: 0, transformOrigin: '100% 100%' }, 0)
        .from('.c-gallery-section__box-3', { scale: 0, transformOrigin: '0 100%' }, 0);
    
    // Use Observer to handle scroll-like input
    Observer.create({
        target: main,
        tolerance: 3,
        onChangeX: (self) => {
            let p = thumbsTL.progress();
            let mod = (self.event.type === 'wheel') ? -725 : -100;
            
            moveStart();
            
            if (p === 0 || p > 1) p = 1;
            gsap.set(thumbsTL, { progress: p + self.deltaX / mod, overwrite: true });
            
            gsap.killTweensOf(boxSnap);
            gsap.delayedCall(0.2, boxSnap);
            
            val += self.deltaX / mod;
            if (val > max + 0.5) val = 1;
            if (val < 0.5) val = max;
            gsap.set(counter, { innerHTML: val, snap: 'innerHTML' });
        }
    });
    
    function moveStart() {
        gsap.to(lockBox, { scale: 0, opacity: 0, transformOrigin: '50%', duration: 0.1, overwrite: 'auto' });
        gsap.to(counter, { opacity: 0.3, duration: 0.1, overwrite: 'auto' });
    }
    
    function updateThumbnails() {
        const currentIndex = val - 1;
        thumbnailWrappers.forEach((wrapper, index) => {
            if (index === currentIndex) {
                wrapper.classList.add('active');
                // Scroll thumbnail into view
                if (thumbnailsWrapper) {
                    wrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            } else {
                wrapper.classList.remove('active');
            }
        });
    }
    
    function moveEnd() {
        val = Math.round(val);
        gsap.to(counter, { duration: 0.2, opacity: 1, ease: 'power3.inOut' });
        gsap.to(lockBox, { duration: 0.2, scale: 1, opacity: 1, ease: 'power3.inOut' });
        gsap.to(pics, { opacity: (i) => (i === val - 1) ? 1 : 0 });
        updateThumbnails();
    }
    
    function boxSnap() {
        gsap.to(thumbsTL, {
            duration: 0.4,
            ease: 'power3.inOut',
            progress: Math.round(thumbsTL.progress()),
            onComplete: moveEnd
        });
    }
    
    // Prevent image drag
    if (main) {
        main.ondragstart = function() { return false; };
    }
    
    // Handle prev & next button clicks
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            val--;
            if (val < 1) val = pics.length;
            moveStart();
            gsap.set(counter, { innerHTML: val });
            gsap.fromTo(thumbsTL, { progress: 1 }, { progress: 0, onComplete: moveEnd });
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            val++;
            if (val > pics.length) val = 1;
            moveStart();
            gsap.set(counter, { innerHTML: val });
            gsap.fromTo(thumbsTL, { progress: 0 }, { progress: 1, onComplete: moveEnd });
        });
    }
    
    // Keyboard arrow navigation
    const handleKeydown = (e) => {
        // Only handle arrows when focus is inside gallery controls/content.
        // This keeps global section navigation with arrows available by default.
        const activeElement = document.activeElement;
        if (!activeElement || !element.contains(activeElement)) {
            return;
        }

        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            val--;
            if (val < 1) val = pics.length;
            moveStart();
            gsap.set(counter, { innerHTML: val });
            gsap.fromTo(thumbsTL, { progress: 1 }, { progress: 0, onComplete: moveEnd });
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            val++;
            if (val > pics.length) val = 1;
            moveStart();
            gsap.set(counter, { innerHTML: val });
            gsap.fromTo(thumbsTL, { progress: 0 }, { progress: 1, onComplete: moveEnd });
        }
    };
    
    // Add keyboard event listener when the gallery is in view
    window.addEventListener('keydown', handleKeydown);
    
    // Add click handlers to thumbnails
    if (thumbnailWrappers.length) {
        thumbnailWrappers.forEach((wrapper, index) => {
            wrapper.addEventListener('click', () => {
                const currentIndex = val - 1;
                val = index + 1;
                moveStart();
                gsap.set(counter, { innerHTML: val });
                if (index < currentIndex) {
                    gsap.fromTo(thumbsTL, { progress: 1 }, { progress: 0, onComplete: moveEnd });
                } else {
                    gsap.fromTo(thumbsTL, { progress: 0 }, { progress: 1, onComplete: moveEnd });
                }
            });
        });
    }
    
    // Initialize thumbnails
    updateThumbnails();
    
    // Finally, toggle opacity
    gsap.set([main, element.querySelector('.c-gallery-section__menu')], { opacity: 1 });
}

/**
 * Main initialization function
 */
export function initGallery(element, variant = '1') {
    // Variant 1: vertical-slider (default)
    // Variant 2: observer
    if (variant === '2') {
        initGalleryObserver(element);
    } else {
        // Variant 1 or default uses the vertical slider
        initGalleryVerticalSlider(element);
    }
}

