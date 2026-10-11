import Link from "next/link";

import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  /** Small teal label above the title. */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional link rendered opposite the title ("All projects"). */
  action?: { label: string; href: string };
  /** Page titles are h1; sections within a page are h2. */
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  as: Heading = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          {eyebrow && (
            <p className="text-sm font-medium tracking-wide text-accent uppercase">{eyebrow}</p>
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

      {description && (
        <p className="mt-4 max-w-xl leading-7 text-pretty text-secondary">{description}</p>
      )}
    </div>
  );
}
