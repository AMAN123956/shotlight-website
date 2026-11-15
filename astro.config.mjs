// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The public URL (custom domain; shotlight.lol redirects to www). SITE_URL overrides it.
const site = process.env.SITE_URL ?? 'https://www.shotlight.lol';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  // Never inline scripts: the Content-Security-Policy in vercel.json only allows same-origin script files.
  vite: { build: { assetsInlineLimit: 0 } },
});
