# Fahad Morshed — Portfolio

Dynamic personal portfolio for **Fahad Morshed** (Software Engineer · AI Researcher), built with:

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — dark glassmorphism theme
- **Framer Motion** — scroll reveals, 3D tilt project cards, animated counters, scroll-progress bar
- **Remotion** (`@remotion/player`) — looping motion-graphics intro rendered live in the hero

## Getting started

```bash
npm install
npm run dev      # development at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Structure

- `src/data/resume.ts` — all resume content in one typed file; edit this to update the site
- `src/remotion/IntroComposition.tsx` — the Remotion hero animation (name reveal, cycling roles, tech ticker, particles)
- `src/components/` — Navbar, Hero, About, Experience, Projects, Research, Skills, Credentials, Contact

## Customising

All text, projects, skills, and links live in `src/data/resume.ts` — no component changes needed for content updates. Section accent colors are set per project via the `accent` gradient field.
