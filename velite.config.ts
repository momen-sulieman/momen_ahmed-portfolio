import { defineCollection, defineConfig, s } from "velite";

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug("projects"),
      summary: s.string().max(280),
      date: s.isodate(),
      role: s.string(),
      period: s.string(),
      stack: s.array(s.string()),
      links: s
        .object({
          repo: s.string().url().optional(),
          live: s.string().url().optional(),
        })
        .optional(),
      cover: s.image().optional(),
      icon: s.image().optional(),
      apk: s.string().optional(),
      apkNote: s.string().optional(),
      gallery: s
        .array(s.object({ image: s.image(), caption: s.string() }))
        .optional(),
      featured: s.boolean().default(false),
      draft: s.boolean().default(false),
      toc: s.toc(),
      body: s.mdx(),
    })
    .transform((data) => ({ ...data, permalink: `/projects/${data.slug}` })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { projects },
});