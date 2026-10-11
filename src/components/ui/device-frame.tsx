import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Phone mockup drawn in CSS rather than baked into the screenshots, so the
 * images stay light and the frame can adapt to the theme.
 *
 * It deliberately draws no notch or Dynamic Island: the screenshots already
 * include the real status bar, and a second island would double it.
 *
 * Expects a screen cropped to roughly 2.19:1 (height:width).
 */
export function DeviceFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {/* Side buttons, positioned proportionally so they hold at any width. */}
      <span
        aria-hidden="true"
        className="absolute top-[16%] -left-[2px] h-[4%] w-[3px] rounded-l-sm bg-device-bezel"
      />
      <span
        aria-hidden="true"
        className="absolute top-[23%] -left-[2px] h-[7%] w-[3px] rounded-l-sm bg-device-bezel"
      />
      <span
        aria-hidden="true"
        className="absolute top-[32%] -left-[2px] h-[7%] w-[3px] rounded-l-sm bg-device-bezel"
      />
      <span
        aria-hidden="true"
        className="absolute top-[25%] -right-[2px] h-[11%] w-[3px] rounded-r-sm bg-device-bezel"
      />

      <div className="relative rounded-device bg-device-bezel p-[5px] shadow-lg ring-1 ring-foreground/10">
        <div className="overflow-hidden rounded-device-screen bg-surface">{children}</div>
      </div>
    </div>
  );
}
