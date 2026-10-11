"use client";

import { type HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import { useInView } from "./use-in-view";

/** Fades and lifts a block into place the first time it scrolls into view. */
export function Reveal({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={cn("reveal", inView && "is-visible", className)} {...props}>
      {children}
    </div>
  );
}
