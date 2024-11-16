import { createOrder } from "@/lib/checkout";
import rateLimit from "@/lib/rate-limit";
import { getSession } from "@/lib/session";
import {
  countryCodeSchema,
  phoneNumberSchema,
  phoneNumberWithCountryCodeSchema,
} from "@/lib/zod";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = z.object({
  guest_email: z.string().email().trim().toLowerCase().optional(),
  shipping_address: z.string(),
  shipping_city: z.string(),
  shipping_country_code: countryCodeSchema,
  shipping_first_name: z.string(),
  shipping_last_name: z.string(),
  shipping_phone_number: phoneNumberSchema,
});

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function POST(request: Request) {
  // allows 30 requests per minute
  await limiter.check(30);

  const formData = await request.formData();

  let validationSchema = schema;

  const session = await getSession();
  if (session.user?.country_code) {
    // set shipping_phone_number to be validated against user country code
    validationSchema = schema.extend({
      shipping_phone_number: phoneNumberWithCountryCodeSchema(
        session.user.country_code,
      ),
    });
  }

  const formSchema = zfd.formData(validationSchema);

  const data = formSchema.parse(formData);

  const res = await createOrder(session, data);

  if ("error" in res) {
    return Response.json(res, {
      status: 400,
    });
  }

  return Response.json(res.jsonResponse, {
    status: res.httpStatusCode,
  });
}
