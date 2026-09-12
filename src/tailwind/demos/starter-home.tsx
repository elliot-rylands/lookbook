import { HomeScreen } from '@untitled-starter/app/home-screen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Starter home',
  slug: 'starter-home',
  category: 'full-pages',
  tags: ['untitled-ui', 'tailwind', 'starter', 'home'],
  description:
    'The Untitled UI Next.js starter landing — logo, command, and three text links. Featured so the kit’s own voice shows first.',
  dateAdded: '2026-09-12',
  featured: true,
  notes:
    'Imported from vendor/untitledui-nextjs-starter-kit/src/app/home-screen.tsx. Do not flatten that file into src/library/.',
}

export default function StarterHome() {
  return (
    <div className="uu-preview min-h-[480px] bg-primary text-primary">
      <HomeScreen />
    </div>
  )
}
