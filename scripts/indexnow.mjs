// Tells search engines that use IndexNow (Bing, Yandex, Seznam, Naver and others) that pages changed.
// Run it after a deploy is live, with the pages that are new or changed:
//   npm run indexnow -- /guides/some-guide /guides/other-guide
//   npm run indexnow -- --all        every URL in the live sitemap
// The key file in public/ proves we own the site. The key is public by design; it is not a secret.
import fs from 'node:fs';

const SITE = 'https://www.shotlight.lol';
const host = new URL(SITE).host;

const keyFile = fs.readdirSync(new URL('../public/', import.meta.url)).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('No IndexNow key file (32 hex characters + .txt) in public/');
const key = keyFile.replace('.txt', '');

const args = process.argv.slice(2);
let urls;
if (args.includes('--all')) {
  const index = await (await fetch(`${SITE}/sitemap-index.xml`)).text();
  urls = [];
  for (const [, loc] of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const xml = await (await fetch(loc)).text();
    for (const [, u] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.push(u);
  }
} else {
  urls = args.map((a) => (a.startsWith('http') ? a : SITE + (a.startsWith('/') ? a : `/${a}`)));
}
if (!urls.length) {
  console.error('Pass page paths (/guides/x) or --all.');
  process.exit(1);
}

// The key file must be live before engines will accept the ping.
const live = await fetch(`${SITE}/${keyFile}`);
if (!live.ok || (await live.text()).trim() !== key) {
  console.error(`${SITE}/${keyFile} is not live yet. Deploy first.`);
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `${SITE}/${keyFile}`, urlList: urls }),
});
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s)`);
for (const u of urls) console.log(`  ${u}`);
// 200 = received, 202 = received and the key is still being checked. Anything else is a problem.
if (![200, 202].includes(res.status)) {
  console.error(await res.text());
  process.exit(1);
}
