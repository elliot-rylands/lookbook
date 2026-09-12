import { Tag } from '@/components/ui/Tag'

type CategoryOption = { id: string; label: string }

type CategoryFilterProps = {
  categories: CategoryOption[]
  value?: string
  onChange: (category?: string) => void
}

export function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <div>
      <p className="lb-meta mb-2">Category</p>
      <div className="flex flex-wrap gap-x-1 gap-y-1">
        <Tag active={!value} onClick={() => onChange(undefined)}>
          All
        </Tag>
        {categories.map((category) => (
          <Tag
            key={category.id}
            active={value === category.id}
            onClick={() => onChange(value === category.id ? undefined : category.id)}
          >
            {category.label}
          </Tag>
        ))}
      </div>
    </div>
  )
}
