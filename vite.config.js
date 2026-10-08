import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

// Crawlers get the sitemap from the API host, so robots.txt is written at build from the same env var.
const robotsTxt = (apiBaseUrl) => ({
  name: 'emit-robots-txt',
  generateBundle() {
    const lines = ['User-agent: *', 'Allow: /']
    if (/^https?:\/\//.test(apiBaseUrl || '')) lines.push(`Sitemap: ${apiBaseUrl.replace(/\/+$/, '')}/public/sitemap.xml`)
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${lines.join('\n')}\n` })
  }
})

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (command === 'build' && !/^https?:\/\//.test(env.VITE_API_BASE_URL || '')) {
    throw new Error('VITE_API_BASE_URL harus berupa URL lengkap, contoh: https://<api-host>/api/v1')
  }

  return {
    plugins: [react(), tailwindcss(), robotsTxt(env.VITE_API_BASE_URL)],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
    },
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
  }
})
