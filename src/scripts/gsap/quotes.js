/**
 * Quotes Component GSAP Animations
 * Variants: fade-slide, scale-reveal, typewriter, magnetic
 * Completely rebuilt without Swiper - pure GSAP slider
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createAdaptiveTimeline } from './horizontal-animations.js';

// Fade Slide Variant
function initQuotesFadeSlide(element) {
    const title = element.querySelector('.c-quotes__title');
    const quotes = Array.from(element.querySelectorAll('.c-quotes__quote-wrapper'));
    const prevBtn = element.querySelector('.c-slider-nav__arrow--prev');
    const nextBtn = element.querySelector('.c-slider-nav__arrow--next');
    const container = element.querySelector('.c-quotes__quote-list') || element;
    
    if (!quotes.length) return;
    
    let currentIndex = 0;
    let isAnimating = false;
    
    // Set initial state
    gsap.set(quotes, { opacity: 0, x: 100 });
    gsap.set(quotes[0], { opacity: 1, x: 0 });
    
    // Title animation with ScrollTrigger
    if (title) {
        createAdaptiveTimeline(element, () => {
            const timeline = gsap.timeline();
            timeline.fromTo(title,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }
            );
            return timeline;
        }, {
            trigger: element,
            start: "top 75%",
            toggleActions: "play none none none"
        });
    }
    
    // Animate initial quote appearance with ScrollTrigger
    createAdaptiveTimeline(element, () => {
        const timeline = gsap.timeline();
        timeline.fromTo(quotes[0],
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "power2.out"
            }
        );
        return timeline;
    }, {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none"
    });
    
    const showQuote = (index) => {
        if (isAnimating) return;
        isAnimating = true;
        
        const currentQuote = quotes[currentIndex];
        const nextQuote = quotes[index];
        
        // Hide current
        gsap.to(currentQuote, {
            opacity: 0,
            x: -100,
            duration: 0.5,
            ease: "power2.in"
        });
        
        // Show next
        gsap.fromTo(nextQuote,
            { opacity: 0, x: 100 },
            {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    isAnimating = false;
                }
            }
        );
        
        currentIndex = index;
    };
    
    const nextQuote = () => {
        const newIndex = (currentIndex + 1) % quotes.length;
        showQuote(newIndex);
    };
    
    const prevQuote = () => {
        const newIndex = (currentIndex - 1 + quotes.length) % quotes.length;
        showQuote(newIndex);
    };
    
    if (nextBtn) nextBtn.addEventListener('click', nextQuote);
    if (prevBtn) prevBtn.addEventListener('click', prevQuote);
    
    // Auto-play (optional)
    // setInterval(nextQuote, 5000);
}

// Scale Reveal Variant
function initQuotesScaleReveal(element) {
    const title = element.querySelector('.c-quotes__title');
    const quotes = Array.from(element.querySelectorAll('.c-quotes__quote-wrapper'));
    const prevBtn = element.querySelector('.c-slider-nav__arrow--prev');
    const nextBtn = element.querySelector('.c-slider-nav__arrow--next');
    
    if (!quotes.length) return;
    
    let currentIndex = 0;
    let isAnimating = false;
    
    gsap.set(quotes, { opacity: 0, scale: 0.5 });
    gsap.set(quotes[0], { opacity: 1, scale: 1 });
    
    if (title) {
        createAdaptiveTimeline(element, () => {
            const timeline = gsap.timeline();
            timeline.fromTo(title,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.4)"
                }
            );
            return timeline;
        }, {
            trigger: element,
            start: "top 75%",
            toggleActions: "play none none none"
        });
    }
    
    const showQuote = (index) => {
        if (isAnimating) return;
        isAnimating = true;
        
        const currentQuote = quotes[currentIndex];
        const nextQuote = quotes[index];
        
        gsap.to(currentQuote, {
            opacity: 0,
            scale: 0.5,
            duration: 0.4,
            ease: "power2.in"
        });
        
        gsap.fromTo(nextQuote,
            { opacity: 0, scale: 0.5 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.2)",
                onComplete: () => {
                    isAnimating = false;
                }
            }
        );
        
        currentIndex = index;
    };
    
    const nextQuote = () => {
        showQuote((currentIndex + 1) % quotes.length);
    };
    
    const prevQuote = () => {
        showQuote((currentIndex - 1 + quotes.length) % quotes.length);
    };
    
    if (nextBtn) nextBtn.addEventListener('click', nextQuote);
    if (prevBtn) prevBtn.addEventListener('click', prevQuote);
}

// Typewriter Variant (simulated)
function initQuotesTypewriter(element) {
    const title = element.querySelector('.c-quotes__title');
    const quotes = Array.from(element.querySelectorAll('.c-quotes__quote-wrapper'));
    const prevBtn = element.querySelector('.c-slider-nav__arrow--prev');
    const nextBtn = element.querySelector('.c-slider-nav__arrow--next');
    
    if (!quotes.length) return;
    
    let currentIndex = 0;
    let isAnimating = false;
    
    gsap.set(quotes, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" });
    gsap.set(quotes[0], { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" });
    
    if (title) {
        gsap.fromTo(title,
            { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" },
            {
                opacity: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.2,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: element,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            }
        );
    }
    
    const showQuote = (index) => {
        if (isAnimating) return;
        isAnimating = true;
        
        const currentQuote = quotes[currentIndex];
        const nextQuote = quotes[index];
        
        gsap.to(currentQuote, {
            opacity: 0,
            clipPath: "inset(0% 0% 0% 100%)",
            duration: 0.5,
            ease: "power2.in"
        });
        
        gsap.fromTo(nextQuote,
            { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" },
            {
                opacity: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                    isAnimating = false;
                }
            }
        );
        
        currentIndex = index;
    };
    
    const nextQuote = () => {
        showQuote((currentIndex + 1) % quotes.length);
    };
    
    const prevQuote = () => {
        showQuote((currentIndex - 1 + quotes.length) % quotes.length);
    };
    
    if (nextBtn) nextBtn.addEventListener('click', nextQuote);
    if (prevBtn) prevBtn.addEventListener('click', prevQuote);
}

// Magnetic Variant
function initQuotesMagnetic(element) {
    const title = element.querySelector('.c-quotes__title');
    const quotes = Array.from(element.querySelectorAll('.c-quotes__quote-wrapper'));
    const prevBtn = element.querySelector('.c-slider-nav__arrow--prev');
    const nextBtn = element.querySelector('.c-slider-nav__arrow--next');
    
    if (!quotes.length) return;
    
    let currentIndex = 0;
    let isAnimating = false;
    
    gsap.set(quotes, { opacity: 0, scale: 0.8, rotation: -5 });
    gsap.set(quotes[0], { opacity: 1, scale: 1, rotation: 0 });
    
    if (title) {
        gsap.fromTo(title,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            }
        );
    }
    
    const showQuote = (index) => {
        if (isAnimating) return;
        isAnimating = true;
        
        const currentQuote = quotes[currentIndex];
        const nextQuote = quotes[index];
        
        gsap.to(currentQuote, {
            opacity: 0,
            scale: 0.8,
            rotation: 5,
            duration: 0.4,
            ease: "power2.in"
        });
        
        gsap.fromTo(nextQuote,
            { opacity: 0, scale: 0.8, rotation: -5 },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: "back.out(1.2)",
                onComplete: () => {
                    isAnimating = false;
                }
            }
        );
        
        currentIndex = index;
    };
    
    const nextQuote = () => {
        showQuote((currentIndex + 1) % quotes.length);
    };
    
    const prevQuote = () => {
        showQuote((currentIndex - 1 + quotes.length) % quotes.length);
    };
    
    if (nextBtn) nextBtn.addEventListener('click', nextQuote);
    if (prevBtn) prevBtn.addEventListener('click', prevQuote);
    
    // Magnetic effect on hover (only active quote)
    quotes.forEach((quote, index) => {
        quote.addEventListener('mousemove', (e) => {
            if (index !== currentIndex) return;
            
            const rect = quote.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            
            gsap.to(quote, {
                x: x * 15,
                y: y * 15,
                rotation: x * 5,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        quote.addEventListener('mouseleave', () => {
            gsap.to(quote, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
}

// Main initialization function
export function initQuotes(element, variant = 'default') {
    const variants = {
        'fade-slide': initQuotesFadeSlide,
        'scale-reveal': initQuotesScaleReveal,
        'typewriter': initQuotesTypewriter,
        'magnetic': initQuotesMagnetic,
        'default': initQuotesFadeSlide
    };
    const initFn = variants[variant] || variants['default'];
    initFn(element);
}
