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
} from '@/registry/components'

export function Home() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const category = params.get('category') ?? undefined
  const tag = params.get('tag') ?? undefined
  const view = (params.get('view') === 'list' ? 'list' : 'grid') as ViewMode

  const results = useMemo(() => searchEntries({ q, category, tag }), [q, category, tag])
  const featured = getFeatured()[0]
  const recent = getRecent(3).filter((entry) => entry.metadata.slug !== featured?.metadata.slug)
  const categories = getUsedCategories()
  const tags = getAllTags()
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
    <main className="mx-auto max-w-[1280px] px-5 pb-8 sm:px-8">
      <section className="border-b border-lb-line py-14 sm:py-20">
        <p className="lb-meta">Living archive</p>
        <h1 className="lb-display mt-4 max-w-4xl text-[52px] leading-[0.92] tracking-[-0.02em] sm:text-[80px]">
          Interface
          <br />
          studies
        </h1>
        <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-lb-ink-soft sm:text-[17px]">
          Collected fragments — navigation, booking, healthcare, and experiments. Not a design
          system. A reference you can open, inspect, and steal from.
        </p>
      </section>

      <section className="grid gap-10 border-b border-lb-line py-10 lg:grid-cols-[1fr_220px]">
        <SearchField value={q} onChange={(value) => patch({ q: value || undefined })} />
        <div className="flex items-end justify-between gap-4 lg:justify-end">
          <p className="text-[13px] text-lb-muted tabular-nums">
            {results.length} {results.length === 1 ? 'study' : 'studies'}
          </p>
          <ViewModeToggle value={view} onChange={(mode) => patch({ view: mode })} />
        </div>
      </section>

      <section className="grid gap-8 py-8 md:grid-cols-2">
        <CategoryFilter
          categories={categories}
          value={category}
          onChange={(value) => patch({ category: value })}
        />
        <TagFilter tags={tags} value={tag} onChange={(value) => patch({ tag: value })} />
      </section>

      {!filtering && featured && (
        <section className="border-t border-lb-line py-12">
          <FeaturedBlock entry={featured} />
        </section>
      )}

      {!filtering && recent.length > 0 && (
        <section className="border-t border-lb-line py-12">
          <p className="lb-meta">Recently added</p>
          <div className="mt-6 grid gap-10 md:grid-cols-3">
            {recent.map((entry) => (
              <ComponentCard key={entry.metadata.slug} entry={entry} />
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-lb-line py-12">
        <p className="lb-meta">{filtering ? 'Results' : 'All studies'}</p>
        {results.length === 0 ? (
          <EmptyResults onClear={() => setParams({}, { replace: true })} />
        ) : view === 'list' ? (
          <div className="mt-4">
            {results.map((entry) => (
              <ComponentCard key={entry.metadata.slug} entry={entry} layout="list" />
            ))}
          </div>
        ) : (
          <div className="mt-6 grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {results.map((entry) => (
              <ComponentCard key={entry.metadata.slug} entry={entry} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
