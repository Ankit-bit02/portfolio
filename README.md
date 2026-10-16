# Ankit Karna · Portfolio

Personal portfolio built with **SvelteKit (Svelte 5) + TypeScript**, deployed on **Vercel**.
The contact form sends real email through **Resend**.

## Quick start

```bash
npm install
cp .env.example .env      # then fill in your Resend key and emails
npm run dev               # http://localhost:5173
```

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Local dev server with hot reload     |
| `npm run check`   | Type-check all `.ts` and `.svelte`   |
| `npm run build`   | Production build (Vercel output)     |
| `npm run preview` | Serve the production build locally   |

## Pages

| URL                     | File                                       | Notes                                        |
| ----------------------- | ------------------------------------------ | -------------------------------------------- |
| `/`                     | `src/routes/+page.svelte`                  | All home sections, `#about`, `#skills` …     |
| `/projects/<slug>`      | `src/routes/projects/[slug]/+page.svelte`  | One case study per project, prerendered      |
| any unknown URL         | `src/routes/+error.svelte`                 | 404 / error page                             |

## Where to edit what

**Text and data never live inside components.** Everything you'd normally change is in `src/content/`.

| I want to change…                                   | Edit                                   |
| --------------------------------------------------- | -------------------------------------- |
| Name, email, GitHub/LinkedIn, SEO title, footer     | `src/content/site.ts`                  |
| Hero headline, about paragraphs, contact heading    | `src/content/home.ts`                  |
| Header links                                        | `src/content/navigation.ts`            |
| Projects (cards **and** case study pages)           | `src/content/projects.ts`              |
| Skills list and which project each links to         | `src/content/skills.ts`                |
| Engineering Practices tab content                   | `src/content/practices.ts`             |
| API Explorer endpoints / sample responses           | `src/content/api-explorer.ts`          |
| Engineering Notes                                   | `src/content/notes.ts`                 |
| "Anatomy of a request" animation steps              | `src/content/request-flow.ts`          |
| Colors, fonts, spacing (whole site)                 | `src/app.css` → `:root` tokens         |
| Case study section order / titles                   | `src/lib/case-study.ts`                |
| Contact form rules (min length, messages)           | `src/lib/validation/contact.ts`        |
| Where contact emails go / email format              | `.env` + `src/lib/server/email.ts`     |
| Résumé PDF                                          | `static/documents/resume.pdf` + `resumeAvailable` in `site.ts` |

Every file starts with a comment block explaining what it does and how to change it.

## Project structure

```
src/
├── app.css                      Design tokens + global styles
├── app.html                     HTML shell
├── content/                     ← ALL editable copy and data
│   ├── site.ts                  identity, links, SEO
│   ├── home.ts                  hero / about / contact copy
│   ├── navigation.ts            header links + section ids
│   ├── projects.ts              projects + case studies
│   ├── skills.ts  practices.ts  notes.ts  api-explorer.ts  request-flow.ts
├── lib/
│   ├── types.ts                 shared TypeScript types
│   ├── case-study.ts            builds case study sections from a project
│   ├── contact-result.ts        contact form response shape (client ⇄ server)
│   ├── validation/contact.ts    contact rules, shared by browser + server
│   ├── state/ui.svelte.ts       overlay + active-section state (context)
│   ├── utils/                   clipboard, scroll-spy
│   ├── server/                  server-only: email.ts (Resend), rate-limit.ts
│   └── components/
│       ├── layout/              Header, Footer
│       ├── overlays/            CommandPalette (⌘K), ResumeModal
│       ├── ui/                  CodeBlock, SectionHeader, StatusBadge
│       ├── home/                one component per home section
│       │   └── practices/       one component per practices tab
│       └── case-study/          CaseHero, CaseToc, CaseSection, ProjectPager
└── routes/
    ├── +layout.svelte           header/footer/overlays, keyboard shortcuts
    ├── +page.svelte             home page
    ├── +page.server.ts          contact form action
    ├── +error.svelte            404 / error page
    └── projects/[slug]/         case study route (+page.ts loads, +page.svelte renders)
```

## Contact form

Flow: `ContactForm.svelte` → `?/contact` action in `src/routes/+page.server.ts` → `src/lib/server/email.ts` → Resend → your inbox.

- **Progressive enhancement**: works with JS disabled (normal form post); with JS it submits without reloading.
- **Same validation on both sides** (`src/lib/validation/contact.ts`).
- **Spam protection**: hidden honeypot field + per-IP rate limit (5 messages / 10 min, best-effort on serverless).
- **Reply directly**: emails set `Reply-To` to the visitor's address.

### Setting up Resend

1. Sign up at [resend.com](https://resend.com) and create an API key.
2. For a quick test, use `CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>`. Resend only delivers these test emails to the address you signed up with.
3. For production, verify your own domain in Resend and use e.g. `Portfolio <contact@yourdomain.com>`.

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project → import the repo**. The SvelteKit preset is detected automatically.
3. **Settings → Environment Variables**: add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
4. Deploy. Case study pages are prerendered to static HTML; the home page and contact action run as a Node function.

> The build prints a warning that `@react-email/render` can't be found. That's an optional
> Resend dependency for React email templates, which this project doesn't use, so it's safe to ignore.

## Before publishing

- [ ] Replace `you@example.com` in `src/content/site.ts`
- [ ] Replace every "Add:" placeholder and draft claim in `src/content/projects.ts`, then clear each `notice` (set it to `''`)
- [ ] Add `static/documents/resume.pdf` and set `resumeAvailable: true`
- [ ] Fill in experience/education in `src/lib/components/overlays/ResumeModal.svelte`
