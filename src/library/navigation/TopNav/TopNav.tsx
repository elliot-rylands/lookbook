type TopNavProps = {
  compact?: boolean
}

const links = ['Home', 'Work', 'About']

export default function TopNav({ compact = false }: TopNavProps) {
  return (
    <header className="w-full border-b border-[#e5e5e5] bg-white px-4 py-3 text-[#111]">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">Site</span>
        <nav className="flex gap-4 text-sm text-[#525252]">
          {links.map((link) => (
            <span key={link}>{link}</span>
          ))}
        </nav>
        {!compact && (
          <span className="border border-[#e5e5e5] px-2 py-1 text-sm text-[#525252]">Sign in</span>
        )}
      </div>
    </header>
  )
}
