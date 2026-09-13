import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Jane AI scribe',
  slug: 'jane-ai-scribe',
  category: 'healthcare',
  tags: ['jane', 'ai', 'scribe', 'chart', 'soap', 'billing', 'consent'],
  description:
    'Chart-aware Jane scribe for a Thursday initial: split notes, missing-field resolve, clinician asides, dual chart/patient output, low-confidence codes, and queue-in-Jane tasks. Decision tree — no model.',
  dateAdded: '2026-09-13',
  featured: true,
  fullscreenPath: '/full/jane-ai-scribe',
  notes:
    'Priya Shah initial with Alex Rahman at Harbour Physiotherapy — same clinic world as Jane AI nudges, different UI. Does not dump a SOAP from a fake transcript. Consent gates recording. Chart pull required before goals land in the note. Sister/cash aside never charts. ICD stays at symptom codes. TODO: Proxima Nova → Source Sans 3; Fields → Source Serif 4; do not use Inter or Merriweather on this study.',
}
