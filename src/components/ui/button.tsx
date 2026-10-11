import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/cn";

/**
 * `min-h-11 min-w-11` sits in the base, not the size variants, so every
 * size still clears the 44x44 touch target — min-height wins over a
 * smaller height. The `link` variant opts out: an inline text link inside
 * a paragraph is exempt from target sizing and shouldn't reserve a box.
 */
export const buttonVariants = cva(
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/80",
        outline:
          "border border-accent-border text-foreground hover:border-accent hover:bg-accent-subtle hover:text-accent active:bg-accent-subtle",
        ghost: "text-foreground hover:bg-accent-subtle hover:text-accent active:bg-accent-subtle",
        link: "min-h-0 min-w-0 text-accent underline-offset-4 hover:underline active:opacity-70",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = "Button";
