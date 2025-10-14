import path from 'path'
import { fileURLToPath } from 'url'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://depisos.test/site-2025',
        changeOrigin: true,
        secure: false, // si es cert local
      },
    },
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  base: '/',
})
