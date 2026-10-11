"use client";

import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import type { CommandProject } from "./command-menu-palette";

// Referenced lazily: the import only runs when the component is first
// rendered, which is gated on `shouldLoad` below — so cmdk stays out of the
// initial bundle until the visitor signals intent.
const CommandMenuPalette = dynamic(
  () => import("./command-menu-palette").then((mod) => mod.CommandMenuPalette),
  { ssr: false },
);

export function CommandMenu({ projects }: { projects: CommandProject[] }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const preload = useCallback(() => setShouldLoad(true), []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setShouldLoad(true);
        setOpen((value) => !value);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-2 text-secondary"
        onMouseEnter={preload}
        onFocus={preload}
        onClick={() => {
          setShouldLoad(true);
          setOpen(true);
        }}
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span className="hidden md:inline">Search</span>
        <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-xs text-tertiary pointer-fine:md:inline">
          ⌘K
        </kbd>
      </Button>
      {shouldLoad && (
        <CommandMenuPalette open={open} onOpenChange={setOpen} projects={projects} />
      )}
    </>
  );
}
