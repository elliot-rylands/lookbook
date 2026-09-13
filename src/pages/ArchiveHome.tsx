import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CategoryFilter } from '@/components/lookbook/CategoryFilter'
import { ComponentCard } from '@/components/lookbook/ComponentCard'
import { EmptyResults } from '@/components/lookbook/EmptyResults'
import { FeaturedBlock } from '@/components/lookbook/FeaturedBlock'
import { SearchField } from '@/components/lookbook/SearchField'
import { TagFilter } from '@/components/lookbook/TagFilter'
import { ViewModeToggle, type ViewMode } from '@/components/lookbook/ViewModeToggle'
import {
  getAllTags,
  getFeatured,
  getRecent,
  getUsedCategories,
  searchEntries,
} from '@/registry/query'
import type { ArchiveDefinition } from '@/registry/archive'

type ArchiveHomeProps = {
  archive: ArchiveDefinition
}

export function ArchiveHome({ archive }: ArchiveHomeProps) {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const category = params.get('category') ?? undefined
  const tag = params.get('tag') ?? undefined
  const view = (params.get('view') === 'list' ? 'list' : 'grid') as ViewMode
  const { entries, basePath, previewSkin } = archive

  const results = useMemo(
    () => searchEntries(entries, { q, category, tag }),
    [entries, q, category, tag],
  )
  const featured = getFeatured(entries)[0]
  const recent = getRecent(entries, 3).filter(
    (entry) => entry.metadata.slug !== featured?.metadata.slug,
  )
  const categories = getUsedCategories(entries)
  const tags = getAllTags(entries)
  const filtering = Boolean(q || category || tag)

  function patch(next: Record<string, string | undefined>) {
    const merged = new URLSearchParams(params)
    for (const [key, value] of Object.entries(next)) {
      if (value) merged.set(key, value)
      else merged.delete(key)
    }
    setParams(merged, { replace: true })
  }

  return (
    <main className="mx-auto max-w-[1100px] px-5 pb-8 sm:px-8">
      <section className="py-10 sm:py-12">
        <p className="lb-meta">{archive.eyebrow}</p>
        <h1 className="lb-display mt-2 text-[28px] leading-tight">
          {archive.title.filter(Boolean).join(' ')}
        </h1>
        <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-lb-ink-soft">{archive.intro}</p>
      </section>

      <section className="grid gap-8 border-t border-lb-line py-8 lg:grid-cols-[1fr_200px]">
        <SearchField value={q} onChange={(value) => patch({ q: value || undefined })} />
        <div className="flex items-end justify-between gap-4 lg:justify-end">
          <p className="text-[13px] text-lb-muted tabular-nums">
            {results.length} {results.length === 1 ? archive.singular : archive.noun}
          </p>
          <ViewModeToggle value={view} onChange={(mode) => patch({ view: mode })} />
        </div>
      </section>

      {(categories.length > 0 || tags.length > 0) && (
        <section className="grid gap-8 pb-8 md:grid-cols-2">
          <CategoryFilter
            categories={categories}
            value={category}
            onChange={(value) => patch({ category: value })}
          />
          <TagFilter tags={tags} value={tag} onChange={(value) => patch({ tag: value })} />
        </section>
      )}

      {!filtering && featured && (
        <section className="border-t border-lb-line py-10">
          <FeaturedBlock entry={featured} basePath={basePath} skin={previewSkin} />
        </section>
      )}

      {!filtering && recent.length > 0 && (
        <section className="border-t border-lb-line py-10">
          <p className="lb-meta">Recent</p>
          <div className="mt-4 grid gap-8 md:grid-cols-3">
            {recent.map((entry) => (
              <ComponentCard
                key={entry.metadata.slug}
                entry={entry}
                basePath={basePath}
                skin={previewSkin}
              />
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-lb-line py-10">
        <p className="lb-meta">{filtering ? 'Results' : `All ${archive.noun}`}</p>
        {results.length === 0 ? (
          <EmptyResults
            onClear={() => setParams({}, { replace: true })}
            emptyArchive={entries.length === 0 && !filtering}
            noun={archive.noun}
          />
        ) : view === 'list' ? (
          <div className="mt-4">
            {results.map((entry) => (
              <ComponentCard
                key={entry.metadata.slug}
                entry={entry}
                layout="list"
                basePath={basePath}
                skin={previewSkin}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {results.map((entry) => (
              <ComponentCard
                key={entry.metadata.slug}
                entry={entry}
                basePath={basePath}
                skin={previewSkin}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
