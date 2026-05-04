import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Si estás en Vercel, usa '/', si es GitHub Pages, usa el path del repo
  base: process.env.VERCEL ? '/' : '/practica-recuperacion-modulo-frontend/',
})
