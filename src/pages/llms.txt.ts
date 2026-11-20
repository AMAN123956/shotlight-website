import type { APIRoute } from 'astro';
import { publishedGuides } from '../lib/content';
import release from '../data/release.json';
import { RELEASES_PAGE } from '../lib/links';

// A plain-text map of the site for AI assistants and crawlers (https://llmstxt.org). It is built from the same
// data as the pages, so the version and the guide list never go stale. Keep every claim true to the app.
export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL('https://www.shotlight.lol')).href.replace(/\/$/, '');
  const guides = await publishedGuides();
  const lines = [
    '# Shotlight',
    '',
    '> Shotlight is a free Mac app that names every screenshot the moment you take it and finds any of them by the words inside. Everything runs on your Mac. It has no networking code, no account and no analytics.',
    '',
    `Version ${release.version}. Requires macOS ${release.minMacOS} or later (${release.arch}). Free while in early access, with every feature in every copy. ${release.signed ? '' : 'The current build is not signed by Apple yet, so macOS asks for a confirmation the first time it opens.'}`.trim(),
    '',
    '## Product',
    `- [What is Shotlight](${base}/what-is-shotlight): what the app does, who it is for, what it needs and what it costs`,
    `- [Download](${base}/download): the .dmg, the SHA-256 checksum and the first-open steps`,
    `- [Changelog](${base}/changelog): what changed in each version`,
    '',
    '## Trust',
    `- [Privacy](${base}/privacy): what the app collects (nothing) and what this website measures`,
    `- [Verify it yourself](${base}/verify): how to check that the app never goes online`,
  ];
  if (guides.length) {
    lines.push('', '## Guides');
    for (const g of guides) lines.push(`- [${g.data.title}](${base}/guides/${g.id}): ${g.data.description}`);
  }
  lines.push(
    '',
    '## Support',
    `- [Support](${base}/support): report a bug or suggest an idea`,
    `- [Releases on GitHub](${RELEASES_PAGE}): every version of the app`,
    '',
  );
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
