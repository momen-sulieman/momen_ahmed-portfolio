import { type HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function CodeBlock({ className, children, ...props }: HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-sm leading-6 text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </pre>
  );
}
