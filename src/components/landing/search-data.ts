import type { Kind } from '../../lib/thumb';

export interface IndexedShot { n: string; t: string; k: Kind; sens?: string; folder?: string; said?: string }

export const index: IndexedShot[] = [
  { n: 'Swiggy order – ₹389, Meghana Foods.png', t: 'Order total ₹389 · Chicken biryani · receipt #8812', k: 'receipt', folder: 'Receipts' },
  { n: 'Uber receipt – Nov 11, ₹412.png', t: 'Total ₹412.00 · Trip to Indiranagar · receipt', k: 'receipt', folder: 'Receipts' },
  { n: 'Recording – Safari checkout bug, 42s.mov', t: 'said: “and the checkout button does nothing”', k: 'video', said: '0:18', folder: 'Code' },
  { n: 'Xcode – Build failed, no module GRDB.png', t: "error: No such module 'GRDB' · line 3", k: 'code', folder: 'Code' },
  { n: 'Terminal – npm ERR peer deps.png', t: 'npm ERR! ERESOLVE could not resolve dependency', k: 'code', folder: 'Code' },
  { n: 'Airbnb – Goa villa, 2 bedrooms.png', t: '₹9,800 / night · ★ 4.92 · Anjuna, Goa', k: 'photo', folder: 'Travel' },
  { n: 'Gmail – Flight PNR 6E-2041 Bengaluru–Goa.png', t: 'PNR 6E-2041 · BLR → GOI · 15 Dec, 06:40', k: 'chat', folder: 'Travel' },
  { n: 'HDFC NetBanking – one-time code.png', t: 'Your OTP is 482913. Valid for 5 minutes.', k: 'chat', sens: 'OTP · hidden' },
  { n: 'Google Maps – Route to Koramangala.png', t: '24 min · via Hosur Rd · 7.2 km', k: 'map' },
];

export const chips = ['receipt', 'goa', 'checkout', 'error', 'OTP'];

/** Smart folders, shown as filter chips like in ⌥ Space. */
export const folders = ['Receipts', 'Code', 'Travel'];
