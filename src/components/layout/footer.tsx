import Link from "next/link";

import { Container } from "@/components/layout/container";
import { allNav } from "@/lib/nav";
import { site } from "@content/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container
        wide
        className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-sm font-medium text-foreground">{site.name}</p>
          <p className="mt-1 text-sm text-secondary">{site.role}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5">
          {allNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center text-sm text-secondary transition-colors hover:text-accent active:opacity-70"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="shrink-0 text-sm text-tertiary">
          © {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  );
}
