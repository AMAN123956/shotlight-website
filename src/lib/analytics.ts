// Microsoft Clarity: visits, clicks, scroll, recordings, plus named events for the things that matter
// (downloads first). Disclosed on /privacy. The app itself has no analytics and never goes online.
//
// Loads only on the real domain (HOSTS), so local runs and Vercel preview deployments are never tracked.
// PUBLIC_CLARITY_ID at build time overrides the project ID.
//
// Events (names as they appear in Clarity › Filters › Custom events):
//   download_dmg            the real .dmg download on /download (the conversion; the session is also upgraded)
//   cta_<where>             any element with data-track="cta_…" (Download buttons in the header, hero, pricing…)
//   <data-track>            any other element with data-track
//   nav_<label>, footer_<label>, chapter_<id>   navigation clicks
//   outbound_<host>         links that leave the site (GitHub releases, issues)
//   faq_open_<n>            an FAQ answer opened (1-based)
//   demo_<section>          first interaction with a section's live demo (once per page view)
//   view_<section>          a section scrolled into view (once per page view)
// Tags (Clarity › Filters › Custom tags): source (utm_source / ?ref / referrer host), campaign, page.

type Clarity = ((...args: unknown[]) => void) & { q?: unknown[][] };
declare global {
  interface Window { clarity?: Clarity }
}

const ID: string = import.meta.env.PUBLIC_CLARITY_ID || 'zdvjimavmg'; // Clarity project "Shotlight"
const HOSTS = ['www.shotlight.lol', 'shotlight.lol'];

function clarity(...args: unknown[]) {
  window.clarity?.(...args);
}

/** Record a named event. Safe to call when analytics is off. */
export function track(name: string) {
  clarity('event', slug(name));
}

function tag(key: string, value: string) {
  if (value) clarity('set', key, value.slice(0, 100));
}

function slug(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 60);
}

function load(id: string) {
  const q: Clarity = window.clarity ?? Object.assign((...args: unknown[]) => { (q.q ??= []).push(args); }, {});
  window.clarity = q;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

function tagSource() {
  const p = new URLSearchParams(location.search);
  let source = p.get('utm_source') ?? p.get('ref') ?? '';
  if (!source && document.referrer) {
    try {
      const host = new URL(document.referrer).hostname.replace(/^www\./, '');
      if (host !== location.hostname) source = host;
    } catch { /* no usable referrer */ }
  }
  tag('source', source.toLowerCase());
  tag('campaign', p.get('utm_campaign') ?? '');
  tag('page', location.pathname);
}

/** The event name for a click on `el`, or nothing if it isn't worth recording. */
function nameFor(el: Element): string | undefined {
  const explicit = el.closest<HTMLElement>('[data-track]')?.dataset.track;
  if (explicit) return explicit;

  const a = el.closest<HTMLAnchorElement>('a[href]');
  if (a) {
    const label = slug(a.textContent ?? '') || 'link';
    if (a.closest('.site-header nav')) return `nav_${label}`;
    if (a.closest('.site-footer')) return `footer_${label}`;
    const chapter = a.closest('.chapter') && a.getAttribute('href')?.replace('#', '');
    if (chapter) return `chapter_${chapter}`;
    if (a.host && a.host !== location.host) return `outbound_${slug(a.hostname.replace(/^www\./, ''))}`;
  }
  return undefined;
}

const demosSeen = new Set<string>();

function onClick(e: MouseEvent) {
  const el = e.target as Element | null;
  if (!el?.closest) return;
  const name = nameFor(el);
  if (name) track(name);
  if (name === 'download_dmg') {
    tag('downloaded', 'yes');
    clarity('upgrade', 'download'); // keep this session's recording
  }

  // First interaction with a live demo (buttons, switches, chips) in a section.
  const control = name ? null : el.closest('button, [role="switch"], [role="radio"]');
  const section = control?.closest<HTMLElement>('[data-section]')?.dataset.section;
  if (section && !demosSeen.has(section)) {
    demosSeen.add(section);
    track(`demo_${section}`);
  }
}

function watchFaq() {
  document.querySelectorAll<HTMLDetailsElement>('#faq details').forEach((d, i) => {
    d.addEventListener('toggle', () => { if (d.open) track(`faq_open_${i + 1}`); });
  });
}

function watchSections() {
  const sections = document.querySelectorAll<HTMLElement>('[data-section]');
  if (!sections.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      io.unobserve(entry.target);
      track(`view_${(entry.target as HTMLElement).dataset.section}`);
    }
  }, { rootMargin: '0px 0px -40% 0px' }); // counts once the section reaches the upper 60% of the screen (works for sections taller than the screen)
  sections.forEach((s) => io.observe(s));
}

export function initAnalytics() {
  if (!ID || !HOSTS.includes(location.hostname)) return;
  load(ID);
  tagSource();
  document.addEventListener('click', onClick, { capture: true });
  watchFaq();
  watchSections();
}
