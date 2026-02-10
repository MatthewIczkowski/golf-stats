# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Architecture

Next.js 16 app (App Router) with TypeScript, Tailwind CSS v4, and shadcn/ui components.

**Database:** Neon serverless PostgreSQL, accessed via raw SQL through `@neondatabase/serverless` (no ORM). Connection string is `DATABASE_URL` in `.env`.

**Server actions** in `src/lib/actions.ts` handle all data fetching (e.g., `getData()` queries the `rounds` table).

**Key paths:**
- `src/app/` — App Router pages. Home page (`page.tsx`) is a client component showing charts and a data table. `/rounds` page is a work-in-progress.
- `src/components/ui/` — shadcn/ui primitives (button, card, table, chart). Configured via `components.json` with `new-york` style and Radix UI.
- `src/components/charts/` — Recharts-based visualizations (line chart for scoring averages, radar chart for skill profile).
- `src/components/table/DataTable.tsx` — Client component that fetches rounds via server action and displays them with average score.
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge) and age calculation utilities.

**Styling:** Tailwind v4 with oklch color tokens defined as CSS variables in `globals.css`. Dark/light mode via `next-themes`. Animations via `tw-animate-css`.

**Auth:** Currently a UI placeholder only (`AuthToggle.tsx` with lock/unlock icon). No real auth is wired up yet.

**Path alias:** `@/*` maps to `./src/*`.

## Data Model

### `rounds` table

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `date` | date | Round date |
| `course_name` | text | Name of the course |
| `slope` | integer | Course slope (55-155) |
| `rating` | numeric | Course rating (e.g., 72.0) |
| `score` | integer | Total score |
| `fairways_hit` | integer | Fairways hit (0-18) |
| `greens_in_regulation` | integer | Greens in regulation (0-18) |
| `penalties` | integer | Number of penalty strokes |
| `double_bogeys` | integer | Number of double bogeys or worse |
| `putts` | integer | Total number of putts |
| `notes` | text | Optional notes about the round |
| `created_at` | timestamp | Record creation timestamp |
| `updated_at` | timestamp | Record last updated timestamp |
