type EmptyResultsProps = {
  onClear: () => void
  emptyArchive?: boolean
  noun: string
}

export function EmptyResults({ onClear, emptyArchive = false, noun }: EmptyResultsProps) {
  if (emptyArchive) {
    return (
      <div className="py-16">
        <p className="lb-display text-[22px] leading-tight text-lb-ink">No {noun} yet.</p>
        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-lb-muted">
          Nothing is registered. Add a folder under <code className="text-lb-ink">src/library/</code>{' '}
          with a component and <code className="text-lb-ink">metadata.ts</code> — the index picks it
          up. No placeholder cards.
        </p>
      </div>
    )
  }

  return (
    <div className="py-16">
      <p className="lb-display text-[22px] leading-tight text-lb-ink">No matches.</p>
      <p className="mt-3 max-w-md text-[13px] leading-relaxed text-lb-muted">
        Nothing matches this search or filter.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-4 text-[13px] text-lb-ink underline underline-offset-4"
      >
        Clear filters
      </button>
    </div>
  )
}
