import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Opening Story',
  slug: 'opening-story',
  category: 'heroes',
  tags: ['hero', 'carousel', 'jane', 'portfolio', 'ehs'],
  description:
    'Portfolio hero from the 2024 Jane study: eyebrow, two-line title, overflow practitioner cards, progress, and prev/next.',
  dateAdded: '2026-09-13',
  featured: true,
  figmaUrl:
    'https://www.figma.com/design/w72QuEY2duBFrzBg5xI9mD/2024-Portfolio?node-id=2087-7119&m=dev',
  notes:
    'Frame 2087:7119 only. Local card/icon files from the Figma handoff — no invented photos or icons. TODO: Fields (commercial Medium, 60/72 title and 24/32 name) is unavailable — fallback is Source Serif 4 (Google Fonts, weight 500). Do not use Merriweather on this study. TODO: Proxima Nova (commercial Semibold 14/20 and Regular 16/24) is unavailable — fallback is Source Sans 3 (Google Fonts, 600/400). Do not use Inter on this study. Progress fill matches Figma at the default card (22px inset, 106×5 on a 173×5 track).',
}
