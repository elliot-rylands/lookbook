# Contributing

This is a lookbook, not an app platform. Add studies; leave the chrome quiet.

## Manual study

1. Create `src/library/<category>/<ComponentName>/`.
2. Add `<ComponentName>.tsx` (default export) and `metadata.ts`.
3. Optional `variants.tsx`.
4. Confirm the study on `/` and `/components/<slug>`.
5. `npm run build`.

Folder name = file name. The registry globs `metadata.ts` — do not edit a navigation file.

Categories live in `src/data/categories.ts`. Add an id there if you introduce a new shelf.

## From Figma

Follow [AGENTS.md](./AGENTS.md). Inspect with the Figma MCP, preserve the design, never embed commercial fonts.

## Untitled UI

Pull the MIT OSS repo as a submodule (you do this locally):

```bash
git submodule add https://github.com/untitleduico/react.git vendor/untitled-ui
git submodule update --init --recursive
```

Do not run `npx untitledui@latest init`. Do not flatten that tree into `src/library/`. Do not add PRO files. Lookbook chrome does not use Untitled UI.

Imports once present: `@untitled-ui/components/...` (see [vendor/README.md](./vendor/README.md)).
