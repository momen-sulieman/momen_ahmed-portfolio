import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Reveal } from "@/components/motion/reveal";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@content/site";

export const metadata = pageMetadata({
  title: "Now",
  description: `What ${site.name} is focused on at the moment.`,
  path: "/now",
});

/** Update this when the page changes — a stale /now is worse than none. */
const lastUpdated = "September 2026";

export default function NowPage() {
  return (
    <Section className="pt-16 sm:pt-20">
      <Container>
        <Reveal>
          <SectionHeader as="h1" title="Now" />
          <p className="mt-3 text-sm text-tertiary">Last updated {lastUpdated}</p>
        </Reveal>

        <Reveal className="mt-10 space-y-5 leading-7 text-pretty text-secondary">
          <p>
            I finished a Flutter development diploma and a UI/UX design course this year, after
            three years as a systems analyst on an ERP team. Right now I&apos;m building mobile
            projects in Flutter — Firebase and Supabase integrations, REST APIs, payments — and
            pushing past the point where tutorials usually stop.
          </p>
          <p>
            I&apos;m looking for a mobile developer role where the requirements-engineering
            background is an asset rather than a footnote: somewhere the person building the
            feature is expected to ask what it&apos;s for.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
