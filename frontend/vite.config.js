import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  server: {
    host: true, // Necessário para o Docker
    port: 5173, // Porta que o Vite vai usar dentro do container
    // Habilita o hot-reload em alguns ambientes Docker
    watch: {
      usePolling: true,
    },
  },
})