# Agent notes

This repository is a **lookbook**: a public archive of interface studies. Readers expect a high-end editorial index (Layers / Mobbin / Linear), not Storybook and not a dashboard kit.

Open [`Lookbook.code-workspace`](./Lookbook.code-workspace) in Cursor (**File → Open Workspace from File**). The sidebar splits **Lookbook** and **Untitled UI**. Keep them separate — see `.cursor/rules/archives.mdc`.

## Non-negotiables

- Keep lookbook chrome (`src/components/ui`, `src/components/lookbook`, `--color-lb-*`) independent of any study.
- Do not force library experiments to share one visual language.
- Do not add a second component library to the shell. No shadcn unless a single primitive is unavoidable.
- Do not add auth, a database, or extra services.
- Do not run `npx untitledui@latest init`.
- Do not copy or flatten Untitled UI into `src/library/`.
- Do not vendor Untitled UI React **PRO** files. The OSS repo and starter kit are MIT; PRO is separately licensed.
- Tailwind archive lives at `/tailwind`. Demos go in `src/tailwind/demos/` and import from `@untitled-starter`. Untitled UI aesthetics stay inside `PreviewFrame`.
- Never illegally copy or embed commercial font files. Identify the font, TODO it, use the closest legal fallback.
- Ship GitHub **project** Pages (`https://elliot-rylands.github.io/lookbook/`, `BASE_PATH=/lookbook/`). Do not add a `CNAME` or assume `labs.elliotrylands.com` until the user has set that up.

## Adding a study from Figma

When the user says **“Add the selected Figma component to the lookbook”**:

1. Inspect the selection via the Figma MCP. Read auto-layout, spacing, fills, type styles, and effects. Do not invent measurements.
2. Preserve layout, spacing, colour, type size/weight, and hierarchy.
3. Identify fonts. Reuse tokens only where they already match. If a font is unavailable: name it in `notes`, add a TODO, pick the closest system or already-licensed fallback.
4. Extract or recreate icons as SVG. Do not screenshot icons.
5. Implement in React + Tailwind. Prefer flex, grid, and gap. Hardcoded `top` / `left` only when the original is explicitly absolute.
6. Make it responsive unless the study is a fixed device frame.
7. Create `src/library/<category>/<Name>/`:
   - `<Name>.tsx` — default export
   - `metadata.ts` — `title`, `slug`, `category`, `tags`, `description`, `dateAdded`, optional `figmaUrl`, `featured`, `notes`
   - `variants.tsx` — only if the file has real variants
8. Category must be an id from `src/data/categories.ts`. Add a new id there if the taxonomy must grow — do not invent a folder without a category id.
9. Registration is automatic (`import.meta.glob` in `src/registry/components.ts`). Do not hand-edit a nav list.
10. Verify on `/` (card + search + category/tag) and `/components/<slug>` (large preview, viewports, variants).
11. Run `npm run build` and fix failures.

## Adding a study by hand

Same folder contract as above. The filename must match the folder name.

## Untitled UI (reference only)

Canonical starter path: `vendor/untitledui-nextjs-starter-kit/` (submodule). Optional OSS repo: `vendor/untitled-ui/`.

```bash
git submodule add https://github.com/untitleduico/untitledui-nextjs-starter-kit.git vendor/untitledui-nextjs-starter-kit
git submodule update --init --recursive
```

Do not run `npx untitledui@latest init`. Tailwind demos import:

```ts
import { Button } from '@untitled-starter/components/base/buttons/button'
```

Drop `src/tailwind/demos/<slug>.tsx` (`metadata` + default). Glob registers it. Lookbook `@/` still means `src/`. Starter-internal `@/` resolves to the starter `src/`. Do not treat Untitled UI as the shell theme. Do not commit PRO sources.

## Preview isolation

Use `PreviewFrame` for every live preview. Studies set their own fonts and colours on the study root. Do not wrap studies in lookbook type tokens.

## Taste

Editorial, typography-led, spacious, muted chrome, strong previews. No generic dashboard templates, huge rounded cards, excessive gradients, or decorative animation.
