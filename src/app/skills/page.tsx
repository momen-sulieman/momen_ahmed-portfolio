import { SkillBar } from "@/components/content/skill-bar";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import { pageMetadata } from "@/lib/metadata";
import { getRatedSkills, getSkillColorIndex } from "@/lib/skill-colors";
import { site } from "@content/site";

export const metadata = pageMetadata({
  title: "Skills",
  description: `What ${site.name} works with, from Flutter and Supabase to ERP requirements engineering.`,
  path: "/skills",
});

const rated = getRatedSkills();

export default function SkillsPage() {
  return (
    <Section className="pt-16 sm:pt-20">
      <Container>
        <Reveal>
          <SectionHeader
            as="h1"
            title="Skills"
            description="A rough ordering, not a measurement. Advanced means years of paid hands-on work; Foundational means a course I finished and am still building on."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {rated.map((group) => (
            <SkillBar
              key={group.category}
              category={group.category}
              label={group.level!.label}
              value={group.level!.value}
              colorIndex={getSkillColorIndex(group.category)}
            />
          ))}
        </Stagger>

        <Stagger className="mt-16 space-y-10 border-t border-border pt-12">
          {site.skills.map((group) => (
            <div key={group.category}>
              <h2 className="text-sm font-medium tracking-wide text-accent uppercase">
                {group.category}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge>{item}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
