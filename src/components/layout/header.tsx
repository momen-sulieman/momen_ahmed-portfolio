import Link from "next/link";

import { CommandMenu } from "@/components/features/command-menu";
import { MobileNav } from "@/components/features/mobile-nav";
import { ThemeToggle } from "@/components/features/theme-toggle";
import { Container } from "@/components/layout/container";
import { NavLinks } from "@/components/layout/nav-links";
import { getProjects } from "@/lib/content";
import { site } from "@content/site";

/**
 * Server component: the content query runs here and only the minimal search
 * index crosses into the client island.
 */
export function Header() {
  const projects = getProjects().map((project) => ({
    title: project.title,
    slug: project.slug,
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <Container wide className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-h-11 items-center rounded-lg text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent active:opacity-70"
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-2">
          <NavLinks />
          <CommandMenu projects={projects} />
          <ThemeToggle />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
