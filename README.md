# 🛸 Rick and Morty App - Práctica de Recuperación

[![CI/CD Pipeline](https://github.com/JohanyFlores/practica-recuperacion-modulo-frontend/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/JohanyFlores/practica-recuperacion-modulo-frontend/actions/workflows/ci-cd.yml)

Aplicación web desarrollada con React, TypeScript y Vite que consume la API de Rick and Morty para mostrar y gestionar personajes.

## 📋 Descripción del Proyecto

Este proyecto fue desarrollado como práctica de recuperación del módulo de Frontend Frameworks. La aplicación permite:

- 🔐 Login de usuarios utilizando la API de reqres.in
- 📋 Listado paginado de personajes de Rick and Morty
- 👤 Vista detallada de cada personaje
- ✏️ Edición de información de personajes (simulada)
- 🛡️ Rutas protegidas con guards de autenticación
- ✅ Tests unitarios con Vitest

## 🚀 Tecnologías Utilizadas

- **React 19** - Librería de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router DOM** - Navegación entre páginas
- **Axios** - Cliente HTTP para APIs
- **Vitest** - Framework de testing
- **Testing Library** - Testing de componentes React

## 📦 APIs Utilizadas

1. **Rick and Morty API** (https://rickandmortyapi.com/)
   - Obtener listado de personajes
   - Obtener detalles de personajes individuales

2. **Reqres.in** (https://reqres.in/)
   - Sistema de autenticación (login)

## 🛠️ Instalación y Ejecución

### Requisitos previos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos para ejecutar el proyecto

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd practica-recuperacion-modulo-frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```

4. Abrir en el navegador:
```
http://localhost:5173
```

## 🧪 Ejecutar Tests

```bash
# Ejecutar tests en modo watch
npm run test

# Ejecutar tests con interfaz gráfica
npm run test:ui

# Ejecutar tests con cobertura
npm run test:coverage
```

## 🔑 Credenciales de Login

Para acceder a la aplicación, utiliza estas credenciales de prueba:

- **Email:** eve.holt@reqres.in
- **Contraseña:** cityslicka

**Credenciales alternativas:**
- test@test.com / test123

**Nota:** El sistema de login está simulado localmente para cumplir con los requisitos de la práctica (validación de login correcto e incorrecto).

## 📁 Estructura del Proyecto

```
src/
├── api/              # Configuración de clientes HTTP
├── components/       # Componentes reutilizables
├── guards/           # Guards de protección de rutas
├── hooks/            # Custom hooks
├── layouts/          # Layouts de la aplicación
├── pages/            # Páginas/vistas principales
├── services/         # Servicios de API
├── test/             # Tests unitarios
├── types/            # Tipos e interfaces TypeScript
└── utils/            # Utilidades
```

## ✨ Funcionalidades Implementadas

### ✅ Requisitos Cumplidos

- [x] Proyecto React + TypeScript con Vite
- [x] Conexión con API externa (Rick and Morty)
- [x] Listado de ítems (personajes)
- [x] Pantalla de detalle de un ítem
- [x] Edición de campos (simulada, ya que la API es read-only)
- [x] React Router DOM para navegación
- [x] Formulario de Login con reqres.in
- [x] Manejo de login correcto e incorrecto
- [x] Tests unitarios con Vitest
- [x] Diseño responsive y atractivo

## 🎨 Características del Diseño

- Interfaz moderna con gradientes
- Diseño responsive para móviles y tablets
- Animaciones suaves en transiciones
- Estados visuales claros (loading, error, success)
- Tarjetas de personajes con hover effects
- Sistema de colores intuitivo

## 🚀 Despliegue

El proyecto está configurado para desplegarse fácilmente en Vercel:

1. Push del código a GitHub
2. Conectar el repositorio con Vercel
3. Vercel detectará automáticamente la configuración de Vite
4. Deploy automático

```bash
# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📝 Notas Importantes

- La API de Rick and Morty es de solo lectura, por lo que las operaciones de edición son simuladas localmente
- Los cambios en la edición de personajes no persisten en el servidor
- El token de autenticación se guarda en localStorage
- La aplicación incluye guards para proteger las rutas que requieren autenticación

## 🎨 Atribuciones

Los íconos de Rick y Morty utilizados en el patrón de fondo son cortesía de:
- <a href="https://icons8.com/icon/hAPVXSp7TpSM/morty-smith">rick and morty</a> icon by <a href="https://icons8.com">Icons8</a>

## 👨‍💻 Autor

Manuel Artero Anguita - Práctica de Recuperación Frontend Frameworks

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos como parte de la formación en OBS Business School.
