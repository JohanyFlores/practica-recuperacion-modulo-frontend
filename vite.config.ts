import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración para GitHub Pages
  // Cambia 'practica-recuperacion-modulo-frontend' por el nombre de tu repositorio
  base: process.env.NODE_ENV === 'production' 
    ? '/practica-recuperacion-modulo-frontend/' 
    : '/',
})
