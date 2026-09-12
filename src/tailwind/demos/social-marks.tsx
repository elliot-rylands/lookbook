import { Apple, Facebook, GitHub, Google, LinkedIn } from '@untitled-starter/components/foundations/social-icons'
import { Specimen } from '@/tailwind/specimen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Social marks',
  slug: 'social-marks',
  category: 'marketing',
  tags: ['untitled-ui', 'icons', 'social'],
  description: 'Foundation social marks from the starter — not lookbook chrome.',
  dateAdded: '2026-09-05',
  notes: 'vendor/.../components/foundations/social-icons',
}

export default function SocialMarks() {
  return (
    <Specimen>
      <div className="flex flex-wrap items-center gap-5 text-fg-quaternary">
        <Google className="size-6" />
        <Apple className="size-6" />
        <GitHub className="size-6" />
        <Facebook className="size-6" />
        <LinkedIn className="size-6" />
      </div>
    </Specimen>
  )
}
