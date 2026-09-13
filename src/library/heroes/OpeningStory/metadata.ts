import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Opening Story',
  slug: 'opening-story',
  category: 'heroes',
  tags: ['hero', 'carousel', 'jane', 'portfolio', 'ehs'],
  description:
    'Interactive Jane EHS hero carousel: photo-only cards until hover, y-gradient copy on hover, click or kit arrows to shift the row.',
  dateAdded: '2026-09-13',
  featured: true,
  fullscreenPath: '/full/opening-story',
  figmaUrl:
    'https://www.figma.com/design/w72QuEY2duBFrzBg5xI9mD/2024-Portfolio?node-id=2087-7119&m=dev',
  notes:
    'Frame 2087:7119 (1440×1008). Resting cards are photos only. Hover reveals a y-axis gradient and Figma copy (Michelle Jones is the only named card). Click a card or use the kit prev/next to shift the whole row. Keyboard: arrows / Home / End. Full-screen Pages route: /full/opening-story (alias /components/opening-story/full) — no lookbook chrome. Six handoff portraits plus six extra Pexels portraits under assets/ (card-7.jpg–card-12.jpg). Phone viewport is this frame scaled into 390px. TODO: Fields (commercial Medium) → Source Serif 4 500; do not use Merriweather. TODO: Proxima Nova → Source Sans 3 600/400; do not use Inter.',
}
