import { countries } from "countries-list";
import { FC } from "react";
import { Select, SelectProps } from "./ui/select";

const countryOptions = Object.entries(countries)
  .map(([code, country]) => ({
    label: country.name,
    value: code,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const CountrySelect: FC<Omit<SelectProps, "options">> = (props) => {
  return (
    <Select {...props} options={countryOptions} aria-label="Select Country" />
  );
};
