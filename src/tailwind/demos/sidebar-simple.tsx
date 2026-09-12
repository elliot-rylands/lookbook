import { Home01, Settings01, Users01 } from '@untitledui/icons'
import { SidebarNavigationSimple } from '@untitled-starter/components/application/app-navigation/sidebar-navigation/sidebar-simple'
import { Specimen } from '@/tailwind/specimen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Sidebar simple',
  slug: 'sidebar-simple',
  category: 'navigation',
  tags: ['untitled-ui', 'sidebar', 'app', 'navigation'],
  description:
    'Application sidebar from the starter: logo, search, stacked nav, account card.',
  dateAdded: '2026-09-12',
  notes: 'vendor/.../sidebar-navigation/sidebar-simple.tsx',
}

export default function SidebarSimple() {
  return (
    <Specimen className="min-h-[420px] p-0">
      <div className="h-[420px]">
        <SidebarNavigationSimple
          activeUrl="/home"
          items={[
            { label: 'Home', href: '/home', icon: Home01 },
            { label: 'Team', href: '/team', icon: Users01 },
            { label: 'Settings', href: '/settings', icon: Settings01 },
          ]}
        />
      </div>
    </Specimen>
  )
}
