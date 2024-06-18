import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy:{
      '/api': {
        target: 'https://finaltest-api.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Remove /api prefix
      }
    }
    },
  plugins: [react()],
  define:{
    'process.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY)
  }
})
