import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/valoraciones-colegio/', // Ajusta al nombre de tu repositorio
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
});
