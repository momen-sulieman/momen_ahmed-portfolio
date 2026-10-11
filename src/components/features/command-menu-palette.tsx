"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "cmdk";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { allNav } from "@/lib/nav";

export type CommandProject = {
  title: string;
  slug: string;
};

type CommandMenuPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projects: CommandProject[];
};

const itemClass =
  "cursor-pointer rounded-lg px-2 py-2 text-sm text-foreground data-[selected=true]:bg-accent-subtle data-[selected=true]:text-accent";

/**
 * The index is pages + published case studies. There is no post collection,
 * so nothing article-shaped can leak in here.
 */
export function CommandMenuPalette({ open, onOpenChange, projects }: CommandMenuPaletteProps) {
  const router = useRouter();

  const go = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [onOpenChange, router],
  );

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command menu"
      contentClassName="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-lg sm:top-24"
      overlayClassName="fixed inset-0 z-50 bg-foreground/40"
    >
      <CommandInput
        placeholder="Search pages and projects…"
        className="w-full border-b border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-tertiary focus:outline-none"
      />
      <CommandList className="max-h-[min(20rem,60dvh)] overflow-y-auto p-2">
        <CommandEmpty className="px-2 py-6 text-center text-sm text-secondary">
          No results found.
        </CommandEmpty>

        <CommandGroup heading="Pages" className="px-2 py-1.5 text-xs font-medium text-accent">
          {allNav.map((item) => (
            <CommandItem
              key={item.href}
              value={item.label}
              onSelect={() => go(item.href)}
              className={itemClass}
            >
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>

        {projects.length > 0 && (
          <>
            <CommandSeparator className="my-1 h-px bg-border" />
            <CommandGroup heading="Projects" className="px-2 py-1.5 text-xs font-medium text-accent">
              {projects.map((project) => (
                <CommandItem
                  key={project.slug}
                  value={project.title}
                  onSelect={() => go(`/projects/${project.slug}`)}
                  className={itemClass}
                >
                  {project.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
