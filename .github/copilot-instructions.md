# GitHub Copilot Instructions — kurbankan-web

## Project Purpose

**kurbankan-web** is a web application for managing Qurban (Islamic ritual sacrifice, قربان) orders and related workflows. The domain includes order intake, animal selection, customer data, payment status, and distribution scheduling around Eid al-Adha.

---

## Tech Stack & Versions

> These versions contain **breaking changes** from their previous majors. Always follow the conventions below and never assume patterns from older versions.

| Technology | Version | Notes |
|---|---|---|
| Next.js | 16.x | App Router only — no Pages Router |
| React | 19.x | Server Components first |
| Ant Design | 6.x | Breaking changes from v5 |
| TypeScript | 5.x | Strict mode enabled |
| Biome | 2.x | Replaces ESLint + Prettier |

---

## Next.js App Router Rules

- **All components are Server Components by default.** Only add `"use client"` at the top of a file when the component needs:
  - Browser APIs (`window`, `document`, `localStorage`, etc.)
  - React hooks (`useState`, `useEffect`, `useContext`, etc.)
  - Event handlers (`onClick`, `onChange`, etc.)
- Layouts live in `app/**/layout.tsx`, pages in `app/**/page.tsx`.
- Use `app/loading.tsx` and `app/error.tsx` for loading/error boundaries per route segment.
- Use Next.js `<Image>` for all images and `<Link>` for all internal navigation.
- Data fetching is done with `async`/`await` directly in Server Components. Use `cache()` or `unstable_cache()` for memoisation.
- Route Handlers go in `app/api/**/route.ts`.
- Use the `@/*` path alias for all internal imports (maps to project root).

---

## Ant Design v6 Rules

- **Import components directly** from `antd`:
  ```tsx
  import { Button, DatePicker, Table } from "antd";
  ```
- **Wrap the app in `<App>`** (from `antd`) inside the root layout to enable `useApp()` hook for `message`, `modal`, and `notification` access in Client Components:
  ```tsx
  // app/layout.tsx
  import { App } from "antd";
  // ...
  <App>{children}</App>
  ```
- **Do not use** `message.success()` / `Modal.confirm()` as static methods — use `useApp()` hook instead (v6 removes static methods in strict mode).
- **Theme customisation** is done via `<ConfigProvider theme={{ token: { ... } }}>`.
- Ant Design v6 uses CSS-in-JS by default. Do not fight it with global CSS overrides; use `ConfigProvider` or component `styles`/`classNames` props.
- Check `node_modules/next/dist/docs/` for Next.js-specific guidance before writing any new patterns.

---

## TypeScript Rules

- Strict mode is on — no `any`, no `@ts-ignore` without a written reason.
- Prefer `interface` for object shapes, `type` for unions/intersections.
- Export types alongside their related components in the same file unless they are reused widely, in which case place them in a co-located `types.ts`.
- Use `React.FC` only for components that explicitly need the `children` prop via typing; otherwise prefer plain function declarations.

---

## Styling Rules

- **CSS Modules** for component-scoped styles: create `ComponentName.module.css` next to the component file.
- **Global CSS variables** are defined in `app/globals.css` under `:root`.
- Do **not** use inline `style` props for anything other than truly dynamic values.
- Dark mode is handled via `@media (prefers-color-scheme: dark)` in global CSS. Ant Design dark theme is enabled via `ConfigProvider` with `theme={{ algorithm: theme.darkAlgorithm }}`.

---

## Code Quality Rules

- **Biome** is the single tool for linting and formatting. Never suggest ESLint or Prettier config.
- Run `npm run lint` to check; `npm run format` to auto-fix formatting.
- Biome config: 2-space indentation, spaces (not tabs).
- Imports are auto-organised by Biome's `organizeImports` assist action.
- Follow these import order (Biome enforces): external packages → internal aliases (`@/`) → relative paths.

---

## File & Folder Conventions

```
app/
  (group)/               # Route groups for layout isolation
    feature/
      page.tsx           # Route page
      layout.tsx         # Optional nested layout
      components/        # Components used only in this route
        MyWidget.tsx
        MyWidget.module.css
  components/            # Shared UI components
  lib/                   # Utility functions, helpers, API clients
  hooks/                 # Custom React hooks (must be Client Components)
  types/                 # Shared TypeScript types
public/                  # Static assets
```

---

## Do Not

- Do **not** use Pages Router (`pages/` directory).
- Do **not** install or suggest ESLint, Prettier, or Tailwind CSS.
- Do **not** use `getServerSideProps`, `getStaticProps`, or `getInitialProps`.
- Do **not** wrap every component in `"use client"` by default.
- Do **not** use Ant Design static methods (`Modal.confirm()`, `message.success()`) without `useApp()`.
- Do **not** assume Ant Design v5 APIs — v6 has breaking changes.
- Do **not** use `<img>` tags; always use Next.js `<Image>`.
- Do **not** use `<a>` tags for internal links; always use Next.js `<Link>`.
