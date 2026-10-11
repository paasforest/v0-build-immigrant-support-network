# Visa assessment leads and staff dashboard

How a visa assessment becomes a lead, how staff are told about it, and how staff
review and manage it. ISN provides overseas visa assistance only; there is no
recruitment or job-placement flow.

## Flow

1. **Form** (`/visa-assessment`, `components/visa-assessment/VisaAssessmentForm.tsx`).
   Five steps with conditional questions, validated in the browser and again on the
   server (`lib/visa-assessment/schema.ts`). Each form session has a random
   `submissionId`, so pressing Submit again after a lost response cannot create a
   second case. An optional Cloudflare Turnstile check runs on the final step.
2. **API** (`POST /api/visa-assessment` → `lib/server/handle-visa-assessment.ts`).
   Rate limit, size cap, validation, honeypot, Turnstile, upload checks (real
   PDF/JPEG/PNG content, 4 MB total). Success (201, or 200 for a repeat of the same
   submission) is returned **only after** the case is stored.
3. **Storage** (`lib/server/case-store/supabase.ts`). The case row in `visa_cases`,
   files in the **private** `case-documents` bucket, each file recorded in
   `visa_case_documents`. If any file fails, everything for that case is removed and
   the applicant is told nothing was saved.
4. **Notifications** (`lib/server/notify.ts`, Resend).
   - Staff alert to `CASE_NOTIFY_EMAIL`: reference, case type, destination, visa
     purpose, travel month, preferred contact method, number of documents, and a link
     to `/admin/cases/<reference>`. **No name, email, phone or free-text answers.**
   - Applicant confirmation: at most 3 per email address per 24 hours.
   - The outcome of each (`sent`, `failed` with a code such as `HTTP_422`/`NETWORK`,
     or `skipped` such as `NOT_CONFIGURED`) is stored on the case and in its history.
5. **Staff dashboard** (`/admin`). Sign-in, lead list with search and filters, case
   page with all answers, documents, notification status, status changes, notes and
   full history.

## Staff access

- **Who:** only addresses in `public.staff_users` with `active = true`.
  ```sql
  insert into public.staff_users (email, name) values ('you@example.org', 'Your Name'); -- lower-case email
  update public.staff_users set active = false where email = 'you@example.org';        -- remove access (immediate)
  ```
- **How:** enter the staff email at `/admin/login`; a one-time link is emailed
  (valid 15 minutes, single use). The link opens a page with a **Sign in** button, so
  email scanners that pre-open links cannot use it up. The form always answers the
  same way, so it does not reveal which addresses are staff.
- **Session:** random 256-bit token in an `HttpOnly`, `SameSite=Lax`, `Secure`
  cookie, valid 12 hours. Only SHA-256 hashes of links and sessions are stored.
  Every page and action re-checks the session and that the staff member is still
  active. Sign-out revokes the session on the server.
- **Changes** (status, notes, retrying an alert) must be posted from the site's own
  pages (Origin check) by a signed-in staff member.
- **Documents** open through `/api/admin/cases/<ref>/documents/<id>`, which checks the
  session and that the document belongs to that case, then redirects to a Supabase
  signed URL valid for **120 seconds**. Every opening is recorded in the case history.
- `/admin` is `noindex`, uncached, never sends a `Referer` to other sites, and has no public navigation,
  WhatsApp button or analytics.

Requires email (Resend) to be configured: without it no sign-in link can be sent.
In local development without Resend, the link is printed to the developer's terminal.

## Case statuses

`new` → `in_review` → `contacted` → `quoted` → `client` → `closed` (any order allowed;
every change is recorded with who made it).

## Configuration

See `.env.example`. Server-only secrets: `SUPABASE_SERVICE_ROLE_KEY`,
`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`. Public: `NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_TURNSTILE_SITE_KEY` (both read at build time).

`NEXT_PUBLIC_SITE_URL` is used for the links in staff emails: on a staging
deployment it **must** be the staging URL, or staging emails will link to production.

Leads received before this release show the staff alert as **Pending** (delivery was
not tracked then), so they also appear under the "Staff alert not confirmed sent" filter.

## Release order

The migration must be applied **before** the code is deployed: the new code cannot
save assessments without the new columns (every submission would fail with "nothing
was saved"). The current code keeps working after the migration, which is what makes
this order and the rollback below safe.

1. **Check prerequisites** (no changes): the production service already has
   `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`; it also needs `RESEND_API_KEY`,
   `NOTIFY_FROM_EMAIL`, `CASE_NOTIFY_EMAIL` and `NEXT_PUBLIC_SITE_URL` (the live
   `https://` address) for alerts and staff sign-in. Turnstile: set both keys or neither.
2. **Migrate**: in the Supabase SQL editor, run the whole of
   `supabase/migrations/20261011000000_lead_pipeline_admin.sql` between `begin;` and
   `commit;`, then run `notify pgrst, 'reload schema';` so the API sees the new columns
   and tables at once. It is additive and safe to run again.
3. **Add staff**: `insert into public.staff_users (email, name) values (...)` (lower-case).
4. **Deploy**: merge the pull request; the host deploys `main`.
5. **Smoke test**: sign in at `/admin/login`; submit one assessment using your own
   email address; confirm it appears with the staff alert **Sent**; open its document.

**Rollback**: revert the merge on `main` (the host redeploys the previous code). Leave
the migration in place: the previous code works with it, and keeping it preserves the
case history and notification records written in the meantime.

## Local development

```bash
CASE_STORE=local npm run dev
```

Cases go to `.data/` (git-ignored). For staff sign-in, create
`.data/staff/users.json`:

```json
[{ "email": "you@example.org", "name": "You", "active": true }]
```

then request a link at `http://localhost:3000/admin/login`; without Resend
configured, the link appears in the terminal running `npm run dev`.

## Tests

`npm test` runs everything locally with mocks: no Supabase project, email or
Cloudflare service is contacted.

- `tests/lead-pipeline.test.ts`: notifications, delivery tracking and failures,
  confirmation limit, duplicate submissions, Turnstile.
- `tests/admin.test.ts`: sign-in, sessions, CSRF, authorisation, status/notes/retry,
  document access, search.
- `tests/supabase-store.test.ts`: the exact Supabase queries (dedupe race, rollback,
  search sanitising, signed URLs, single-use tokens).
