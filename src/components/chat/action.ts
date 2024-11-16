"use server";

import { agent } from "@/lib/agent";
import rateLimit from "@/lib/rate-limit";
import { getSession } from "@/lib/session";
import { Message } from "@/types";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function doChat(messages: Message[]) {
  await limiter.check(30); // allows 30 requests per minute

  const session = await getSession();
  const response = agent.ask(messages, session.user);
  return response;
}
