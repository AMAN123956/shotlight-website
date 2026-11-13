import type { Kind } from '../../lib/thumb';

export type Detail = 'short' | 'std' | 'det';
export type Case = 'sentence' | 'lower' | 'kebab';
export interface NamingState { detail: Detail; app: boolean; date: boolean; kase: Case }

export const examples: { k: Kind; app: string; t: Record<Detail, string>; d: string }[] = [
  { k: 'design', app: 'Figma', t: { short: 'Pricing hero', std: 'Pricing page hero v3', det: 'Pricing page hero v3, three plan cards, dark' }, d: '2026-11-12' },
  { k: 'code', app: 'Chrome', t: { short: 'Stripe API keys', std: 'Stripe API keys page', det: 'Stripe dashboard, API keys, live secret key' }, d: '2026-11-12' },
  { k: 'receipt', app: 'Mail', t: { short: 'Uber receipt ₹412', std: 'Uber receipt, Nov 11, ₹412', det: 'Uber trip receipt, Indiranagar, ₹412 via UPI' }, d: '2026-11-11' },
];

export const initialNaming: NamingState = { detail: 'std', app: true, date: false, kase: 'sentence' };

export function exampleName(e: (typeof examples)[number], s: NamingState): string {
  const parts: string[] = [];
  if (s.date) parts.push(e.d);
  if (s.app) parts.push(e.app);
  parts.push(e.t[s.detail]);
  let name = parts.join(' – ');
  if (s.kase === 'lower') name = name.toLowerCase();
  if (s.kase === 'kebab') {
    name = name.toLowerCase().replace(/[,–]/g, ' ').replace(/[^a-z0-9₹.]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  }
  return name + '.png';
}
