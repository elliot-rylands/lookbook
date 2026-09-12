import { Header } from '@untitled-starter/components/marketing/header-navigation/header'
import { Specimen } from '@/tailwind/specimen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Marketing header',
  slug: 'marketing-header',
  category: 'headers',
  tags: ['untitled-ui', 'navigation', 'marketing', 'header'],
  description:
    'Starter marketing masthead with product menus, log in, and sign up. Untitled UI colour and type, isolated in the preview.',
  dateAdded: '2026-09-12',
  featured: true,
  notes:
    'vendor/.../components/marketing/header-navigation/header.tsx. Uses default nav items from the starter.',
}

export default function MarketingHeader() {
  return (
    <Specimen className="p-0">
      <Header />
    </Specimen>
  )
}
