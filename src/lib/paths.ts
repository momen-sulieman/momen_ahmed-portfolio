/**
 * The sub-path the site is served from. Must match `basePath` in
 * next.config.ts, which resolves it (including the Vercel default) and
 * inlines the result via `env`.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/momen-portfolio";

/**
 * Root-relative URL for a content asset (anything Velite emitted into
 * /static, or a file in public/).
 *
 * Needed because `next/image` with `unoptimized: true` passes `src` through
 * untouched — it never applies the basePath the way it does for bundled
 * assets. Without this, every content image 404s on a sub-path deploy.
 *
 * Idempotent, so passing an already-prefixed or absolute URL is safe.
 */
export function assetPath(src: string): string {
  if (!basePath || /^https?:\/\//.test(src) || src.startsWith(`${basePath}/`)) return src;
  return `${basePath}${src}`;
}
