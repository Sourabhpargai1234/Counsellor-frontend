import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      "/api/v1/users": "https://finaltest-api.vercel.app",
      }
    },
  plugins: [react()],
})
