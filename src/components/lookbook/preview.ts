export const VIEWPORTS = {
  full: { id: 'full', label: 'Full', width: null },
  desktop: { id: 'desktop', label: 'Desktop', width: 1280 },
  tablet: { id: 'tablet', label: 'Tablet', width: 768 },
  phone: { id: 'phone', label: 'Phone', width: 390 },
} as const

export type ViewportId = keyof typeof VIEWPORTS
export type PreviewTheme = 'light' | 'dark'

export const CANVAS_SWATCHES = [
  { id: 'paper', label: 'Paper', value: '#f7f4ec' },
  { id: 'white', label: 'White', value: '#ffffff' },
  { id: 'stone', label: 'Stone', value: '#e4dfd4' },
  { id: 'studio', label: 'Studio', value: '#c9c4ba' },
  { id: 'ink', label: 'Ink', value: '#12110e' },
] as const
