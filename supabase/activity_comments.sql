create table if not exists activity_comments (
  id uuid primary key default gen_random_uuid(),
  activity_id text not null,
  author text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table activity_comments enable row level security;

drop policy if exists "Anyone can read activity comments" on activity_comments;
create policy "Anyone can read activity comments"
  on activity_comments
  for select
  to anon
  using (true);

drop policy if exists "Anyone can add activity comments" on activity_comments;
create policy "Anyone can add activity comments"
  on activity_comments
  for insert
  to anon
  with check (true);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'activity_comments'
  ) then
    alter publication supabase_realtime add table public.activity_comments;
  end if;
end $$;
