create table if not exists rsvps (
  activity_id text not null,
  traveler text not null,
  attending boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (activity_id, traveler)
);

create unique index if not exists rsvps_activity_traveler_key
  on rsvps (activity_id, traveler);

alter table rsvps enable row level security;

drop policy if exists "Anyone can read RSVPs" on rsvps;
create policy "Anyone can read RSVPs"
  on rsvps
  for select
  to anon
  using (true);

drop policy if exists "Anyone can add RSVPs" on rsvps;
create policy "Anyone can add RSVPs"
  on rsvps
  for insert
  to anon
  with check (true);

drop policy if exists "Anyone can update RSVPs" on rsvps;
create policy "Anyone can update RSVPs"
  on rsvps
  for update
  to anon
  using (true)
  with check (true);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'rsvps'
  ) then
    alter publication supabase_realtime add table public.rsvps;
  end if;
end $$;
