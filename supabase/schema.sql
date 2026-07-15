-- La Stanza delle Idee — schema Supabase
-- Esegui questo script nel SQL Editor di Supabase.

create extension if not exists "pgcrypto";

create table if not exists ideas (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 80),
  description text not null check (char_length(description) between 10 and 1000),
  author text not null check (char_length(author) between 2 and 60),
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references ideas(id) on delete cascade,
  browser_id text not null,
  created_at timestamptz not null default now(),
  unique (idea_id, browser_id) -- un voto per browser per idea, garantito anche lato DB
);

-- Vista con conteggio voti per idea, usata dal front-end
create or replace view ideas_with_votes as
select
  i.*,
  coalesce(v.votes_count, 0) as votes_count
from ideas i
left join (
  select idea_id, count(*)::int as votes_count
  from votes
  group by idea_id
) v on v.idea_id = i.id;

-- Row Level Security: nessun login, quindi accesso pubblico controllato
alter table ideas enable row level security;
alter table votes enable row level security;

create policy "public read ideas" on ideas
  for select using (true);

create policy "public insert ideas" on ideas
  for insert with check (true);

create policy "public read votes" on votes
  for select using (true);

create policy "public insert votes" on votes
  for insert with check (true);

-- Storage: bucket pubblico per le immagini delle idee (opzionale)
insert into storage.buckets (id, name, public)
values ('idea-images', 'idea-images', true)
on conflict (id) do nothing;

create policy "public read idea images" on storage.objects
  for select using (bucket_id = 'idea-images');

create policy "public upload idea images" on storage.objects
  for insert with check (bucket_id = 'idea-images');
