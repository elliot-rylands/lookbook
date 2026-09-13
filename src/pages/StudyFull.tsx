import { useEffect, type ComponentType } from 'react'
import { useParams } from 'react-router-dom'
import { getEntry } from '@/registry/components'

type FullProps = { fillViewport?: boolean }

export function StudyFull() {
  const { slug } = useParams()
  const entry = slug ? getEntry(slug) : undefined

  useEffect(() => {
    if (!entry) return
    const previousTitle = document.title
    document.title = entry.metadata.title
    const html = document.documentElement
    const body = document.body
    const previousHtmlOverflow = html.style.overflow
    const previousBodyOverflow = body.style.overflow
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    return () => {
      document.title = previousTitle
      html.style.overflow = previousHtmlOverflow
      body.style.overflow = previousBodyOverflow
    }
  }, [entry])

  if (!entry) {
    return (
      <div className="grid h-dvh w-dvw place-items-center bg-white text-[14px] text-neutral-600">
        Not in the archive.
      </div>
    )
  }

  const Component = entry.Component as ComponentType<FullProps>
  return <Component fillViewport />
}
