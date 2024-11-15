"use client";

import { AppSession } from "@/types";
import { createContext, ReactNode, useContext } from "react";

const SessionContext = createContext({} as AppSession);

export function SessionProvider({
  session,
  children,
}: {
  session: AppSession;
  children: ReactNode;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
