import { Link } from 'react-router-dom'
import { PreviewFrame, type PreviewSkin } from '@/components/lookbook/PreviewFrame'
import { categoryLabel } from '@/data/categories'
import type { LibraryEntry } from '@/registry/types'

type FeaturedBlockProps = {
  entry: LibraryEntry
  basePath?: string
  skin?: PreviewSkin
}

export function FeaturedBlock({ entry, basePath = '', skin = 'neutral' }: FeaturedBlockProps) {
  const { metadata, Component } = entry

  return (
    <Link to={`${basePath}/components/${metadata.slug}`} className="group block">
      <div className="overflow-hidden border border-lb-line">
        <PreviewFrame
          viewport="desktop"
          interactive={false}
          minHeight={380}
          cropHeight={420}
          skin={skin}
        >
          <Component />
        </PreviewFrame>
      </div>
      <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div>
          <p className="lb-meta">Featured · {categoryLabel[metadata.category]}</p>
          <h3 className="lb-display mt-1 text-[22px] leading-tight">{metadata.title}</h3>
        </div>
        <p className="max-w-md text-[13px] leading-relaxed text-lb-ink-soft">{metadata.description}</p>
      </div>
    </Link>
  )
}
