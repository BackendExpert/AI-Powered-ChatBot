import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // This will point to the Vercel local serverless function
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Strip the '/api' prefix before sending the request
      },
    },
  },
});
