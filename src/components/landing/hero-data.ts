import type { Kind } from '../../lib/thumb';

export interface DemoFile { id: string; old: string; nu: string; k: Kind }

export const seed: DemoFile[] = [
  { id: 'a', old: 'Screenshot 2026-11-12 at 09.12.44.png', nu: 'Figma – Pricing hero v3.png', k: 'design' },
  { id: 'b', old: 'Screenshot 2026-11-11 at 21.03.10.png', nu: 'Swiggy order – ₹389.png', k: 'receipt' },
  { id: 'c', old: 'Screenshot 2026-11-10 at 18.47.02.png', nu: 'Xcode – Build failed, GRDB.png', k: 'code' },
  { id: 'd', old: 'Screenshot 2026-11-09 at 08.15.55.png', nu: 'WhatsApp – Address from Riya.png', k: 'chat' },
  { id: 'e', old: 'Screenshot 2026-11-08 at 13.22.31.png', nu: 'Airbnb – Goa villa, 2 bed.png', k: 'photo' },
  { id: 'f', old: 'Screen Recording 2026-11-07 at 16.20.11.mov', nu: 'Recording – Checkout bug, 42s.mov', k: 'video' },
];

export const extras: Omit<DemoFile, 'id'>[] = [
  { old: 'Screenshot 2026-11-12 at 21.41.07.png', nu: 'Stripe – API keys page.png', k: 'code' },
  { old: 'Screenshot 2026-11-12 at 21.41.52.png', nu: 'Calendar – Dentist, Tue 4 PM.png', k: 'design' },
  { old: 'Screenshot 2026-11-12 at 21.42.18.png', nu: 'Linear – SHOT-42 onboarding bug.png', k: 'chat' },
  { old: 'Screenshot 2026-11-12 at 21.43.05.png', nu: 'Uber receipt – Nov 11, ₹412.png', k: 'receipt' },
];
