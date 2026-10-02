#!/bin/bash

# Script para configurar un nuevo repositorio en GitHub
# Uso: ./setup-new-repo.sh TU_USUARIO_GITHUB NOMBRE_REPOSITORIO

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Uso: ./setup-new-repo.sh TU_USUARIO_GITHUB NOMBRE_REPOSITORIO"
    echo "Ejemplo: ./setup-new-repo.sh gusblacknails landing-gsap-pruebas"
    exit 1
fi

GITHUB_USER=$1
REPO_NAME=$2
REPO_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

echo "=========================================="
echo "Configurando nuevo repositorio en GitHub"
echo "=========================================="
echo ""
echo "Usuario GitHub: $GITHUB_USER"
echo "Nombre del repositorio: $REPO_NAME"
echo "URL: $REPO_URL"
echo ""
read -p "¿Continuar? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelado."
    exit 1
fi

echo ""
echo "1. Eliminando remote origin actual (si existe)..."
git remote remove origin 2>/dev/null || echo "   No había remote origin previo"

echo ""
echo "2. Agregando nuevo remote origin..."
git remote add origin "$REPO_URL"

echo ""
echo "3. Verificando remotes configurados..."
git remote -v

echo ""
echo "4. Asegurando que estamos en la rama main..."
git branch -M main

echo ""
echo "=========================================="
echo "✓ Configuración local completada"
echo "=========================================="
echo ""
echo "IMPORTANTE: Ahora debes:"
echo ""
echo "1. Crear el repositorio en GitHub:"
echo "   - Ve a https://github.com/new"
echo "   - Nombre: $REPO_NAME"
echo "   - NO inicialices con README, .gitignore o licencia"
echo "   - Crea el repositorio"
echo ""
echo "2. Luego ejecuta este comando para subir el código:"
echo "   git push -u origin main"
echo ""
echo "O ejecuta este script completo automáticamente después de crear el repo:"
echo "   git push -u origin main"

