import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CanvasSwatches } from '@/components/lookbook/CanvasSwatches'
import { ExternalIcon, ArrowLeftIcon } from '@/components/lookbook/icons'
import { PreviewFrame } from '@/components/lookbook/PreviewFrame'
import { CANVAS_SWATCHES, type PreviewTheme, type ViewportId } from '@/components/lookbook/preview'
import { ThemeToggle } from '@/components/lookbook/ThemeToggle'
import { VariantSwitcher } from '@/components/lookbook/VariantSwitcher'
import { ViewportToggle } from '@/components/lookbook/ViewportToggle'
import { Tag } from '@/components/ui/Tag'
import { categoryLabel } from '@/data/categories'
import { formatDate, githubBlobUrl } from '@/lib/format'
import { getEntry } from '@/registry/query'
import type { ArchiveDefinition } from '@/registry/archive'

type ArchiveComponentPageProps = {
  archive: ArchiveDefinition
}

export function ArchiveComponentPage({ archive }: ArchiveComponentPageProps) {
  const { slug } = useParams()
  const entry = slug ? getEntry(archive.entries, slug) : undefined
  const variants = entry?.variants
  const [viewport, setViewport] = useState<ViewportId>('full')
  const [theme, setTheme] = useState<PreviewTheme>('light')
  const [canvas, setCanvas] = useState<string>(CANVAS_SWATCHES[0].value)
  const [variantId, setVariantId] = useState(variants?.[0]?.id ?? 'default')

  const preview = useMemo(() => {
    if (!entry) return null
    const variant = entry.variants?.find((item) => item.id === variantId)
    if (variant) return variant.render()
    const Component = entry.Component
    return <Component />
  }, [entry, variantId])

  const indexTo = archive.basePath || '/'

  if (!entry) {
    return (
      <main className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
        <p className="text-[18px] font-medium">Not in this archive.</p>
        <Link
          to={indexTo}
          className="mt-4 inline-flex items-center gap-2 text-[13px] text-lb-muted hover:text-lb-ink"
        >
          <ArrowLeftIcon /> Back
        </Link>
      </main>
    )
  }

  const { metadata, sourcePath } = entry
  const sourceHref = githubBlobUrl(sourcePath)

  return (
    <main className="mx-auto max-w-[1100px] px-5 pb-16 sm:px-8">
      <div className="py-6">
        <Link
          to={indexTo}
          className="inline-flex items-center gap-2 text-[13px] text-lb-muted hover:text-lb-ink"
        >
          <ArrowLeftIcon /> Index
        </Link>
      </div>

      <header className="max-w-2xl pb-8">
        <p className="lb-meta">
          {categoryLabel[metadata.category]}
          <span className="mx-2 text-lb-line">/</span>
          {formatDate(metadata.dateAdded)}
        </p>
        <h1 className="mt-2 text-[22px] font-medium tracking-tight">{metadata.title}</h1>
        <p className="mt-3 text-[14px] leading-relaxed text-lb-ink-soft">{metadata.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {metadata.tags.map((item) => (
            <Tag key={item} as="span">
              {item}
            </Tag>
          ))}
        </div>
      </header>

      <section className="border border-lb-line">
        <div className="flex flex-col gap-4 border-b border-lb-line px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <ViewportToggle value={viewport} onChange={setViewport} />
          <div className="flex flex-wrap items-center gap-4">
            {variants && variants.length > 0 && (
              <VariantSwitcher variants={variants} value={variantId} onChange={setVariantId} />
            )}
            <ThemeToggle value={theme} onChange={setTheme} />
            <CanvasSwatches value={canvas} onChange={setCanvas} />
          </div>
        </div>
        <PreviewFrame
          viewport={viewport}
          theme={theme}
          canvas={canvas}
          minHeight={480}
          className="min-h-[480px]"
          skin={archive.previewSkin}
        >
          {preview}
        </PreviewFrame>
      </section>

      <section className="mt-10 grid gap-8 border-t border-lb-line pt-8 md:grid-cols-2">
        <div>
          <p className="lb-meta">Notes</p>
          <p className="mt-2 text-[14px] leading-relaxed text-lb-ink-soft">
            {metadata.notes ?? 'No notes yet.'}
          </p>
        </div>
        <div>
          <p className="lb-meta">Source</p>
          <p className="mt-2 font-mono text-[12px] text-lb-ink-soft">{sourcePath}</p>
          <div className="mt-3 flex flex-wrap gap-5 text-[13px]">
            {sourceHref ? (
              <a
                href={sourceHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-lb-muted hover:text-lb-ink"
              >
                GitHub <ExternalIcon />
              </a>
            ) : (
              <span className="text-lb-muted">
                Set <code className="text-lb-ink">VITE_GITHUB_REPO</code> to link this path.
              </span>
            )}
            {metadata.figmaUrl && (
              <a
                href={metadata.figmaUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-lb-muted hover:text-lb-ink"
              >
                Figma <ExternalIcon />
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
