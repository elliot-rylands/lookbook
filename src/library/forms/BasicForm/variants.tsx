import BasicForm from './BasicForm'
import type { ComponentVariant } from '@/registry/types'

export const variants: ComponentVariant[] = [
  { id: 'default', label: 'Default', render: () => <BasicForm /> },
  { id: 'error', label: 'Error', render: () => <BasicForm error /> },
]
