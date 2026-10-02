/**
 * Gallery
**/

import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';


function quotes () {

    const quotesAll = document.querySelectorAll('[data-slider="quotes"]');

    const quotesSlider = function () {

        quotesAll.forEach(slider => {

            const navPrev = slider.querySelector('.c-slider-nav__arrow--prev');
            const navNext = slider.querySelector('.c-slider-nav__arrow--next');

            let sliderInstance = new Swiper(slider, {
                modules: [ Navigation ],

                slidesPerView: 1.2,
                centeredSlides: true,
                loop: true,
                loopedSlides: 2,
                speed: 1000,
                spaceBetween: 20,

                navigation: {
                    nextEl: navPrev,
                    prevEl: navNext,
                },

                breakpoints: {
                    640: {
                        slidesPerView: 1.6,
                        slidesOffsetBefore: 24,
                        slidesOffsetAfter: 24,
                        spaceBetween: 80,
                    },
                    768: {
                        slidesOffsetBefore: 28,
                        slidesOffsetAfter: 28,
                        spaceBetween: 64,
                    },
                    960: {
                        slidesPerView: 2.6,
                        spaceBetween: 80,
                    },
                },
            });
        });
    }




    // On Load and Resize, exec the builders
    // ==================================================

    window.addEventListener('load', function() {
        quotesSlider();
    });


}

export { quotes };
