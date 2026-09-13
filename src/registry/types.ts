import type { ComponentType, ReactNode } from 'react'
import type { CategoryId } from '@/data/categories'

export type ComponentMetadata = {
  title: string
  slug: string
  category: CategoryId
  tags: string[]
  description: string
  figmaUrl?: string
  dateAdded: string
  featured?: boolean
  notes?: string
  fullscreenPath?: string
}

export type ComponentVariant = {
  id: string
  label: string
  render: () => ReactNode
}

export type LibraryEntry = {
  metadata: ComponentMetadata
  Component: ComponentType
  variants?: ComponentVariant[]
  sourcePath: string
}
