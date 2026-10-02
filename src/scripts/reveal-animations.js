/**
 * Animations
**/

function revealAnimations () {

    const elements = document.querySelectorAll('[data-reveal]');

    if (elements.length === 0) return;

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Dejar de observar una vez que se ha revelado
                animationObserver.unobserve(entry.target);
            }
        })
    }, { 
        threshold: 0.1, // Trigger cuando el 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px' // Trigger un poco antes de que entre completamente
    })

    elements.forEach((element) => {
        // Si el elemento ya está visible al cargar, revelarlo inmediatamente
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && rect.top >= 0) {
            // Pequeño delay para asegurar que el CSS está aplicado
            setTimeout(() => {
                element.classList.add('revealed');
            }, 100);
        } else {
            animationObserver.observe(element);
        }
    });
}

export { revealAnimations };
