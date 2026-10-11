import { Mail, MapPin } from "lucide-react";

import { CopyEmailButton } from "@/components/features/copy-email-button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@content/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section className="pt-16 sm:pt-20">
      <Container>
        <Reveal>
          <SectionHeader
            as="h1"
            title="Contact"
            description="The fastest way to reach me is email. I read everything that comes in."
          />
        </Reveal>

        <Reveal className="mt-10 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <a
              href={`mailto:${site.email}`}
              className="text-lg font-medium text-foreground transition-colors hover:text-accent active:opacity-70"
            >
              {site.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <span className="text-secondary">{site.location}</span>
          </div>

          {/* Social links render only once real, verified profiles exist. */}
          {site.socials.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {site.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent transition-opacity hover:underline active:opacity-70"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-2 flex flex-wrap gap-3">
            <Button asChild>
              <a href={`mailto:${site.email}`}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                Send an email
              </a>
            </Button>
            <CopyEmailButton email={site.email} />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
