import { Button } from '@untitled-starter/components/base/buttons/button'
import { EmptyState } from '@untitled-starter/components/application/empty-state/empty-state'
import { Specimen } from '@/tailwind/specimen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Empty files',
  slug: 'empty-files',
  category: 'empty-states',
  tags: ['untitled-ui', 'empty', 'application'],
  description: 'Starter empty state with featured icon, title, and a single action.',
  dateAdded: '2026-09-08',
  notes: 'vendor/.../components/application/empty-state/empty-state.tsx',
}

export default function EmptyFiles() {
  return (
    <Specimen className="flex items-center justify-center py-16">
      <EmptyState>
        <EmptyState.Header>
          <EmptyState.FeaturedIcon />
        </EmptyState.Header>
        <EmptyState.Content>
          <EmptyState.Title>No files yet</EmptyState.Title>
          <EmptyState.Description>Upload a study or pull one from the starter kit.</EmptyState.Description>
        </EmptyState.Content>
        <EmptyState.Footer>
          <Button color="primary">Upload</Button>
        </EmptyState.Footer>
      </EmptyState>
    </Specimen>
  )
}
