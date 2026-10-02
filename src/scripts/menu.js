/**
 * Menu
**/

import { gsap } from 'gsap';
import { scrollToSection } from './gsap/horizontal-scroll.js';

function menu() {
    const menu = document.querySelector('.c-menu__nav');

    if (menu) {
        const links = document.querySelectorAll('.c-menu__anchor');
        const toggle = document.querySelector('.c-menu__toggle');
        const modalBg = document.querySelector('.c-modal-bg');
        
        // Initialize toggle button animation
        let toggleTimeline = null;
        if (toggle) {
            toggleTimeline = initToggleAnimation(toggle, () => toggleMenu());
            
            // Sync toggle animation with menu state changes (from other triggers like modal bg)
            const observer = new MutationObserver(() => {
                const isActive = menu.classList.contains('--is-active');
                if (toggleTimeline) {
                    if (isActive && toggleTimeline.reversed()) {
                        toggleTimeline.play();
                    } else if (!isActive && !toggleTimeline.reversed()) {
                        toggleTimeline.reverse();
                    }
                }
            });
            observer.observe(menu, { attributes: true, attributeFilter: ['class'] });
        }

        function checkBreakpoint() {
            // If screensize is bigger than mobile, change a11y params
        };





        // Listeners
        // ========================================

        // Toggle - handled by initToggleAnimation now

        // Links
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Si es un enlace interno (empieza por #)
                if (href && href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    closeMenu();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    // Ensure document.body is available - wait for it if needed
                    const checkBodyAndNavigate = () => {
                        const body = document.body || document.querySelector('body');
                        
                        if (targetElement && body && body.classList) {
                            // Check if horizontal scroll is active
                            const isHorizontalActive = body.classList.contains('horizontal-scroll-active');
                            
                            if (isHorizontalActive) {
                                // Use horizontal scroll navigation
                                setTimeout(() => {
                                    scrollToSection(targetElement);
                                }, 100);
                            } else {
                                // Use normal vertical scroll
                                setTimeout(() => {
                                    const offset = 0; // Ajustar si hay navbar fixed en móvil
                                    const elementPosition = targetElement.getBoundingClientRect().top;
                                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: 'smooth'
                                    });
                                }, 100);
                            }
                        } else if (!body) {
                            // Body not ready yet, retry after a short delay
                            setTimeout(checkBodyAndNavigate, 50);
                        } else {
                            closeMenu();
                        }
                    };
                    
                    // Check immediately, or retry if body not ready
                    checkBodyAndNavigate();
                }
            });
        });

        // Modal
        if (modalBg) {
        modalBg.addEventListener('click', () => {
            toggleMenu();
        });
        }





        // Functions
        // ========================================

        function toggleMenu() {
            if (!menu || menu.classList.contains('--is-active')) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        function openMenu() {
            if (!menu || !toggle) return;
            toggle.classList.add('--is-active');
            menu.classList.add('--is-active');
            menu.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-expanded', 'true');

            if (modalBg) {
            modalBg.style.display = 'block';
            setTimeout(() => {
                modalBg.classList.add('--is-visible');
            }, 50);
            }
        }

        function closeMenu() {
            if (!menu || !toggle) return;
            toggle.classList.remove('--is-active');
            menu.classList.remove('--is-active');
            menu.removeAttribute('aria-expanded');
            toggle.setAttribute('aria-expanded', 'false');

            if (modalBg) {
            modalBg.classList.remove('--is-visible');
            setTimeout(() => {
                modalBg.style.display = 'none';
            }, 400);
            }
        }

    }
};

// Toggle button animation
function initToggleAnimation(toggle, onToggle) {
    const q = gsap.utils.selector(toggle);
    
    // Setup aria attributes
    toggle.setAttribute("aria-haspopup", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "main-menu");
    
    // Calculate offset for initial animation
    const offset = toggle.getBoundingClientRect().height * 0.2;
    
    // Menu toggle animation timeline
    const toggleTimeline = gsap.timeline({
        paused: true,
        reversed: true,
        defaults: { duration: 0.3, ease: "power3.in" }
    });
    
    // Rotate animation - lines move to center, rotate, text fades
    toggleTimeline.to(q(".c-menu__toggle-anim"), { y: 0 });
    toggleTimeline.to(q(".c-menu__toggle-anim--top"), {
        duration: 0.45,
        rotate: 45 * 3 // Top rotates 135deg
    }, "<");
    toggleTimeline.to(q(".c-menu__toggle-anim--middle"), {
        duration: 0.1,
        opacity: 0
    }, "<");
    toggleTimeline.to(q(".c-menu__toggle-anim--bottom"), {
        duration: 0.45,
        rotate: 45 * 5 // Bottom rotates 225deg
    }, "<");
    toggleTimeline.to(q(".c-menu__toggle-text"), { duration: 0.1, opacity: 0 }, "<");
    
    // Page load animation
    const loadTimeline = gsap.timeline({
        onComplete: () => {
            toggle.style.visibility = 'visible';
        }
    });
    
    loadTimeline.set(toggle, { autoAlpha: 1 });
    loadTimeline.to(q(".c-menu__toggle-anim--top"), {
        y: offset, // Top goes down
        duration: 0.15,
        ease: "power4.in"
    });
    loadTimeline.to(q(".c-menu__toggle-anim--bottom"), {
        y: -offset, // Bottom goes up
        duration: 0.15,
        ease: "power4.in"
    }, "<");
    loadTimeline.to(q(".c-menu__toggle-anim--middle"), {
        y: 0, // Middle stays in place
        duration: 0.15,
        ease: "power4.in"
    }, "<");
    loadTimeline.from(q(".c-menu__toggle-text"), { opacity: 0 }, "<");
    
    // Click handler - integrates with menu toggle
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Toggle animation
        toggleTimeline.reversed() ? toggleTimeline.play() : toggleTimeline.reverse();
        
        // Call the menu toggle function
        if (onToggle) {
            onToggle();
        }
    });
    
    // Return timeline for external control if needed
    return toggleTimeline;
}

export { menu };
