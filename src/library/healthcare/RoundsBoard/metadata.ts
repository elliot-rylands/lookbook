import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Rounds Board',
  slug: 'rounds-board',
  category: 'healthcare',
  tags: ['clinical', 'night', 'ward', 'status'],
  description:
    'A night-rounds strip for Ward B. Beds, not KPIs. Sage and stone instead of traffic-light dashboards.',
  dateAdded: '2026-09-08',
  notes:
    'Day and night variants change the field colour only. Status language stays clinical: stable, review, new. Do not add sparkline widgets or a greeting header.',
}
