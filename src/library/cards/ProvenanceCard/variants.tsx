import ProvenanceCard from './ProvenanceCard'
import type { ComponentVariant } from '@/registry/types'

export const variants: ComponentVariant[] = [
  { id: 'caption', label: 'With caption', render: () => <ProvenanceCard /> },
  { id: 'compact', label: 'Compact', render: () => <ProvenanceCard compact /> },
]
