"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cva, VariantProps } from "cva";
import { SelectHTMLAttributes } from "react";

export const selectButtonVariant = cva({
  base: "rounded flex items-center justify-between gap-2 transition-colors text-left border text-black bg-white",
  variants: {
    size: {
      sm: "text-sm px-2 py-1",
      md: "text-md px-4 py-2",
      lg: "text-lg px-6 py-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface Option {
  label: string;
  value: string;
}

export interface SelectProps
  extends VariantProps<typeof selectButtonVariant>,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "size"> {
  options: Option[];
  className?: string;
}

export function Select({ options, size, className, ...props }: SelectProps) {
  return (
    <div className={cn(selectButtonVariant({ size }), className, "relative")}>
      <select
        className="appearance-none bg-transparent outline-none w-full cursor-pointer pr-8"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" />
    </div>
  );
}
