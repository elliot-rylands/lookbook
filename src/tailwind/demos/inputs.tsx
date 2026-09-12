import { SearchLg } from '@untitledui/icons'
import { Input } from '@untitled-starter/components/base/input/input'
import { Specimen } from '@/tailwind/specimen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Inputs',
  slug: 'inputs',
  category: 'forms',
  tags: ['untitled-ui', 'input', 'form'],
  description: 'Labelled text fields with hint and a search icon — starter Input.',
  dateAdded: '2026-09-11',
  notes: 'vendor/.../components/base/input/input.tsx',
}

export default function Inputs() {
  return (
    <Specimen>
      <div className="mx-auto grid max-w-md gap-5">
        <Input label="Email" placeholder="you@studio.com" hint="We’ll only write when it matters." />
        <Input label="Search" placeholder="Find a component" icon={SearchLg} />
      </div>
    </Specimen>
  )
}
