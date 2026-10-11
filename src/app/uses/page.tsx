import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@content/site";

export const metadata = pageMetadata({
  title: "Uses",
  description: `The stack ${site.name} builds mobile apps and system integrations with.`,
  path: "/uses",
});

/*
 * Scoped to the build stack, which the resume actually evidences — not a
 * desk-setup rundown with invented hardware and editor preferences.
 */
const buildStack = site.skills.filter((group) =>
  ["Mobile Development", "Systems & Analysis", "UI/UX & Design"].includes(group.category),
);

export default function UsesPage() {
  return (
    <Section className="pt-16 sm:pt-20">
      <Container>
        <Reveal>
          <SectionHeader
            as="h1"
            title="Uses"
            description="The toolkit behind the work — what I actually reach for, rather than everything I've touched once."
          />
        </Reveal>

        <Stagger className="mt-12 space-y-10">
          {buildStack.map((group) => (
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
