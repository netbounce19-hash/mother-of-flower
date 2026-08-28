-- Every enquiry the site can produce: orders, call-backs, custom requests,
-- partnership enquiries and "drop a hint" messages.

create table if not exists public.submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  type        text not null check (
                type in ('order', 'call_request', 'custom_request',
                         'partnership', 'drop_hint')
              ),
  status      text not null default 'new' check (
                status in ('new', 'contacted', 'confirmed', 'closed')
              ),
  name        text,
  email       text,
  phone       text,
  payload     jsonb not null default '{}'::jsonb
);

create index if not exists submissions_created_at_idx
  on public.submissions (created_at desc);
create index if not exists submissions_type_status_idx
  on public.submissions (type, status);

-- Locked down by default: writes happen through the server action using the
-- service-role key, which bypasses RLS. With RLS on and no permissive policy,
-- the anon/publishable key cannot read or write this table.
alter table public.submissions enable row level security;
