import type { Metadata } from "next";

import { basePath } from "@/lib/paths";
import { site } from "@content/site";

/**
 * Where the site actually lives, including any sub-path — derived from the
 * same basePath the router uses, so the two can't drift. Point
 * NEXT_PUBLIC_SITE_URL at a custom domain (and clear NEXT_PUBLIC_BASE_PATH)
 * to move it to a root.
 */
const url = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : `https://mohamed-mamoun.github.io${basePath}`)
).replace(/\/$/, "");

export const siteConfig = {
  name: site.name,
  title: `${site.name} — ${site.role}`,
  description: site.anchorLine,
  url,
};

/**
 * Absolute URL for a route or asset path.
 *
 * Built by concatenation rather than `new URL(path, base)` on purpose: an
 * absolute path like "/about" would resolve against the origin and silently
 * drop the "/momen-portfolio" sub-path. Routes get a trailing slash to match
 * `trailingSlash: true`; files (anything with an extension) do not.
 */
export function absoluteUrl(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  if (trimmed === "") return `${url}/`;
  const isFile = /\.[a-z0-9]+$/i.test(trimmed);
  return `${url}/${trimmed}${isFile ? "" : "/"}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Overrides the generated OG image — used for project covers. */
  image?: string;
};

/** Site-wide social image, overridden per page by project covers. */
export const defaultOgImage = "/og.png";

export function pageMetadata({ title, description, path, image }: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  // Always emit an explicit, absolute image URL. Relying on Next's
  // `opengraph-image` file convention silently produced no og:image at all
  // once an `openGraph` block was set here, and its generated URL skipped
  // the basePath.
  const images = [
    { url: absoluteUrl(image ?? defaultOgImage), width: 1200, height: 630, alt: title },
  ];

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url: canonical,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((entry) => entry.url),
    },
  };
}
