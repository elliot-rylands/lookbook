import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type TagProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
  as?: 'button' | 'span'
}

export function Tag({ className, active, as = 'button', type = 'button', ...props }: TagProps) {
  const classes = cn(
    'inline-flex items-center rounded-[2px] px-2 py-1 text-[11px] tracking-[0.08em] uppercase',
    'border border-transparent text-lb-muted',
    as === 'button' && 'hover:text-lb-ink',
    active && 'border-lb-ink text-lb-ink',
    className,
  )

  if (as === 'span') {
    return <span className={classes}>{props.children}</span>
  }

  return <button type={type} className={classes} {...props} />
}
