import { copyFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const srcRoot = fileURLToPath(new URL('./src', import.meta.url))
const untitledUiRoot = fileURLToPath(new URL('./vendor/untitled-ui', import.meta.url))
const untitledStarterRoot = fileURLToPath(
  new URL('./vendor/untitledui-nextjs-starter-kit/src', import.meta.url),
)
const nextNavigationShim = fileURLToPath(new URL('./src/shims/next-navigation.ts', import.meta.url))
const nextLinkShim = fileURLToPath(new URL('./src/shims/next-link.tsx', import.meta.url))

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
function resolveWithExt(base: string) {
  for (const ext of ['.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts', '/index.jsx', '/index.js']) {
    const full = `${base}${ext}`
    if (existsSync(full)) return full
  }
  if (existsSync(base)) return base
  return null
}

function untitledUiVendorAlias(): Plugin {
  const starterPrefix = `${untitledStarterRoot}${path.sep}`
  const ossPrefix = `${untitledUiRoot}${path.sep}`

  return {
    name: 'untitled-ui-vendor-alias',
    enforce: 'pre',
    resolveId(id, importer) {
      if (!id.startsWith('@/')) return null
      const rest = id.slice(2)
      let root = srcRoot
      if (importer?.startsWith(starterPrefix) || importer === untitledStarterRoot) {
        root = untitledStarterRoot
      } else if (importer?.startsWith(ossPrefix) || importer === untitledUiRoot) {
        root = untitledUiRoot
      }
      return resolveWithExt(path.resolve(root, rest))
    },
  }
}

export default defineConfig({
  // Project Pages: Actions sets BASE_PATH=/lookbook/. Local and a future
  // custom-domain cutover use '/'. Do not commit a CNAME until that cutover.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss(), untitledUiVendorAlias(), githubPagesSpaFallback()],
  resolve: {
    alias: {
      '@untitled-ui': untitledUiRoot,
      '@untitled-starter': untitledStarterRoot,
      'next/navigation': nextNavigationShim,
      'next/link': nextLinkShim,
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
