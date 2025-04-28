import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/triagens': {
        target: 'http://backend:3002', // <- Vamos preparar para docker direto já aqui!
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/triagens/, '/triagens')
      }
    }
  }
})
