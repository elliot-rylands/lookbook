import { ProgressBar } from '@untitled-starter/components/base/progress-indicators/progress-indicators'
import { Specimen } from '@/tailwind/specimen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Progress',
  slug: 'progress',
  category: 'dashboards',
  tags: ['untitled-ui', 'progress', 'base'],
  description: 'Labelled progress bars from the starter indicators.',
  dateAdded: '2026-09-07',
  notes: 'vendor/.../components/base/progress-indicators/progress-indicators.tsx',
}

export default function Progress() {
  return (
    <Specimen>
      <div className="mx-auto grid max-w-md gap-6">
        <ProgressBar labelPosition="right" value={64} />
        <ProgressBar labelPosition="right" value={28} />
      </div>
    </Specimen>
  )
}
