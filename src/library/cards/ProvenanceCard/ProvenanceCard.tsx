type ProvenanceCardProps = {
  compact?: boolean
}

export default function ProvenanceCard({ compact = false }: ProvenanceCardProps) {
  return (
    <article className="mx-auto w-full max-w-[340px] bg-[#f6f3ec] p-4 text-[#1f1c16]">
      <div
        className={compact ? 'relative h-[200px]' : 'relative h-[280px]'}
        style={{ background: '#d7cfc0' }}
      >
        <div className="absolute inset-8 rounded-full border border-[#8a7f6c]/50" />
        <div className="absolute inset-16 rounded-full bg-[#4b3d2e]" />
        <div className="absolute top-10 right-12 size-16 rounded-full bg-[#c45a2a]/80" />
      </div>
      <div className="mt-4 grid grid-cols-[1fr_auto] gap-4 border-t border-[#1f1c16] pt-3">
        <div>
          <p className="text-[10px] tracking-[0.18em] uppercase text-[#7a7366]">Acc. 1974.12.08</p>
          <h2
            className="mt-1 text-[22px] leading-tight"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Disc with Ember
          </h2>
          <p className="mt-1 text-[13px] text-[#5c564b]">Oil and wax on linen, 1974</p>
        </div>
        <p className="text-right text-[11px] leading-relaxed text-[#7a7366]">
          N. Varela
          <br />
          Lisbon
        </p>
      </div>
      {!compact && (
        <p className="mt-4 text-[12px] leading-relaxed text-[#5c564b]">
          Gift of the artist. First shown at the winter rooms, then held in private until the 2008
          inventory.
        </p>
      )}
    </article>
  )
}
