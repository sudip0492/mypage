// src/lib/rate-limiter.ts
const rateLimitStore = new Map<string, { count: number; lastReset: number }>();

interface RateLimitOptions {
  limit: number; // Max requests
  window: number; // Time window in milliseconds
}

export function applyRateLimiter(
  key: string,
  options: RateLimitOptions
): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key) || { count: 0, lastReset: now };

  if (now - entry.lastReset > options.window) {
    // Reset if window passed
    entry.count = 1;
    entry.lastReset = now;
  } else {
    entry.count++;
  }

  rateLimitStore.set(key, entry);

  return entry.count <= options.limit;
}
