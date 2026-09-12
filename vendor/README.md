# Vendor

Reference sources stay here with their own repository layout. They are not the lookbook shell and they are not copied into `src/library/`.

## Untitled UI React (OSS)

Canonical path: `vendor/untitled-ui/`

The [untitleduico/react](https://github.com/untitleduico/react) repo is MIT-licensed. Pull it yourself from the lookbook root (do not run `npx untitledui@latest init` — that scaffolds a different app):

```bash
git submodule add https://github.com/untitleduico/react.git vendor/untitled-ui
git submodule update --init --recursive
```

After a fresh clone of this lookbook:

```bash
git submodule update --init --recursive
```

Leave their tree intact (`components/`, `hooks/`, `styles/`, `utils/`, …). Do not flatten files into `src/library/`. Do not vendor Untitled UI React **PRO** files here — PRO is separately licensed.

Lookbook studies can import once the submodule is present:

```ts
import { Button } from '@untitled-ui/components/base/buttons/button'
```

`@untitled-ui` resolves to `vendor/untitled-ui`. Imports of `@/` *inside that vendor tree* resolve back to the Untitled UI root so their internal paths keep working. Lookbook chrome (`src/components/ui`, `src/components/lookbook`) keeps using `@/` → `src/` and its own tokens.

When a study first imports Untitled UI, install the peer packages that file needs into *this* app (from `vendor/untitled-ui/package.json`). Do not `npm install` inside the submodule unless you are contributing upstream.
