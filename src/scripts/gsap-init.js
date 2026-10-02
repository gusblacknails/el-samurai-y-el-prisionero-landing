/**
 * GSAP Initialization
 * Centralized GSAP setup and plugin registration
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

// Observer is loaded from CDN (premium plugin)
// Check multiple possible locations - Observer can be available as window.Observer or gsap.Observer
let Observer = null;
if (typeof window !== 'undefined') {
    Observer = window.Observer || (typeof window.gsap !== 'undefined' ? window.gsap.Observer : null);
    if (Observer) {
        console.log('Observer plugin found');
    } else {
        console.warn('Observer plugin not found. Make sure to load it from CDN before scripts.js');
    }
}

// SplitText is loaded from CDN (premium plugin)
// Check multiple possible locations - SplitText can be available as window.SplitText or gsap.SplitText
let SplitText = null;
if (typeof window !== 'undefined') {
    SplitText = window.SplitText || (typeof window.gsap !== 'undefined' ? window.gsap.SplitText : null);
    if (SplitText) {
        console.log('SplitText plugin found');
    } else {
        console.warn('SplitText plugin not found. Make sure to load it from CDN before scripts.js');
    }
}

// ScrollSmoother is loaded from CDN (premium plugin)
let ScrollSmoother = null;
if (typeof window !== 'undefined') {
    ScrollSmoother = window.ScrollSmoother || (typeof window.gsap !== 'undefined' ? window.gsap.ScrollSmoother : null);
    if (ScrollSmoother) {
        console.log('ScrollSmoother plugin found');
    } else {
        console.warn('ScrollSmoother plugin not found. Make sure to load it from CDN before scripts.js');
    }
}

// ScrollToPlugin is loaded from CDN (premium plugin)
let ScrollToPlugin = null;
if (typeof window !== 'undefined') {
    ScrollToPlugin = window.ScrollToPlugin || (typeof window.gsap !== 'undefined' ? window.gsap.ScrollToPlugin : null);
    if (ScrollToPlugin) {
        console.log('ScrollToPlugin plugin found');
    } else {
        console.warn('ScrollToPlugin plugin not found. Make sure to load it from CDN before scripts.js');
    }
}

// Register GSAP plugins
const pluginsToRegister = [ScrollTrigger, Draggable];
if (InertiaPlugin) {
    pluginsToRegister.push(InertiaPlugin);
}
if (Observer) {
    pluginsToRegister.push(Observer);
}
if (SplitText) {
    pluginsToRegister.push(SplitText);
}
if (ScrollSmoother) {
    pluginsToRegister.push(ScrollSmoother);
}
if (ScrollToPlugin) {
    pluginsToRegister.push(ScrollToPlugin);
}
gsap.registerPlugin(...pluginsToRegister);

// Export GSAP instance and plugins
export { gsap, ScrollTrigger, Draggable, InertiaPlugin, Observer, SplitText, ScrollSmoother, ScrollToPlugin };

// Global GSAP configuration
gsap.config({
    nullTargetWarn: false,
    trialWarn: false
});

// Set default easing
gsap.defaults({
    ease: "power2.out",
    duration: 0.8
});

// Export initialization helper
export function initGSAP() {
    // Refresh ScrollTrigger on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (ScrollTrigger && document.body) {
                ScrollTrigger.refresh();
            }
        }, 250);
    });

    // Refresh on images load
    window.addEventListener('load', () => {
        if (ScrollTrigger && document.body) {
            ScrollTrigger.refresh();
        }
    });

    console.log('GSAP initialized with ScrollTrigger');
}

