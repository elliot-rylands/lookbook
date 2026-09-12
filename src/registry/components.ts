import type { ComponentType } from 'react'
import { categoryLabel } from '@/data/categories'
import type { ComponentMetadata, ComponentVariant, LibraryEntry } from '@/registry/types'

type MetadataModule = { metadata: ComponentMetadata }
type ComponentModule = { default: ComponentType }
type VariantsModule = { variants: ComponentVariant[] }

const metadataFiles = import.meta.glob<MetadataModule>('../library/**/metadata.ts', {
  eager: true,
})

const componentFiles = import.meta.glob<ComponentModule | VariantsModule>(
  '../library/**/*.tsx',
  { eager: true },
)

function folderOf(path: string) {
  return path.replace(/\/[^/]+$/, '')
}

function folderName(folder: string) {
  return folder.split('/').pop() ?? ''
}

function toSourcePath(globPath: string) {
  return globPath.replace(/^\.\.\//, 'src/')
}

function loadRegistry(): LibraryEntry[] {
  const entries: LibraryEntry[] = []

  for (const [metaPath, metaModule] of Object.entries(metadataFiles)) {
    const folder = folderOf(metaPath)
    const name = folderName(folder)
    const componentPath = `${folder}/${name}.tsx`
    const variantsPath = `${folder}/variants.tsx`
    const componentModule = componentFiles[componentPath] as ComponentModule | undefined
    const variantsModule = componentFiles[variantsPath] as VariantsModule | undefined

    if (!metaModule.metadata) {
      throw new Error(`Missing \`metadata\` export in ${metaPath}`)
    }
    if (!componentModule?.default) {
      throw new Error(
        `Expected default export at ${componentPath} (folder name must match the component file).`,
      )
    }

    entries.push({
      metadata: metaModule.metadata,
      Component: componentModule.default,
      variants: variantsModule?.variants,
      sourcePath: toSourcePath(componentPath),
    })
  }

  return entries.sort((a, b) => {
    const byDate = b.metadata.dateAdded.localeCompare(a.metadata.dateAdded)
    if (byDate !== 0) return byDate
    return a.metadata.title.localeCompare(b.metadata.title)
  })
}

export const registry = loadRegistry()

export function getEntry(slug: string) {
  return registry.find((entry) => entry.metadata.slug === slug)
}

export function getFeatured() {
  return registry.filter((entry) => entry.metadata.featured)
}

export function getRecent(limit = 3) {
  return registry.slice(0, limit)
}

export function getAllTags() {
  const counts = new Map<string, number>()
  for (const entry of registry) {
    for (const tag of entry.metadata.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag)
}

export function getUsedCategories() {
  const used = new Set(registry.map((entry) => entry.metadata.category))
  return Object.entries(categoryLabel)
    .filter(([id]) => used.has(id as keyof typeof categoryLabel))
    .map(([id, label]) => ({ id, label }))
}

export function searchEntries(query: {
  q?: string
  category?: string
  tag?: string
}) {
  const needle = query.q?.trim().toLowerCase() ?? ''

  return registry.filter((entry) => {
    const { title, category, tags, description } = entry.metadata
    if (query.category && category !== query.category) return false
    if (query.tag && !tags.includes(query.tag)) return false
    if (!needle) return true

    const haystack = [title, categoryLabel[category], category, description, ...tags]
      .join(' ')
      .toLowerCase()
    return haystack.includes(needle)
  })
}
