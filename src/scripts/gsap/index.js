/**
 * GSAP Modules Index
 * Central entry point for all GSAP module initializations
 */

import { initHero } from './hero.js';
import { initMenu } from './menu.js';
import { initTextCentered } from './text-centered.js';
import { initTextAndImageOne } from './text-and-image-one.js';
import { initTextAndImageTwo } from './text-and-image-two.js';
import { initVideo } from './video.js';
import { initDetails } from './details.js';
import { initQuotes } from './quotes.js';
import { initTicketing } from './ticketing.js';
import { initCallToAction } from './call-to-action.js';
import { initLogos } from './logos.js';
import { initShare } from './share.js';
import { initFooter } from './footer.js';
import { initGallery } from './gallery.js';
import { initImage } from './image.js';
import { initFollowUs } from './follow-us.js';
import { initSorteo } from './sorteo.js';
import { initCustom } from './custom.js';
import { initPressbook } from './pressbook.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from '../gsap-init.js';
import { initHorizontalAnimations } from './horizontal-animations.js';

function initSectionBackgrounds() {
    document.querySelectorAll('.section-bg').forEach((el) => {
        // No animar el fondo de la sección tráiler (evitar overlay visible)
        const section = el.closest('.section-screen');
        if (section?.classList.contains('section-screen--video') || section?.querySelector('#trailer')) {
            return;
        }
        gsap.set(el, { scale: 1 });
        gsap.to(el, {
            scale: 1.06,
            duration: 28,
            ease: 'none',
            repeat: -1,
            yoyo: true
        });
    });
}

/**
 * Initialize all GSAP modules based on data-gsap-variant attributes
 */
let hasInitialized = false;

export function initGSAPModules() {
    // Prevent multiple initializations
    if (hasInitialized) {
        return;
    }
    hasInitialized = true;
    
    // Hero
    document.querySelectorAll('.c-hero').forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || 'default';
        initHero(element, variant);
    });

    // Menu
    const menuElement = document.querySelector('.c-menu');
    if (menuElement) {
        const variant = menuElement.getAttribute('data-gsap-variant') || 'default';
        initMenu(menuElement, variant);
    }

    // Text Centered
    document.querySelectorAll('.c-intro').forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || 'default';
        initTextCentered(element, variant);
    });

    // Text and Image One
    document.querySelectorAll('.c-text-and-image-one').forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || 'default';
        initTextAndImageOne(element, variant);
    });

    // Text and Image Two
    document.querySelectorAll('.c-text-and-image-two').forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || 'default';
        initTextAndImageTwo(element, variant);
    });

    // Video
    document.querySelectorAll('.c-video').forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || 'default';
        initVideo(element, variant);
    });

    // Details
    const detailsElements = document.querySelectorAll('.c-details');
    detailsElements.forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || 'default';
        initDetails(element, variant);
    });

    // Gallery
    document.querySelectorAll('.c-gallery-section').forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || '1';
        initGallery(element, variant);
    });

    // Quotes
    document.querySelectorAll('.c-quotes').forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || 'default';
        initQuotes(element, variant);
    });

    // Ticketing (exclude .c-sorteo which also has .c-ticketing class)
    const ticketingElements = document.querySelectorAll('.c-ticketing:not(.c-sorteo)');
    ticketingElements.forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || 'default';
        initTicketing(element, variant);
    });

    // Section backgrounds: movimiento muy lento (Ken Burns sutil) para no parecer estático
    initSectionBackgrounds();

    // Call to Action
    document.querySelectorAll('.c-call-to-action').forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || 'default';
        initCallToAction(element, variant);
    });

    // Logos
    document.querySelectorAll('.c-logos').forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || 'default';
        initLogos(element, variant);
    });

    // Share
    document.querySelectorAll('.c-share').forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || 'default';
        initShare(element, variant);
    });

    // Footer
    const footerElement = document.querySelector('.c-footer');
    if (footerElement) {
        const variant = footerElement.getAttribute('data-gsap-variant') || 'default';
        initFooter(footerElement, variant);
    }

    // Image
    document.querySelectorAll('.c-image').forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || 'default';
        initImage(element, variant);
    });

    // Follow Us
    document.querySelectorAll('.c-follow-us').forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || 'default';
        initFollowUs(element, variant);
    });

    // Sorteo
    const sorteoElements = document.querySelectorAll('.c-sorteo');
    sorteoElements.forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || 'default';
        initSorteo(element, variant);
    });

    // Custom
    document.querySelectorAll('.c-custom').forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || 'default';
        initCustom(element, variant);
    });

    // Pressbook
    document.querySelectorAll('.c-pressbook').forEach(element => {
        const variant = element.getAttribute('data-gsap-variant') || 'fade-up';
        initPressbook(element, variant);
    });
    
    // Initialize horizontal animation system if in horizontal mode
    initHorizontalAnimations();
    
    // Refresh ScrollTrigger after all modules are initialized
    // This ensures all elements are in the DOM and properly sized
    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
    });
}

