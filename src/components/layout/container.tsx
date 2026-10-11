import { type HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  /** 72rem instead of the 42rem reading measure — for grids and card rows. */
  wide?: boolean;
};

export function Container({ className, wide = false, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-6", wide ? "max-w-wide" : "max-w-content", className)}
      {...props}
    />
  );
}
