import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

const srcDir = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
  base: './',
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': srcDir,
    },
    tsconfigPaths: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        v2: resolve(__dirname, 'v2/index.html'),
        v3: resolve(__dirname, 'v3/index.html'),
        v4: resolve(__dirname, 'v4/index.html'),
      },
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined
          }
          if (id.includes('gsap')) {
            return 'gsap'
          }
          if (id.includes('swiper')) {
            return 'swiper'
          }
          if (id.includes('@react-three') || id.includes('/three/')) {
            return 'three-stack'
          }
          if (id.includes('framer-motion')) {
            return 'motion'
          }
          return 'vendor'
        },
      },
    },
  },
})
