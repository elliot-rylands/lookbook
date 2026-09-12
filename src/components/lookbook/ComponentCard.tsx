import { Link } from 'react-router-dom'
import { PreviewFrame } from '@/components/lookbook/PreviewFrame'
import { Tag } from '@/components/ui/Tag'
import { categoryLabel } from '@/data/categories'
import { formatDate } from '@/lib/format'
import { cn } from '@/lib/cn'
import type { LibraryEntry } from '@/registry/types'

type ComponentCardProps = {
  entry: LibraryEntry
  layout?: 'grid' | 'list'
}

export function ComponentCard({ entry, layout = 'grid' }: ComponentCardProps) {
  const { metadata, Component } = entry
  const preview = (
    <PreviewFrame viewport="desktop" interactive={false} minHeight={220} cropHeight={220}>
      <Component />
    </PreviewFrame>
  )

  if (layout === 'list') {
    return (
      <Link
        to={`/components/${metadata.slug}`}
        className="group grid grid-cols-1 border-t border-lb-line py-6 md:grid-cols-[280px_1fr] md:gap-10"
      >
        <div className="overflow-hidden border border-lb-line bg-lb-paper-2">{preview}</div>
        <div className="mt-4 md:mt-0">
          <p className="lb-meta">
            {categoryLabel[metadata.category]}
            <span className="mx-2 text-lb-line">/</span>
            {formatDate(metadata.dateAdded)}
          </p>
          <h3 className="lb-display mt-2 text-[32px] leading-none tracking-tight group-hover:underline group-hover:decoration-lb-line group-hover:underline-offset-4">
            {metadata.title}
          </h3>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-lb-ink-soft">
            {metadata.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {metadata.tags.map((tag) => (
              <Tag key={tag} as="span">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/components/${metadata.slug}`} className={cn('group flex flex-col')}>
      <div className="overflow-hidden border border-lb-line bg-lb-paper-2">{preview}</div>
      <div className="pt-4">
        <p className="lb-meta">{categoryLabel[metadata.category]}</p>
        <h3 className="lb-display mt-1 text-[28px] leading-none tracking-tight group-hover:underline group-hover:decoration-lb-line group-hover:underline-offset-4">
          {metadata.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-lb-ink-soft">
          {metadata.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1">
          {metadata.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} as="span">
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </Link>
  )
}
