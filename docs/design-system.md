# Design system

## Where things live

| Concern | File |
|---|---|
| Every colour, measure, duration token | `src/styles/globals.css` |
| Contrast gate (runs in `npm run check`) | `scripts/contrast-check.mjs` |
| Profile data / copy | `content/site.ts` |
| Case-study content + schema | `content/projects/*.mdx`, `velite.config.ts` |

## Tokens

All tokens are CSS custom properties declared once on `:root` (light) and
`.dark` (dark), then exposed to Tailwind through `@theme inline`. Components
reference semantic names only — never a raw shade, never a hex, never an
arbitrary colour/type/spacing value. If a value is missing, add a token
rather than working around it.

### Colour

| Token | Utility | Used for |
|---|---|---|
| `background` | `bg-background` | page background |
| `surface` | `bg-surface` | recessed blocks, code blocks |
| `surface-raised` | `bg-surface-raised` | cards, dialogs, sheets |
| `border` / `border-strong` | `border-border` | hairlines, card outlines |
| `foreground` | `text-foreground` | primary text |
| `secondary` | `text-secondary` | body copy, descriptions |
| `tertiary` | `text-tertiary` | metadata, timestamps |
| `accent` | `text-accent` / `bg-accent` | brand teal: links, active nav, primary buttons |
| `accent-foreground` | `text-accent-foreground` | text on an accent fill |
| `accent-subtle` | `bg-accent-subtle` | tinted wash (hover states, CTA panel) |
| `accent-border` | `border-accent-border` | teal hairline |
| `ring` | focus outline | set globally on `:focus-visible` |
| `chart-1…4` | `bg-chart-*` | skill-bar fills only |
| `device-bezel` | `bg-device-bezel` | phone mockup frame |

`device-bezel` is near-black in light mode and deliberately lighter in dark
mode — a phone reads as a dark object either way, but against a dark page it
needs to be lifted off the background to stay a distinct shape. The matching
`--radius-device` / `--radius-device-screen` tokens keep the frame and the
screen it encloses concentric.

`accent-subtle` and `accent-border` exist so components stop guessing at
`accent/10` vs `accent/25` — a fixed opacity of a teal reads differently
against a white page than a near-black one, so each theme states its own.

### Contrast

`npm run contrast` parses the token values straight out of `globals.css` and
fails the build if any text/background pair drops below 4.5:1 in either
theme. There is no second palette file to drift out of sync. Current state:
40 pairs, all passing.

The `chart-*` fills are reported but not gated — they're non-text marks, and
every bar ships beside a written level ("Advanced"), so colour is identity,
never the meaning. Their slot order was checked for colour-vision separation
between adjacent pairs.

### Motion

Tokens: `--duration-reveal` (400ms), `--distance-reveal` (12px),
`--ease-reveal`, `--stagger-step` (60ms).

- Transform and opacity only. Nothing animates a property that triggers
  layout — skill bars grow via `scaleX`, not an animated `width`.
- Stagger delays are declared once as `nth-child` rules in `globals.css`.
  Never hand-type a delay in a component.
- Every reveal rule is scoped to `.js`, which the head script in
  `RootLayout` sets *only* when `IntersectionObserver` exists. Without JS,
  nothing was ever hidden, so nothing needs revealing.
- `prefers-reduced-motion: reduce` switches all of it off.

## Components

| Directory | Contains |
|---|---|
| `ui/` | Button, Badge, Card, Dialog, Sheet — shadcn pattern, `cva` variants, `cn()` merging |
| `layout/` | Container, Section, SectionHeader, Header, Footer, NavLinks, Prose |
| `motion/` | Reveal, Stagger, PageTransition, `useInView` |
| `content/` | ProjectCard, SkillBar, TableOfContents, CodeBlock, MDXContent |
| `features/` | CommandMenu, ThemeToggle, MobileNav, CopyEmailButton, ThemeProvider |

Conventions: named exports, `PascalCase.tsx`, colocated types, `kebab-case.ts`
in `lib/`.

`"use client"` appears only where interactivity demands it, as deep in the
tree as possible. `Header` is a server component that runs the content query
and passes only a minimal index into the client `CommandMenu`.

## Accessibility

- 44×44px minimum touch target. `min-h-11 min-w-11` sits in the Button base
  rather than its size variants, so even `size="sm"` clears it — min-height
  wins over a smaller height. The `link` variant opts out, since an inline
  text link is exempt and shouldn't reserve a box.
- Every interactive element has hover, active and focus-visible states.
  `:focus-visible` gets a token ring globally, so even unstyled controls
  are covered.
- Overlays (command menu, mobile nav) are Radix Dialog underneath — focus
  trapping, escape handling and scroll locking are not hand-rolled.
- Skill bars expose `role="progressbar"` with `aria-valuenow` and an
  `aria-valuetext` naming the level.

## Performance

- Every route is statically rendered.
- `cmdk` is dynamically imported and only enters the bundle on intent —
  hover, focus, click or ⌘K — never on first load.
- Images go through `next/image` with real dimensions; the hero avatar is
  `priority`, everything below the fold is lazy.
