import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section className="pt-24 text-center sm:pt-32">
      <Container>
        <p className="text-sm font-medium text-accent">404</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-3 text-pretty text-secondary">
          That page doesn&apos;t exist, or it moved.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Back home</Link>
        </Button>
      </Container>
    </Section>
  );
}
