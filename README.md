# Mohammed Althaf T K — Portfolio

Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and hand-rolled shadcn-style primitives.

## Run locally

```bash
npm install
npm run dev
```

## Content

All copy lives in one place: `lib/data.ts` (profile, stats, services, experience, education, skills, projects, socials, nav). Edit that file to update anything on the site — no need to touch components. Contact form service options are in `lib/contact-services.ts`.

Your resume PDF is at `public/Mohammed-Althaf_CV.pdf` — the "Download CV" button links there. Swap the file (keep the same name, or update `resumeUrl` in `lib/data.ts`).

The hero currently shows your initials in a placeholder avatar circle (no photo was provided). To use a real photo: drop it in `public/` (e.g. `profile.jpg`) and replace the placeholder `<div>` in `components/sections/hero.tsx` with an `<Image src="/profile.jpg" ... />`.

## Contact form (EmailJS)

The form in `components/sections/contact.tsx` uses `@emailjs/browser`. It's wired up but needs your EmailJS credentials:

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. Add an email service (Gmail is simplest) → copy the **Service ID**.
3. Create an email template with fields matching the form: `first_name`, `last_name`, `reply_to`, `phone`, `service`, `message` → copy the **Template ID**.
4. Under Account → General, copy your **Public Key**.
5. Copy `.env.local.example` to `.env.local` and fill in the three values:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

Without these set, the form will show a friendly error instead of silently failing.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the three `NEXT_PUBLIC_EMAILJS_*` environment variables in the Vercel project settings.
4. Deploy. No other config needed — `next.config.ts` is default.

## Structure

```
app/                  routes, layout, SEO (metadata, sitemap, robots)
components/sections/  Navbar, Hero, Services, Resume, Work, Contact, Footer
components/ui/        hand-built shadcn-style primitives (button, input, select, sheet, tabs, tooltip, etc.)
lib/data.ts           all site content
lib/contact-services.ts  contact form dropdown options
```

## Notes

- shadcn's CLI registry (`ui.shadcn.com`) wasn't reachable from the build sandbox, so the UI primitives in `components/ui/` were hand-written to match shadcn's API/behavior exactly (same props, same Radix primitives underneath). They work identically to `npx shadcn add` output — nothing to redo.
- `lucide-react` is pinned to `0.468.0` — newer major versions dropped brand icons (GitHub, LinkedIn) that this design uses.
