/**
 * Scroll Position
**/

function scrollPosition () {

    const body = document.querySelector('body');

    // Skip scroll position tracking if horizontal scroll is active
    if (body.classList.contains('horizontal-scroll-active')) {
        // In horizontal mode, navbar should always have background
        body.classList.remove('--page-at-top');
        return;
    }
    
    const topMargin = 64; // Distance from the top to consider the page is at the top
    let actualPosition = window.scrollY; // Initial value

    // The function
    documentOnTop = (position) => {
        if (position < topMargin) {
            body.classList.add('--page-at-top');
        } else {
            body.classList.remove('--page-at-top');
        }
    }

    // The listener
    window.addEventListener('scroll', () => {
        actualPosition = window.scrollY;
        documentOnTop(actualPosition);
    });

    // Exec the function at start
    documentOnTop(actualPosition);
}

export { scrollPosition };
