import { categoryLabel } from '@/data/categories'
import type { LibraryEntry } from '@/registry/types'

export function getEntry(entries: LibraryEntry[], slug: string) {
  return entries.find((entry) => entry.metadata.slug === slug)
}

export function getFeatured(entries: LibraryEntry[]) {
  return entries.filter((entry) => entry.metadata.featured)
}

export function getRecent(entries: LibraryEntry[], limit = 3) {
  return entries.slice(0, limit)
}

export function getAllTags(entries: LibraryEntry[]) {
  const counts = new Map<string, number>()
  for (const entry of entries) {
    for (const tag of entry.metadata.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag)
}

export function getUsedCategories(entries: LibraryEntry[]) {
  const used = new Set(entries.map((entry) => entry.metadata.category))
  return Object.entries(categoryLabel)
    .filter(([id]) => used.has(id as keyof typeof categoryLabel))
    .map(([id, label]) => ({ id, label }))
}

export function searchEntries(
  entries: LibraryEntry[],
  query: { q?: string; category?: string; tag?: string },
) {
  const needle = query.q?.trim().toLowerCase() ?? ''

  return entries.filter((entry) => {
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

export function sortEntries(entries: LibraryEntry[]) {
  return [...entries].sort((a, b) => {
    const byDate = b.metadata.dateAdded.localeCompare(a.metadata.dateAdded)
    if (byDate !== 0) return byDate
    return a.metadata.title.localeCompare(b.metadata.title)
  })
}
