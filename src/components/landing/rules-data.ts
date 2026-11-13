import type { Kind } from '../../lib/thumb';

// Rules demo (board 07 "Folders that fill themselves"), worded like the app's real rule chips.
export interface DemoRule {
  id: string;
  name: string;
  k: Kind;
  /** [condition, value], e.g. ['text mentions', 'receipt, total'] */
  when: [string, string];
  /** The action chip's text. */
  then: string;
  folder: string;
  /** Screenshots the rule matches today, before this one. */
  matches: number;
  trash?: boolean;
}

export const rules: DemoRule[] = [
  { id: 'uber', name: 'Uber receipt – ₹412.png', k: 'receipt', when: ['text mentions', 'receipt, total'], then: 'move to Receipts', folder: 'receipts', matches: 57 },
  { id: 'npm', name: 'Terminal – npm ERR peer deps.png', k: 'code', when: ['app is', 'Terminal or Xcode'], then: 'move to Code & errors', folder: 'code', matches: 212 },
  { id: 'pnr', name: 'Gmail – Flight PNR to Goa.png', k: 'chat', when: ['text mentions', 'PNR, boarding'], then: 'move to Travel', folder: 'travel', matches: 23 },
  { id: 'otp', name: 'HDFC – one-time code.png', k: 'chat', when: ['contains a secret', 'one-time code'], then: 'move to the Trash after 7 days', folder: 'trash', matches: 9, trash: true },
];

/** id → [name, count, unit, pill destination] */
export const folders: [string, string, number, string, string][] = [
  ['receipts', 'Receipts', 57, 'files', 'Receipts'],
  ['code', 'Code & errors', 212, 'files', 'Code & errors'],
  ['travel', 'Travel', 23, 'files', 'Travel'],
  ['trash', 'Trash in 7 days', 9, 'codes', 'Trash in 7 days'],
];
