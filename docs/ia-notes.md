# Information architecture

## Routes

| Route | Purpose |
|---|---|
| `/` | Anchor line, stats, and a teaser for every section below |
| `/about` | Career narrative, education, certifications |
| `/projects` | All case studies — honest empty state while none exist |
| `/projects/[slug]` | One case study. A real, indexable, statically rendered URL |
| `/experience` | Work history, reverse chronological |
| `/skills` | Proficiency bars + the full grouped breakdown |
| `/contact` | Email (mailto + copy), location |
| `/uses` | The build stack behind the work |
| `/now` | Current focus, dated |

Plus `sitemap.xml`, `robots.txt`, a generated `opengraph-image`, and a
generated monogram `icon`.

**No `/blog`, no RSS, no MDX post collection.** The command menu indexes
`allNav` + published projects and nothing else, so there is no article-shaped
content that could leak into it.

### Case studies are never modals

`/projects/[slug]` is a real route with its own metadata, canonical URL and
static params. Linkable content never lives behind local component state.

### Slugs are permanent

`s.slug("projects")` enforces uniqueness at build time. Renaming a published
slug breaks a URL someone may have shared.

On GitHub Pages there is no recovery from that. `redirects()` requires a
Node server and is unsupported under `output: "export"`, so a renamed slug
simply 404s — the old redirect map was removed when the site moved to Pages.
Treat a published slug as immutable. If one genuinely must change, the only
option is leaving a page at the old path that forwards to the new one.

## Content integrity

`content/site.ts` is transcribed from Momen's resume and is the only source
of profile facts.

- **Nothing is invented.** Fields the resume itself left blank — phone,
  LinkedIn, the telemarketing employer's name — are omitted, not filled with
  placeholders. Components render conditionally around their absence
  (`entry.company`, `site.socials`, `project.cover`, `project.links`).
- **No testimonials, client logos, press or usage metrics** appear anywhere,
  because none exist yet. There are no fields for them and no "coming soon"
  blocks standing in for them. When real ones exist they get added to
  `site.ts`.
- **`stats` restate facts already in the file** — the ERP role's dates, the
  diploma's stated hours, the certified English level — rather than making
  fresh claims.
- **Skill levels are labelled as what they are:** a rough ordering derived
  from what the resume evidences (paid years outrank a finished short
  course), stated as such on `/skills` rather than presented as measurement.
- **`/projects` ships an honest empty state.** No placeholder cards, and no
  "coming soon" entry in primary navigation — the route is real and explains
  itself.

## Adding a case study

1. Create `content/projects/<slug>.mdx` with frontmatter: `title`, `slug`,
   `summary`, `date`, `role`, `period`, `stack`, optional `links`/`cover`,
   optional `featured`, optional `draft`.
2. Write the body in first person — the problem, the decision, the
   trade-off, what you'd choose now. Headings become the page's TOC
   automatically.
3. It appears on `/projects`, in the command menu and in the sitemap on the
   next build. `featured: true` also surfaces it on the home page.
