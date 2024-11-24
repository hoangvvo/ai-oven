"use server";

import { SessionCart } from "@/types";
import { setSession } from "./session";

export async function syncCart(cart: SessionCart) {
  await setSession({ cart });
}
