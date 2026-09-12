import { Button } from '@untitled-starter/components/base/buttons/button'
import { Specimen } from '@/tailwind/specimen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Buttons',
  slug: 'buttons',
  category: 'marketing',
  tags: ['untitled-ui', 'button', 'base'],
  description: 'Primary, secondary, and tertiary buttons from the starter base set.',
  dateAdded: '2026-09-11',
  notes: 'vendor/.../components/base/buttons/button.tsx',
}

export default function Buttons() {
  return (
    <Specimen>
      <div className="flex flex-wrap items-center gap-3">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="tertiary">Tertiary</Button>
        <Button color="primary-destructive">Delete</Button>
      </div>
    </Specimen>
  )
}
