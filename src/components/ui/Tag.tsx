import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type TagProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
  as?: 'button' | 'span'
}

export function Tag({ className, active, as = 'button', type = 'button', ...props }: TagProps) {
  const classes = cn(
    'inline-flex items-center px-2 py-0.5 text-[12px]',
    'border border-transparent text-lb-muted',
    as === 'button' && 'hover:text-lb-ink',
    active && 'border-lb-line text-lb-ink',
    className,
  )

  if (as === 'span') {
    return <span className={classes}>{props.children}</span>
  }

  return <button type={type} className={classes} {...props} />
}
