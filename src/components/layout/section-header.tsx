import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  eyebrowHref?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
};

export function SectionHeader({
  eyebrow,
  eyebrowHref,
  title,
  description,
  action,
  as: Heading = "h2",
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div className={cn(className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          {eyebrow && (
            <p className="text-sm font-medium tracking-wide text-accent uppercase">
              {eyebrowHref ? (
                <Link
                  href={eyebrowHref}
                  className="-my-3 inline-block py-3 underline-offset-4 transition-opacity hover:underline active:opacity-70"
                >
                  {eyebrow}
                </Link>
              ) : (
                eyebrow
              )}
            </p>
          )}
          <Heading
            className={cn(
              "text-balance text-foreground",
              eyebrow && "mt-3",
              Heading === "h1"
                ? "text-3xl font-semibold tracking-tight sm:text-4xl"
                : "text-2xl font-semibold tracking-tight",
            )}
          >
            {title}
          </Heading>
        </div>

        {action && (
          <Link
            href={action.href}
            className="inline-flex min-h-11 items-center text-sm font-medium text-accent transition-opacity hover:underline active:opacity-70"
          >
            {action.label}
          </Link>
        )}
      </div>

      {children && <div className="mt-3">{children}</div>}

      {description && (
        <p className="mt-4 max-w-xl leading-7 text-pretty text-secondary">{description}</p>
      )}
    </div>
  );
}