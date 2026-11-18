
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // Temporary GitHub Pages deployment
  base: mode === 'production'
    ? '/Yash_Portfolio_V2/'
    : '/',

  build: {
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor'
            }

            if (id.includes('gsap') || id.includes('lenis')) {
              return 'gsap'
            }

            if (id.includes('motion')) {
              return 'motion'
            }
          }
        },
      },
    },
  },
}))
