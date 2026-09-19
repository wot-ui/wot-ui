import { defineConfig } from 'vite'

// 预览构建产物时不加载 uni 编译插件。
export default defineConfig({
  base: './',
  build: { outDir: 'dist/build/h5' },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true }
})
