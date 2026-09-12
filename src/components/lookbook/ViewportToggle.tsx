import { Button } from '@/components/ui/Button'
import { VIEWPORTS, type ViewportId } from '@/components/lookbook/preview'

type ViewportToggleProps = {
  value: ViewportId
  onChange: (viewport: ViewportId) => void
}

export function ViewportToggle({ value, onChange }: ViewportToggleProps) {
  return (
    <div className="flex flex-wrap gap-1" role="group" aria-label="Preview width">
      {(Object.keys(VIEWPORTS) as ViewportId[]).map((id) => (
        <Button key={id} active={value === id} onClick={() => onChange(id)}>
          {VIEWPORTS[id].label}
        </Button>
      ))}
    </div>
  )
}
