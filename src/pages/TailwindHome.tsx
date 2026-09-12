import { ArchiveHome } from '@/pages/ArchiveHome'
import { archives } from '@/registry/archives'

export function TailwindHome() {
  return <ArchiveHome archive={archives.tailwind} />
}
