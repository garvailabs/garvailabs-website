# GARV AI LABS — website

Marketing site for GARV AI LABS: AI-native systems that declutter operations, unite disconnected
systems and turn data into decisive action. Built from Noida, Uttar Pradesh.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

If `npm install` or the font fetch during `next build` stalls, this machine resolves
`registry.npmjs.org` and Google Fonts over IPv6 first and hangs. Force IPv4 — with an absolute
path to your checkout, since npm starts child processes in other folders and a relative path fails:

```powershell
$env:NODE_OPTIONS='--require "E:/Projects/garvailabs-website/scripts/ipv4-preload.cjs"'
```

## Stack

Next.js 15 (App Router, `src/app`) · TypeScript strict · Tailwind CSS v4 · Framer Motion ·
lucide-react · Inter via `next/font`. No CMS, no database, no auth.

## Routes

| Route | |
| --- | --- |
| `/` | Hero, results, services, case studies, how we work, why us, industries, FAQ, contact |
| `/services` | All six services |
| `/services/[slug]` | One page each — 6 pages, statically generated |
| `/work` | All five case studies |
| `/work/[slug]` | One page each — 5 pages, statically generated |
| `/about` | Who we are, how we work, sectors, contact |
| `/contact` | Enquiry form |
| `not-found` | Branded 404 |

Sixteen routes in total, every one pre-rendered as static HTML.

## Design system

Tailwind v4 is CSS-first — there is **no `tailwind.config.ts`**. Every token lives in
`src/app/globals.css` on `:root`, exposed to Tailwind through `@theme inline`.

```
--bg      #FCFBF8 (ivory)   --soft  #F5F2EC (sand)   --surface #FFFFFF
--text    #1C1917           --muted #57534E          --border  #E8E2D8
--accent  #EE6352 (brand)   --second #0F766E (teal)  --dark    #0C2925 (footer only)
```

Orange is the action colour: buttons, section kickers, key numbers. Teal is the quiet second colour:
icons, the hero pill, result bullets, the services card wash. Keep them in those roles.

`#EE6352` is the real brand orange, taken from the live garvailabs.com logo and stylesheet
(`#D85545` is its darker state). Two derived tokens exist for accessibility reasons worth knowing:

- **`--accent-text` `#B9412E`** — `#EE6352` as text on the page ground measures about **3:1**,
  under the 4.5:1 minimum. Orange fills buttons and marks; this darker shade (~4.7:1 even on the sand
  bands) is what orange type uses. Never set body text in raw `--accent`.
- **`--on-accent` `#2A0F0A`** — white on the brand orange is only ~3.2:1, near-black is ~5.9:1. Text
  sitting on an orange fill is dark, not white.

Type runs on one scale (`text-2xs` 11px → `text-7xl`, the hero headline only) defined in `@theme`;
there are no arbitrary `text-[Npx]` values in components. Everything is set in Inter (Syne was
dropped earlier — its descenders clip on Windows). Large headings take `.tight` or `.display` for
tighter leading and tracking; set them through those classes, because the base heading rule's
`!important` beats any utility. `.label-mono` (system monospace) is for the hero demo's readouts only.

**Look:** all light and warm, with centred section headers (`SectionHeading`: tracked orange
`.eyebrow`, bold title, grey subtitle) and one card style (`.card`: white fill, hairline warm border,
soft shadow; `.card-tint` adds a faint teal wash). Icons are teal line icons (`CardIcon`). Bands
alternate ivory and sand (`bg-soft`); the deep teal-green appears only in the footer.

## Content

All copy lives in `src/lib/`, not in JSX:

- **`work.ts`** — the five case studies, taken from garvailabs.com/case-studies. Problems,
  solutions and every quoted metric are real. Keep them accurate.
- **`services.ts`** — the six services. **Services 1–4 are grounded in the live site's content.
  SEO and GEO are not on the live site** — that copy was written fresh and is flagged with
  `isNewCopy: true`. Review both before launch.
- **`site.ts`** — contact details, from garvailabs.com/contact-us.
- **`content.ts`** — the four engagement steps, the four principles (homepage "Why GARV AI LABS" and
  the about page) and the sector list.
- **`trust.ts`** — the homepage FAQ (every answer restates something the site already says), plus
  `team` and `testimonials`, which are **empty on purpose**: they must be real people and real
  quotes. Their sections appear once an entry is added.

Case studies have no screenshots yet. Add `image: { src, alt }` to an entry in `work.ts` (file under
`/public`) and it appears at the top of that project's card and on its case page.

The logo in `public/garvai-logo.png` is the real mark from the live site. It cannot be reused on
dark grounds (its "AI LABS" lettering is black and inverting it flattens the dotted-g out of the
orange tile), so `wordmark.tsx` renders a typographic variant there instead.

## Mobile

Built mobile-first and verified from 375px. The nav becomes a full scrollable sheet with the six
services expanded inline, so no menu is more than one tap deep; it traps Tab, closes on Escape and
restores focus to its toggle. Every tap target is ≥ 44px, and wide content scrolls in its own
container so the page body never scrolls sideways.

## Motion

Three effects only: reveal on scroll, the hero's seed-grading animation (`grading-demo.tsx`) and
hover states. The cursor glow, 3D tilt, parallax drift, spotlight cards and magnetic buttons were
removed in the redesign, as was the first-visit logo intro (it covered an already-painted page and
locked scrolling for ~4 s). The case-study side menu follows scroll position with an
IntersectionObserver; it moves nothing. The hero demo has a pause button (WCAG 2.2.2).

The hero and header never start invisible: the hero fades in with a CSS animation (`.hero-in`), and
the header has no entrance animation. A framer `initial` would server-render them at `opacity: 0`,
leaving the page blank whenever JavaScript is slow or blocked.

Section reveals are a CSS transition (`.rise`) that a small IntersectionObserver in `ui/rise.tsx`
switches on by flipping `data-shown`. Keeping the transition in CSS is deliberate: it lets
`prefers-reduced-motion` and `@media (scripting: none)` override it with no JavaScript running, so
the page is never left invisible when scripts are blocked.

## Metadata

`app/icon.png`, `app/opengraph-image.tsx`, `app/robots.ts` and `app/sitemap.ts` are Next file
conventions. `favicon.ico` and `apple-icon.png` live only in `public/` (listed in `metadata.icons`) —
a copy in both `app/` and `public/` makes Next return 500 for that URL in dev. The icons are
cropped from the real logo's dotted-g tile; the share card is drawn from the design tokens at build
time with system fonts only, so it cannot drift from the site and the build stays offline-safe. The
sitemap is generated from the same `services` and `caseStudies` arrays the pages render, so a new
entry cannot be added without appearing in it.

## Before launch

- **Review the SEO and GEO service copy** — it describes services the live site does not currently
  advertise, so the claims are ours to check, not GarvAILabs'.
- The contact form has no backend. It validates, composes the email and hands it to the visitor's
  own mail client; the confirmation says plainly that pressing send is what delivers it. Wiring it
  to an inbox or CRM is a separate decision.
- The live site's current tagline, "When legacy holds you back, intelligence leads you forward,"
  is **not** used here — the hero reads "Intelligence that finishes the work." Worth a deliberate
  decision either way.
