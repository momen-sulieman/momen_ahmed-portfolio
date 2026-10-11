"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

import { cn } from "@/lib/cn";

/** Fades route content in on navigation. Opacity only. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Keying remounts FadeIn per route, so its state resets on its own rather
  // than being cleared imperatively inside an effect.
  return <FadeIn key={pathname}>{children}</FadeIn>;
}

function FadeIn({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return <div className={cn("page-transition", visible && "is-visible")}>{children}</div>;
}
