import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    entries: ['index.html'] // Ignore ckeditor folder during dep scan
  },
  build: {
    rolldownOptions: {
      output: {
        // Libraries change far less often than app code, so they get their
        // own long-cacheable chunks and keep the app chunk under 500 kB.
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            { name: 'gsap', test: /node_modules[\\/](gsap|@gsap)[\\/]/ }
          ]
        }
      }
    }
  }
})
