export const categoryIds = [
  'navigation',
  'headers',
  'heroes',
  'cards',
  'forms',
  'search',
  'filters',
  'tables',
  'data-visualization',
  'dashboards',
  'booking',
  'commerce',
  'onboarding',
  'authentication',
  'healthcare',
  'empty-states',
  'modals',
  'mobile',
  'marketing',
  'experimental',
  'full-pages',
] as const

export type CategoryId = (typeof categoryIds)[number]

export type Category = {
  id: CategoryId
  label: string
}

export const categories: Category[] = [
  { id: 'navigation', label: 'Navigation' },
  { id: 'headers', label: 'Headers' },
  { id: 'heroes', label: 'Heroes' },
  { id: 'cards', label: 'Cards' },
  { id: 'forms', label: 'Forms' },
  { id: 'search', label: 'Search' },
  { id: 'filters', label: 'Filters' },
  { id: 'tables', label: 'Tables' },
  { id: 'data-visualization', label: 'Data Visualization' },
  { id: 'dashboards', label: 'Dashboards' },
  { id: 'booking', label: 'Booking' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'onboarding', label: 'Onboarding' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'empty-states', label: 'Empty States' },
  { id: 'modals', label: 'Modals' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'experimental', label: 'Experimental' },
  { id: 'full-pages', label: 'Full Pages' },
]

export const categoryLabel = Object.fromEntries(
  categories.map((category) => [category.id, category.label]),
) as Record<CategoryId, string>
