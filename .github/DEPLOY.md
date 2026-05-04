# 🚀 Configuración de GitHub Actions y Deploy

## 📋 Pasos para activar GitHub Pages

### 1. Configurar el repositorio en GitHub

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, busca **Pages**
4. En **Build and deployment**:
   - **Source:** Selecciona `GitHub Actions`
5. Guarda los cambios

### 2. Actualizar vite.config.ts

Asegúrate de que el `base` en `vite.config.ts` coincida con el nombre de tu repositorio:

```typescript
base: process.env.NODE_ENV === 'production' 
  ? '/NOMBRE-DE-TU-REPO/' 
  : '/',
```

### 3. Hacer push a main/master

```bash
git add .
git commit -m "feat: configurar GitHub Actions"
git push origin main
```

## 🔄 ¿Qué hace el workflow?

### En cada push o pull request:
- ✅ Instala dependencias con `npm ci`
- 🔍 Ejecuta ESLint (no bloquea si hay errores)
- 🧪 Ejecuta los tests con `npm test`
- 🏗️ Hace build del proyecto con `npm run build`
- 📤 Guarda el build como artifact

### Solo en push a main/master:
- 🚀 Despliega automáticamente a GitHub Pages

## 📊 Ver el estado del workflow

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás el historial de ejecuciones
3. Click en cualquier ejecución para ver los detalles

## 🌐 URL de tu aplicación

Una vez desplegada, tu app estará disponible en:

```
https://TU-USUARIO.github.io/NOMBRE-DE-TU-REPO/
```

## 🛠️ Comandos útiles

```bash
# Ejecutar localmente lo mismo que CI
npm ci              # Instalar dependencias (limpio)
npm run lint        # Verificar código
npm test           # Ejecutar tests
npm run build      # Build de producción
npm run preview    # Preview del build local

# Git
git status         # Ver cambios
git add .          # Agregar todos los cambios
git commit -m ""   # Commit con mensaje
git push          # Subir a GitHub
```

## 🔧 Personalización del workflow

Edita `.github/workflows/ci-cd.yml` para:

- Agregar más jobs (coverage, e2e tests, etc.)
- Cambiar la versión de Node.js
- Modificar los pasos del deploy
- Agregar notificaciones
- Configurar diferentes ambientes (staging, production)

## ❗ Solución de problemas

### El workflow falla en tests
- Verifica que los tests pasen localmente: `npm test`
- Revisa los logs en la pestaña Actions

### El deploy no funciona
- Verifica que GitHub Pages esté configurado como `GitHub Actions`
- Revisa que el `base` en `vite.config.ts` sea correcto
- Asegúrate de tener permisos de Pages en Settings

### La app no carga en GitHub Pages
- Verifica la ruta `base` en `vite.config.ts`
- Revisa la consola del navegador para errores 404
- Asegúrate de que el build se completó exitosamente

## 🎯 Próximos pasos

- [ ] Configurar variables de entorno con GitHub Secrets
- [ ] Agregar badges de estado al README
- [ ] Configurar notificaciones de Slack/Discord
- [ ] Agregar coverage reports
- [ ] Implementar deploy a staging antes de producción
