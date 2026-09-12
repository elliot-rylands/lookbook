import { PaginationPageDefault } from '@untitled-starter/components/application/pagination/pagination'
import { Specimen } from '@/tailwind/specimen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Pagination',
  slug: 'pagination',
  category: 'tables',
  tags: ['untitled-ui', 'pagination', 'table'],
  description: 'Default page pagination from the starter.',
  dateAdded: '2026-09-07',
  notes: 'vendor/.../components/application/pagination/pagination.tsx',
}

export default function PaginationBar() {
  return (
    <Specimen>
      <PaginationPageDefault page={2} total={8} />
    </Specimen>
  )
}
