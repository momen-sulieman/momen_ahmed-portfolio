"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";
import { primaryNav } from "@/lib/nav";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
      {primaryNav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-h-11 items-center rounded-full px-3.5 text-sm font-medium text-secondary transition-colors hover:bg-accent-subtle hover:text-accent active:opacity-70",
              active && "text-accent",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
