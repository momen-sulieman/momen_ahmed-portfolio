import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { type Project } from "@/lib/content";
import { assetPath } from "@/lib/paths";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-raised transition duration-200 hover:-translate-y-1 hover:border-accent-border hover:shadow-lg active:translate-y-0 active:bg-surface focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
    >
      {project.cover && (
        <div className="aspect-video w-full overflow-hidden bg-surface">
          <Image
            src={assetPath(project.cover.src)}
            alt={`Cover image for ${project.title}`}
            width={project.cover.width}
            height={project.cover.height}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {project.icon && (
              <Image
                src={assetPath(project.icon.src)}
                alt=""
                width={112}
                height={112}
                className="h-14 w-14 shrink-0 rounded-[22%] border border-border object-cover"
              />
            )}
            <h3 className="truncate text-base font-semibold text-foreground">{project.title}</h3>
          </div>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>

        <p className="text-sm leading-6 text-secondary">{project.summary}</p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-3">
          {project.stack.slice(0, 4).map((tech) => (
            <li key={tech}>
              <Badge size="sm">{tech}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}