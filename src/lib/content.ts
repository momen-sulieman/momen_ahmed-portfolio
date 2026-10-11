import { projects as generated } from "#site/content";
import type { Project } from "#site/content";

export type { Project };

/**
 * The only module that touches Velite's generated output. Components call
 * these queries instead of importing `#site/content` directly, so the
 * content layer can change shape without rippling through the UI.
 */
const published = generated
  .filter((project) => !project.draft)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getProjects(): Project[] {
  return published;
}

export function getFeaturedProjects(): Project[] {
  return published.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return published.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return published.map((project) => project.slug);
}
