import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Example: split vendor code into a separate chunk
          vendor: ['react', 'react-dom'],
          // Example: split a specific component or library
          'some-lib': ['some-lib']
        }
      }
    }
  }
});

