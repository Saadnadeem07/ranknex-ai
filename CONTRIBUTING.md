# Contributing

Thanks for working on RankNex AI. This guide covers local setup and the
conventions we follow. For deeper architecture notes and gotchas, see
[CLAUDE.md](CLAUDE.md).

## Prerequisites

- Node.js 18+ and npm
- A Supabase project (Postgres) and a Cloudinary account
- Credentials filled into `.env` (copy from `.env.example`)

## Setup

```bash
npm install
cp .env.example .env      # then fill in Supabase + Cloudinary values
npm run db:setup          # generate client + push schema + seed
npm run dev               # http://localhost:3000
```

## Branching & commits

- Branch off `main`: `feat/...`, `fix/...`, `chore/...`, `docs/...`.
- Keep commits focused. Write a concise subject line and a short body that
  explains **why**, not just what.
- Never commit `.env` or any secret. `.env` is gitignored — keep it that way.

## Code style

- TypeScript + ESLint (`npm run lint`). Prefer existing patterns over new ones.
- Match the surrounding file's style (naming, formatting, comment density).
- Tailwind CSS v4 for styling. **Important:** read the Tailwind layering gotcha
  in [CLAUDE.md](CLAUDE.md#-gotchas-these-have-bitten-us--dont-repeat) before
  touching `globals.css` or fighting a class that "won't apply."
- 2-space indentation, LF line endings, final newline (see `.editorconfig`).

## Before opening a PR

Run, and make sure these pass:

```bash
npx tsc --noEmit     # type-check
npm run lint         # lint (existing warnings are non-blocking)
npm run build        # production build — must succeed (29/29 pages)
```

For UI or layout changes, also verify visually at desktop **and** mobile
(360 / 390 / 768px) and confirm there's no horizontal scroll. The marketing
site must keep building/serving even without database/Cloudinary credentials
(graceful degradation — see CLAUDE.md).

## Project layout

| Path                | What                                            |
| ------------------- | ----------------------------------------------- |
| `src/app/`          | Pages + API routes (App Router)                 |
| `src/components/`   | UI (`layout`, `home`, `ui`, `blog`, `admin`)    |
| `src/lib/`          | Prisma, auth, SEO, Cloudinary, utils            |
| `prisma/`           | Schema + seed                                   |
| `public/`           | Static assets, `robots.txt`, `sitemap.xml`      |

## Security

- Treat security as the priority. Don't expose server secrets to the client.
- The admin panel is hidden and credential-gated; change the seeded password and
  set a strong `NEXTAUTH_SECRET` before any public use.
- Report anything sensitive privately rather than in a public issue.
