import { site } from "@content/site";

/**
 * Colour follows the category, never its rank — so "Systems & Analysis" is
 * the same hue on the home teaser as on /skills, regardless of which subset
 * is rendered or how the list is sorted.
 */
const order = site.skills.filter((group) => group.level).map((group) => group.category);

export function getSkillColorIndex(category: string): number {
  const index = order.indexOf(category);
  return index === -1 ? 0 : index;
}

/** Categories with a proficiency level, in their canonical order. */
export function getRatedSkills() {
  return site.skills.filter((group) => group.level);
}
