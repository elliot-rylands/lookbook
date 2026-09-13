import { useCallback, useId, useRef, useState, type KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'

type JaneTickSliderProps = {
  min?: number
  max?: number
  value?: number
  defaultValue?: number
  disabled?: boolean
  label?: string
  onValueChange?: (value: number) => void
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function snap(value: number, min: number, max: number) {
  return clamp(Math.round(value), min, max)
}

export default function JaneTickSlider({
  min = 1,
  max = 10,
  value: valueProp,
  defaultValue = 3,
  disabled = false,
  label = 'Number of full-time practitioners',
  onValueChange,
}: JaneTickSliderProps) {
  const id = useId()
  const trackRef = useRef<HTMLDivElement>(null)
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const [dragging, setDragging] = useState(false)
  const value = valueProp ?? uncontrolled
  const steps = Array.from({ length: max - min + 1 }, (_, index) => min + index)
  const percent = ((value - min) / (max - min)) * 100

  const commit = useCallback(
    (next: number) => {
      const snapped = snap(next, min, max)
      if (valueProp === undefined) setUncontrolled(snapped)
      onValueChange?.(snapped)
    },
    [max, min, onValueChange, valueProp],
  )

  const valueFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current
      if (!track) return value
      const rect = track.getBoundingClientRect()
      const ratio = rect.width === 0 ? 0 : (clientX - rect.left) / rect.width
      return min + ratio * (max - min)
    },
    [max, min, value],
  )

  function startDrag(clientX: number) {
    if (disabled) return
    setDragging(true)
    commit(valueFromClientX(clientX))

    const onMove = (event: PointerEvent) => {
      commit(valueFromClientX(event.clientX))
    }
    const onUp = () => {
      setDragging(false)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (disabled) return
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault()
      commit(value + 1)
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault()
      commit(value - 1)
    }
    if (event.key === 'Home') {
      event.preventDefault()
      commit(min)
    }
    if (event.key === 'End') {
      event.preventDefault()
      commit(max)
    }
  }

  return (
    <section className="flex min-h-[360px] w-full items-center justify-center bg-[#f4fafa] px-6 py-10 font-sans text-[#1a2a2b]">
      <div className="w-full max-w-[560px]">
        <div className="mb-6 flex items-end justify-between gap-4">
          <label htmlFor={id} className="text-[15px] font-medium tracking-[-0.01em]">
            {label}
          </label>
          <p className="text-[15px] tabular-nums text-[#0b6f74]">
            {value === max ? `${value}+` : value}
          </p>
        </div>

        <div
          id={id}
          ref={trackRef}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={value === max ? `${value}+ licenses` : `${value} licenses`}
          aria-disabled={disabled || undefined}
          aria-label={label}
          onPointerDown={(event) => {
            event.preventDefault()
            event.currentTarget.focus()
            startDrag(event.clientX)
          }}
          onKeyDown={onKeyDown}
          className={cn(
            'relative h-8 cursor-pointer touch-none select-none outline-none',
            disabled && 'cursor-not-allowed opacity-45',
          )}
        >
          <div className="absolute top-1/2 right-0 left-0 h-[6px] -translate-y-1/2 rounded-full bg-[#d7e4e5]" />
          <div
            className="absolute top-1/2 left-0 h-[6px] -translate-y-1/2 rounded-full bg-[#00C1CA]"
            style={{ width: `${percent}%` }}
          />

          {steps.map((step) => {
            const left = ((step - min) / (max - min)) * 100
            const filled = step <= value
            return (
              <span
                key={step}
                aria-hidden
                className={cn(
                  'absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full',
                  filled ? 'bg-[#007f86]' : 'bg-[#9bb6b8]',
                )}
                style={{ left: `${left}%` }}
              />
            )
          })}

          <div
            className={cn(
              'absolute top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[#00C1CA] shadow-[0_1px_4px_rgba(13,40,42,0.22)]',
              'transition-transform duration-150',
              !disabled && 'hover:scale-110',
              dragging && 'scale-110 ring-4 ring-[#00C1CA]/25',
            )}
            style={{ left: `${percent}%` }}
          />
        </div>

        <div className="relative mt-2 h-5">
          {steps.map((step) => {
            const left = ((step - min) / (max - min)) * 100
            const active = step === value
            return (
              <span
                key={step}
                className={cn(
                  'absolute -translate-x-1/2 text-[11px] tabular-nums',
                  active ? 'font-medium text-[#0b6f74]' : 'text-[#6b8082]',
                )}
                style={{ left: `${left}%` }}
              >
                {step === max ? `${step}+` : step}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
