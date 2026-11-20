import { getCollection } from 'astro:content';

// Drafts show in `npm run dev` and are left out of every build.
// PUBLIC_SHOW_DRAFTS=1 builds them too (for a QA build into another folder, never for deploying).
const visible = ({ data }: { data: { draft: boolean } }) =>
  import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_DRAFTS === '1' || !data.draft;

export async function publishedGuides() {
  const all = (await getCollection('guides', visible)) as Awaited<ReturnType<typeof getCollection<'guides'>>>;
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function publishedCompare() {
  return (await getCollection('compare', visible)) as Awaited<ReturnType<typeof getCollection<'compare'>>>;
}

export const CATEGORIES = {
  find: { label: 'Find', tag: 't-find' },
  name: { label: 'Name and organize', tag: 't-name' },
  text: { label: 'Text in images', tag: 't-text' },
  privacy: { label: 'Privacy', tag: 't-priv' },
} as const;

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
