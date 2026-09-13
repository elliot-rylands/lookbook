import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Jane Tick Slider',
  slug: 'jane-tick-slider',
  category: 'filters',
  tags: ['slider', 'jane', 'ticks', 'drag', 'snap'],
  description:
    'Discrete license slider: drag and snap to ticks, with hover, active, and disabled states.',
  dateAdded: '2026-09-13',
  figmaUrl:
    'https://www.figma.com/design/2kpKH983ygaUVviqlMzYe4/Jane-Homepage-Workshop?node-id=126-12360&m=dev',
  notes:
    'Figma MCP was not available in this environment (file also needs auth). Interactions follow the request: drag, snap, labels, ticks, hover/active/disabled. Colours use Jane Blue #00C1CA from jane.app/legal/brand-guideline. TODO: Jane uses Proxima Nova (commercial) — fallback is Inter / system-ui. Re-inspect node 126:12360 when Figma is connected and correct measurements.',
}
