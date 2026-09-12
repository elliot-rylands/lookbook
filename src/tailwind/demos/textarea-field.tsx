import { TextArea } from '@untitled-starter/components/base/textarea/textarea'
import { Specimen } from '@/tailwind/specimen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Textarea',
  slug: 'textarea',
  category: 'forms',
  tags: ['untitled-ui', 'textarea', 'form'],
  description: 'Starter textarea with label and hint.',
  dateAdded: '2026-09-05',
  notes: 'vendor/.../components/base/textarea/textarea.tsx',
}

export default function TextareaField() {
  return (
    <Specimen>
      <div className="mx-auto max-w-md">
        <TextArea
          label="Petition"
          hint="A sentence is enough."
          placeholder="Write a short note."
          rows={4}
        />
      </div>
    </Specimen>
  )
}
