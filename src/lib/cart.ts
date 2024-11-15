"use server";

import { Cart } from "@/types";
import { setSession } from "./session";

export async function syncCart(cart: Cart) {
  await setSession({ cart });
}
