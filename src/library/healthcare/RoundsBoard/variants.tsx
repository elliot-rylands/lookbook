import RoundsBoard from './RoundsBoard'
import type { ComponentVariant } from '@/registry/types'

export const variants: ComponentVariant[] = [
  { id: 'night', label: 'Night', render: () => <RoundsBoard shift="night" /> },
  { id: 'day', label: 'Day', render: () => <RoundsBoard shift="day" /> },
]
