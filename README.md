# Kindlers in Japan

A cinematic React + Vite group itinerary site for the Kindlers in Japan trip.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production build outputs to `dist`, which is the default Vite output folder and is ready for Vercel.

## Preview Production Build

```bash
npm run preview
```

## RSVP Storage

RSVP selections use Supabase realtime when these Vite environment variables are configured:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

If Supabase env vars are missing or unavailable, the app falls back to `localStorage` for local testing.

Run `supabase/rsvps.sql` in the Supabase SQL editor to create the shared RSVP table and public read/write policies. Enable realtime for the `rsvps` table so changes appear across devices without refreshing.

## Shared Comments

Activity notes use Supabase when the `activity_comments` table exists. If the table is unavailable, notes fall back to `localStorage`.

```sql
create table activity_comments (
  id uuid primary key default gen_random_uuid(),
  activity_id text not null,
  author text not null,
  message text not null,
  created_at timestamptz not null default now()
);
```

Run `supabase/activity_comments.sql` in the Supabase SQL editor to create the comments table and public read/write policies. Enable realtime for `activity_comments`.
