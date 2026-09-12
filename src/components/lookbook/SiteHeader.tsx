import { Link, NavLink } from 'react-router-dom'
import { registry } from '@/registry/components'

export function SiteHeader() {
  return (
    <header className="border-b border-lb-line">
      <div className="mx-auto flex max-w-[1280px] items-baseline justify-between gap-6 px-5 py-5 sm:px-8">
        <Link to="/" className="group">
          <span className="lb-display text-[22px] leading-none tracking-tight">Lookbook</span>
          <span className="ml-3 hidden text-[12px] text-lb-muted sm:inline">
            Interface archive
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-[13px] text-lb-muted">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'text-lb-ink' : 'hover:text-lb-ink')}
            end
          >
            Index
          </NavLink>
          <span className="tabular-nums">{registry.length} studies</span>
        </nav>
      </div>
    </header>
  )
}
