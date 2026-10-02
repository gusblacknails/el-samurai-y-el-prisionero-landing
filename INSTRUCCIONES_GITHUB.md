# Instrucciones para crear nuevo repositorio en GitHub

## Opción 1: Usando la interfaz web de GitHub (Recomendado)

### Paso 1: Crear el repositorio en GitHub

1. Ve a [GitHub.com](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Completa el formulario:
   - **Repository name**: `landing-gsap-pruebas` (o el nombre que prefieras)
   - **Description**: "Landing page con sistema de animaciones GSAP y múltiples variantes"
   - **Visibility**: Elige **Public** o **Private**
   - **NO marques** "Initialize this repository with a README" (ya tenemos uno)
   - **NO agregues** .gitignore ni licencia
5. Haz clic en **"Create repository"**

### Paso 2: Conectar tu repositorio local con GitHub

Ejecuta estos comandos en tu terminal (reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub):

```bash
cd /Users/gusescola/BEKA_MEDIA/landing-gsap-pruebas

# Remover el remote actual (si quieres crear uno nuevo)
git remote remove origin

# Agregar el nuevo remote (reemplaza TU_USUARIO y NOMBRE_REPO)
git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPO.git

# Verificar que el remote está configurado
git remote -v

# Subir el código
git branch -M main
git push -u origin main
```

## Opción 2: Usando GitHub CLI (si lo tienes instalado)

Si tienes GitHub CLI instalado, puedes crear el repositorio directamente desde la terminal:

```bash
cd /Users/gusescola/BEKA_MEDIA/landing-gsap-pruebas

# Remover el remote actual (si quieres crear uno nuevo)
git remote remove origin

# Crear el repositorio y hacer push (reemplaza NOMBRE_REPO)
gh repo create NOMBRE_REPO --public --source=. --remote=origin --push
```

## Opción 3: Si quieres mantener el repositorio actual y crear uno nuevo

Si quieres mantener el repositorio actual (`el-sendero-de-la-sal-landing`) y crear uno nuevo para esta versión:

```bash
cd /Users/gusescola/BEKA_MEDIA/landing-gsap-pruebas

# Agregar un nuevo remote (sin eliminar el anterior)
git remote add nuevo-origin https://github.com/TU_USUARIO/NOMBRE_REPO_NUEVO.git

# Hacer push al nuevo repositorio
git push -u nuevo-origin main
```

## Verificar que todo funcionó

Después de hacer push, verifica que:

1. Todos los archivos están en GitHub: Ve a tu repositorio en GitHub y verifica que todos los archivos están ahí
2. El README se muestra correctamente
3. La estructura del proyecto es correcta

## Si encuentras problemas

### Error: "remote origin already exists"
Si ya existe un remote origin, puedes:
- Eliminarlo: `git remote remove origin`
- O agregar uno nuevo con otro nombre: `git remote add nuevo-origin URL`

### Error: "Authentication failed"
Necesitarás autenticarte. Puedes:
- Usar un Personal Access Token en lugar de contraseña
- Configurar SSH keys
- Usar GitHub CLI para autenticación

### Error: "Repository not found"
Asegúrate de que:
- El repositorio existe en GitHub
- Tienes permisos de escritura
- La URL del remote es correcta

## Notas

- Todos los cambios ya están commiteados localmente
- El commit incluye todos los archivos nuevos de GSAP
- El README está actualizado con toda la documentación
- El .gitignore está configurado correctamente (excluye node_modules y public/)

