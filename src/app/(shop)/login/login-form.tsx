"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { loginAction, LoginActionState } from "./actions";

const initialState: LoginActionState = {
  values: {
    email: "",
    password: "",
  },
};

export function LoginForm() {
  const searchParams = useSearchParams();

  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Input
          type="email"
          placeholder="Email"
          autoComplete="email"
          name="email"
          defaultValue={state.values.email}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          name="password"
          required
        />
        <input
          type="hidden"
          name="next"
          value={searchParams.get("next") || ""}
        />
      </div>
      {state.result && "error" in state.result && (
        <div className="text-red-600">{state.result.error}</div>
      )}
      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={pending}
      >
        Login
      </Button>
    </form>
  );
}
