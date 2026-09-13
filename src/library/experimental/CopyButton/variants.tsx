import CopyButton from './CopyButton'
import type { ComponentVariant } from '@/registry/types'

export const variants: ComponentVariant[] = [
  { id: 'default', label: 'Default', render: () => <CopyButton /> },
  {
    id: 'link',
    label: 'Lookbook URL',
    render: () => <CopyButton text="https://elliot-rylands.github.io/lookbook/" />,
  },
]
