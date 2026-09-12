import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type SpecimenProps = {
  children: ReactNode
  className?: string
}

export function Specimen({ children, className }: SpecimenProps) {
  return (
    <div className={cn('uu-preview min-h-[220px] bg-primary p-6 text-primary sm:p-8', className)}>
      {children}
    </div>
  )
}
