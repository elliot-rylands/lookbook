import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
      <p className="lb-meta">404</p>
      <h1 className="lb-display mt-2 text-[22px] leading-tight">Page not found.</h1>
      <Link to="/" className="mt-6 inline-block text-[13px] text-lb-muted hover:text-lb-ink">
        Back to index
      </Link>
    </main>
  )
}
