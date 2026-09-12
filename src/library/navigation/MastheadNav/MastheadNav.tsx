type MastheadNavProps = {
  compact?: boolean
}

const sections = ['Politics', 'Markets', 'Culture', 'Science', 'Letters']

export default function MastheadNav({ compact = false }: MastheadNavProps) {
  if (compact) {
    return (
      <header className="w-full border-b border-[#1a1812] bg-[#f3ead8] px-5 py-3 text-[#1a1812]">
        <div className="flex items-center justify-between gap-4">
          <p
            className="text-[20px] leading-none"
            style={{ fontFamily: 'Didot, "Bodoni MT", "Times New Roman", serif' }}
          >
            Field Notes
          </p>
          <nav className="hidden gap-4 text-[11px] tracking-[0.12em] uppercase sm:flex">
            {sections.map((section) => (
              <span key={section}>{section}</span>
            ))}
          </nav>
          <span className="text-[10px] tracking-[0.18em] uppercase text-[#6e6758]">12 Sep</span>
        </div>
      </header>
    )
  }

  return (
    <header className="w-full bg-[#f3ead8] px-5 py-6 text-[#1a1812] sm:px-10">
      <div className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-[#6e6758]">
        <span>Vol. XIV — No. 08</span>
        <span className="hidden sm:inline">Saturday, 12 September</span>
        <span>City Edition</span>
      </div>
      <div className="mt-4 border-y border-[#1a1812] py-4 text-center">
        <p className="text-[10px] tracking-[0.42em] uppercase">The Evening Index</p>
        <h1
          className="mt-1 text-[40px] leading-none tracking-[-0.03em] sm:text-[56px]"
          style={{ fontFamily: 'Didot, "Bodoni MT", "Times New Roman", serif' }}
        >
          Field Notes
        </h1>
      </div>
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-4 text-[12px] tracking-[0.14em] uppercase">
        {sections.map((section) => (
          <span key={section} className="border-b border-transparent hover:border-[#1a1812]">
            {section}
          </span>
        ))}
      </nav>
    </header>
  )
}
