"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "./TopBar";
import { PageBack } from "./PageBack";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  // Parallax driven by the real scroll container (main).
  useEffect(() => {
    const root = rootRef.current;
    const main = mainRef.current;
    if (!root || !main) return;

    let raf = 0;

    const update = () => {
      raf = 0;

      const y = main.scrollTop || 0;

      // Keep it subtle AND bounded (prevents “background runs away” at page end)
      // 0.08 is calm; clamp prevents huge translations on long pages.
      const px = clamp(-y * 0.08, -140, 60);

      root.style.setProperty("--bg-y", `${px}px`);

      const atEnd = main.scrollTop + main.clientHeight >= main.scrollHeight - 4;
      root.classList.toggle("is-at-end", atEnd);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    main.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      main.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // Route change: scroll the real container to top
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    main.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div ref={rootRef} className="app-surface app-surface--bg">
      <TopBar />
      <main ref={mainRef} className="site-main" role="main" id="scroll-root">
        <PageBack />
        {children}
      </main>
    </div>
  );
}