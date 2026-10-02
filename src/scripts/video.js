// Video component with custom play button
export function initVideoPlayers() {
    const videoContainers = document.querySelectorAll('.c-video__video[data-youtube-id]');
    
    videoContainers.forEach(container => {
        const youtubeId = container.getAttribute('data-youtube-id');
        if (!youtubeId) return;

        const playButton = container.querySelector('.c-video__play-button');
        const iframe = container.querySelector('iframe');
        const poster = container.querySelector('.c-video__poster');
        
        if (!playButton || !iframe) return;

        // Function to play video using postMessage (more reliable on mobile)
        function playVideo() {
            // Ocultar el poster y el botón de play
            if (poster) {
                poster.classList.add('is-hidden');
            }
            playButton.classList.add('is-hidden');
            
            // Mostrar el iframe
            iframe.classList.add('is-playing');
            iframe.style.opacity = '1';
            iframe.style.visibility = 'visible';
            iframe.style.pointerEvents = 'auto';
            
            // Enviar comando de play vía postMessage
            // Esto funciona porque el iframe ya tiene enablejsapi=1 en el src
            try {
                iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            } catch (e) {
                console.error("Error sending play command to YouTube iframe", e);
                // Fallback: reset src with autoplay
                const currentSrc = iframe.src;
                if (!currentSrc.includes('autoplay=1')) {
                    iframe.src = currentSrc.replace('autoplay=0', 'autoplay=1');
                }
            }
        }

        // Add click event listeners
        playButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            playVideo();
        });

        // Also allow clicking on the container
        container.addEventListener('click', function(e) {
            if (!playButton.classList.contains('is-hidden') && e.target !== iframe) {
                playVideo();
            }
        });
    });
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoPlayers);
} else {
    initVideoPlayers();
}
