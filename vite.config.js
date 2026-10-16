import { defineConfig } from 'vite'
import partialsPlugin from './build/vite-plugin-partials.js'

export default defineConfig({
  // BASE_PATH se lee de la variable de entorno o del flag --base de Vite.
  // Valor por defecto "/" para dominios propios o repos usuario.github.io.
  // Para GitHub Pages en repo de proyecto usar: BASE_PATH=/nombre-repo/
  base: process.env.BASE_PATH || '/',

  plugins: [partialsPlugin()],

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    emptyOutDir: true
  },

  server: {
    port: 5173,
    open: true,
    fs: {
      allow: ['src', 'public']
    }
  }
})
