import { Link2 } from "lucide-react";

import { cn } from "@/lib/cn";
import { site } from "@content/site";

export function GitHubLink({ className }: { className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 text-sm", className)}>
      <Link2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
      <span className="text-secondary">GitHub:</span>
      <a
        href={site.github}
        target="_blank"
        rel="noopener noreferrer"
        className="-my-2 inline-flex items-center py-2 font-medium text-accent transition-opacity hover:underline active:opacity-70"
      >
        {site.github.replace(/^https?:\/\//, "")}
      </a>
    </p>
  );
}