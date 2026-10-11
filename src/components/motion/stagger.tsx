"use client";

import { type HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import { useInView } from "./use-in-view";

/**
 * Reveals direct children in sequence. The delays come from the
 * `nth-child` rules in globals.css — never hand-typed per component.
 */
export function Stagger({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={cn("reveal-stagger", inView && "is-visible", className)} {...props}>
      {children}
    </div>
  );
}
