"use server";

import { createUserAccount } from "@/lib/account";
import { redirect } from "next/navigation";
import { z, ZodError } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  email: z.string().email().trim().toLowerCase(),
  name: z.string(),
  password: z.string().min(6),
  address: z.string().trim().optional(),
  city: z.string().trim().optional(),
  country: z.string().trim().optional(),
  phone_number: z.string().trim().optional(),
});

export async function registerAction(
  prevState: RegisterActionState,
  formData: FormData,
) {
  // infer the type of the schema
  let data: z.infer<typeof schema>;

  try {
    data = schema.parse(formData);
  } catch (err) {
    const error = err as ZodError;

    const values: RegisterActionState["values"] = {
      email: "",
      name: "",
      password: "",
    };

    formData.forEach((value, key) => {
      values[key as keyof typeof values] = value as string;
    });

    values["password"] = "";

    const validationError = error.errors[0];

    return {
      values,
      result: {
        error: `${validationError.path.join(".")}: ${validationError.message}`,
      },
    };
  }

  const res = await createUserAccount(data);

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

export type RegisterActionState = {
  values: z.infer<typeof schema>;
  result?: Awaited<ReturnType<typeof createUserAccount>>;
};
