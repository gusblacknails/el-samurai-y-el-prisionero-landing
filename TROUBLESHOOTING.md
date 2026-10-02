# Guía de Solución de Problemas

## Error: scripts.js no encontrado (404)

### Problema
El navegador muestra errores como:
```
Failed to load resource: the server responded with a status of 404 (Not Found)
Refused to execute script from 'http://localhost:8081/assets/scripts.js'
```

### Solución

1. **Instalar dependencias (incluyendo GSAP):**
   ```bash
   npm install
   ```
   
   Esto instalará GSAP y todas las demás dependencias necesarias.

2. **Reiniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

   El proceso de build debería:
   - Compilar `scripts.js` desde `src/scripts/scripts.js` → `public/assets/scripts.js`
   - Compilar `styles.css` desde `src/styles/styles.scss` → `public/assets/styles.css`
   - Copiar assets (imágenes, fuentes, videos)
   - Renderizar templates HTML

3. **Verificar que los archivos se generaron:**
   ```bash
   ls -la public/assets/
   ```
   
   Deberías ver:
   - `scripts.js`
   - `styles.css`
   - Carpetas: `fonts/`, `images/`, `videos/`

4. **Si los archivos no se generan, verifica errores en la consola:**
   
   El proceso `dev.js` mostrará errores si:
   - GSAP no está instalado
   - Hay errores de sintaxis en JavaScript
   - Hay errores en SCSS
   - Faltan módulos

### Errores Comunes

#### Error: Cannot find module 'gsap'
**Solución:** Ejecuta `npm install` para instalar GSAP

#### Error: MIME type 'text/html'
**Solución:** Esto indica que el servidor está devolviendo HTML (página 404) en lugar del archivo. Asegúrate de:
- Que el servidor esté corriendo en el puerto correcto (8080 por defecto)
- Que los archivos existan en `public/assets/`
- Que el proceso de build se haya completado correctamente

#### Puerto incorrecto (8081 vs 8080)
El servidor está configurado para usar el puerto **8080** por defecto. Si estás viendo errores en el puerto 8081:
- Cierra cualquier proceso en el puerto 8081
- Reinicia el servidor con `npm run dev`
- El servidor debería abrirse en `http://localhost:8080`

### Verificar Compilación Manual

Si quieres compilar manualmente para ver errores:

```bash
# Compilar scripts
npx esbuild src/scripts/scripts.js --bundle --outfile=public/assets/scripts.js --target=es2015

# Compilar estilos
npx sass src/styles/styles.scss public/assets/styles.css --style=compressed
```

### Estructura Esperada

Después de una compilación exitosa, deberías tener:

```
public/
├── assets/
│   ├── scripts.js          ← Generado por esbuild
│   ├── styles.css          ← Generado por sass
│   ├── fonts/
│   ├── images/
│   └── videos/
├── index.html              ← Generado por nunjucks
└── cat/
    └── index.html          ← Generado por nunjucks
```

## Error: GSAP no inicializado

Si ves errores en consola sobre GSAP no siendo encontrado:

1. Verifica que GSAP esté en `package.json`:
   ```json
   "dependencies": {
     "gsap": "^3.12.5"
   }
   ```

2. Verifica que esté instalado:
   ```bash
   ls node_modules/gsap
   ```

3. Si no existe, reinstala:
   ```bash
   npm install gsap@^3.12.5
   ```

## Errores de Sintaxis JavaScript

Si hay errores de sintaxis, el build fallará silenciosamente. Revisa:

1. `src/scripts/scripts.js` - Entry point principal
2. `src/scripts/gsap-init.js` - Inicialización GSAP
3. `src/scripts/gsap/*.js` - Módulos GSAP por componente

Usa un linter o ejecuta:
```bash
node --check src/scripts/scripts.js
```

## Limpiar y Reconstruir

Si nada funciona, limpia todo y reconstruye:

```bash
# Eliminar node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar
npm install

# Reconstruir (el servidor hace esto automáticamente)
npm run dev
```

