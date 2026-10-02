/**
 * Arrow scroll functionality
**/

export function initArrowScroll() {
    const arrow = document.querySelector('.arrow-down');
    
    if (!arrow) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            arrow.classList.remove('arrow-show');
            arrow.classList.add('arrow-hide');
        } else {
            arrow.classList.remove('arrow-hide');
            arrow.classList.add('arrow-show');
        }
    });
}

