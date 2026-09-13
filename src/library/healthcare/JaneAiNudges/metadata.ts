import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Jane AI nudges',
  slug: 'jane-ai-nudges',
  category: 'healthcare',
  tags: ['jane', 'ai', 'nudges', 'suggestions', 'follow-up', 'cta', 'booking'],
  description:
    'Front-desk copilot for a Jane clinic: contextual nudges, ranked suggestions, follow-ups, and queue-in-Jane CTAs. Decision tree — no model.',
  dateAdded: '2026-09-13',
  featured: true,
  fullscreenPath: '/full/jane-ai-nudges',
  notes:
    'Implements Shape of AI patterns: Suggestions, Nudges, Follow up, Initial CTA. Harbour Physiotherapy Thursday board — reminders, no-shows, intake, practitioner wrap-up, then waitlist. Typed input is keyword-matched into the same tree. TODO: Proxima Nova → Source Sans 3; Fields → Source Serif 4; do not use Inter or Merriweather on this study.',
}
