# momen-portfolio

Personal site for Momen Ahmed — Mobile Application Developer & Systems Analyst.

Next.js 16 (App Router, RSC, static by default) · TypeScript strict · Tailwind
CSS v4 · Velite for typed content · Radix primitives · static export on
GitHub Pages.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script | Does |
|---|---|
| `npm run dev` | dev server, with Velite watching `content/` |
| `npm run build` | production build |
| `npm run check` | lint + typecheck + contrast gate — run before pushing |
| `npm run contrast` | contrast gate on its own |

## Layout

```
src/app/            routes
src/components/
  ui/               primitives — Button, Badge, Card, Dialog, Sheet, DeviceFrame
  layout/           Container, Section, SectionHeader, Header, Footer, Prose
  motion/           Reveal, Stagger, PageTransition
  content/          ProjectCard, SkillBar, ScreenshotGallery, TOC, MDXContent
  features/         CommandMenu, ThemeToggle, MobileNav, CopyEmailButton
src/lib/            utils, metadata, content queries
src/styles/         globals.css — every design token
content/
  projects/         case studies (*.mdx) + their images
  site.ts           profile data
docs/               design system + IA notes
scripts/            contrast gate
```

## Content

Profile data lives in `content/site.ts`. Case studies are MDX in
`content/projects/`, typed and validated by `velite.config.ts` — add a file,
and it appears on `/projects`, in the command menu and in the sitemap on the
next build.

Two rules the codebase holds itself to, both documented in `docs/`:

- **Nothing is invented.** Fields a source left blank are omitted rather than
  filled with placeholders, and components render around their absence. No
  testimonials, logos or metrics appear unless they're real.
- **Slugs are permanent.** Renaming a published case study means adding the
  old → new pair to `slugRedirects` in `next.config.ts`, not just editing
  frontmatter.

## Design system

Every colour, measure and duration is a token in `src/styles/globals.css`.
`npm run contrast` parses that file directly and fails the build if any
text/background pair drops below 4.5:1 in either theme — there's no second
palette file to drift out of sync.

See [`docs/design-system.md`](docs/design-system.md) and
[`docs/ia-notes.md`](docs/ia-notes.md).

## Deployment

Deployed to **GitHub Pages** as a static export, built and published by
`.github/workflows/deploy.yml` on every push to `main`. Live at
<https://mohamed-mamoun.github.io/momen-portfolio/>.

Because Pages has no Node runtime, the site is built with `output: "export"`.
That has consequences worth knowing before changing things:

- **No image optimizer.** `images.unoptimized` is on, so source images are
  served exactly as committed — keep them near their display size and in a
  modern format, because nothing downstream will shrink them.
- **`next/image` doesn't apply the basePath** to unoptimized sources, so
  content images must go through `assetPath()` from `src/lib/paths.ts`.
  Skipping it 404s the image on the deployed sub-path while working locally.
- **No redirects.** `redirects()` needs a server, so a published case-study
  slug genuinely can't be renamed without breaking its URL.
- **Metadata images are plain files** in `public/` rather than the
  `opengraph-image`/`icon` file conventions, which emitted sub-path-less URLs
  and extensionless files a static host can't type correctly. `public/og.png`
  is a committed render — regenerate it by hand if the hero copy changes.

### Moving to a custom domain

Set `NEXT_PUBLIC_BASE_PATH=""` and `NEXT_PUBLIC_SITE_URL=https://yourdomain`.
Both default to the Pages sub-path; no domain is hardcoded in components.
