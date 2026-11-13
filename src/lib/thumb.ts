// Fake screenshot thumbnails used by every demo (ported from board 07's thumbFor). Works on the server (Astro
// frontmatter) and in the browser, so the first paint matches what the demo scripts render later.

export type Kind = 'design' | 'receipt' | 'code' | 'chat' | 'photo' | 'video' | 'map';

const kinds: Record<Kind, [string, string, string]> = {
  design: ['#5B3BD6', 'rgba(255,255,255,0.85)', 'rgba(255,255,255,0.4)'],
  receipt: ['#F4F1EA', '#1E1E24', '#B9B4A8'],
  code: ['#1B1B21', '#7CC4FF', '#D4FF3F'],
  chat: ['#0E6B4B', 'rgba(255,255,255,0.9)', 'rgba(255,255,255,0.45)'],
  photo: ['#C2556B', 'rgba(255,255,255,0.85)', 'rgba(255,255,255,0.45)'],
  video: ['#26262B', '#FF7A66', 'rgba(255,255,255,0.35)'],
  map: ['#1A7F5A', 'rgba(255,255,255,0.85)', 'rgba(255,255,255,0.4)'],
};

export interface ThumbStyles { thumb: string; l1: string; l2: string; l3: string }

/** `w` is the width in px, or 'full' for a full-width banner thumbnail (naming cards). */
export function thumbStyles(k: Kind, w: number | 'full', h: number): ThumbStyles {
  const c = kinds[k] ?? kinds.design;
  const big = w === 'full' || w > 100;
  const px = w === 'full' ? 300 : w;
  const pad = Math.max(6, Math.round(px / 9));
  const receipt = k === 'receipt';
  return {
    thumb:
      `width: ${w === 'full' ? '100%' : px + 'px'}; height: ${h}px; border-radius: ${big ? 0 : 5}px; ` +
      `padding: 0 ${pad}px; gap: ${Math.max(3, Math.round(h / 12))}px; background: ${c[0]}; ` +
      `border: ${big ? '0' : '2px solid rgba(255,255,255,0.9)'}; box-shadow: ${big ? 'none' : '0 4px 10px rgba(0,0,0,0.35)'};`,
    l1: `width: 55%; height: ${Math.max(3, Math.round(h / 9))}px; background: ${c[1]};`,
    l2: `width: 85%; height: ${Math.max(2, Math.round(h / 14))}px; background: ${c[2]};`,
    l3:
      `width: ${receipt ? '35%' : '65%'}; height: ${Math.max(2, Math.round(h / 14))}px; ` +
      `background: ${receipt ? '#E46A2E' : c[2]}; align-self: ${receipt ? 'flex-end' : 'auto'};`,
  };
}

/** Browser only: builds a thumbnail element. */
export function thumbEl(k: Kind, w: number | 'full', h: number): HTMLSpanElement {
  const s = thumbStyles(k, w, h);
  const el = document.createElement('span');
  el.className = 'thumb';
  el.setAttribute('aria-hidden', 'true');
  el.style.cssText = s.thumb;
  for (const line of [s.l1, s.l2, s.l3]) {
    const l = document.createElement('span');
    l.style.cssText = line;
    el.append(l);
  }
  return el;
}

/** Browser only: whether the visitor asked for reduced motion. */
export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
