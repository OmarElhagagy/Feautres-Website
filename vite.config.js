import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'src', // Frontend files are in src
  build: {
    outDir: '../dist/frontend', // Output to dist/frontend (relative to root: src)
    emptyOutDir: true, // Clear the output directory before building
  },
  server: {
    port: 5173, // Explicitly set the port to match your CORS settings
    proxy: {
      '/signin': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false, // Add this for development
      },
      '/user': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false, // Add this for development
      },
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false, // Add this for development
      },
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'), // Alias for easier imports (e.g., ~/components)
    },
  },
});
