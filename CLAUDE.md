# CLAUDE.md

Guidance for Claude Code (and other AI assistants) working in this repository.
Read this first — it captures the architecture, conventions, and the
**non-obvious gotchas** that are easy to get wrong here.

## Project

**RankNex AI** — marketing website for an AI-powered digital-marketing agency
(Pakistan, UK, US). Public marketing pages + a hidden admin CMS.

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` in `src/app/globals.css`)
- **DB:** PostgreSQL (Supabase) via Prisma — `prisma/schema.prisma`
- **Media:** Cloudinary (`src/lib/cloudinary.ts`, `src/app/api/upload/route.ts`)
- **Auth:** NextAuth credentials provider, JWT (`src/lib/auth.ts`)
- **Hosting:** Vercel (serverless)

## Commands

```bash
npm run dev            # dev server (localhost:3000)
npm run build          # production build (run before pushing if unsure)
npm run lint           # ESLint
npm run db:setup       # prisma generate + db push + seed (needs DB env vars)
npm run db:seed        # seed admin user, categories, sample posts/case studies
npx tsc --noEmit       # type-check without building
```

Build/CI note: `next build` type-checks **and** lints; existing unused-var
warnings are non-blocking. A production build is ~2× lighter than `npm run dev`
— measure performance against `npm run build && npm start`, not dev.

## Architecture

- `src/app/**` — App Router pages + `api/` route handlers.
- `src/components/{layout,home,ui,blog,admin,services}` — UI. Most are
  `'use client'` (animations/hooks).
- `src/lib/` — `db.ts` (Prisma singleton), `auth.ts` (NextAuth), `seo.ts`
  (`generateSEO` + Schema.org helpers), `cloudinary.ts`, `utils.ts`.
- `prisma/` — `schema.prisma`, `seed.ts`.
- Admin lives under `src/app/admin/**`; it's hidden (no public nav) and reached
  via `/admin` or clicking the header logo 6× (see `Header.tsx`).

## Database & environment

- Postgres via Supabase. Prisma datasource uses `DATABASE_URL` (pooled, 6543,
  `?pgbouncer=true`) for the app and `DIRECT_URL` (5432) for migrations.
- Required env vars: `DATABASE_URL`, `DIRECT_URL`, `NEXTAUTH_SECRET`,
  `NEXTAUTH_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`,
  `CLOUDINARY_API_SECRET`. See `.env.example`. `.env` is gitignored — never
  commit secrets.
- **Graceful degradation is intentional:** server components that read the DB
  wrap queries in `.catch(() => [] / null / 0)` and DB-backed pages export
  `export const dynamic = "force-dynamic"`. This lets the marketing site build
  and serve on Vercel even with no DB. Preserve this pattern when adding pages —
  don't let a DB read crash a public route at build or request time.

## ⚠️ Gotchas (these have bitten us — don't repeat)

1. **Tailwind v4 layering vs. custom CSS in `globals.css`.** Plain CSS rules in
   `globals.css` are *unlayered* and therefore **override Tailwind's layered
   utilities**, regardless of specificity. Consequences seen:
   - A global `* { margin:0; padding:0 }` reset silently killed **every**
     `p-*`/`m-*` utility site-wide. Do **not** reintroduce it (Preflight already
     resets). Keep `* { box-sizing: border-box }` only.
   - `.btn-primary`/`.btn-secondary`/`.card`/`.container` set properties like
     `display`/`padding`. So `hidden lg:inline-flex` on a `.btn-primary` does
     **not** hide it. Put responsive `hidden`/display utilities on a **plain
     wrapper element**, not on a component-class element. `.container` uses
     `padding-left/right` (not the `padding` shorthand) so `pt-*`/`pb-*` work on
     other elements.
   - When CSS spacing/visibility "doesn't apply," suspect this first.

2. **No horizontal scroll.** Decorative `.orb` / blur elements bleed past the
   viewport by design; `html, body { overflow-x: clip }` (clip, not hidden, to
   preserve `position: sticky`) guards mobile. Containers holding big centered
   orbs (e.g. footer) also use `overflow-hidden`. Verify `scrollWidth ==
   viewport` at 360/390/414/768 after layout changes.

3. **Hero performance.** The hero is the heaviest part on load. Keep it light:
   - Particle canvas (`ParticleBackground.tsx`) pauses via IntersectionObserver
     when off-screen / tab hidden, draws flat dots (no per-frame gradient), and
     starts ~1.1s after mount. Don't make it run unconditionally.
   - Gradient orbs animate **translate only** (never `scale` on a blurred
     element — it re-rasterizes the blur every frame).
   - Hero text entrances use the CSS `animate-fade-up` class, **not**
     framer-motion (CSS runs off the main thread and doesn't wait for
     hydration). `HeroVisual.tsx` is intentionally **static** (no animation).
   - Respect `prefers-reduced-motion` (handled globally + in JS animations).

4. **Uploads.** `/api/upload` pushes to Cloudinary and returns `{ url }`. Vercel
   serverless caps request bodies at ~4.5MB; large media (video) needs a
   client-side direct/unsigned Cloudinary upload, not this passthrough route.

5. **Secrets.** Never echo secret values into chat/logs or commit `.env`. The
   Cloudinary API secret and `NEXTAUTH_SECRET` are server-side only.

## Conventions

- Code references like `file_path:line` are clickable; match surrounding style.
- Every page sets unique metadata via `generateSEO` / `Metadata`; keep
  Schema.org markup (Organization/Article/Service) intact.
- Commit messages: concise subject + a short body explaining *why*.
- After UI/layout changes, screenshot-verify (headless Chrome) at desktop +
  mobile before claiming done.

## Verifying UI changes (screenshots)

This environment has no built-in screenshot tool, but Google Chrome is installed
and the `Read` tool can view PNGs. Pattern used here: install `puppeteer-core`
with `--no-save` (keeps it out of `package.json`), point it at
`/Applications/Google Chrome.app/.../Google Chrome`, navigate to the running dev
server, screenshot to a temp PNG, then `Read` it. `npm i` prunes the `--no-save`
package — reinstall when needed.
