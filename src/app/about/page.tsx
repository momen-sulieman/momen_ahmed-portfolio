import Image from "next/image";

import momenAvatar from "@/assets/momen-avatar.jpg";
import { CertificateViewer } from "@/components/features/certificate-viewer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { GitHubLink } from "@/components/ui/github-link";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@content/site";

export const metadata = pageMetadata({
  title: "About",
  description: `${site.name}'s background: three years of ERP requirements engineering, now building mobile apps in Flutter.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <Section className="pt-16 sm:pt-20">
      <Container>
        <Reveal className="flex items-center gap-5">
          <Image
            src={momenAvatar}
            alt={`Portrait of ${site.name}`}
            className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-accent/40 ring-offset-4 ring-offset-background"
            priority
          />
          <SectionHeader as="h1" title="About">
            <GitHubLink />
          </SectionHeader>
        </Reveal>

        <Reveal className="mt-10 space-y-5 leading-7 text-pretty text-secondary">
          <p>
            I spent three years as a systems analyst on an ERP team, writing the requirements the
            Workshop, Tiers, and Inventory modules got built from. The job was mostly translation:
            sitting between people who understand the business and people who write the code, and
            making sure nothing important got lost on the way across.
          </p>
          <p>
            I&apos;m moving into mobile development now, building with Flutter and Dart. For years
            I worked upstream of the code — specifying what a system should do rather than building
            it. I wanted to close that loop myself, so I&apos;m putting the same habit of precision
            into shipping apps end to end: local storage, REST APIs, Firebase and Supabase, maps,
            payments. The parts past the tutorial.
          </p>
          <p>
            The two sides feed each other more than I expected. Requirements engineering is really
            the discipline of asking what a feature is <em>for</em> before anyone builds it, and
            that question doesn&apos;t go away when the deliverable changes from a spec document to
            an app.
          </p>
        </Reveal>

        <Reveal className="mt-16">
          <SectionHeader eyebrow="Education" title="Where I studied" />
        </Reveal>
        <Stagger className="mt-6 space-y-5">
          {site.education.map((entry) => (
            <div
              key={entry.credential}
              className="flex items-start justify-between gap-4 border-l border-accent-border pl-5"
            >
              <div className="min-w-0">
                <p className="font-medium text-foreground">{entry.credential}</p>
                <p className="mt-1 text-sm text-secondary">
                  {[entry.institution, entry.location].filter(Boolean).join(", ")}
                </p>
                <p className="mt-1 text-sm text-tertiary">
                  {[entry.date, entry.detail].filter(Boolean).join(" · ")}
                </p>
              </div>
              {entry.image && <CertificateViewer src={entry.image} title={entry.credential} />}
            </div>
          ))}
        </Stagger>

        <Reveal className="mt-16">
          <SectionHeader eyebrow="Certifications" title="What I've trained in" />
        </Reveal>
        <Stagger className="mt-6 space-y-6">
          {site.certifications.map((cert) => (
            <div
              key={cert.title}
              className="flex items-start justify-between gap-4 border-l border-accent-border pl-5"
            >
              <div className="min-w-0">
                <p className="font-medium text-foreground">{cert.title}</p>
                <p className="mt-1 text-sm text-secondary">
                  {cert.issuer} · {cert.date}
                </p>
                {cert.detail && (
                  <p className="mt-2 text-sm leading-6 text-pretty text-tertiary">{cert.detail}</p>
                )}
              </div>
              {cert.image && <CertificateViewer src={cert.image} title={cert.title} />}
            </div>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}