import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Copy Button',
  slug: 'copy-button',
  category: 'experimental',
  tags: ['motion', 'button', 'clipboard', 'animation'],
  description:
    'Copy-to-clipboard control with a blurred icon swap and a self-drawing check. Recreated from Motion’s Vue example in React.',
  dateAdded: '2026-09-13',
  featured: true,
  notes:
    'Source: https://motion.dev/examples/vue-copy-button — icon swap via AnimatePresence (popLayout), blur(4px) ↔ blur(0px), button scale springs, check pathLength 0→1. Vue used whilePress; this study uses whileTap. Copies the Motion URL, then resets after 2s.',
}
