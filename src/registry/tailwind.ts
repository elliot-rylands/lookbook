import type { ComponentType } from 'react'
import { sortEntries } from '@/registry/query'
import type { ComponentMetadata, LibraryEntry } from '@/registry/types'

type DemoModule = {
  metadata: ComponentMetadata
  default: ComponentType
}

const demoFiles = import.meta.glob<DemoModule>('../tailwind/demos/*.tsx', {
  eager: true,
})

function loadTailwindRegistry(): LibraryEntry[] {
  const entries: LibraryEntry[] = []

  for (const [path, module] of Object.entries(demoFiles)) {
    if (!module.metadata || !module.default) {
      throw new Error(`Tailwind demo ${path} must export metadata and a default component.`)
    }

    entries.push({
      metadata: module.metadata,
      Component: module.default,
      sourcePath: path.replace(/^\.\.\//, 'src/'),
    })
  }

  return sortEntries(entries)
}

export const tailwindRegistry = loadTailwindRegistry()
