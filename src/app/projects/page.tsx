import Link from "next/link";

import { ProjectCard } from "@/components/content/project-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { GitHubLink } from "@/components/ui/github-link";
import { getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@content/site";

export const metadata = pageMetadata({
  title: "Projects",
  description: `Case studies from ${site.name}'s mobile development and systems analysis work.`,
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <Section className="pt-16 sm:pt-20">
      <Container wide>
        <Reveal>
          <SectionHeader
            as="h1"
            title="Projects"
            description="Case studies of what I've shipped — what the problem was, what I chose, and what I'd do differently now."
          >
            <GitHubLink />
          </SectionHeader>
        </Reveal>

        {projects.length > 0 ? (
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </Stagger>
        ) : (
          <Reveal className="mt-12 rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="text-pretty text-secondary">
              Case studies are being written up. In the meantime,{" "}
              <Link
                href="/experience"
                className="text-accent underline underline-offset-4 transition-opacity hover:opacity-80 active:opacity-70"
              >
                the experience page
              </Link>{" "}
              covers the systems and mobile work behind them.
            </p>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}