# Supabase Todos

This is a Next.js App Router application backed by Supabase. The database schema
lives in `supabase/migrations`, so it is versioned with the application code.

## Run locally

1. Copy `.env.example` to `.env.local` and add your Supabase publishable key and
   database password. Do not commit `.env.local`.
2. Install dependencies with `npm ci`.
3. Run `npm run dev`.

## GitHub and Supabase deployment

Pushing a change to `main` runs application verification. Changes under
`supabase/migrations/` also run the migration deployment workflow against
Supabase project `xllhhktkfjesghesvjsg`.

Before the first push, add these repository or `production` environment secrets
in GitHub:

- `SUPABASE_ACCESS_TOKEN`: a scoped Supabase personal access token with access
  to this project.
- `SUPABASE_DB_PASSWORD`: the database password only, not the connection URL.

The workflow applies migrations serially, so concurrent pushes cannot race.
The `todos` migration creates the table, enables RLS, and grants anonymous and
authenticated users read-only access because the included page is a public list.

GitHub Actions deploys the database schema, not the Next.js website. Deploy the
website to a Node.js-compatible provider connected to this GitHub repository and
set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in
that provider's environment settings. GitHub Pages is not suitable because this
app uses server components and middleware.
