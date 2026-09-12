import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <main className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8">
      <p className="lb-meta">404</p>
      <h1 className="lb-display mt-4 text-[48px] leading-none">Page not in the archive.</h1>
      <Link
        to="/"
        className="mt-8 inline-block text-[13px] underline decoration-lb-line underline-offset-4 hover:decoration-lb-ink"
      >
        Return to the index
      </Link>
    </main>
  )
}
