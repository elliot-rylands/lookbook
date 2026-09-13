import JaneTickSlider from './JaneTickSlider'
import type { ComponentVariant } from '@/registry/types'

export const variants: ComponentVariant[] = [
  { id: 'default', label: 'Default', render: () => <JaneTickSlider /> },
  { id: 'start', label: 'At 1', render: () => <JaneTickSlider defaultValue={1} /> },
  { id: 'disabled', label: 'Disabled', render: () => <JaneTickSlider disabled defaultValue={6} /> },
]
