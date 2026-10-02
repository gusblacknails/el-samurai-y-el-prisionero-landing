//
// Ticketing Component - iframe initialization
// ================================================================================

function getUTMParamsRobusto() {
    const searchParams = new URLSearchParams(window.location.search);
    const output = {};

    // 1. UTM explícitos
    const keys = [
        'utm_source', 'utm_medium', 'utm_campaign',
        'utm_cinema', 'utm_region', 'utm_date',
        'utm_time', 'utm_version', 'utm_language'
    ];

    for (const key of keys) {
        const value = searchParams.get(key);
        if (value) output[key] = value;
    }

    // 2. Detección automática si no hay source/medium
    if (!output.utm_source || !output.utm_medium) {
        if (searchParams.has('fbclid')) {
            output.utm_source = output.utm_source || 'facebook';
            output.utm_medium = output.utm_medium || 'paid';
        } else if (searchParams.has('igshid')) {
            output.utm_source = output.utm_source || 'instagram';
            output.utm_medium = output.utm_medium || 'paid';
        } else if (searchParams.has('ttclid')) {
            output.utm_source = output.utm_source || 'tiktok';
            output.utm_medium = output.utm_medium || 'paid';
        } else if (searchParams.has('gclid')) {
            output.utm_source = output.utm_source || 'google';
            output.utm_medium = output.utm_medium || 'cpc';
        }
    }

    // 3. Detección por referrer si aún falta info
    if ((!output.utm_source || !output.utm_medium) && document.referrer) {
        try {
            const ref = new URL(document.referrer);
            const hostname = ref.hostname.replace(/^www\./, '');
            output.utm_source = output.utm_source || hostname;
            output.utm_medium = output.utm_medium || 'referral';
        } catch (e) {
            // Ignorar si el referrer es inválido
        }
    }

    // 4. Fallback final: tráfico directo
    output.utm_source = output.utm_source || 'direct';
    output.utm_medium = output.utm_medium || 'none';

    // 5. Montar resultado como querystring
    return Object.entries(output)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join('&');
}

export function initTicketingComponent() {
    const ticketingElements = document.querySelectorAll('.c-ticketing');
    
    ticketingElements.forEach(element => {
        const ticketingId = element.id;
        if (!ticketingId) return;
        
        // Check if already initialized
        if (element.dataset.ticketingInitialized === 'true') return;
        element.dataset.ticketingInitialized = 'true';
        
        const container = element.querySelector(`#ticketing-container-${ticketingId}`);
        if (!container) return;
        
        // Check if iframe already exists
        if (container.querySelector('iframe')) return;
        
        const iframe = document.createElement("iframe");
        iframe.id = `ticketing-iframe-${ticketingId}`;
        iframe.className = "iframe";
        iframe.allow = "geolocation *";
        
        // Get iframeUrl from data attribute or try to find it
        const iframeUrl = element.dataset.iframeUrl || '';
        if (!iframeUrl) {
            console.warn(`No iframeUrl found for ticketing component: ${ticketingId}`);
            return;
        }
        
        const utmString = getUTMParamsRobusto();
        iframe.src = utmString ? `${iframeUrl}?${utmString}` : iframeUrl;
        
        iframe.onload = () => {
            const msg = element.querySelector(`#ticketing-loading-${ticketingId}`);
            if (msg) msg.style.display = 'none';
        };
        
        container.appendChild(iframe);
    });
}


