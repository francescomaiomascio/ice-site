"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "./TopBar";
import { PageBack } from "./PageBack";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null);
  const snapEnabled = true;
  const pathname = usePathname();

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const y = main.scrollTop;
        main.style.setProperty("--bg-y", `${-y * 0.18}px`);
        main.style.setProperty("--bg-y-strong", `${-y * 0.32}px`);
        const atEnd =
          main.scrollTop + main.clientHeight >= main.scrollHeight - 4;
        main.classList.toggle("is-at-end", atEnd);
        ticking = false;
      });
    };

    onScroll();
    main.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      main.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    main.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className="app-surface">
      <TopBar />

      <main
        className={`site-main${snapEnabled ? " site-main--snap" : ""}`}
        role="main"
        ref={mainRef}
        id="scroll-root"
      >
        <PageBack />
        {children}
      </main>
    </div>
  );
}
