# Landing GSAP - Sistema de Animaciones con Variantes

Proyecto de landing page construido con Nunjucks, Sass y GSAP, que incluye un sistema completo de animaciones modernas con múltiples variantes seleccionables por componente. El proyecto utiliza GSAP (GreenSock Animation Platform) como librería principal de animaciones, reemplazando sistemas legacy y proporcionando animaciones fluidas y de alto rendimiento.

## 🚀 Características Principales

- **Sistema de Variantes GSAP**: Cada componente tiene múltiples variantes de animación seleccionables desde JSON
- **Animaciones Modernas**: Efectos parallax, split text, magnetic interactions, carruseles infinitos, y más
- **ScrollTrigger Integration**: Animaciones sincronizadas con el scroll
- **Draggable & InertiaPlugin**: Carruseles arrastrables con física realista
- **Diseño Responsive**: Todas las animaciones están optimizadas para móvil y desktop
- **Modular y Escalable**: Fácil de extender con nuevas variantes
- **Carruseles GSAP Puros**: Gallery y Quotes ahora usan GSAP en lugar de Swiper (popup de gallery mantiene Swiper)

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

```bash
npm run dev
```

El servidor de desarrollo se iniciará en `http://localhost:8080`

## 🎨 Sistema de Variantes

Cada componente soporta múltiples variantes de animación que se pueden seleccionar desde el archivo `data/data.json` agregando el campo `"variant"` a cada sección.

### Cómo Usar Variantes

En tu archivo JSON, simplemente agrega el campo `variant` a cualquier sección:

```json
{
  "type": "hero",
  "variant": "parallax-smooth",
"data": {
    "id": "hero",
    ...
  }
}
```

Si no se especifica una variante, se usará la variante `"default"` del componente (o `"1"` para Gallery).

## 📚 Variantes Disponibles por Componente

### Hero (`_hero.html`)

| Variante | Descripción | Default |
|----------|-------------|---------|
| `parallax-smooth` | Parallax suave en el fondo con revelado de contenido | ✅ |
| `split-text-reveal` | Efecto de texto dividido con animación de clip-path | |
| `magnetic-interactive` | Efectos magnéticos en botones con parallax | |
| `cinematic-fade` | Fade cinematográfico con overlay y gradientes | |

**Ejemplo:**
```json
{
  "type": "hero",
  "variant": "magnetic-interactive",
  "data": { ... }
}
```

### Menu (`_menu.html`)

| Variante | Descripción | Default |
|----------|-------------|---------|
| `slide-in` | Menú desliza desde la derecha | ✅ |
| `fade-blur` | Fade con efecto blur de fondo | |
| `magnetic-links` | Links con efecto magnético al hover | |
| `minimalist` | Transición minimalista con fade simple | |

**Nota:** El menú usa `MutationObserver` para detectar cambios en la clase `--is-active` y aplicar animaciones GSAP sin interferir con la lógica de toggle existente.

**Botón Hamburguesa (Móvil):**
- Botón circular con borde dorado (color accent)
- Animación GSAP de líneas que se transforman en X al abrirse
- Tres líneas horizontales que rotan y forman una X
- Efecto de carga con separación de líneas desde el centro
- Animaciones suaves con cubic-bezier elástico

### Text Centered (`_text-centered.html`)

| Variante | Descripción | Default |
|----------|-------------|---------|
| `fade-up-stagger` | Elementos aparecen desde abajo con delay escalonado | ✅ |
| `split-text` | Texto con efecto split usando clip-path | |
| `morphing-text` | Transformación 3D con rotación | |
| `typewriter` | Efecto máquina de escribir simulado | |
| `autosplit` | SplitText con ScrollTrigger - líneas animadas con scroll vinculado (scrub) | |

### Text and Image One/Two (`_text-and-image-one.html`, `_text-and-image-two.html`)

| Variante | Descripción | Default |
|----------|-------------|---------|
| `reveal-stagger` | Revelado escalonado de elementos | ✅ |
| `slide-parallax` | Imagen y texto se deslizan desde lados opuestos con parallax | |
| `magnetic-hover` | Efecto magnético en la imagen al pasar el mouse | |
| `overlay-reveal` | Overlay que se desliza para revelar contenido | |

