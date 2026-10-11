import { type HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type SectionProps = HTMLAttributes<HTMLElement> & {
  /** Hairline above the section — the default rhythm between home sections. */
  divided?: boolean;
};

export function Section({ className, divided = false, ...props }: SectionProps) {
  return (
    <section
      className={cn("py-16 sm:py-24", divided && "border-t border-border", className)}
      {...props}
    />
  );
}
