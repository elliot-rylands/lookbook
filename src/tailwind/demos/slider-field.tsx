import { Slider } from '@untitled-starter/components/base/slider/slider'
import { Specimen } from '@/tailwind/specimen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Slider',
  slug: 'slider',
  category: 'forms',
  tags: ['untitled-ui', 'slider', 'form'],
  description: 'Starter slider with a formatted label.',
  dateAdded: '2026-09-06',
  notes: 'vendor/.../components/base/slider/slider.tsx',
}

export default function SliderField() {
  return (
    <Specimen>
      <div className="mx-auto max-w-md pt-4">
        <Slider labelFormatter={(value) => `${Math.round(value)}%`} defaultValue={40} />
      </div>
    </Specimen>
  )
}
