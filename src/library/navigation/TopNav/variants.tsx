import TopNav from './TopNav'
import type { ComponentVariant } from '@/registry/types'

export const variants: ComponentVariant[] = [
  { id: 'default', label: 'Default', render: () => <TopNav /> },
  { id: 'compact', label: 'Compact', render: () => <TopNav compact /> },
]
