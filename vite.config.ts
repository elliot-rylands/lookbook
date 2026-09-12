import { copyFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const srcRoot = fileURLToPath(new URL('./src', import.meta.url))
const untitledUiRoot = fileURLToPath(new URL('./vendor/untitled-ui', import.meta.url))

function githubPagesSpaFallback(): Plugin {
  return {
    name: 'github-pages-spa-fallback',
    closeBundle() {
      const index = path.resolve(import.meta.dirname, 'dist/index.html')
      if (existsSync(index)) {
        copyFileSync(index, path.resolve(import.meta.dirname, 'dist/404.html'))
      }
    },
  }
}

/**
 * Untitled UI's OSS repo maps `@/*` to its own root (`components/`, `utils/`, …).
 * Lookbook chrome already owns `@/` → `src/`. Rewrite only when the importer
 * lives inside `vendor/untitled-ui/` so the two trees do not share a theme.
 */
function untitledUiVendorAlias(): Plugin {
  const vendorPrefix = untitledUiRoot.endsWith(path.sep)
    ? untitledUiRoot
    : `${untitledUiRoot}${path.sep}`

  return {
    name: 'untitled-ui-vendor-alias',
    enforce: 'pre',
    resolveId(id, importer) {
      if (!importer || !id.startsWith('@/')) return null
      if (!importer.startsWith(vendorPrefix) && importer !== untitledUiRoot) return null
      return path.resolve(untitledUiRoot, id.slice(2))
    },
  }
}

export default defineConfig({
  // Project Pages: Actions sets BASE_PATH=/<repo>/. Local and a future
  // custom-domain cutover use '/'. Do not commit a CNAME until that cutover.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss(), untitledUiVendorAlias(), githubPagesSpaFallback()],
  resolve: {
    alias: {
      '@': srcRoot,
      '@untitled-ui': untitledUiRoot,
    },
  },
  server: {
    host: '0.0.0.0',
    port: 43147,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 43147,
  },
})
