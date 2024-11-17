import { LRUCache } from "lru-cache";
import { headers } from "next/headers";

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export class RateLimitError extends Error {
  headers: Record<string, string>;
  constructor(
    public limit: number,
    public remaining: number,
  ) {
    super("Rate limit exceeded");
    this.name = "RateLimitError";
    this.headers = {
      "X-RateLimit-Limit": String(limit),
      "X-RateLimit-Remaining": String(remaining),
    };
  }
}

export default function rateLimit(options?: Options) {
  // In Production, a solution like Redis should be used
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    async check(limit: number) {
      const header = await headers();
      const ip = (
        header.get("x-real-ip") ||
        header.get("x-forwarded-for") ||
        "127.0.0.1"
      ).split(",")[0];
      const token = `${ip}:${header.get("user-agent")}`;
      const tokenCount = (tokenCache.get(token) as number[]) || [0];
      if (tokenCount[0] === 0) {
        tokenCache.set(token, tokenCount);
      }
      tokenCount[0] += 1;

      const currentUsage = tokenCount[0];
      const isRateLimited = currentUsage >= limit;
      if (isRateLimited) {
        throw new RateLimitError(limit, Math.max(0, limit - currentUsage));
      }
      return true;
    },
  };
}
