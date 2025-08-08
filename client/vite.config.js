import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API calls to the backend during local development
      '/api': 'http://localhost:5000',
    },
  },
});

