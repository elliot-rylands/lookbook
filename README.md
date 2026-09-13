# Lookbook

A public interface archive — studies you can open, preview, and copy from. Quiet chrome, isolated experiments. Not a design system, not Storybook.

## Run locally

```bash
npm install
npm run dev
```

Dev server: `http://127.0.0.1:43147` (bound to `0.0.0.0`).

```bash
npm run build
npm run preview
```

## Open in Cursor

Open [`Lookbook.code-workspace`](./Lookbook.code-workspace) via **File → Open Workspace from File**. The sidebar has two roots: **Lookbook** (this app — `src/library` and `src/tailwind` stay visible) and **Untitled UI** (the starter submodule). The starter is excluded from the Lookbook tree so it is not listed twice.


## Architecture

```
src/
  components/ui/          Lookbook chrome only (Button, Input, Tag)
  components/lookbook/    PreviewFrame, cards, filters, header
  library/
    <category>/<Name>/
      <Name>.tsx          Default export — the study
      metadata.ts         title, slug, category, tags, …
      variants.tsx        optional
  registry/components.ts  import.meta.glob — drop a folder, it appears
  data/categories.ts      Expandable list; unused categories stay quiet
  pages/Home.tsx
  pages/ComponentPage.tsx
  tailwind/demos/         Specimens that import the starter — not copies of it
  registry/tailwind.ts    glob of those demos
vendor/
  untitled-ui/            Untitled UI React OSS (optional submodule)
  untitledui-nextjs-starter-kit/   Starter kit (submodule) — Tailwind archive source
```

Routes: `/`, `/components/:slug`, `/tailwind`, `/tailwind/components/:slug`. GitHub Pages uses a copied `404.html` so those paths work as a SPA. Header switcher: Lookbook / Tailwind.

Each study is a real React component. Lookbook tokens (`--color-lb-*`, Inter for UI, Merriweather for headings) wrap the shell only — loaded from Google Fonts, not embedded files. Previews render inside `PreviewFrame` so chrome styles do not leak in. Untitled UI keeps its own type inside those frames.

### Metadata

```ts
{
  title: string
  slug: string
  category: CategoryId
  tags: string[]
  description: string
  figmaUrl?: string
  dateAdded: string // YYYY-MM-DD
  featured?: boolean
  notes?: string
}
```

## Add a component manually

1. Pick a category folder under `src/library/` (or create one matching an id in `src/data/categories.ts`).
2. Add `src/library/<category>/<ComponentName>/ComponentName.tsx` (default export).
3. Add `metadata.ts` exporting `metadata`.
4. Optionally add `variants.tsx` exporting `variants`.
5. Reload — the glob registry picks it up. No nav file to edit.

Folder name and component filename must match.

## Add a component from Figma (Cursor / Claude)

When the prompt is “Add the selected Figma component to the lookbook”:

1. Inspect the selection with the Figma MCP (do not guess spacing from a screenshot).
2. Preserve layout, spacing, colour, type, and hierarchy.
3. Identify fonts. Reuse lookbook or study tokens where they already match. If a font is unavailable, name it, leave a TODO, and use the closest legal fallback — never copy or embed commercial font files.
4. Recreate icons as SVG. Prefer flex/grid over hardcoded `top`/`left` unless the study is explicitly absolute.
5. Implement in React + Tailwind in a new `src/library/<category>/<Name>/` folder.
6. Write `metadata.ts` (correct category, tags, description, optional `figmaUrl` and `notes`).
7. Register by existing (glob). Confirm it on `/` and `/components/<slug>`.
8. Run `npm run build` and fix errors.

Full agent notes: [AGENTS.md](./AGENTS.md).

## Tailwind archive (Untitled UI starter)

A parallel archive at `/tailwind` and `/tailwind/components/:slug`. Same chrome. Untitled UI colour and type stay inside `PreviewFrame`.

Source: [untitledui-nextjs-starter-kit](https://github.com/untitleduico/untitledui-nextjs-starter-kit) as a git submodule at `vendor/untitledui-nextjs-starter-kit`. This repo already includes that pointer.

```bash
git submodule add https://github.com/untitleduico/untitledui-nextjs-starter-kit.git vendor/untitledui-nextjs-starter-kit
git submodule update --init --recursive
```

Do **not** run `npx untitledui@latest init`. Do **not** flatten the starter into `src/library/`. Do **not** vendor Untitled UI React **PRO** files.

The starter and the OSS React repo are **MIT**. PRO is separately licensed.

Add a Tailwind item: create `src/tailwind/demos/<slug>.tsx` that imports from `@untitled-starter/...`, exports `metadata` and a default specimen. The glob in `src/registry/tailwind.ts` picks it up.

```ts
import { Button } from '@untitled-starter/components/base/buttons/button'
```

Optional extra pointer for the raw OSS component repo (not required for Tailwind):

```bash
git submodule add https://github.com/untitleduico/react.git vendor/untitled-ui
```

See [vendor/README.md](./vendor/README.md).

## Enable GitHub Pages

This ships as a **GitHub project site**. The live URL is:

```
https://elliot-rylands.github.io/lookbook/
```

Vite `base` in production is `/lookbook/` so CSS/JS resolve on that path. The Actions workflow sets `BASE_PATH=/lookbook/`. Local `npm run dev` keeps `base: '/'`.

There is **no `CNAME` in this repo** and no custom domain assumed.

### First-time enable

1. Merge to `main` (or run the workflow from `main`).
2. Repo **Settings → Pages**.
3. **Source**: GitHub Actions (not “Deploy from a branch”).
4. Workflow [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) builds the app and deploys `dist/`.
5. The build copies `index.html` → `dist/404.html` so `/`, `/components/:slug`, `/tailwind`, and `/tailwind/components/:slug` reload as a SPA. The workflow checks out submodules so the starter kit is present.
6. After the first green **Deploy GitHub Pages** run, open `https://elliot-rylands.github.io/lookbook/`.

The workflow also sets `VITE_GITHUB_REPO` so detail pages can link to source.

### Later: custom domain (optional)

Not configured. When you want something like `labs.elliotrylands.com`:

1. In GoDaddy, add a **CNAME**: host `labs` → `<user>.github.io`.
2. Add a repo `CNAME` file containing `labs.elliotrylands.com`, or set that hostname under **Settings → Pages** (GitHub writes the file).
3. Enable the custom domain in Pages and wait for DNS + TLS.
4. Switch the workflow `BASE_PATH` to `/` and redeploy — a custom domain is served from the hostname root, not `/lookbook/`.

Until then, keep project Pages and `BASE_PATH=/lookbook/`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite on port 43147 |
| `npm run build` | Typecheck + production build + `404.html` |
| `npm run preview` | Serve `dist` on 43147 |
| `npm run lint` | oxlint |
