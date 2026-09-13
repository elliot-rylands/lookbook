type EmptyResultsProps = {
  onClear: () => void
}

export function EmptyResults({ onClear }: EmptyResultsProps) {
  return (
    <div className="py-16">
      <p className="text-[15px] font-medium text-lb-ink">No matches.</p>
      <p className="mt-2 max-w-md text-[13px] leading-relaxed text-lb-muted">
        Nothing matches this search or filter. Clear it to see the full list.
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
