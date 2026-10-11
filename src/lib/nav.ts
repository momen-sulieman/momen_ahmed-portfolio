export type NavItem = {
  label: string;
  href: string;
};

/** Header nav. Only routes with real content appear here. */
export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

/** Secondary routes — footer and command menu, not the header. */
export const secondaryNav: NavItem[] = [
  { label: "Uses", href: "/uses" },
  { label: "Now", href: "/now" },
];

export const allNav: NavItem[] = [...primaryNav, ...secondaryNav];
