import { type Project } from "@/lib/content";

type TocItems = Project["toc"];

function TocList({ items }: { items: TocItems }) {
  if (items.length === 0) return null;

  return (
    <ul className="space-y-2 border-l border-accent-border pl-4">
      {items.map((item) => (
        <li key={item.url}>
          <a
            href={item.url}
            className="text-sm text-secondary transition-colors hover:text-accent active:opacity-70"
          >
            {item.title}
          </a>
          {item.items.length > 0 && (
            <div className="mt-2 ml-3">
              <TocList items={item.items} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({ items }: { items: TocItems }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-24">
      <p className="mb-3 text-xs font-medium tracking-wide text-accent uppercase">On this page</p>
      <TocList items={items} />
    </nav>
  );
}
