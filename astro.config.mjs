// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The public URL. Vercel URL for now; set SITE_URL (or change the default) when a domain is added.
const site = process.env.SITE_URL ?? 'https://shotlight-website.vercel.app';

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
