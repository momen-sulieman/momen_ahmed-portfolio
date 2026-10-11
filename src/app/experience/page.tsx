import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@content/site";

export const metadata = pageMetadata({
  title: "Experience",
  description: `${site.name}'s work history across ERP systems analysis and client-facing roles.`,
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <Section className="pt-16 sm:pt-20">
      <Container>
        <Reveal>
          <SectionHeader as="h1" title="Experience" />
        </Reveal>

        <Stagger className="mt-12 space-y-12">
          {site.experience.map((entry) => (
            <article
              key={`${entry.role}-${entry.start}`}
              className="relative border-l border-accent-border pl-6"
            >
              <span
                className="absolute top-2 -left-[3px] h-1.5 w-1.5 rounded-full bg-accent"
                aria-hidden="true"
              />

              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-lg font-semibold text-foreground">{entry.role}</h2>
                <p className="text-sm text-tertiary">
                  {entry.start} – {entry.end}
                </p>
              </div>

              {/* Rendered only when there is an employer, location or subtitle to show. */}
              {(entry.company || entry.location || entry.subtitle) && (
                <p className="mt-1 text-sm text-secondary">
                  {[entry.company, entry.location, entry.subtitle].filter(Boolean).join(" · ")}
                </p>
              )}

              <ul className="mt-4 space-y-2">
                {entry.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-sm leading-6 text-pretty text-secondary"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
