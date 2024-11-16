"use server";

import { AppSession } from "@/types";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { cache } from "react";

const jwtSecret = process.env.JWT_SECRET!;

export async function setSession(session: Partial<AppSession>): Promise<void> {
  const existingSession = await getSession();

  const token = jwt.sign(
    {
      ...existingSession,
      ...session,
    },
    jwtSecret,
    {
      algorithm: "HS256",
      expiresIn: "7d",
    },
  );

  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}

const defaultSession: AppSession = {
  user: null,
  cart: {
    items: [],
  },
};

export const getSession = cache(async (): Promise<AppSession> => {
  const cookieStore = await cookies();

  const token = cookieStore.get("session");

  if (!token) {
    return defaultSession;
  }

  try {
    const jwtPayload = await jwt.verify(token.value, jwtSecret);
    if (typeof jwtPayload === "object" && jwtPayload !== null) {
      const { user, cart } = jwtPayload as AppSession;

      return {
        user,
        cart,
      };
    }
    return defaultSession;
  } catch {
    return defaultSession;
  }
});

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete("session");
}
