export const VIEWPORTS = {
  full: { id: 'full', label: 'Full', width: null },
  desktop: { id: 'desktop', label: 'Desktop', width: 1280 },
  tablet: { id: 'tablet', label: 'Tablet', width: 768 },
  phone: { id: 'phone', label: 'Phone', width: 390 },
} as const

export type ViewportId = keyof typeof VIEWPORTS
export type PreviewTheme = 'light' | 'dark'

export const CANVAS_SWATCHES = [
  { id: 'white', label: 'White', value: '#ffffff' },
  { id: 'gray', label: 'Gray', value: '#f5f5f5' },
  { id: 'line', label: 'Line', value: '#e5e5e5' },
  { id: 'muted', label: 'Muted', value: '#d4d4d4' },
  { id: 'ink', label: 'Ink', value: '#111111' },
] as const
