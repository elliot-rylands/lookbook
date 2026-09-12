import { DropdownButtonSimple } from '@untitled-starter/components/base/dropdown/dropdown-button-simple'
import { Specimen } from '@/tailwind/specimen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Dropdown',
  slug: 'dropdown',
  category: 'modals',
  tags: ['untitled-ui', 'dropdown', 'menu'],
  description: 'Starter account dropdown — the kit already ships this as a complete specimen.',
  dateAdded: '2026-09-06',
  notes: 'vendor/.../components/base/dropdown/dropdown-button-simple.tsx',
}

export default function DropdownSimple() {
  return (
    <Specimen className="min-h-[280px]">
      <DropdownButtonSimple />
    </Specimen>
  )
}
