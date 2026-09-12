export function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00`))
}

export function githubBlobUrl(sourcePath: string) {
  const repo = import.meta.env.VITE_GITHUB_REPO as string | undefined
  if (!repo) return undefined
  const branch = (import.meta.env.VITE_GITHUB_BRANCH as string | undefined) || 'main'
  return `https://github.com/${repo}/blob/${branch}/${sourcePath}`
}
