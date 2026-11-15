# Shotlight website

The public site for [Shotlight](https://github.com/AMAN123956/shotlight-releases), the Mac app that names every
screenshot and finds it by the words inside. Static [Astro](https://astro.build) site, deployed on Vercel.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run preview
```

## Rules

- **One third party: Microsoft Clarity** (visit analytics, disclosed on `/privacy`). No other external scripts,
  fonts or embeds. Fonts are self-hosted (`@fontsource/geist-sans`, `@fontsource/geist-mono`). `vercel.json` sets a
  Content-Security-Policy that allows same-origin resources plus Clarity's domains, and `astro.config.mjs` stops Vite
  from inlining scripts so the CSP holds.
- **Analytics** live in `src/lib/analytics.ts`. Clarity (project ID in that file) loads only on `www.shotlight.lol` /
  `shotlight.lol`, never on localhost or Vercel preview deployments. Events: give an element
  `data-track="name"` (Download buttons use `cta_download_<where>`; the real `.dmg` link is `download_dmg`). Landing
  sections carry `data-section="name"` for `view_<name>` and `demo_<name>` events. Nav, footer, chapter, outbound
  links and FAQ answers are recorded automatically. The full event list is at the top of `analytics.ts`.
- **Don't advertise what isn't built.** Check `docs/PRODUCT.md` in the app repo before adding a feature to the copy.
- **Every Download button goes to `/download`**, so people see the first-open steps. Only `/download` links to the
  `.dmg` (`src/lib/links.ts`).
- Design source: board 07 of the Shotlight design canvas. Tokens and motion are in `src/styles/global.css`.

## Map

```
src/pages/            index (landing), download, privacy, support, changelog, 404
src/components/landing/  one component per landing section; demos are small <script> islands (plain TS)
src/data/release.json    the current version shown on /download (written by the app's scripts/release.sh)
src/data/pricing.json    the designed pricing tiers, not shown while Shotlight is free (PricingTiers.astro)
src/content/changelog/   one Markdown file per release
public/               favicon, apple-touch-icon, og.png, robots.txt
```

## Releasing a new app version

After `scripts/release.sh X.Y.Z` in the app repo has published the GitHub Release:

1. Copy `build/release-X.Y.Z.json` from the app repo to `src/data/release.json`.
2. Add `src/content/changelog/X.Y.Z.md` (front matter: `version`, `date`, `summary`; body: the release notes).
3. Commit and push. Vercel deploys `main`.

The `/download` button uses GitHub's `releases/latest/download/Shotlight.dmg` link, so it never needs editing.

## Domain

https://www.shotlight.lol (Vercel; `shotlight.lol` redirects to `www`). The old `shotlight-website.vercel.app` and
`shotlight-sand.vercel.app` addresses redirect there (`vercel.json`). The URL is set in `astro.config.mjs` (`SITE_URL`
overrides it) and in the sitemap line of `public/robots.txt`.
