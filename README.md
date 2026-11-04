# Omkar Nikam — portfolio

Next.js (App Router) · TypeScript · Tailwind v4 · Motion · Lenis · MDX.

```bash
npm install
npm run dev      # http://localhost:3001 (port 3000 is reserved by Windows on some machines)
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

If styles or colours don't update in dev, stop the server, delete `.next/dev`, and start it again.

## Where things live

| What | Where |
|---|---|
| Home page sections | `src/components/` (hero, experience, work, journey, process, contact, about) |
| Case studies (MDX) | `content/work/*.mdx`, served at `/work/[slug]` |
| About page text, photos | `src/lib/about-story.ts`; photos in `public/about/` |
| Projects shown on the home page | `src/components/work/projects.tsx` |
| Colours, type scale | `tokens.css` (motion, radius), `src/styles/theme.css` (teal, light and dark) |
| Theme switch | `src/components/layout/theme-toggle.tsx` (light ↔ dark, saved in the browser) |

## Deploy (Vercel)

1. Import the repo on Vercel; the defaults for Next.js work as they are.
2. Optional: set `NEXT_PUBLIC_SITE_URL` to your domain (see `.env.example`).
3. Web Analytics: enable it in the project's Analytics tab. The `<Analytics />` component is already in `src/app/layout.tsx`.

## Before launch

- Point each project's "Source code" link at its own repo (`src/components/work/projects.tsx`).
- Replace the sample-data app mock-ups in `src/components/work/previews.tsx` with real screenshots, if you have them.
- Case studies are MDX files in `content/work/`. A dashed amber `TODO` / `[placeholder]` chip appears on a case study page wherever one is left in its text.
