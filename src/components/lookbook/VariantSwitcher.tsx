import type { ComponentVariant } from '@/registry/types'
import { Button } from '@/components/ui/Button'

type VariantSwitcherProps = {
  variants: ComponentVariant[]
  value: string
  onChange: (id: string) => void
}

export function VariantSwitcher({ variants, value, onChange }: VariantSwitcherProps) {
  if (variants.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1" role="group" aria-label="Variants">
      {variants.map((variant) => (
        <Button
          key={variant.id}
          active={value === variant.id}
          onClick={() => onChange(variant.id)}
        >
          {variant.label}
        </Button>
      ))}
    </div>
  )
}
