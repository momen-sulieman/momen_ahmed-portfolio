"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once, the first time the element enters the viewport.
 *
 * When IntersectionObserver is missing this simply never flips — which is
 * correct, because the `.js` class that gates every reveal rule is only set
 * when IntersectionObserver exists. No observer means nothing was hidden.
 */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
