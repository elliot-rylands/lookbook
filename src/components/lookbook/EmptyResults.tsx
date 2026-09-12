type EmptyResultsProps = {
  onClear: () => void
}

export function EmptyResults({ onClear }: EmptyResultsProps) {
  return (
    <div className="border-t border-lb-line py-20">
      <p className="lb-display text-3xl text-lb-ink">Nothing in this cut.</p>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-lb-muted">
        No studies match the current search or filters. Try another category, or clear the query
        and start from the full archive.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 text-[13px] text-lb-ink underline decoration-lb-line underline-offset-4 hover:decoration-lb-ink"
      >
        Clear filters
      </button>
    </div>
  )
}
