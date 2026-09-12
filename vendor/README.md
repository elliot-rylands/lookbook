# Vendor

Reference sources stay here with their own repository layout. They are not the lookbook shell and they are not copied into `src/library/`.

## Untitled UI Next.js starter kit (Tailwind archive)

Canonical path: `vendor/untitledui-nextjs-starter-kit/`

This is the source for the **Tailwind** archive (`/tailwind`). Submodule:

```bash
git submodule add https://github.com/untitleduico/untitledui-nextjs-starter-kit.git vendor/untitledui-nextjs-starter-kit
git submodule update --init --recursive
```

Leave their tree intact. Demos in `src/tailwind/demos/` import via `@untitled-starter/...`. Do not flatten into `src/library/`. Do not run `npx untitledui@latest init`. Do not vendor **PRO** files.

The starter is MIT. Untitled UI React PRO is separately licensed.

## Untitled UI React (OSS, optional)

Canonical path: `vendor/untitled-ui/`

```bash
git submodule add https://github.com/untitleduico/react.git vendor/untitled-ui
git submodule update --init --recursive
```

`@untitled-ui` resolves to that root. Imports of `@/` *inside* a vendor tree resolve back to that vendor root. Lookbook chrome keeps `@/` → `src/`.
