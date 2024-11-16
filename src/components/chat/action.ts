"use server";

import { agent } from "@/lib/agent";
import { getSession } from "@/lib/session";
import { Message } from "@/types";

export async function doChat(messages: Message[]) {
  const session = await getSession();
  const response = agent.ask(messages, session.user);
  return response;
}
