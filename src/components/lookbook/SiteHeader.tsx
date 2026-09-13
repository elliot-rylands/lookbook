import { Link, useLocation } from 'react-router-dom'
import { archiveFromPath } from '@/registry/archives'
import { cn } from '@/lib/cn'

export function SiteHeader() {
  const { pathname } = useLocation()
  const archive = archiveFromPath(pathname)
  const onTailwind = pathname === '/tailwind' || pathname.startsWith('/tailwind/')

  return (
    <header className="border-b border-lb-line">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4 sm:px-8">
        <Link to={archive.basePath || '/'} className="lb-display text-[18px] leading-none">
          {archive.label}
        </Link>
        <nav className="flex items-center gap-5 text-[13px] text-lb-muted">
          <div className="flex items-center gap-3">
            <Link to="/" className={cn(onTailwind ? 'hover:text-lb-ink' : 'text-lb-ink')}>
              Lookbook
            </Link>
            <span className="text-lb-line">/</span>
            <Link to="/tailwind" className={cn(onTailwind ? 'text-lb-ink' : 'hover:text-lb-ink')}>
              Tailwind
            </Link>
          </div>
          <span className="tabular-nums">
            {archive.entries.length} {archive.noun}
          </span>
        </nav>
      </div>
    </header>
  )
}
