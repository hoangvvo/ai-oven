"use server";

import { loginUser } from "@/lib/account";
import rateLimit from "@/lib/rate-limit";
import { redirect } from "next/navigation";
import { z, ZodError } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(6),
  next: z.string().optional(),
});

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function loginAction(
  prevState: LoginActionState,
  formData: FormData,
) {
  try {
    // allows 10 requests per minute
    await limiter.check(10);
  } catch {
    return {
      values: {
        email: "",
        password: "",
      },
      result: {
        error: "Rate limit exceeded",
      },
    };
  }

  let data: z.infer<typeof schema>;

  try {
    data = schema.parse(formData);
  } catch (err) {
    const error = err as ZodError;

    const values: LoginActionState["values"] = {
      email: "",
      password: "",
    };

    values["password"] = "";

    formData.forEach((value, key) => {
      values[key as keyof typeof values] = value as string;
    });

    const validationError = error.errors[0];

    return {
      values,
      result: {
        error: `${validationError.path.join(".")}: ${validationError.message}`,
      },
    };
  }

  const res = await loginUser(data.email, data.password);

  if ("user" in res) {
    redirect(data.next || "/");
  }

  return {
    values: {
      ...data,
      password: "",
    },
    result: res,
  };
}

export type LoginActionState = {
  values: z.infer<typeof schema>;
  result?: Awaited<ReturnType<typeof loginUser>>;
};
