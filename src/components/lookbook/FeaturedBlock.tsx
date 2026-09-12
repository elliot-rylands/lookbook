import { Link } from 'react-router-dom'
import { PreviewFrame } from '@/components/lookbook/PreviewFrame'
import { categoryLabel } from '@/data/categories'
import type { LibraryEntry } from '@/registry/types'

type FeaturedBlockProps = {
  entry: LibraryEntry
}

export function FeaturedBlock({ entry }: FeaturedBlockProps) {
  const { metadata, Component } = entry

  return (
    <Link to={`/components/${metadata.slug}`} className="group block">
      <div className="overflow-hidden border border-lb-line">
        <PreviewFrame viewport="desktop" interactive={false} minHeight={380} cropHeight={420}>
          <Component />
        </PreviewFrame>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="lb-meta">Featured · {categoryLabel[metadata.category]}</p>
          <h3 className="lb-display mt-2 text-[40px] leading-none tracking-tight sm:text-[48px]">
            {metadata.title}
          </h3>
        </div>
        <p className="max-w-md text-[15px] leading-relaxed text-lb-ink-soft">{metadata.description}</p>
      </div>
    </Link>
  )
}
