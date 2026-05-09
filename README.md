# kurbankan-web

A web application for managing Qurban (Islamic ritual sacrifice) orders, built with Next.js App Router and Ant Design.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | Ant Design 6 |
| Language | TypeScript 5 (strict) |
| Runtime | React 19 |
| Linter / Formatter | Biome 2 |
| Fonts | Geist Sans & Geist Mono |
| Styling | CSS Modules + Global CSS |

## Prerequisites

- Node.js 20 or later
- npm (comes with Node.js)

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Create optimised production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Check code with Biome |
| `npm run format` | Auto-format code with Biome |

## Project Structure

```
kurbankan-web/
├── app/                   # Next.js App Router root
│   ├── layout.tsx         # Root layout (fonts, global providers)
│   ├── page.tsx           # Home page (/)
│   ├── globals.css        # Global styles & CSS variables
│   └── page.module.css    # Home page scoped styles
├── public/                # Static assets served at /
├── next.config.ts         # Next.js configuration
├── biome.json             # Biome linter / formatter config
└── tsconfig.json          # TypeScript configuration
```

## Path Aliases

`@/*` resolves to the project root. Use it for all internal imports:

```ts
import { MyComponent } from "@/components/MyComponent";
```

## Key Conventions

- **Server Components by default** — only add `"use client"` when the component needs browser APIs, event handlers, or React state/effects.
- **Ant Design v6** — import components directly from `antd`. Wrap the app in `<App>` from `antd` to enable `message`, `modal`, and `notification` hooks globally.
- **Biome** replaces ESLint and Prettier. Run `npm run lint` before committing; CI will enforce this.
- **CSS Modules** for component-scoped styles, global CSS variables in `globals.css`.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow.

## License

Private — all rights reserved.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
