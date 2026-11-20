// @ts-check
import fs from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The public URL (custom domain; shotlight.lol redirects to www). SITE_URL overrides it.
const site = process.env.SITE_URL ?? 'https://www.shotlight.lol';

// /guides and /compare are listed in the sitemap only once at least one entry is published (not a draft).
const entries = (dir) => (fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => fs.readFileSync(`${dir}/${f}`, 'utf8')) : []);
const hasGuides = entries('./src/content/guides').some((t) => !/^draft:\s*true\s*$/m.test(t));
const hasCompare = entries('./src/content/compare').some((t) => /^draft:\s*false\s*$/m.test(t));

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => !(/\/guides$/.test(page) && !hasGuides) && !(/\/compare$/.test(page) && !hasCompare),
    }),
  ],
  devToolbar: { enabled: false },
  // Never inline scripts: the Content-Security-Policy in vercel.json only allows same-origin script files.
  vite: { build: { assetsInlineLimit: 0 } },
});
