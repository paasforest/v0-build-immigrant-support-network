-- Immigrant Support Network: lead pipeline and staff admin dashboard.
-- Additive only: no existing column or row is changed or dropped.
-- Apply AFTER 20261007000000_visa_cases.sql, first on a staging project.
--
-- Security model (unchanged): every table has row-level security ENABLED and NO
-- policies, and the public API roles are revoked, so only the server (service-role
-- key) can read or write. Staff sign in through the website's own login, which
-- checks the staff_users allow-list below.

-- ---------------------------------------------------------------------------
-- Cases: duplicate protection and notification tracking
-- ---------------------------------------------------------------------------
alter table public.visa_cases
  -- Generated once per form session in the browser; a retried submission returns
  -- the existing case instead of creating a second one.
  add column if not exists submission_id uuid unique,
  add column if not exists updated_at timestamptz not null default now(),
  add column if not exists staff_notify_status text not null default 'pending'
    check (staff_notify_status in ('pending', 'sent', 'failed', 'skipped')),
  add column if not exists staff_notified_at timestamptz,
  -- Short error code only (e.g. HTTP_422, NETWORK, NOT_CONFIGURED); never message bodies.
  add column if not exists staff_notify_error text,
  add column if not exists applicant_notify_status text not null default 'pending'
    check (applicant_notify_status in ('pending', 'sent', 'failed', 'skipped')),
  add column if not exists applicant_notified_at timestamptz,
  add column if not exists applicant_notify_error text;

create index if not exists visa_cases_email_lower_idx on public.visa_cases (lower(email), created_at desc);
create index if not exists visa_cases_staff_notify_idx on public.visa_cases (staff_notify_status) where staff_notify_status <> 'sent';

-- ---------------------------------------------------------------------------
-- Case activity history (append-only)
-- ---------------------------------------------------------------------------
create table if not exists public.visa_case_events (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.visa_cases (id) on delete cascade,
  created_at timestamptz not null default now(),
  -- 'system' or the signed-in staff member's email address
  actor text not null,
  type text not null check (type in (
    'created', 'duplicate_submission', 'staff_notification', 'applicant_confirmation',
    'status_changed', 'note_added', 'document_viewed'
  )),
  data jsonb not null default '{}'::jsonb
);

create index if not exists visa_case_events_case_idx on public.visa_case_events (case_id, created_at);

create or replace function public.reject_visa_case_event_change() returns trigger
language plpgsql as $$
begin
  raise exception 'visa_case_events is append-only';
end;
$$;

-- History rows are never edited. (Rows are removed only together with their case,
-- through the foreign key's ON DELETE CASCADE; the website never deletes cases.)
drop trigger if exists visa_case_events_append_only on public.visa_case_events;
create trigger visa_case_events_append_only
  before update on public.visa_case_events
  for each row
  execute function public.reject_visa_case_event_change();

-- ---------------------------------------------------------------------------
-- Staff access: allow-list, one-time sign-in links and sessions
-- ---------------------------------------------------------------------------
create table if not exists public.staff_users (
  email text primary key check (email = lower(email) and position('@' in email) > 1),
  name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Only SHA-256 hashes of tokens are stored; the token itself exists only in the email/cookie.
create table if not exists public.staff_login_tokens (
  token_hash text primary key check (token_hash ~ '^[0-9a-f]{64}$'),
  email text not null references public.staff_users (email) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  used_at timestamptz
);

create table if not exists public.staff_sessions (
  token_hash text primary key check (token_hash ~ '^[0-9a-f]{64}$'),
  email text not null references public.staff_users (email) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz
);

create index if not exists staff_login_tokens_expires_idx on public.staff_login_tokens (expires_at);
create index if not exists staff_sessions_expires_idx on public.staff_sessions (expires_at);

alter table public.visa_case_events enable row level security;
alter table public.staff_users enable row level security;
alter table public.staff_login_tokens enable row level security;
alter table public.staff_sessions enable row level security;

revoke all on public.visa_case_events, public.staff_users, public.staff_login_tokens, public.staff_sessions
  from anon, authenticated;

-- To give a staff member access (run in the SQL editor; use a lower-case address):
--   insert into public.staff_users (email, name) values ('you@example.org', 'Your Name');
-- To remove access immediately:
--   update public.staff_users set active = false where email = 'you@example.org';