### Gallery (`_gallery.html`) ⭐ **RECONSTRUIDO CON GSAP**

**IMPORTANTE:** La galería ha sido completamente reconstruida usando GSAP puro. Ya no usa Swiper para el carrusel principal (solo para el popup). Las variantes usan nombres numéricos para facilitar su selección.

| Variante | Descripción | Default |
|----------|-------------|---------|
| `1` | Slider vertical con arrastre y navegación por flechas/teclado | ✅ |
| `2` | Slider con Observer plugin, controles SVG y arrastre | |

**Ejemplo:**
```json
{
  "type": "gallery",
  "variant": "2",
    "data": {
    "id": "galeria",
    "title": "Galería",
    "images": [ ... ]
  }
}
```

**Características:**
- **Variante 1 (vertical-slider)**: 
  - Slider vertical con navegación mediante flechas (arriba/abajo)
  - Soporte para teclado (flechas del teclado)
  - Elemento arrastrable vertical con física e inercia
  - Indicadores de puntos (dots) para navegación
  - Carrusel de miniaturas sincronizado debajo
  
- **Variante 2 (observer)**:
  - Slider con Observer plugin de GSAP (premium)
  - Controles SVG personalizados (prev/next/counter)
  - Navegación por arrastre, teclado y botones
  - Carrusel de miniaturas sincronizado debajo
  
- Todas las variantes incluyen un carrusel de miniaturas debajo del slider principal
- Las miniaturas tienen overlay (excepto la activa) y se pueden clicar para navegar
- El popup de galería sigue usando Swiper para mantener la funcionalidad existente
- Las imágenes ocupan el mismo ancho en ambas variantes

### Video (`_video.html`)

| Variante | Descripción | Default |
|----------|-------------|---------|
| `play-on-scroll` | Animación del botón play al hacer scroll | ✅ |
| `modal-reveal` | Overlay oscuro que se desvanece para revelar video | |
| `split-screen` | Efecto split screen con clip-path | |
| `immersive` | Fade in inmersivo con blur inicial | |

### Details (`_details.html`)

| Variante | Descripción | Default |
|----------|-------------|---------|
| `stagger-list` | Lista con animación escalonada | ✅ |
| `accordion-reveal` | Efecto acordeón en las especificaciones | |
| `card-flip` | Efecto flip 3D en las tarjetas | |
| `morphing-specs` | Transformación morfológica de elementos | |

### Quotes (`_quotes.html`) ⭐ **RECONSTRUIDO CON GSAP**

**IMPORTANTE:** El módulo de quotes ha sido completamente reconstruido usando GSAP puro. Ya no usa Swiper.

| Variante | Descripción | Default |
|----------|-------------|---------|
| `fade-slide` | Fade con deslizamiento horizontal entre quotes | ✅ |
| `scale-reveal` | Escalado con efecto bounce | |
| `typewriter` | Efecto máquina de escribir | |
| `magnetic` | Efecto magnético en las tarjetas de citas | |

**Características:**
- Slider personalizado con GSAP
- Navegación con botones prev/next
- Animaciones suaves entre transiciones
- Sin dependencia de Swiper

### Ticketing (`_ticketing.html`)

| Variante | Descripción | Default |
|----------|-------------|---------|
| `fade-in` | Fade in simple | ✅ |
| `scale-reveal` | Escalado con revelado | |
| `slide-up` | Deslizamiento desde abajo | |
| `overlay` | Revelado con overlay | |

### Parallax (`_parallax.html`)

| Variante | Descripción | Default |
|----------|-------------|---------|
| `smooth-scroll` | Parallax suave con scroll | ✅ |
| `fast-parallax` | Parallax rápido | |
| `reveal-parallax` | Parallax con revelado | |
| `depth-layered` | Parallax en capas con profundidad | |

### Call to Action (`_call-to-action.html`)

