import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
  Base_de_la_API
  build: {
    outDir: 'build', // Especificar el directorio de salida
    base: "/", // ✅ Asegurar que las rutas se manejan correctamente
  },
  server: {
    host: "0.0.0.0", // ✅ Necesario para que Docker acepte conexiones
    port: 5173, // ✅ Asegurar que el puerto esté bien definido
    strictPort: true,
  },
});
