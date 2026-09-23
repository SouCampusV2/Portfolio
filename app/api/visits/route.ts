/**
 * Visitor counter for the "Visited by N people" pill in the footer.
 *
 * Storage: Upstash Redis over its REST API (free tier). On Vercel, add it via
 * Storage → Upstash (Redis); that sets KV_REST_API_URL / KV_REST_API_TOKEN.
 * UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN work too.
 * Without these variables the route answers 503 and the pill stays hidden.
 *
 * GET  → current count
 * POST → count a new visitor (the client only POSTs once per browser)
 */

export const dynamic = "force-dynamic";

const KEY = "portfolio:visits";

function redis() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function command(path: string) {
  const db = redis();
  if (!db) return null;
  try {
    const res = await fetch(`${db.url}/${path}`, {
      headers: { Authorization: `Bearer ${db.token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const { result } = (await res.json()) as { result: string | number | null };
    return Number(result ?? 0);
  } catch {
    return null;
  }
}

function reply(count: number | null) {
  return Response.json(
    { count },
    { status: count === null ? 503 : 200, headers: { "Cache-Control": "no-store" } },
  );
}

export async function GET() {
  return reply(await command(`get/${KEY}`));
}

export async function POST() {
  return reply(await command(`incr/${KEY}`));
}
