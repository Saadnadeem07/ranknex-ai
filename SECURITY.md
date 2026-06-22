# Security Policy

## Reporting a vulnerability

If you discover a security issue, please report it **privately** — do not open a
public GitHub issue. Email **info@ranknexai.com** with:

- a description of the issue and its impact,
- steps to reproduce (proof-of-concept if possible),
- any suggested remediation.

We aim to acknowledge reports within a few business days.

## Operational notes

- **Secrets** live only in environment variables (`.env`, gitignored; Vercel
  project settings in production). Never commit secrets or expose the Cloudinary
  API secret / `NEXTAUTH_SECRET` to the client.
- **Admin panel** is hidden and credential-gated. Before any public use:
  - change the seeded admin password (`prisma/seed.ts` → reseed, or update the
    `admin_users` row),
  - set a strong `NEXTAUTH_SECRET` (`openssl rand -base64 32`).
- **Uploads** are validated by MIME type and size and routed through Cloudinary;
  the upload route requires an authenticated admin session.
- Rotate any credential that has been shared or exposed.

## Supported versions

This is an actively maintained, single-deployment application; only the latest
`main` is supported.
