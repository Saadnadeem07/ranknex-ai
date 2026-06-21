# RankNex AI — AI-Powered Digital Marketing Agency Website

A complete, production-ready, full-stack website for **RankNex AI** — an AI-powered digital marketing and SEO agency based in Pakistan, serving clients across Pakistan, the UK, and the US.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white" />
</p>

## Tech Stack

| Layer       | Technology                                   |
| ----------- | -------------------------------------------- |
| Framework   | Next.js 15 (App Router)                      |
| Language    | TypeScript                                   |
| Styling     | Tailwind CSS v4                              |
| Database    | SQLite via Prisma ORM (swap-able to Postgres/MySQL) |
| Auth        | NextAuth.js (Credentials provider, JWT)      |
| Editor      | Tiptap (rich-text blog/case-study editor)    |
| Animations  | Framer Motion + CSS                          |
| Icons       | Lucide React                                 |
| Fonts       | Inter + Outfit (Google Fonts)                |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example file and adjust the values:

```bash
cp .env.example .env
```

The defaults run against a local SQLite file (`prisma/dev.db`) — no database server required.
See the [Environment Variables](#environment-variables) section below for details.

### 3. Set up the database

```bash
npm run db:generate   # Generate the Prisma client
npm run db:push       # Create the SQLite schema
npm run db:seed       # Seed admin user, categories & sample content
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable          | Description                                                        | Example                                  |
| ----------------- | ----------------------------------------------------------------- | ---------------------------------------- |
| `DATABASE_URL`    | Prisma connection string. SQLite by default.                      | `file:./dev.db`                          |
| `NEXTAUTH_SECRET` | Secret used to sign auth/JWT tokens. **Generate a strong value.** | `openssl rand -base64 32`                |
| `NEXTAUTH_URL`    | Canonical site URL. Used for auth callbacks, sitemap & OG tags.   | `http://localhost:3000` (prod: your domain) |
| `UPLOAD_DIR`      | Upload folder under `public/`.                                    | `uploads`                                |

> In production, set `NEXTAUTH_URL` to your real domain so canonical URLs, the
> sitemap, and Open Graph/Schema.org tags resolve correctly.

## Admin Access

The admin panel is **hidden** from public navigation.

- **Logo click:** click the RankNex AI logo **6 times** within 3 seconds to reveal the admin login.
- **Direct URL:** navigate to `/admin`.

### Default seeded credentials

- **Username:** `admin`
- **Password:** `RankNex@2024`

> ⚠️ **Change these before any public deployment.** Re-seed with a new password
> (`prisma/seed.ts`) or update the `admin_users` row directly, and set a unique
> `NEXTAUTH_SECRET`.

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
│   └── api/                # API routes
├── components/             # Reusable components
│   ├── layout/             # Header, Footer, WhatsApp button
│   ├── home/               # Homepage sections
│   ├── ui/                 # Shared UI primitives
│   ├── blog/               # Blog components
│   └── admin/              # Admin components
├── lib/                    # Prisma client, auth, SEO, utils
└── types/                  # Shared TypeScript types

prisma/                     # Schema & seed script
public/                     # Static assets, robots.txt, sitemap.xml
```

## Available Scripts

| Script                | Description                          |
| --------------------- | ------------------------------------ |
| `npm run dev`         | Start the development server         |
| `npm run build`       | Production build                     |
| `npm run start`       | Run the production build             |
| `npm run lint`        | Lint with ESLint                     |
| `npm run db:generate` | Generate the Prisma client           |
| `npm run db:push`     | Push the schema to the database      |
| `npm run db:migrate`  | Create & apply a migration           |
| `npm run db:seed`     | Seed the database with initial data  |

## Features

- 14+ pages, each with unique SEO metadata
- Dynamic blog system backed by Prisma
- Hidden admin panel with CRUD for blogs & case studies
- Contact form with database persistence
- Animated, responsive, conversion-focused design
- Floating WhatsApp button
- Schema.org markup (Organization, Article, Service)
- `robots.txt` + `sitemap.xml`
- Dedicated UK and US market landing pages

## Deployment

### Vercel (recommended)

1. Push this repository to GitHub.
2. Import the project into Vercel.
3. Add the environment variables from `.env.example`.
4. For production, point `DATABASE_URL` at a hosted database (e.g. Postgres) and
   update the Prisma `provider` in `prisma/schema.prisma` accordingly — SQLite is
   intended for local development.

### Self-hosted (VPS)

```bash
npm run build
npm run start
```

## License

Proprietary — © RankNex AI. All rights reserved. See [LICENSE](LICENSE).
