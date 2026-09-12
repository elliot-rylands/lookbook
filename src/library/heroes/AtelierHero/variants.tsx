import AtelierHero from './AtelierHero'
import type { ComponentVariant } from '@/registry/types'

export const variants: ComponentVariant[] = [
  { id: 'ink', label: 'Ink', render: () => <AtelierHero tone="ink" /> },
  { id: 'plaster', label: 'Plaster', render: () => <AtelierHero tone="plaster" /> },
]
