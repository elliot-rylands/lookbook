import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Opening Story',
  slug: 'opening-story',
  category: 'heroes',
  tags: ['hero', 'carousel', 'jane', 'portfolio', 'ehs'],
  description:
    'Interactive Jane EHS hero carousel: overflow portraits, featured overlay, progress, prev/next, click-to-feature, and arrow keys.',
  dateAdded: '2026-09-13',
  featured: true,
  figmaUrl:
    'https://www.figma.com/design/w72QuEY2duBFrzBg5xI9mD/2024-Portfolio?node-id=2087-7119&m=dev',
  notes:
    'Frame 2087:7119 (1440×1008). Six handoff portraits plus six extra Pexels portraits committed under assets/ (card-7.jpg–card-12.jpg). Only Michelle Jones is named — no invented staff directory. Keyboard: arrows / Home / End. Progress track is clickable and follows the featured card. Phone viewport is this frame scaled into 390px. TODO: Fields (commercial Medium) → Source Serif 4 500; do not use Merriweather. TODO: Proxima Nova → Source Sans 3 600/400; do not use Inter.',
}
