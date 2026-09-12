import { Badge, BadgeWithDot } from '@untitled-starter/components/base/badges/badges'
import { Specimen } from '@/tailwind/specimen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Badges',
  slug: 'badges',
  category: 'cards',
  tags: ['untitled-ui', 'badge', 'status'],
  description: 'Filled badges and dot badges from the starter.',
  dateAdded: '2026-09-09',
  notes: 'vendor/.../components/base/badges/badges.tsx',
}

export default function Badges() {
  return (
    <Specimen>
      <div className="flex flex-wrap gap-2">
        <Badge type="pill-color" color="brand" size="md">
          Brand
        </Badge>
        <Badge type="pill-color" color="success" size="md">
          Success
        </Badge>
        <Badge type="pill-color" color="warning" size="md">
          Warning
        </Badge>
        <Badge type="pill-color" color="error" size="md">
          Error
        </Badge>
        <BadgeWithDot type="modern" color="gray" size="md">
          Review
        </BadgeWithDot>
      </div>
    </Specimen>
  )
}
