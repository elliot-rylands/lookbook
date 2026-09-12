import { NativeSelect } from '@untitled-starter/components/base/select/select-native'
import { Specimen } from '@/tailwind/specimen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Native select',
  slug: 'native-select',
  category: 'forms',
  tags: ['untitled-ui', 'select', 'form'],
  description: 'Starter native select with label and hint — no combobox overlay.',
  dateAdded: '2026-09-10',
  notes: 'vendor/.../components/base/select/select-native.tsx',
}

export default function NativeSelectDemo() {
  return (
    <Specimen>
      <div className="mx-auto max-w-md">
        <NativeSelect
          label="Workspace"
          hint="Used on invoices."
          defaultValue="atelier"
          options={[
            { label: 'Atelier', value: 'atelier' },
            { label: 'Harbor', value: 'harbor' },
            { label: 'Cloister', value: 'cloister' },
          ]}
        />
      </div>
    </Specimen>
  )
}
