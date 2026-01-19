"use client";

import { useEffect, useRef } from "react";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) {
      return;
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        const y = main.scrollTop;
        main.style.setProperty("--bg-y", `${-y * 0.18}px`);
        main.style.setProperty("--bg-y-strong", `${-y * 0.32}px`);
        ticking = false;
      });
    };

    onScroll();
    main.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      main.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="site-root">
      <TopBar />

      <main className="site-main" role="main" ref={mainRef} id="scroll-root">
        {children}
      </main>

      <Footer />
    </div>
  );
}