| Variante | Descripción | Default |
|----------|-------------|---------|
| `fade-scale` | Fade con escalado | ✅ |
| `slide-overlay` | Overlay deslizante | |
| `magnetic-button` | Botón con efecto magnético | |
| `reveal-stagger` | Revelado escalonado | |

### Logos (`_logos.html`)

| Variante | Descripción | Default |
|----------|-------------|---------|
| `fade-stagger` | Fade escalonado | ✅ |
| `scale-pop` | Escalado con pop | |
| `slide-in` | Deslizamiento desde los lados | |
| `magnetic-hover` | Efecto magnético al hover | |

### Share/Follow Us (`_share.html`, `_follow-us.html`)

| Variante | Descripción | Default |
|----------|-------------|---------|
| `fade-icons` | Fade de iconos | ✅ |
| `scale-pop` | Escalado con pop | |
| `rotate-in` | Rotación al entrar | |
| `magnetic` | Efecto magnético | |

### Footer (`_footer.html`)

| Variante | Descripción | Default |
|----------|-------------|---------|
| `fade-up` | Fade desde abajo | ✅ |
| `slide-in` | Deslizamiento | |
| `stagger-reveal` | Revelado escalonado | |
| `minimal` | Animación mínima | |

### Image (`_image.html`)

| Variante | Descripción | Default |
|----------|-------------|---------|
| `fade-scale` | Fade con escalado | ✅ |
| `parallax` | Efecto parallax | |
| `reveal-overlay` | Revelado con overlay | |
| `ken-burns` | Efecto Ken Burns | |

### Sorteo (`_sorteo.html`)

| Variante | Descripción | Default |
|----------|-------------|---------|
| `fade-in` | Fade in simple | ✅ |
| `slide-up` | Deslizamiento desde abajo | |
| `scale-reveal` | Escalado con revelado | |
| `form-focus` | Animación al focus del formulario | |

### Custom (`_custom.html`)

| Variante | Descripción | Default |
|----------|-------------|---------|
| `fade-in` | Fade in simple | ✅ |
| `slide-in` | Deslizamiento | |
| `scale-reveal` | Escalado con revelado | |
| `stagger` | Animación escalonada | |

## 🏗️ Estructura del Proyecto

```
├── src/
│   ├── components/          # Componentes HTML (Nunjucks)
│   │   ├── _hero.html
│   │   ├── _gallery.html
│   │   ├── _quotes.html
│   │   └── ...
│   ├── scripts/
│   │   ├── gsap/           # Módulos GSAP por componente
│   │   │   ├── hero.js
│   │   │   ├── menu.js
│   │   │   ├── gallery.js  # ⭐ Reconstruido con GSAP puro
│   │   │   ├── quotes.js   # ⭐ Reconstruido con GSAP puro
│   │   │   ├── index.js    # Punto de entrada de módulos GSAP
│   │   │   └── ...
│   │   ├── gsap-init.js    # Inicialización y registro de plugins GSAP
│   │   ├── gallery.js      # Popup de galería (sigue usando Swiper)
│   │   └── scripts.js      # Entry point principal
│   └── styles/
│       ├── components/     # Estilos SCSS por componente
│       │   ├── _gallery.scss  # ⭐ Estilos actualizados para GSAP
│       │   ├── _quotes.scss   # ⭐ Estilos actualizados para GSAP
│       │   └── ...
│       └── styles.scss
├── data/
│   └── data.json          # Datos y configuración de secciones
└── package.json
```

## 🎯 Uso Básico

### Agregar una Variante a una Sección

1. Abre `data/data.json`
2. Encuentra la sección que quieres animar
3. Agrega el campo `"variant"` con el nombre de la variante deseada:

```json
{
  "type": "gallery",
  "variant": "draggable",
  "data": {
    "id": "galeria",
    "title": "Galería",
    "images": [ ... ]
  }
}
```

### Crear una Nueva Variante

1. Abre el archivo GSAP correspondiente en `src/scripts/gsap/`
2. Crea una nueva función para la variante:

```javascript
function initComponentNuevaVariante(element) {
    // Tu código GSAP aquí
    gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    });
}
```

3. Agrégalo al objeto de variantes en la función `initComponent`:

