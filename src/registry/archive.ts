import type { LibraryEntry } from '@/registry/types'

export type ArchiveId = 'lookbook' | 'tailwind'

export type ArchiveDefinition = {
  id: ArchiveId
  label: string
  basePath: string
  noun: string
  singular: string
  eyebrow: string
  title: [string, string]
  intro: string
  entries: LibraryEntry[]
  previewSkin: 'neutral' | 'untitled'
}
