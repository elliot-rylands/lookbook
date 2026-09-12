import { GridIcon, ListIcon } from '@/components/lookbook/icons'
import { Button } from '@/components/ui/Button'

export type ViewMode = 'grid' | 'list'

type ViewModeToggleProps = {
  value: ViewMode
  onChange: (mode: ViewMode) => void
}

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  return (
    <div className="flex gap-1" role="group" aria-label="Layout">
      <Button active={value === 'grid'} onClick={() => onChange('grid')} aria-label="Grid">
        <GridIcon />
      </Button>
      <Button active={value === 'list'} onClick={() => onChange('list')} aria-label="List">
        <ListIcon />
      </Button>
    </div>
  )
}
