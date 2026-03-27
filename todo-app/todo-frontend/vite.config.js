import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Existing: allows external access
    port: 5173,      // Existing: the port Nginx is calling
    allowedHosts: ['app'] // NEW: Allows Nginx to use the service name "app"
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
