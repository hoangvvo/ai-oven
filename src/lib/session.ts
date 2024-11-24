"use server";

import { db } from "@/db";
import { productsTable } from "@/db/schema";
import { AppSession, FullAppSession, SessionCartItem } from "@/types";
import { inArray } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { cache } from "react";

const jwtSecret = process.env.JWT_SECRET!;

export async function setSession(session: Partial<AppSession>): Promise<void> {
  const existingSession = await getSession();

  const newSession = {
    ...existingSession,
    ...session,
  };

  if (newSession.cart) {
    newSession.cart.items = newSession.cart.items
      .map(
        (item): SessionCartItem => ({
          product_id: item.product_id,
          quantity: item.quantity,
        }),
      )
      .filter((item) => item.quantity > 0);
  }

  const token = jwt.sign(newSession, jwtSecret, {
    algorithm: "HS256",
    expiresIn: "7d",
  });

  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

const defaultSession: FullAppSession = {
  user: null,
  cart: {
    items: [],
  },
};

export const getSession = cache(async (): Promise<FullAppSession> => {
  const cookieStore = await cookies();

  const token = cookieStore.get("session");

  if (!token) {
    return defaultSession;
  }

  try {
    const jwtPayload = await jwt.verify(token.value, jwtSecret);
    if (typeof jwtPayload === "object" && jwtPayload !== null) {
      const { user, cart } = jwtPayload as AppSession;

      const products = await db.query.productsTable.findMany({
        where: inArray(
          productsTable.id,
          cart.items.map((item) => item.product_id),
        ),
      });

      return {
        user,
        cart: {
          ...cart,
          items: cart.items
            .map((item) => {
              const product = products.find(
                (product) => product.id === item.product_id,
              );

              if (!product) {
                return null;
              }

              return {
                product,
                product_id: item.product_id,
                quantity: item.quantity,
              };
            })
            .filter((item) => !!item),
        },
      };
    }
    return defaultSession;
  } catch (err) {
    console.error("invalid session", err);
    return defaultSession;
  }
});

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete("session");
}
