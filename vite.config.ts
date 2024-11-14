import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import {visualizer} from "rollup-plugin-visualizer";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer({
      filename: './dist/stats.html', // Сохраняет HTML-отчёт
      open: true, // Автоматически открывает отчёт после сборки
    }),
  ],
})
