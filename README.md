# RankNex AI — AI-Powered Digital Marketing Agency Website

A complete, production-ready, full-stack website for **RankNex AI** — an AI-powered digital marketing and SEO agency based in Pakistan, serving clients across Pakistan, the UK, and the US.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-Postgres-3FCF8E?logo=supabase&logoColor=white" />
  <img alt="Cloudinary" src="https://img.shields.io/badge/Cloudinary-media-3448C5?logo=cloudinary&logoColor=white" />
</p>

> Working on this codebase with Claude Code or another AI assistant? Start with **[CLAUDE.md](CLAUDE.md)** — it documents the architecture, conventions, and the non-obvious gotchas.

## Tech Stack

| Layer        | Technology                                        |
| ------------ | ------------------------------------------------- |
| Framework    | Next.js 15 (App Router)                           |
| Language     | TypeScript                                        |
| Styling      | Tailwind CSS v4                                   |
| Database     | PostgreSQL (Supabase) via Prisma ORM              |
| Media        | Cloudinary (image/video upload, optimization, CDN)|
| Auth         | NextAuth.js (Credentials provider, JWT)           |
| Editor       | Tiptap (rich-text blog/case-study editor)         |
| Animations   | Framer Motion + CSS                               |
| Icons        | Lucide React                                      |
| Fonts        | Inter + Outfit (Google Fonts)                     |
| Hosting      | Vercel                                            |

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A [Supabase](https://supabase.com) project (Postgres database)
- A [Cloudinary](https://cloudinary.com) account (media uploads)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Fill in `.env` with your Supabase and Cloudinary credentials — see
[Environment Variables](#environment-variables).

### 3. Set up the database

```bash
npm run db:setup     # generate client + push schema + seed (one shot)
```

Or run the steps individually:

```bash
npm run db:generate  # Generate the Prisma client
npm run db:push      # Create the schema in Supabase
npm run db:seed      # Seed admin user, categories & sample content
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable                  | Description                                                              |
| ------------------------- | ----------------------------------------------------------------------- |
| `DATABASE_URL`            | Supabase **transaction pooler** URL (port 6543) + `?pgbouncer=true` — used by the app |
| `DIRECT_URL`              | Supabase **direct/session** URL (port 5432) — used by Prisma for migrations |
| `NEXTAUTH_SECRET`         | Secret signing auth/JWT tokens. Generate: `openssl rand -base64 32`      |
| `NEXTAUTH_URL`            | Canonical site URL (`http://localhost:3000` locally, your domain in prod) |
| `CLOUDINARY_CLOUD_NAME`   | Cloudinary cloud name                                                   |
| `CLOUDINARY_API_KEY`      | Cloudinary API key                                                      |
| `CLOUDINARY_API_SECRET`   | Cloudinary API secret (**server-side only**)                            |
| `CLOUDINARY_FOLDER`       | (Optional) folder for uploads. Default: `ranknex`                       |

> Where to find them: Supabase → *Project Settings → Database → Connection string*;
> Cloudinary → *dashboard / API keys*. Add the same variables to your Vercel project
> (*Settings → Environment Variables*) for production.

> **Graceful degradation:** the public marketing site builds and serves even when
> these are unset (database reads fall back to empty states). The **admin panel**,
> dynamic **blog/case-study** content, **contact-form storage**, and **uploads**
> require the credentials above.

## Admin Access

The admin panel is **hidden** from public navigation.

- **Logo click:** click the RankNex AI logo **6 times** within 3 seconds.
- **Direct URL:** navigate to `/admin`.

### Default seeded credentials

- **Username:** `admin`
- **Password:** `RankNex@2024`

> ⚠️ **Change these before any public use.** Update the seeded password in
> `prisma/seed.ts` (or the `admin_users` row directly) and set a strong
> `NEXTAUTH_SECRET`.

### What the admin does

| Section      | Purpose                                                          |
| ------------ | --------------------------------------------------------------- |
| Dashboard    | Overview stats (posts, case studies, unread messages)           |
| Blog Posts   | CRUD for blog articles (rich text, Cloudinary images, SEO meta) |
| Case Studies | CRUD for case studies (challenge / strategy / results / metrics)|
| Submissions  | Inbox of contact-form messages                                  |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── about/              # About Us
│   ├── services/           # Service pages (SEO, PPC, branding, …)
│   ├── blog/               # Blog listing + single post
│   ├── case-studies/       # Case studies
│   ├── contact/            # Contact page with form
│   ├── uk/  ·  us/         # Market landing pages
│   ├── admin/              # Hidden admin panel (CRUD)
│   └── api/                # API routes (blogs, contact, upload, …)
├── components/             # Reusable components (layout, home, ui, blog, admin)
├── lib/                    # Prisma client, auth, SEO, Cloudinary, utils
└── types/                  # Shared TypeScript types

prisma/                     # Schema & seed script
public/                     # Static assets, robots.txt, sitemap.xml
```

## Available Scripts

| Script                | Description                              |
| --------------------- | ---------------------------------------- |
| `npm run dev`         | Start the development server             |
| `npm run build`       | Production build                         |
| `npm run start`       | Run the production build                 |
| `npm run lint`        | Lint with ESLint                         |
| `npm run db:setup`    | Generate client + push schema + seed     |
| `npm run db:generate` | Generate the Prisma client               |
| `npm run db:push`     | Push the schema to the database          |
| `npm run db:seed`     | Seed the database with initial data      |

## Features

- 14+ pages, each with unique SEO metadata
- Dynamic blog system backed by Postgres (Prisma)
- Hidden admin panel with CRUD for blogs & case studies
- Contact form with database persistence
- Cloudinary-backed image/video uploads (optimized + CDN)
- Animated, fully responsive, conversion-focused design
- Floating WhatsApp button
- Schema.org markup (Organization, Article, Service)
- `robots.txt` + `sitemap.xml`
- Dedicated UK and US market landing pages

## Deployment (Vercel)

1. Push this repository to GitHub and import it into Vercel.
2. Add all [environment variables](#environment-variables) under
   *Settings → Environment Variables*.
3. Set `NEXTAUTH_URL` to your production domain.
4. Deploy. Run `npm run db:setup` once (locally, pointed at the Supabase DB) to
   create and seed the schema.

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for the development workflow and
**[CLAUDE.md](CLAUDE.md)** for architecture notes and conventions.

## License

Proprietary — © RankNex AI. All rights reserved. See [LICENSE](LICENSE).
