-- Immigrant Support Network: visa case intake storage.
-- Run once in the Supabase SQL editor (or with `supabase db push`).
--
-- Security model:
--   * All tables have row-level security ENABLED and NO policies, so the public
--     (anon) and logged-in (authenticated) API roles can neither read nor write.
--   * The website writes through the service-role key on the server only.
--   * Documents go to a PRIVATE storage bucket; staff open them from the Supabase
--     dashboard or via short-lived signed URLs. Nothing is publicly reachable.

-- Case references: ISN-<year>-<6-digit number>, e.g. ISN-2026-000123
create sequence if not exists public.visa_case_number_seq;
create sequence if not exists public.contact_enquiry_number_seq;

create table if not exists public.visa_cases (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default (
    'ISN-' || to_char(timezone('Africa/Johannesburg', now()), 'YYYY') || '-' ||
    lpad(nextval('public.visa_case_number_seq')::text, 6, '0')
  ),
  created_at timestamptz not null default now(),
  status text not null default 'new'
    check (status in ('new', 'in_review', 'contacted', 'quoted', 'client', 'closed')),
  case_type text not null,
  destination text not null,
  destination_country text,
  visa_type text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  phone_is_whatsapp boolean,
  preferred_contact text,
  nationality text,
  residence_country text,
  -- Full (pruned) assessment answers, including case-specific details
  answers jsonb not null,
  -- Consent wording version + the three confirmations + timestamp
  consent jsonb not null,
  staff_notes text
);

create index if not exists visa_cases_created_at_idx on public.visa_cases (created_at desc);
create index if not exists visa_cases_status_idx on public.visa_cases (status);

create table if not exists public.visa_case_documents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.visa_cases (id) on delete cascade,
  created_at timestamptz not null default now(),
  slot text not null check (slot in ('caseDocument', 'jobOffer')),
  storage_path text not null unique,
  original_name text,
  content_type text not null,
  size_bytes integer not null
);

create index if not exists visa_case_documents_case_idx on public.visa_case_documents (case_id);

create table if not exists public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default (
    'ISN-MSG-' || to_char(timezone('Africa/Johannesburg', now()), 'YYYY') || '-' ||
    lpad(nextval('public.contact_enquiry_number_seq')::text, 6, '0')
  ),
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'replied', 'closed')),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  consent jsonb not null
);

alter table public.visa_cases enable row level security;
alter table public.visa_case_documents enable row level security;
alter table public.contact_enquiries enable row level security;

revoke all on public.visa_cases, public.visa_case_documents, public.contact_enquiries from anon, authenticated;
revoke all on sequence public.visa_case_number_seq, public.contact_enquiry_number_seq from anon, authenticated;

-- Private bucket for case documents (4 MB limit, PDF/JPEG/PNG only)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('case-documents', 'case-documents', false, 4194304, array['application/pdf', 'image/jpeg', 'image/png'])
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
