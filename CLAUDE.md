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

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read the antislop core filter and then the skill for the task. The skills live in `~/.agents/skills/` (also mirrored in `~/.claude/skills/`):
- Core filter: `~/.agents/skills/antislop/SKILL.md`
- UI / visual: `~/.agents/skills/antislop-ui/SKILL.md`
- Copy & text: `~/.agents/skills/antislop-copywriting/SKILL.md`
- People: `~/.agents/skills/antislop-human/SKILL.md`
- Mobile / responsive: `~/.agents/skills/antislop-layoutmobile/SKILL.md`
- Code comments: `~/.agents/skills/antislop-code/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins. For a resolved mode, say `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once before presenting findings or making edits, using the actual mode and source. Acknowledging the user's request without naming the source does not replace this notice.
Only an explicit choice of antislop during or after selects a session mode. A request to review, audit, or avoid file edits does not select a mode; read the global preference in that case. Another skill's mode does not select antislop's mode.
If the mode is unresolved, ask during/after and end the response; wait for the answer before any UI review, planning, or concept. For read-only tasks, put the active-mode notice only at the start of the final answer, never in progress messages. For editing tasks, announce before the first edit and omit it from the final answer.
To update antislop later: run `npx antislop-ai --update` (installer route) or `npx skills update -g` (skills-directory route).
<!-- antislop:end -->