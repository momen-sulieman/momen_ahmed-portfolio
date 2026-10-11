import type { NextConfig } from "next";

const isDev = process.argv.includes("dev");

/**
 * GitHub Pages serves this repo at /momen-portfolio, so every route and asset
 * needs that prefix. Set NEXT_PUBLIC_BASE_PATH to "" if a custom domain (or a
 * <user>.github.io repo) ever serves the site from the root instead. Vercel
 * builds (VERCEL=1) serve from the root, so they default to no prefix.
 */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.VERCEL ? "" : "/momen-portfolio");

const nextConfig: NextConfig = {
  // Inline the resolved value so src/lib/paths.ts sees the same prefix in
  // client bundles, where VERCEL itself isn't exposed.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Static HTML export — GitHub Pages has no Node runtime.
  output: "export",
  basePath,
  // Emits `about/index.html` rather than `about.html`, which is what a plain
  // static host resolves predictably.
  trailingSlash: true,
  images: {
    /*
     * The built-in optimizer needs a server, so it's off. Source images are
     * therefore served as-authored: keep them close to their display size and
     * in a modern format, because nothing downstream will shrink them.
     */
    unoptimized: true,
  },
};

/*
 * Note on permanent slugs: `redirects()` is unsupported in a static export,
 * so renaming a published case study slug genuinely breaks its URL — there's
 * no server left to redirect it. Treat published slugs as immutable, or add a
 * stub page at the old path that forwards to the new one.
 */

/** Velite compiles content/ into .velite/ before Next reads the module graph. */
async function withVelite(): Promise<NextConfig> {
  if (!process.env.VELITE_STARTED) {
    process.env.VELITE_STARTED = "1";
    const { build } = await import("velite");
    await build({ watch: isDev, clean: !isDev });
  }
  return nextConfig;
}

export default withVelite;
