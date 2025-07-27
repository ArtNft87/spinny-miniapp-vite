import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@twa-dev/sdk': '@twa-dev/sdk', // Optional if you still use it
    },
  },
});
