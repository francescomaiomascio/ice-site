"use client";

import { useEffect, useState, type RefObject } from "react";

type UseInViewportOptions = {
  rootMargin?: string;
  threshold?: number;
};

export function useInViewport<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { rootMargin = "160px 0px", threshold = 0.01 }: UseInViewportOptions = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, ref, rootMargin, threshold]);

  return inView;
}
