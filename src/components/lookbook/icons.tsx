import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export function GridIcon(props: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden {...props}>
      <rect x="1" y="1" width="5" height="5" stroke="currentColor" />
      <rect x="8" y="1" width="5" height="5" stroke="currentColor" />
      <rect x="1" y="8" width="5" height="5" stroke="currentColor" />
      <rect x="8" y="8" width="5" height="5" stroke="currentColor" />
    </svg>
  )
}

export function ListIcon(props: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden {...props}>
      <path d="M1 3h12M1 7h12M1 11h12" stroke="currentColor" />
    </svg>
  )
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden {...props}>
      <path d="M6 2 1 7l5 5M1 7h12" stroke="currentColor" />
    </svg>
  )
}

export function ExternalIcon(props: IconProps) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden {...props}>
      <path d="M4 2h6v6M10 2 3 9" stroke="currentColor" />
    </svg>
  )
}
