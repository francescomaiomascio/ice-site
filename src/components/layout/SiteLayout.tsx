"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "./TopBar";
import { PageBack } from "./PageBack";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = rootRef.current;
    const main = mainRef.current;
    if (!root || !main) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const y = main.scrollTop || 0;

      // calm parallax
      root.style.setProperty("--bg-y", `${-y * 0.10}px`);
      root.style.setProperty("--bg-y-strong", `${-y * 0.16}px`);

      const atEnd = y + main.clientHeight >= main.scrollHeight - 4;
      root.classList.toggle("is-at-end", atEnd);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    main.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      main.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

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