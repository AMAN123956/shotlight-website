// Segmented controls: buttons with role="radio" inside a role="radiogroup". Click or arrow keys select;
// only the checked button is in the tab order (roving tabindex), like a native radio group.
export function radioGroup(group: HTMLElement, onChange: (value: string) => void) {
  const radios = [...group.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
  const select = (r: HTMLButtonElement, focus = false) => {
    radios.forEach((x) => {
      const on = x === r;
      x.setAttribute('aria-checked', String(on));
      x.tabIndex = on ? 0 : -1;
    });
    if (focus) r.focus();
    onChange(r.dataset.value!);
  };
  radios.forEach((r, i) => {
    r.tabIndex = r.getAttribute('aria-checked') === 'true' ? 0 : -1;
    r.addEventListener('click', () => select(r));
    r.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      select(radios[(i + d + radios.length) % radios.length], true);
    });
  });
}
