import { registry } from '@/registry/components'
import { tailwindRegistry } from '@/registry/tailwind'
import type { ArchiveDefinition, ArchiveId } from '@/registry/archive'

export const archives: Record<ArchiveId, ArchiveDefinition> = {
  lookbook: {
    id: 'lookbook',
    label: 'Lookbook',
    basePath: '',
    noun: 'studies',
    singular: 'study',
    eyebrow: 'Living archive',
    title: ['Interface', 'studies'],
    intro:
      'Collected fragments — navigation, booking, healthcare, and experiments. Not a design system. A reference you can open, inspect, and steal from.',
    entries: registry,
    previewSkin: 'neutral',
  },
  tailwind: {
    id: 'tailwind',
    label: 'Tailwind',
    basePath: '/tailwind',
    noun: 'components',
    singular: 'component',
    eyebrow: 'Untitled UI · starter kit',
    title: ['Tailwind', 'archive'],
    intro:
      'The Untitled UI Next.js starter, registered as a parallel archive. Same chrome. Their colour, type, and radius stay inside the preview.',
    entries: tailwindRegistry,
    previewSkin: 'untitled',
  },
}

export function archiveFromPath(pathname: string): ArchiveDefinition {
  return pathname === '/tailwind' || pathname.startsWith('/tailwind/')
    ? archives.tailwind
    : archives.lookbook
}
