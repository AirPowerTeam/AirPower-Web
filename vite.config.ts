import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'main',
      formats: ['es'],
      fileName: () => `main.js`,
    },
    rollupOptions: {
      external: ['vue', 'axios', 'element-plus'],
    },
  },
  plugins: [dts(), vue()],
})
