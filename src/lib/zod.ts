import { countries } from "countries-list";
import parsePhoneNumberFromString, { CountryCode } from "libphonenumber-js";
import { z } from "zod";
import { DEFAULT_COUNTRY_CODE } from "./constants";

export const countryCodeSchema = z
  .string()
  .refine((code) => Object.keys(countries).includes(code), {
    message: "Invalid country code",
  });

const phoneNumberSchemaTransformFn = (
  defaultCountryCode = DEFAULT_COUNTRY_CODE,
) => {
  return (arg: string, ctx: z.RefinementCtx) => {
    const phone = parsePhoneNumberFromString(arg, {
      defaultCountry: defaultCountryCode as CountryCode,
      extract: false,
    });
    if (phone && phone.isValid()) {
      return String(phone.number);
    }
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid phone number",
    });
    return z.NEVER;
  };
};

export const phoneNumberSchema = z
  .string()
  .transform(phoneNumberSchemaTransformFn());

export const phoneNumberWithCountryCodeSchema = (
  defaultCountryCode = DEFAULT_COUNTRY_CODE,
) => {
  return z.string().transform(phoneNumberSchemaTransformFn(defaultCountryCode));
};
