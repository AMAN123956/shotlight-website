import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per release, same text as the GitHub release notes (minus the download/hash lines).
const changelog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/changelog' }),
  schema: z.object({
    version: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
  }),
});

// How-to guides. A guide with `draft: true` shows in `npm run dev` only: it is left out of the built site,
// the sitemap and the navigation until it is verified on a real Mac and the flag is removed.
const guides = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    category: z.enum(['find', 'name', 'text', 'privacy']),
    /** The short answer shown in the lime box at the top (40 to 60 words). */
    answer: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date(),
    minutes: z.number(),
    /** Gradient behind the card art: a1 to a6 (see global.css). */
    art: z.enum(['a1', 'a2', 'a3', 'a4', 'a5', 'a6']).default('a1'),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// "Shotlight vs X" pages. Competitor facts must be checked against the other product's own page and dated
// (`checked`). A cell with `verify: true` shows a yellow "verify" tag and keeps the page a draft.
const compare = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/compare' }),
  schema: z.object({
    other: z.string(),
    title: z.string(),
    description: z.string().max(170),
    checked: z.string(),
    verdict: z.string(),
    rows: z.array(z.object({
      label: z.string(),
      us: z.string(),
      them: z.string(),
      verify: z.boolean().default(false),
    })),
    pickUs: z.array(z.string()),
    pickThem: z.array(z.string()),
    draft: z.boolean().default(true),
  }),
});

export const collections = { changelog, guides, compare };
