"use client";

import { CountrySelect } from "@/components/country-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_COUNTRY_CODE } from "@/lib/constants";
import { useActionState } from "react";
import { registerAction, RegisterActionState } from "./actions";

const initialState: RegisterActionState = {
  values: {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  },
};

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">Your Account</h2>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Input
              type="text"
              placeholder="First Name"
              name="first_name"
              defaultValue={state.values.first_name}
              autoComplete="given-name"
              required
              className="flex-1"
            />
            <Input
              type="text"
              placeholder="Last Name"
              name="last_name"
              defaultValue={state.values.last_name}
              autoComplete="family-name"
              required
              className="flex-1"
            />
          </div>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            defaultValue={state.values.email}
            autoComplete="email"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="new-password"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">Your Information (Optional)</h2>
        <p className="text-gray-500 text-sm">
          The information below will be used to prefill your details while
          shopping to provide you with a better experience.
        </p>
        <div className="flex flex-col gap-1">
          <Input
            type="text"
            placeholder="Address"
            name="address"
            defaultValue={state.values.address}
          />
          <Input
            type="text"
            placeholder="City"
            name="city"
            defaultValue={state.values.city}
          />
          <CountrySelect
            name="country_code"
            defaultValue={state.values.country_code || DEFAULT_COUNTRY_CODE}
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            name="phone_number"
            defaultValue={state.values.phone_number}
          />
        </div>
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
        Create Account
      </Button>
    </form>
  );
}
