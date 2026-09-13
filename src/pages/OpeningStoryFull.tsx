import { useEffect } from 'react'
import OpeningStory from '@/library/heroes/OpeningStory/OpeningStory'

export function OpeningStoryFull() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Opening Story'
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
  }, [])

  return <OpeningStory fillViewport />
}
