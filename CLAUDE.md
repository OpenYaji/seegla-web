# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Next.js dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

There is no test suite configured.

## Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript 5 strict mode**
- **TailwindCSS 4** for styling — use utility classes, not styled-components for new code
- **shadcn/ui** (Radix UI) — 54 pre-built components live in `components/ui/`
- **Supabase** — PostgreSQL database + auth. Two client variants exist: `lib/supabase/client.ts` (browser) and `lib/supabase/server.ts` (RSC/API routes)
- **react-hook-form** for all form handling
- **Recharts** for charts/analytics
- **Sonner** for toast notifications

## Architecture

### App Router layout

```
app/
├── page.tsx              # Marketing landing page
├── layout.tsx            # Root layout (Geist fonts, ThemeProvider)
├── admin/                # Protected admin CRM dashboard
│   ├── dashboard/        # Analytics + lead management
│   ├── login/            # Admin auth gate
│   └── layout.tsx        # Admin-scoped layout
├── book-a-demo/          # Demo booking flow
├── waitlist/             # Waitlist signup
└── api/                  # API routes (admin/, book/, waitlist/)
```

### Supabase / auth pattern

- Auth is handled via Supabase with an `admin_users` table that gates access to `/admin/*`
- The `public.is_admin()` SQL function (defined in `supabase/simple_admin_crm.sql`) is used in RLS policies — only users in `admin_users` can read/write CRM data
- Run `supabase/simple_admin_crm.sql` in the Supabase SQL editor to initialize the schema
- Middleware (`lib/supabase/middleware.ts`) handles session refresh on every request

### Database schema (key tables)

- `admin_users` — maps Supabase `auth.users` to CRM admin access (`admin` or `viewer` role)
- `waitlist_leads` — captures marketing signups with status workflow: `new → contacted → qualified → converted → archived`
- `demo_bookings` — demo request submissions

### Path alias

`@/*` maps to the project root. Use `@/components/...`, `@/lib/...`, `@/hooks/...` etc.

## WAT Framework (AgenticWorkflow/)

The `AgenticWorkflow/` directory contains an AI-assisted automation framework separate from the Next.js app:

- **`workflows/`** — Markdown SOPs describing tasks step by step
- **`tools/`** — Python scripts for deterministic execution (API calls, data ops)
- **`AGENTS.md`** — Instructions for agent behavior within this framework

When working on automation tasks: check `tools/` for existing scripts before writing new ones, and update the relevant workflow after making changes. Credentials for these tools live in `AgenticWorkflow/.env` (not the Next.js `.env.local`).