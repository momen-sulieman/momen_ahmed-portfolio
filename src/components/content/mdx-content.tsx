import { run } from "@mdx-js/mdx";
import type { MDXComponents } from "mdx/types";
import * as runtime from "react/jsx-runtime";

import { CodeBlock } from "@/components/content/code-block";

const components: MDXComponents = {
  pre: CodeBlock,
  a: ({ href, ...props }) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        className="text-accent underline underline-offset-4 transition-opacity hover:opacity-80 active:opacity-70"
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...props}
      />
    );
  },
};

/**
 * Evaluates the compiled MDX that Velite's `s.mdx()` produced. Runs on the
 * server, so case studies stay static with no client-side MDX runtime.
 */
export async function MDXContent({ code }: { code: string }) {
  const { default: Content } = await run(code, { ...runtime, baseUrl: import.meta.url });
  return <Content components={components} />;
}
