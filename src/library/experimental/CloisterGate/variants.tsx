import CloisterGate from './CloisterGate'
import type { ComponentVariant } from '@/registry/types'

export const variants: ComponentVariant[] = [
  { id: 'enter', label: 'Enter', render: () => <CloisterGate mode="enter" /> },
  { id: 'request', label: 'Request access', render: () => <CloisterGate mode="request" /> },
]
