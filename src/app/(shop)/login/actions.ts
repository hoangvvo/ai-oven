"use server";

import { loginUser } from "@/lib/account";
import { redirect } from "next/navigation";
import { z, ZodError } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(6),
});

export async function loginAction(
  prevState: LoginActionState,
  formData: FormData,
) {
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
    redirect("/");
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