```javascript
export function initComponent(element, variant = 'default') {
    const variants = {
        'nueva-variante': initComponentNuevaVariante,
        'default': initComponentDefault
    };
    const initFn = variants[variant] || variants['default'];
    initFn(element);
}
```

## 🔧 Configuración GSAP

GSAP se inicializa automáticamente al cargar la página. La configuración se encuentra en `src/scripts/gsap-init.js`:

### Plugins Registrados

- **ScrollTrigger**: Para animaciones basadas en scroll
- **Draggable**: Para elementos arrastrables (usado en gallery variants)
- **InertiaPlugin**: Para física de inercia en elementos arrastrables (cargado desde CDN, premium plugin)
- **Observer**: Para detección de gestos y navegación (cargado desde CDN, premium plugin, usado en gallery variant 2)
- **SplitText**: Para dividir texto en palabras/líneas (cargado desde CDN, premium plugin, usado en text-centered variant 'autosplit')

### Configuración Global

```javascript
gsap.config({
    nullTargetWarn: false,
    trialWarn: false
});

gsap.defaults({
    ease: "power2.out",
    duration: 0.8
});
```

### Características

- ScrollTrigger se refresca automáticamente en resize y carga de imágenes
- Easing por defecto: `power2.out`
- Duración por defecto: `0.8s`

## 🎨 Gallery: Variantes con GSAP

La galería utiliza diferentes técnicas de GSAP según la variante:

- **Variante 1**: Usa `Draggable` con `InertiaPlugin` para crear un slider vertical arrastrable con física realista
- **Variante 2**: Usa `Observer` plugin para detectar gestos (scroll, touch, pointer) y crear una experiencia de navegación fluida

Ambas variantes incluyen:
- Carrusel de miniaturas sincronizado
- Navegación por teclado (flechas)
- Soporte para arrastre/gestos
- Transiciones suaves entre imágenes

## 📱 Responsive

Todas las animaciones GSAP están diseñadas para funcionar correctamente en dispositivos móviles. Las animaciones se optimizan automáticamente según el tamaño de pantalla.

### Breakpoints

Los breakpoints están definidos en los estilos SCSS y se respetan en las animaciones GSAP:

- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

## 🎨 Personalización de Estilos

Los estilos específicos por variante se pueden agregar en los archivos SCSS correspondientes:

```scss
// src/styles/components/_gallery.scss
.c-gallery--horizontal-loop {
    .c-gallery__carousel {
        height: 60vh;
        overflow: hidden;
    }
    
    .c-gallery__slide {
        width: 80vw !important;
        margin-right: var(--space-16);
        
        @include breakpoint(lg) {
            width: 50vw;
        }
    }
}
```

## 🚨 Notas Importantes

### Cambios Recientes

1. **Menu & Navbar**:
   - Navbar totalmente transparente en el estado inicial (`.--page-at-top`).
   - Eliminación de efectos `blur` (`backdrop-filter`) en el menú y navbar para un diseño más limpio.
   - Mejora en la visibilidad de los links del menú móvil mediante `MutationObserver` y limpieza de estilos inline de GSAP.
   - Posicionamiento corregido del botón de cierre y logo en móvil.
   - **Rediseño del botón hamburguesa móvil**: Botón circular con animación GSAP donde las tres líneas se transforman en X, con efecto de carga y transiciones suaves.

2. **Navegación de Slider (prev/next)**:
   - Botones rediseñados siguiendo el estilo del botón hamburguesa.
   - Círculos con borde dorado (color accent) y fondo transparente.
   - Chevrons creados con CSS usando pseudo-elementos.
   - Animación de click que agranda el botón temporalmente y vuelve a su tamaño original.
   - Mismo estilo visual consistente en toda la aplicación.

3. **Hero**:
   - Eliminación del degradado azul superior y efecto blur en el hero.
   - Centrado horizontal corregido de la flecha de scroll (`.arrow-down`) en dispositivos móviles.

