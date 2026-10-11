import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-accent-border font-medium",
  {
    variants: {
      size: {
        default: "px-3 py-1.5 text-sm text-foreground",
        sm: "px-2.5 py-1 text-xs text-secondary",
      },
    },
    defaultVariants: { size: "default" },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

/** Static label pill — skills, tech stack. Not interactive. */
export function Badge({ className, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ size }), className)} {...props} />;
}
