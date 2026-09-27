create table if not exists public.todos (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 500),
  created_at timestamptz not null default now()
);

alter table public.todos enable row level security;

grant usage on schema public to anon, authenticated;
grant select on table public.todos to anon, authenticated;

create policy "Todos are publicly readable"
  on public.todos
  for select
  to anon, authenticated
  using (true);
