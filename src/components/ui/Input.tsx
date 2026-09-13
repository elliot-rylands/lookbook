import type { InputHTMLAttributes, Ref } from 'react'
import { cn } from '@/lib/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>
}

export function Input({ className, ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full bg-transparent text-lb-ink placeholder:text-lb-muted',
        'border border-lb-line px-3 py-2 text-[14px] outline-none',
        'focus:border-lb-ink',
        className,
      )}
      {...props}
    />
  )
}
