import LumenSearch from './LumenSearch'
import type { ComponentVariant } from '@/registry/types'

export const variants: ComponentVariant[] = [
  { id: 'results', label: 'With results', render: () => <LumenSearch populated /> },
  { id: 'empty', label: 'Empty query', render: () => <LumenSearch populated={false} /> },
]
