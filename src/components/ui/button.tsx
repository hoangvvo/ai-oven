import { cn } from "@/lib/utils";
import { cva, VariantProps } from "cva";
import { forwardRef } from "react";

export const buttonVariants = cva({
  base: "rounded flex items-center gap-2 transition-colors",
  variants: {
    variant: {
      primary: "bg-black text-white hover:bg-gray-700",
      secondary: "bg-white text-black border border-black hover:bg-gray-100",
    },
    size: {
      sm: "text-sm px-2 py-1",
      md: "text-md px-4 py-2",
      lg: "text-lg px-6 py-3",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ children, className, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants(props), className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
