import { Avatar } from '@untitled-starter/components/base/avatar/avatar'
import { AvatarLabelGroup } from '@untitled-starter/components/base/avatar/avatar-label-group'
import { Specimen } from '@/tailwind/specimen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Avatars',
  slug: 'avatars',
  category: 'cards',
  tags: ['untitled-ui', 'avatar', 'identity'],
  description: 'Initials, status, and a labelled group from the starter avatar set.',
  dateAdded: '2026-09-09',
  notes: 'vendor/.../components/base/avatar',
}

export default function Avatars() {
  return (
    <Specimen>
      <div className="flex flex-wrap items-center gap-6">
        <Avatar initials="ER" size="lg" status="online" />
        <Avatar initials="NS" size="lg" status="offline" />
        <AvatarLabelGroup size="md" title="N. Varela" subtitle="Lisbon · Collection" initials="NV" />
      </div>
    </Specimen>
  )
}
