import { CANVAS_SWATCHES } from '@/components/lookbook/preview'
import { cn } from '@/lib/cn'

type CanvasSwatchesProps = {
  value: string
  onChange: (canvas: string) => void
}

export function CanvasSwatches({ value, onChange }: CanvasSwatchesProps) {
  return (
    <div className="flex items-center gap-2" role="group" aria-label="Canvas colour">
      <span className="lb-meta">Canvas</span>
      {CANVAS_SWATCHES.map((swatch) => (
        <button
          key={swatch.id}
          type="button"
          title={swatch.label}
          aria-label={swatch.label}
          onClick={() => onChange(swatch.value)}
          className={cn(
            'size-4 rounded-[2px] border',
            value === swatch.value ? 'border-lb-ink' : 'border-lb-line',
          )}
          style={{ background: swatch.value }}
        />
      ))}
    </div>
  )
}
