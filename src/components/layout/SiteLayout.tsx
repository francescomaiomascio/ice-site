"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "./TopBar";
import { PageBack } from "./PageBack";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

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
        <Footer />
      </main>
    </div>
  );
}
