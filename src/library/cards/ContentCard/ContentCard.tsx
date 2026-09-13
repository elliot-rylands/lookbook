type ContentCardProps = {
  compact?: boolean
}

export default function ContentCard({ compact = false }: ContentCardProps) {
  return (
    <article className="w-full max-w-sm border border-[#e5e5e5] bg-white text-[#111]">
      <div className={compact ? 'p-4' : 'p-5'}>
        <p className="text-xs text-[#737373]">Card</p>
        <h2 className="mt-2 text-base font-medium">Item title</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#525252]">
          One or two lines of body copy. No illustration required.
        </p>
        {!compact && <p className="mt-4 text-sm text-[#111]">Open →</p>}
      </div>
    </article>
  )
}
