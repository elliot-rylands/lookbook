import { ArchiveComponentPage } from '@/pages/ArchiveComponentPage'
import { archives } from '@/registry/archives'

export function TailwindComponentPage() {
  return <ArchiveComponentPage archive={archives.tailwind} />
}
