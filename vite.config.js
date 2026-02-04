import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/freellm': {
        target: 'https://apifreellm.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/freellm/, '/api/v1'),
      },
    },
  },
})
