// The footer's like button (see api/like.ts). One like per visitor: the browser keeps a random id, the server
// keeps the set of ids that like the site. The button stays hidden until the count loads, so local runs and
// preview deployments without a store show only the coffee link.

const ID_KEY = 'shotlight.like.id';
const format = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

function visitorId(): string {
  try {
    const saved = localStorage.getItem(ID_KEY);
    if (saved) return saved;
    const id = crypto.randomUUID();
    localStorage.setItem(ID_KEY, id);
    return id;
  } catch {
    return crypto.randomUUID(); // storage blocked: the like lasts for this page view
  }
}

type State = { count: number; liked: boolean };

async function request(init?: RequestInit, id?: string): Promise<State> {
  const url = init ? '/api/like' : `/api/like?id=${encodeURIComponent(id ?? '')}`;
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(String(res.status));
  const body = (await res.json()) as Partial<State>;
  if (typeof body.count !== 'number' || typeof body.liked !== 'boolean') throw new Error('bad response');
  return { count: Math.max(0, body.count), liked: body.liked };
}

export async function initLike() {
  const button = document.querySelector<HTMLButtonElement>('[data-like]');
  if (!button) return;
  const countEl = button.querySelector<HTMLElement>('[data-like-count]')!;
  const labelEl = button.querySelector<HTMLElement>('[data-like-label]')!;
  const id = visitorId();
  let state: State;
  let pending = false;

  function render(next: State, animate: boolean) {
    const changed = state && next.count !== state.count;
    const rising = state && next.count > state.count;
    state = next;
    button!.setAttribute('aria-pressed', String(next.liked));
    button!.dataset.track = next.liked ? 'footer_unlike' : 'footer_like';
    button!.setAttribute('aria-label', `Like Shotlight, ${next.count} ${next.count === 1 ? 'like' : 'likes'}`);
    labelEl.textContent = next.liked ? 'Liked' : 'Like';
    countEl.textContent = format.format(next.count);
    if (animate && changed) replay(countEl.parentElement!, rising ? 'is-up' : 'is-down');
    if (animate && next.liked) replay(button!, 'is-pop');
  }

  try {
    render(await request(undefined, id), false);
  } catch {
    return; // no store here: keep the button hidden
  }
  button.hidden = false;
  requestAnimationFrame(() => button.classList.add('is-in'));

  button.addEventListener('click', async () => {
    if (pending) return;
    pending = true;
    const before = state;
    const liked = !before.liked;
    render({ liked, count: Math.max(0, before.count + (liked ? 1 : -1)) }, true); // show it at once
    try {
      const saved = await request({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, liked }),
      });
      render(saved, false);
    } catch {
      render(before, true); // not saved: put it back
    } finally {
      pending = false;
    }
  });
}

/** Restarts a one-shot CSS animation. */
function replay(el: HTMLElement, cls: string) {
  el.classList.remove('is-up', 'is-down', cls);
  void el.offsetWidth;
  el.classList.add(cls);
}
