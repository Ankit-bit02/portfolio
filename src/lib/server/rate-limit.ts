// =============================================================================
// SIMPLE RATE LIMITER (server only)
// -----------------------------------------------------------------------------
// Fixed-window, in-memory limit per key (the visitor's IP). It stops casual
// abuse like a script hammering the form.
//
// Note: on Vercel each serverless instance has its own memory, so this is a
// best-effort limit, not a hard guarantee. For a strict limit, swap the Map
// for a shared store (e.g. Upstash Redis) behind the same function.
// =============================================================================

const hits = new Map<string, { count: number; resetAt: number }>();

/**
 * Returns true when the request is allowed.
 * @param key     identifier to limit (IP address)
 * @param limit   max requests per window
 * @param windowMs window length in ms
 */
export function allowRequest(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
	const now = Date.now();
	const entry = hits.get(key);

	if (!entry || entry.resetAt <= now) {
		hits.set(key, { count: 1, resetAt: now + windowMs });
		prune(now);
		return true;
	}

	entry.count += 1;
	return entry.count <= limit;
}

/** Drops expired entries so the map can't grow forever. */
function prune(now: number) {
	if (hits.size < 1000) return;
	for (const [key, entry] of hits) if (entry.resetAt <= now) hits.delete(key);
}
