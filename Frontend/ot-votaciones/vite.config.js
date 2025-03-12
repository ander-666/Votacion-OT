import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
  Base_de_la_API
  build: {
    outDir: 'build', // Specify the output directory
  },
});

