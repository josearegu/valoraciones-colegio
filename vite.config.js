import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/valoraciones-colegio/' : '/',
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    build: {
      chunkSizeWarningLimit: 1500,
      // Asegura que los assets se generen en el directorio correcto
      assetsDir: 'assets',
      outDir: 'dist',
      rollupOptions: {
        output: {
          // Asegura que los nombres de los archivos generados sean consistentes
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
    server: {
      port: 5173,
    },
  };
});
