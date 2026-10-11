import { type HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

/** Long-form MDX wrapper. The typography itself lives in globals.css. */
export function Prose({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("prose", className)} {...props} />;
}
