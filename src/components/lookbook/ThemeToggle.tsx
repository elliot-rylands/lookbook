import { Button } from '@/components/ui/Button'
import type { PreviewTheme } from '@/components/lookbook/preview'

type ThemeToggleProps = {
  value: PreviewTheme
  onChange: (theme: PreviewTheme) => void
}

export function ThemeToggle({ value, onChange }: ThemeToggleProps) {
  return (
    <div className="flex gap-1" role="group" aria-label="Preview theme">
      <Button active={value === 'light'} onClick={() => onChange('light')}>
        Light
      </Button>
      <Button active={value === 'dark'} onClick={() => onChange('dark')}>
        Dark
      </Button>
    </div>
  )
}
