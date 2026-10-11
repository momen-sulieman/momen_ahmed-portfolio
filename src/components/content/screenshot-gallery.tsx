import Image from "next/image";

import { DeviceFrame } from "@/components/ui/device-frame";
import { type Project } from "@/lib/content";
import { assetPath } from "@/lib/paths";

type Gallery = NonNullable<Project["gallery"]>;

/**
 * Horizontal screenshot tour. The scroller is focusable and labelled so it
 * can be reached and scrolled by keyboard, not just by dragging.
 */
export function ScreenshotGallery({ items }: { items: Gallery }) {
  if (items.length === 0) return null;

  return (
    <div
      tabIndex={0}
      role="group"
      aria-label="App screenshots"
      className="-mx-6 overflow-x-auto px-6 pb-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <ul className="flex snap-x snap-mandatory gap-5">
        {items.map((item) => (
          <li key={item.image.src} className="w-44 shrink-0 snap-start sm:w-56">
            <DeviceFrame>
              <Image
                src={assetPath(item.image.src)}
                alt={item.caption}
                width={item.image.width}
                height={item.image.height}
                sizes="(min-width: 640px) 14rem, 11rem"
                className="block h-auto w-full"
                loading="lazy"
              />
            </DeviceFrame>
            <p className="mt-3 text-sm leading-6 text-pretty text-secondary">{item.caption}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
