import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        //target: "http://localhost:5000",
        target:"https://login-signup-3-wa6b.onrender.com",
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
