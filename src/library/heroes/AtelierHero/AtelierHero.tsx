type AtelierHeroProps = {
  tone?: 'ink' | 'plaster'
}

export default function AtelierHero({ tone = 'ink' }: AtelierHeroProps) {
  const ink = tone === 'ink'
  return (
    <section
      className={
        ink
          ? 'relative min-h-[520px] overflow-hidden bg-[#12100c] text-[#efe7d6]'
          : 'relative min-h-[520px] overflow-hidden bg-[#efe8dc] text-[#1c1812]'
      }
    >
      <div className="flex min-h-[520px] flex-col justify-between px-6 py-8 sm:px-12 sm:py-10">
        <div className="flex items-baseline justify-between text-[11px] tracking-[0.22em] uppercase">
          <span>Atelier No. 4</span>
          <span>Autumn / 26</span>
        </div>
        <div className="relative mt-10 grid items-end gap-8 md:grid-cols-[1fr_220px]">
          <div>
            <p className="text-[12px] tracking-[0.2em] uppercase opacity-70">Look 07</p>
            <h1
              className="mt-2 text-[72px] leading-[0.85] tracking-[-0.04em] sm:text-[104px]"
              style={{ fontFamily: '"Times New Roman", Didot, serif' }}
            >
              Wool
              <br />
              <em className="italic">cut</em>
            </h1>
            <p className="mt-6 max-w-xs text-[14px] leading-relaxed opacity-70">
              Single-breasted overcoat. Horn buttons. Cut in Leeds, finished in Porto.
            </p>
            <p className="mt-6 text-[12px] tracking-[0.16em] uppercase underline decoration-current/30 underline-offset-4">
              View the collection
            </p>
          </div>
          <div
            className="h-[260px] w-full md:h-[320px]"
            style={{
              background: ink
                ? 'linear-gradient(180deg, #3a2a1c 0%, #6a4a2e 42%, #1a140e 100%)'
                : 'linear-gradient(180deg, #c9b49a 0%, #8c6d4d 48%, #3d2c1e 100%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
