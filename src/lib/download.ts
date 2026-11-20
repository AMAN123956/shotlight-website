// One-tap download. Every Download button is a plain link to the .dmg, so the browser starts the download
// the moment it is clicked (this works with scripts blocked, too). On top of that:
//  - on /download the page scrolls to the first-open steps, because the next thing a person needs is how to
//    open the app (macOS asks them to confirm it until the app is signed by Apple);
//  - anywhere else, it takes them to those steps on /download after a moment, once the download is under way.
// A button with data-after="none" does neither (used once the app is signed and needs no extra step).

const STEPS_URL = '/download?d=1#first-open';
const WAIT_MS = 1600; // long enough for the browser to start the download before the page changes

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function showSteps(target: HTMLElement) {
  const flash = reduceMotion() ? 0 : 1800;
  // Land on the heading (just under the floating nav), not on the section's empty padding above it.
  (target.querySelector<HTMLElement>('.sec-head') ?? target).scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', '#first-open');
  target.classList.add('is-flash');
  window.setTimeout(() => target.classList.remove('is-flash'), flash);
  const heading = target.querySelector<HTMLElement>('h2');
  heading?.setAttribute('tabindex', '-1');
  heading?.focus({ preventScroll: true });
  document.querySelectorAll<HTMLElement>('[data-started]').forEach((el) => { el.hidden = false; });
}

export function initDownload() {
  document.querySelectorAll<HTMLAnchorElement>('a[data-download]').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // new tab: leave it alone
      if (a.dataset.after === 'none') return;
      const steps = document.getElementById('first-open');
      if (steps) {
        showSteps(steps); // the click itself still downloads: we never cancel it
      } else {
        window.setTimeout(() => window.location.assign(STEPS_URL), WAIT_MS);
      }
    });
  });

  // Arrived from another page: say what just happened, and offer a second try.
  if (location.pathname.includes('download') && new URLSearchParams(location.search).has('d')) {
    document.querySelectorAll<HTMLElement>('[data-arrived]').forEach((el) => { el.hidden = false; });
    const steps = document.getElementById('first-open');
    if (steps && location.hash === '#first-open') window.setTimeout(() => showSteps(steps), 80);
  }
}
