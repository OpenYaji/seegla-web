-- SEEGLA simple admin CRM schema for Supabase
-- Run this whole file in the Supabase SQL editor.

begin;

-- Updated-at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Admin users table (maps auth.users to CRM admin access)
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  role text not null default 'admin' check (role in ('admin', 'viewer')),
  created_at timestamptz not null default now()
);

-- Helper function for RLS checks
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.user_id = auth.uid()
  );
$$;

-- WAITLIST LEADS
create table if not exists public.waitlist_leads (
  id bigint generated always as identity primary key,
  full_name text not null,
  work_email text not null,
  company_name text not null,
  company_size text not null check (company_size in ('1-50', '51-200', '201-500', '500+')),
  role text not null check (role in ('hr', 'ceo', 'ops', 'wellness', 'other')),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'converted', 'archived')),
  source text not null default 'website_waitlist',
  notes text,
  contacted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists waitlist_leads_work_email_key
  on public.waitlist_leads (lower(work_email));
create index if not exists waitlist_leads_status_idx on public.waitlist_leads (status);
create index if not exists waitlist_leads_created_at_idx on public.waitlist_leads (created_at desc);

-- DEMO BOOKINGS / LEADS
create table if not exists public.demo_bookings (
  id bigint generated always as identity primary key,
  first_name text not null,
  last_name text not null,
  work_email text not null,
  company_name text not null,
  team_size text not null,
  requested_date date not null,
  requested_time text not null,
  timezone text not null default 'Asia/Manila',
  goals text,
  status text not null default 'new' check (status in ('new', 'confirmed', 'completed', 'cancelled', 'no_show')),
  scheduled_at timestamptz,
  meeting_link text,
  calendar_event_id text,
  assigned_to uuid references auth.users(id) on delete set null,
  source text not null default 'website_demo',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists demo_bookings_work_email_idx on public.demo_bookings (lower(work_email));
create index if not exists demo_bookings_status_idx on public.demo_bookings (status);
create index if not exists demo_bookings_requested_date_idx on public.demo_bookings (requested_date);
create index if not exists demo_bookings_created_at_idx on public.demo_bookings (created_at desc);

-- Optional activity log for admin CRM timeline
create table if not exists public.crm_activity_logs (
  id bigint generated always as identity primary key,
  entity_type text not null check (entity_type in ('waitlist_lead', 'demo_booking')),
  entity_id bigint not null,
  action text not null,
  actor_user_id uuid references auth.users(id) on delete set null,
  details jsonb,
  created_at timestamptz not null default now()
);

create index if not exists crm_activity_logs_entity_idx
  on public.crm_activity_logs (entity_type, entity_id, created_at desc);

-- Keep updated_at current
drop trigger if exists trg_waitlist_leads_set_updated_at on public.waitlist_leads;
create trigger trg_waitlist_leads_set_updated_at
before update on public.waitlist_leads
for each row
execute function public.set_updated_at();

drop trigger if exists trg_demo_bookings_set_updated_at on public.demo_bookings;
create trigger trg_demo_bookings_set_updated_at
before update on public.demo_bookings
for each row
execute function public.set_updated_at();

-- Useful read model for a simple admin dashboard
create or replace view public.crm_leads_overview as
select
  'waitlist_lead'::text as lead_type,
  wl.id,
  wl.created_at,
  wl.updated_at,
  wl.status,
  wl.full_name as contact_name,
  wl.work_email,
  wl.company_name,
  wl.company_size as size_or_team,
  wl.role as role_or_notes,
  null::date as requested_date,
  null::text as requested_time
from public.waitlist_leads wl
union all
select
  'demo_booking'::text as lead_type,
  db.id,
  db.created_at,
  db.updated_at,
  db.status,
  concat(db.first_name, ' ', db.last_name) as contact_name,
  db.work_email,
  db.company_name,
  db.team_size as size_or_team,
  db.goals as role_or_notes,
  db.requested_date,
  db.requested_time
from public.demo_bookings db;

-- RLS
alter table public.admin_users enable row level security;
alter table public.waitlist_leads enable row level security;
alter table public.demo_bookings enable row level security;
alter table public.crm_activity_logs enable row level security;

-- Public form submissions (website)
drop policy if exists "Public can insert waitlist leads" on public.waitlist_leads;
create policy "Public can insert waitlist leads"
on public.waitlist_leads
for insert
to anon, authenticated
with check (true);

drop policy if exists "Public can insert demo bookings" on public.demo_bookings;
create policy "Public can insert demo bookings"
on public.demo_bookings
for insert
to anon, authenticated
with check (true);

-- Admin-only read/update/delete
drop policy if exists "Admins can manage waitlist leads" on public.waitlist_leads;
create policy "Admins can manage waitlist leads"
on public.waitlist_leads
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can manage demo bookings" on public.demo_bookings;
create policy "Admins can manage demo bookings"
on public.demo_bookings
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can manage CRM logs" on public.crm_activity_logs;
create policy "Admins can manage CRM logs"
on public.crm_activity_logs
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can view admin users" on public.admin_users;
create policy "Admins can view admin users"
on public.admin_users
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can manage admin users" on public.admin_users;
create policy "Admins can manage admin users"
on public.admin_users
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

commit;
