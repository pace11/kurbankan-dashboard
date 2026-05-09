# Contributing to kurbankan-web

Thank you for contributing! This guide covers the full development workflow.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Setup](#local-setup)
3. [Branch Naming](#branch-naming)
4. [Development Workflow](#development-workflow)
5. [Code Style](#code-style)
6. [Commit Messages](#commit-messages)
7. [Pull Requests](#pull-requests)
8. [Architecture Decisions](#architecture-decisions)

---

## Prerequisites

| Tool | Minimum Version |
|---|---|
| Node.js | 20 |
| npm | 10 |
| Git | 2.40 |

---

## Local Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd kurbankan-web

# 2. Install dependencies (use npm only — do not use yarn or pnpm)
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Branch Naming

| Type | Pattern | Example |
|---|---|---|
| Feature | `feat/<short-description>` | `feat/order-form` |
| Bug fix | `fix/<short-description>` | `fix/payment-status-display` |
| Refactor | `refactor/<short-description>` | `refactor/order-table` |
| Chore / Config | `chore/<short-description>` | `chore/update-biome` |

Always branch off from `main` (or the designated development branch).

---

## Development Workflow

```bash
# Create a branch
git checkout -b feat/my-feature

# Run the dev server
npm run dev

# Before committing — lint and format
npm run lint
npm run format
```

Never commit code that fails `npm run lint`.

---

## Code Style

This project uses **Biome** for all linting and formatting. Do not install or configure ESLint or Prettier.

### General

- 2-space indentation, spaces (not tabs).
- Single quotes for strings in TypeScript; Biome will enforce.
- Import order: external packages → `@/` aliases → relative paths. Biome's `organizeImports` handles this automatically on save if configured in your editor.

### React / Next.js

- **Server Components by default.** Add `"use client"` only when required (hooks, browser APIs, event handlers).
- Use `<Link>` (Next.js) for internal navigation, never `<a>`.
- Use `<Image>` (Next.js) for all images, never `<img>`.
- Keep data fetching in Server Components with `async`/`await`.

### Ant Design v6

- Import components from `antd` directly: `import { Button } from "antd"`.
- Use `useApp()` from `antd` for `message`, `modal`, and `notification`. Static methods are removed in v6.
- Apply theme customisation via `<ConfigProvider>`, not global CSS overrides.

### TypeScript

- Strict mode is enabled — no `any`.
- Prefer `interface` for object shapes, `type` for unions/intersections.
- Avoid `React.FC` unless the component explicitly requires typed `children`.

### Styling

- Use CSS Modules (`ComponentName.module.css`) for component-scoped styles.
- Use CSS variables from `app/globals.css` for theme tokens.
- Avoid inline `style` props for static values.

---

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short imperative summary>

[optional body]
```

**Types:** `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `perf`

**Examples:**

```
feat(orders): add order creation form
fix(payment): resolve incorrect status badge color
chore: upgrade antd to 6.4.0
docs: update contributing guide
```

- Use the imperative mood: "add feature" not "added feature".
- Keep the subject line under 72 characters.
- Reference issues in the body when relevant: `Closes #42`.

---

## Pull Requests

1. **One concern per PR** — keep PRs focused and reviewable.
2. Fill in the PR description:
   - What changed and why.
   - Screenshots for UI changes.
   - Steps to test manually.
3. All CI checks must pass before requesting a review.
4. At least one approval is required to merge.
5. Rebase onto `main` before merging to keep a clean history.
6. Delete the branch after merging.

---

## Architecture Decisions

| Decision | Rationale |
|---|---|
| App Router only | Pages Router is deprecated; App Router enables Server Components |
| Ant Design v6 | Latest major version; CSS-in-JS, improved a11y, React 19 compat |
| Biome over ESLint+Prettier | Single tool, faster, zero-config for this stack |
| CSS Modules | Scoped styles without the overhead of CSS-in-JS for custom components |
| TypeScript strict | Catches bugs at compile time; enforced across the codebase |

For significant architectural changes, open a discussion issue before implementation.
