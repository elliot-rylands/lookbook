import SolsticeStay from './SolsticeStay'
import type { ComponentVariant } from '@/registry/types'

export const variants: ComponentVariant[] = [
  { id: 'room', label: 'Room', render: () => <SolsticeStay mode="room" /> },
  { id: 'treatment', label: 'Treatment', render: () => <SolsticeStay mode="treatment" /> },
]
