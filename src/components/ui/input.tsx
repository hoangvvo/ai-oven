import { cn } from "@/lib/utils";
import { cva, VariantProps } from "cva";
import { forwardRef } from "react";

export const inputVariants = cva({
  base: "rounded border transition-colors",
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

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        inputVariants({
          size,
        }),
        className,
      )}
      {...props}
    />
  );
});
