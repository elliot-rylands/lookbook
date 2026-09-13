import ContentCard from './ContentCard'
import type { ComponentVariant } from '@/registry/types'

export const variants: ComponentVariant[] = [
  { id: 'default', label: 'Default', render: () => <ContentCard /> },
  { id: 'compact', label: 'Compact', render: () => <ContentCard compact /> },
]
