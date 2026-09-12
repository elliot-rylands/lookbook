import { Tag } from '@/components/ui/Tag'

type TagFilterProps = {
  tags: string[]
  value?: string
  onChange: (tag?: string) => void
}

export function TagFilter({ tags, value, onChange }: TagFilterProps) {
  if (tags.length === 0) return null

  return (
    <div>
      <p className="lb-meta mb-2">Tags</p>
      <div className="flex flex-wrap gap-x-1 gap-y-1">
        {tags.map((tag) => (
          <Tag
            key={tag}
            active={value === tag}
            onClick={() => onChange(value === tag ? undefined : tag)}
          >
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  )
}
