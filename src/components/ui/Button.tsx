import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
}

export function Button({ className, active, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-2.5 py-1 text-[13px] leading-none',
        'border border-lb-line bg-transparent text-lb-ink-soft',
        'hover:border-lb-ink hover:text-lb-ink',
        active && 'border-lb-ink bg-lb-ink text-lb-paper hover:border-lb-ink hover:text-lb-paper',
        'disabled:cursor-not-allowed disabled:opacity-40',
        className,
      )}
      {...props}
    />
  )
}
