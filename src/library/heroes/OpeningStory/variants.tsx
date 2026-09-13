import OpeningStory from './OpeningStory'
import type { ComponentVariant } from '@/registry/types'

export const variants: ComponentVariant[] = [
  { id: 'default', label: 'Default', render: () => <OpeningStory /> },
]
