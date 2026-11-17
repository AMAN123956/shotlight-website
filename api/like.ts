// The footer's like button: one like per visitor, counted across the whole site.
//
//   GET  /api/like?id=<visitor id>            → { count, liked }
//   POST /api/like  { id, liked: true|false } → { count, liked }
//
// The visitor id is a random UUID the browser makes and keeps in localStorage. It identifies nobody; it only
// stops one browser from counting twice. The count is the size of the set of ids that like the site.
//
// Store: Upstash Redis (Vercel › Storage › Upstash), spoken to over its REST API, so there's no package to add.
// The integration sets KV_REST_API_URL + KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL + _TOKEN).
// Without them the endpoint answers 503 and the button stays hidden.
//
// Abuse: changes are rate limited per IP address. The address is never stored: only a salted hash, which
// expires after an hour. Disclosed on /privacy.

const LIKES = 'like:ids';
const LIMIT_PREFIX = 'like:rl:';
const LIMIT_PER_HOUR = 20;
const ID = /^[A-Za-z0-9-]{8,64}$/;

type Command = (string | number)[];

function store() {
  const env = process.env;
  const url = env.KV_REST_API_URL ?? env.UPSTASH_REDIS_REST_URL;
  const token = env.KV_REST_API_TOKEN ?? env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ''), token } : undefined;
}

/** Runs commands in one round trip; returns each command's result. */
async function redis(commands: Command[]): Promise<unknown[]> {
  const s = store();
  if (!s) throw new Error('no store');
  const res = await fetch(`${s.url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${s.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`store ${res.status}`);
  const out = (await res.json()) as { result?: unknown; error?: string }[];
  const failed = out.find((r) => r.error);
  if (failed) throw new Error(failed.error);
  return out.map((r) => r.result);
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

async function ipKey(request: Request) {
  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  const salt = process.env.LIKE_SALT ?? store()?.token ?? '';
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${salt}:${ip}`));
  const hex = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
  return LIMIT_PREFIX + hex.slice(0, 24);
}

/** A POST from another site's page is refused; tools without an Origin header are left to the rate limit. */
function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  if (!store()) return json({ error: 'unavailable' }, 503);
  const id = new URL(request.url).searchParams.get('id') ?? '';
  try {
    if (!ID.test(id)) {
      const [count] = await redis([['SCARD', LIKES]]);
      return json({ count: Number(count), liked: false });
    }
    const [count, member] = await redis([['SCARD', LIKES], ['SISMEMBER', LIKES, id]]);
    return json({ count: Number(count), liked: Number(member) === 1 });
  } catch {
    return json({ error: 'unavailable' }, 503);
  }
}

export async function POST(request: Request) {
  if (!store()) return json({ error: 'unavailable' }, 503);
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);

  let body: { id?: unknown; liked?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad request' }, 400);
  }
  const { id, liked } = body;
  if (typeof id !== 'string' || !ID.test(id) || typeof liked !== 'boolean') return json({ error: 'bad request' }, 400);

  try {
    const key = await ipKey(request);
    const [used] = await redis([['INCR', key], ['EXPIRE', key, 3600, 'NX']]);
    if (Number(used) > LIMIT_PER_HOUR) return json({ error: 'slow down' }, 429);

    const [, count] = await redis([[liked ? 'SADD' : 'SREM', LIKES, id], ['SCARD', LIKES]]);
    return json({ count: Number(count), liked });
  } catch {
    return json({ error: 'unavailable' }, 503);
  }
}
