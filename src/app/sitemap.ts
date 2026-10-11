import type { MetadataRoute } from "next";

import { getProjectSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/metadata";
import { allNav } from "@/lib/nav";

/** Required by `output: "export"` — this is emitted as a file at build time. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = ["/", ...allNav.map((item) => item.href)];

  return [...paths, ...getProjectSlugs().map((slug) => `/projects/${slug}`)].map((path) => ({
    url: absoluteUrl(path),
    lastModified,
  }));
}
