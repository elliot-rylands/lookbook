import MastheadNav from './MastheadNav'
import type { ComponentVariant } from '@/registry/types'

export const variants: ComponentVariant[] = [
  { id: 'full', label: 'Edition', render: () => <MastheadNav /> },
  { id: 'compact', label: 'Compact', render: () => <MastheadNav compact /> },
]
