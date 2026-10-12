import { ArrowRight, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import momenAvatar from "@/assets/momen-avatar.jpg";
import { ProjectCard } from "@/components/content/project-card";
import { SkillBar } from "@/components/content/skill-bar";
import { CopyButton } from "@/components/features/copy-button";
import { CopyEmailButton } from "@/components/features/copy-email-button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { GitHubLink } from "@/components/ui/github-link";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { getFeaturedProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { getRatedSkills, getSkillColorIndex } from "@/lib/skill-colors";
import { site } from "@content/site";

export const metadata = pageMetadata({
  title: `${site.name} — ${site.role}`,
  description: site.anchorLine,
  path: "/",
});

const topSkills = [...getRatedSkills()].sort((a, b) => (b.level?.value ?? 0) - (a.level?.value ?? 0));
const latestRole = site.experience[0];

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Section className="relative overflow-hidden pt-20 sm:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl sm:-right-16"
        />

        <Container wide className="relative">
          <Reveal className="flex max-w-5xl flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-medium text-accent">{site.role}</p>
              <h1 className="mt-4 text-display font-semibold text-balance text-foreground">
                {site.name}
              </h1>
              <GitHubLink className="mt-4" />
              <p className="mt-6 text-lg leading-8 text-pretty text-secondary">
                {site.anchorLine}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/projects">
                    View projects
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Get in touch</Link>
                </Button>
              </div>
            </div>

            <Image
              src={momenAvatar}
              alt={`Portrait of ${site.name}`}
              className="h-28 w-28 shrink-0 rounded-full object-cover ring-2 ring-accent/40 ring-offset-4 ring-offset-background sm:h-40 sm:w-40"
              priority
            />
          </Reveal>

          <Stagger className="mt-16 grid max-w-5xl grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-semibold text-accent sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-secondary">{stat.label}</p>
              </div>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section divided>
        <Container wide>
          <Reveal>
            <SectionHeader eyebrow="About" title="What I do" />
            <p className="mt-6 max-w-2xl leading-7 text-pretty text-secondary">{site.summary}</p>
            <Button asChild variant="outline" className="mt-8">
              <Link href="/about">
                Read the full story
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </Section>

      <Section divided>
        <Container wide>
          <Reveal>
            <SectionHeader
              eyebrow="Skills"
              title="Where I'm strongest"
              action={{ label: "All skills", href: "/skills" }}
            />
          </Reveal>
          <Stagger className="mt-10 grid max-w-4xl gap-x-12 gap-y-6 sm:grid-cols-2">
            {topSkills.map((group) => (
              <SkillBar
                key={group.category}
                category={group.category}
                label={group.level!.label}
                value={group.level!.value}
                colorIndex={getSkillColorIndex(group.category)}
                size="compact"
              />
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section divided>
        <Container wide>
          <Reveal>
            <SectionHeader
              eyebrow="Experience"
              title="Most recent role"
              action={{ label: "Full history", href: "/experience" }}
            />
          </Reveal>
          <Reveal className="mt-10 max-w-3xl">
            <Card>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <CardTitle>{latestRole.role}</CardTitle>
                <p className="text-sm text-tertiary">
                  {latestRole.start} – {latestRole.end}
                </p>
              </div>
              {(latestRole.company || latestRole.location || latestRole.subtitle) && (
                <CardDescription className="mt-1">
                  {[latestRole.company, latestRole.location, latestRole.subtitle]
                    .filter(Boolean)
                    .join(" · ")}
                </CardDescription>
              )}
              <ul className="mt-5 space-y-2">
                {latestRole.bullets.slice(0, 2).map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-6 text-secondary">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </Container>
      </Section>

      <Section divided>
        <Container wide>
          <Reveal>
            <SectionHeader eyebrow="Projects" eyebrowHref="/projects" title="Selected work" />
          </Reveal>

          {featured.length > 0 ? (
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2">
              {featured.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </Stagger>
          ) : (
            <Reveal className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center">
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

      <Section divided>
        <Container wide>
          <Reveal className="rounded-3xl border border-accent-border bg-accent-subtle px-8 py-14 text-center sm:px-14 sm:py-20">
            <h2 className="text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
              Let&apos;s talk
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-7 text-pretty text-secondary">
              You can reach me from any provided way but i recommend WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <a href={`mailto:${site.email}`}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Send an email
                </a>
              </Button>
              <CopyEmailButton email={site.email} />
              <CopyButton
                value={site.phone}
                label="Copy call number"
                icon={<Phone className="h-4 w-4" aria-hidden="true" />}
              />
              <CopyButton
                value={site.whatsapp}
                label="Copy WhatsApp number"
                icon={<WhatsAppIcon className="h-4 w-4" />}
              />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}