4. **Text Centered - Variante Autosplit**:
   - Nueva variante `autosplit` que usa SplitText con ScrollTrigger.
   - Las líneas de texto se animan con scroll vinculado (scrub: true).
   - Efecto cascada con líneas apareciendo desde abajo (yPercent: 120).
   - Auto-split: las líneas se reajustan automáticamente en resize.
   - Soporte para título y texto independientemente.
   - Espera a que las fuentes se carguen antes de inicializar.

5. **Gallery**: Completamente reconstruida con GSAP puro
   - Ya no usa Swiper para el carrusel principal
   - El popup de galería sigue usando Swiper
   - Variantes renombradas a números: `1` (vertical-slider), `2` (observer)
   - Ambas variantes incluyen carrusel de miniaturas sincronizado
   - Imágenes con ancho uniforme en ambas variantes

6. **Quotes**: Completamente reconstruido con GSAP puro
   - Ya no usa Swiper
   - Slider personalizado con GSAP

7. **Menu**: Usa `MutationObserver` para no interferir con la lógica existente
   - GSAP solo añade animaciones, no controla el toggle

8. **Legacy Code**: `reveal-animations.js` ha sido reemplazado por GSAP
   - Comentado pero conservado para referencia

### Buenas Prácticas

- Las animaciones se ejecutan cuando los elementos entran en viewport usando ScrollTrigger
- Si un componente no tiene una variante especificada, usará la variante `default`
- Las animaciones están optimizadas para rendimiento usando `will-change` y `transform`
- Las imágenes en gallery son visibles por defecto antes de las animaciones
- El código espera a que las imágenes se carguen antes de inicializar carruseles

### Inicialización de Carruseles

Los carruseles GSAP (gallery y quotes) esperan a que:
1. Las imágenes se carguen completamente
2. El layout esté estable
3. Los elementos tengan sus dimensiones finales calculadas

Esto asegura que los cálculos de posición (`offsetLeft`, anchos, etc.) sean correctos.

## 📦 Dependencias

- **GSAP**: ^3.12.5 - Librería de animaciones
- **ScrollTrigger**: Plugin de GSAP para animaciones basadas en scroll (incluido en GSAP)
- **Draggable**: Plugin de GSAP para elementos arrastrables (incluido en GSAP)
- **InertiaPlugin**: Plugin de GSAP para física de inercia (incluido en GSAP)
- **Nunjucks**: ^3.2.3 - Motor de templates
- **Sass**: ^1.53.0 - Preprocesador CSS
- **Swiper**: ^9.1.0 - Slider (solo para popup de gallery)

## 🔍 Debugging

### Console Logs

El proyecto incluye mensajes de consola útiles:

- `GSAP initialized with ScrollTrigger` - Confirma inicialización
- `Scripts Loaded!` - Confirma carga completa
- Warnings si faltan elementos requeridos en componentes

### Herramientas de Desarrollo

1. Abre las DevTools del navegador
2. Ve a la pestaña Console para ver logs
3. Usa la pestaña Elements para inspeccionar `data-gsap-variant` attributes
4. Usa GSAP DevTools (extensión) para inspeccionar animaciones en tiempo real

## 🤝 Contribuir

Para agregar nuevas variantes o mejorar las existentes:

1. Modifica el archivo correspondiente en `src/scripts/gsap/`
2. Agrega estilos específicos si es necesario en `src/styles/components/`
3. Agrega documentación de la nueva variante en este README
4. Prueba en diferentes dispositivos y navegadores
5. Asegúrate de que las animaciones sean accesibles (respetar `prefers-reduced-motion`)

## 📄 Licencia

ISC

## 👤 Autor

gus@bekamedia.es

---

## 🌟 Recursos y Referencias

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Plugin](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Draggable Plugin](https://greensock.com/docs/v3/Plugins/Draggable)
- [Codrops - Mastering Carousels with GSAP](https://tympanus.net/codrops/2025/04/21/mastering-carousels-with-gsap-from-basics-to-advanced-animation/) (Referencia para variantes de gallery)

---

**Nota**: Este proyecto usa GSAP para todas las animaciones. Asegúrate de tener una licencia válida si estás usando GSAP en producción comercial. GSAP tiene una versión gratuita para proyectos básicos, pero las versiones comerciales requieren licencia.