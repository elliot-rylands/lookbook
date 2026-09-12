import { Checkbox } from '@untitled-starter/components/base/checkbox/checkbox'
import { RadioButton, RadioGroup } from '@untitled-starter/components/base/radio-buttons/radio-buttons'
import { Toggle } from '@untitled-starter/components/base/toggle/toggle'
import { Specimen } from '@/tailwind/specimen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Checks and toggles',
  slug: 'checks-toggles',
  category: 'forms',
  tags: ['untitled-ui', 'checkbox', 'toggle', 'radio'],
  description: 'Checkbox, toggle, and radio group from the starter base forms.',
  dateAdded: '2026-09-10',
  notes: 'vendor/.../checkbox, toggle, radio-buttons',
}

export default function ChecksToggles() {
  return (
    <Specimen>
      <div className="mx-auto grid max-w-sm gap-6">
        <Checkbox label="Keep me signed in" hint="On this browser only." defaultSelected />
        <Toggle label="Weekly digest" hint="Monday morning." defaultSelected />
        <RadioGroup defaultValue="room" aria-label="Stay type">
          <RadioButton value="room" label="Room" hint="Cedar, two guests." />
          <RadioButton value="treatment" label="Treatment" hint="Private bath." />
        </RadioGroup>
      </div>
    </Specimen>
  )
}
