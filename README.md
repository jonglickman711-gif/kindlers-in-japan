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
