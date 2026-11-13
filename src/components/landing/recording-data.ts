// Recordings demo: what was said in a 42-second clip. The spoken code is shown blanked, as in the app.
export const total = 42;

export const lines: { t: number; s: string; code?: boolean }[] = [
  { t: 2, s: 'Okay, adding the shoes to the cart.' },
  { t: 18, s: 'And the checkout button does nothing.' },
  { t: 24, s: 'It asks for the code again, it says', code: true },
  { t: 31, s: 'Now there’s a red error about the refund address.' },
  { t: 38, s: 'Console says payment intent is missing.' },
];

export const fmt = (s: number) => `0:${String(Math.floor(s)).padStart(2, '0')}`;
