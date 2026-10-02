/**
 * Details section layout adjustments
**/

export function initDetailsLayout() {
    document.addEventListener('DOMContentLoaded', () => {
        function applyShift() {
            const items = document.querySelectorAll('.c-details__specs-item');

            // Limpia estilos por si el usuario redimensiona
            items.forEach(item => {
                if (!item.classList.contains('c-details__specs-item--reparto')) {
                    item.style.position = '';
                    item.style.bottom = '';
                }
            });

            // Solo aplica si >= 1024px
            if (window.matchMedia('(min-width: 1024px)').matches) {
                items.forEach((item, index) => {
                    if (index >= 7 && !item.classList.contains('c-details__specs-item--reparto')) {
                        item.style.position = 'relative';
                        item.style.bottom = '39px';
                    }
                });
            }
        }

        // Primera ejecución
        applyShift();

        // Si el usuario redimensiona, se vuelve a calcular
        window.addEventListener('resize', applyShift);
    });
}

