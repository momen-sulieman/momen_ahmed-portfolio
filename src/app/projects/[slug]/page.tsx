import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MDXContent } from "@/components/content/mdx-content";
import { ScreenshotGallery } from "@/components/content/screenshot-gallery";
import { TableOfContents } from "@/components/content/toc";
import { Container } from "@/components/layout/container";
import { Prose } from "@/components/layout/prose";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { assetPath } from "@/lib/paths";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.cover?.src,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const liveLink = project.links?.live;
  const repoLink = project.links?.repo;

  return (
    <Section className="pt-16 sm:pt-20">
      <Container wide>
        <Reveal>
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-accent active:opacity-70"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All projects
          </Link>

          <p className="mt-8 text-sm font-medium text-accent">{project.role}</p>

          <div className="mt-3 flex items-center gap-4 sm:gap-5">
            {project.icon && (
              <Image
                src={assetPath(project.icon.src)}
                alt={`${project.title} app icon`}
                width={192}
                height={192}
                priority
                className="h-[5.5rem] w-[5.5rem] shrink-0 rounded-[22%] border border-border object-cover sm:h-24 sm:w-24"
              />
            )}
            <div className="min-w-0">
              <h1 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                {project.title}
              </h1>
              <p className="mt-2 text-xs tracking-wide text-tertiary uppercase">Period</p>
              <p className="mt-1 text-sm text-foreground">{project.period}</p>
            </div>
          </div>

          <p className="mt-6 max-w-2xl leading-7 text-pretty text-secondary">{project.summary}</p>

          {liveLink && (
            <div className="mt-6">
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent transition-opacity hover:underline active:opacity-70"
              >
                Live site
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          )}

          {(project.apk || repoLink) && (
            <div className="mt-6">
              <div className="flex flex-wrap gap-3">
                {project.apk && (
                  <Button asChild>
                    <a href={assetPath(project.apk)} download>
                      <Download className="h-4 w-4" aria-hidden="true" />
                      Download APK
                    </a>
                  </Button>
                )}
                {repoLink && (
                  <Button asChild variant="outline">
                    <a href={repoLink} target="_blank" rel="noopener noreferrer">
                      View on GitHub
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                )}
              </div>
              {project.apk && project.apkNote && (
                <p className="mt-3 max-w-2xl text-sm leading-6 text-tertiary">{project.apkNote}</p>
              )}
            </div>
          )}

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Badge size="sm">{tech}</Badge>
              </li>
            ))}
          </ul>
        </Reveal>

        {project.cover && (
          <Reveal className="mt-12 overflow-hidden rounded-2xl border border-border">
            <Image
              src={assetPath(project.cover.src)}
              alt={`Cover image for ${project.title}`}
              width={project.cover.width}
              height={project.cover.height}
              className="w-full object-cover"
              priority
            />
          </Reveal>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <Reveal className="mt-12">
            <ScreenshotGallery items={project.gallery} />
          </Reveal>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <Reveal>
            <Prose>
              <MDXContent code={project.body} />
            </Prose>
          </Reveal>

          {project.toc.length > 0 && (
            <aside className="hidden lg:block">
              <TableOfContents items={project.toc} />
            </aside>
          )}
        </div>
      </Container>
    </Section>
  );
}