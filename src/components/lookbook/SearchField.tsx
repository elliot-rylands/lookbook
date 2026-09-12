import { useEffect, useRef } from 'react'
import { Input } from '@/components/ui/Input'

type SearchFieldProps = {
  value: string
  onChange: (value: string) => void
}

export function SearchField({ value, onChange }: SearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return
      event.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <label className="block">
      <span className="lb-meta">Search</span>
      <Input
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Title, category, tags, description"
        type="search"
        autoComplete="off"
      />
    </label>
  )
}
