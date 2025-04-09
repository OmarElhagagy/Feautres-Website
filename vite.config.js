import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'src',  // Frontend files are in src
  build: {
    outDir: '../dist/frontend',  // Output to dist/frontend
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',  // Proxy API requests to backend
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),  // Alias for easier imports
    },
  },
});
