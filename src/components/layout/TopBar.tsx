// src/components/layout/TopBar.tsx
"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

const PILOT_MAILTO =
  "mailto:pilot@yai.foundation?subject=Book%20Pilot%20-%20YAI%2014-Day";
const DOCS_URL = "https://github.com/yai-labs/yai/tree/main/docs";

type MenuKey = "products" | "resources" | null;

function SearchIcon(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 21l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDownIcon(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useDropdownController() {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const closeT = useRef<number | null>(null);

  const clearClose = () => {
    if (closeT.current) window.clearTimeout(closeT.current);
    closeT.current = null;
  };

  const requestClose = () => {
    clearClose();
    closeT.current = window.setTimeout(() => setOpenMenu(null), 160);
  };

  const open = (k: Exclude<MenuKey, null>) => {
    clearClose();
    setOpenMenu(k);
  };

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (!root.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return { openMenu, setOpenMenu, rootRef, open, requestClose, clearClose };
}

export function TopBar() {
  const { openMenu, setOpenMenu, rootRef, open, requestClose, clearClose } =
    useDropdownController();

  const productsId = useId();
  const resourcesId = useId();

  return (
    <header
      ref={rootRef as any}
      className={`topbar ${openMenu ? "topbar--menu-open" : ""}`}
      role="banner"
    >
      <div
        className={`topbar-overlay ${openMenu ? "is-open" : ""}`}
        aria-hidden="true"
        onMouseEnter={clearClose}
        onMouseLeave={requestClose}
        onClick={() => setOpenMenu(null)}
      />

      <nav className="topbar-inner" aria-label="Primary">
        <Link href="/" className="topbar-brand" aria-label="YAI Labs home">
          <span className="topbar-brand-mark" aria-hidden="true">
            YAI
          </span>
          <span className="topbar-brand-sub">Labs</span>
        </Link>

        <div className="topbar-links" role="navigation" aria-label="Site">
          {/* PRODUCTS */}
          <div
            className={`topbar-menu ${openMenu === "products" ? "is-open" : ""}`}
            onMouseEnter={() => open("products")}
            onMouseLeave={requestClose}
          >
            <Link
              href="/#products"
              className="topbar-link topbar-menu-trigger"
              aria-haspopup="true"
              aria-expanded={openMenu === "products"}
              aria-controls={productsId}
              onFocus={() => open("products")}
            >
              Products <ChevronDownIcon className="topbar-caret" />
            </Link>

            <div
              id={productsId}
              className="topbar-dropdown"
              role="menu"
              aria-label="Products menu"
              onMouseEnter={clearClose}
              onMouseLeave={requestClose}
            >
              <div className="topbar-dd-grid">
                {/* ONLY column with descriptions */}
                <div className="topbar-dd-col">
                  <div className="topbar-dd-kicker">PRODUCTS</div>

                  <Link className="topbar-dd-item" href="/#domains" role="menuitem">
                    <div className="topbar-dd-title">Domains</div>
                    <div className="topbar-dd-desc">
                      The execution surface by real-world domain (digital, physical, institutional).
                    </div>
                  </Link>

                  <Link className="topbar-dd-item" href="/#proof" role="menuitem">
                    <div className="topbar-dd-title">Proof surfaces</div>
                    <div className="topbar-dd-desc">
                      What gets produced, stored, and replayed after execution.
                    </div>
                  </Link>

                  <Link className="topbar-dd-item" href="/#services" role="menuitem">
                    <div className="topbar-dd-title">Pilot delivery</div>
                    <div className="topbar-dd-desc">
                      Design-partner workflow with verifiable artifacts you keep.
                    </div>
                  </Link>
                </div>

                {/* No descriptions here (Redis-like list column) */}
                <div className="topbar-dd-col topbar-dd-col--tools">
                  <div className="topbar-dd-kicker">NAV</div>

                  <Link className="topbar-dd-item topbar-dd-item--plain" href="/#proof" role="menuitem">
                    Pilot outcomes
                  </Link>

                  <Link className="topbar-dd-item topbar-dd-item--plain" href="/#services" role="menuitem">
                    Services
                  </Link>

                  <a
                    className="topbar-dd-item topbar-dd-item--plain"
                    href={PILOT_MAILTO}
                    role="menuitem"
                  >
                    Book pilot
                  </a>

                  <a
                    className="topbar-dd-item topbar-dd-item--plain"
                    href={DOCS_URL}
                    target="_blank"
                    rel="noreferrer"
                    role="menuitem"
                  >
                    Try via docs
                  </a>
                </div>
              </div>

              <div className="topbar-dd-footer" aria-hidden="true">
                <span className="topbar-dd-footer-kicker">NEXT</span>
                <span className="topbar-dd-footer-text">
                  Domains become pilots. Pilots produce evidence bundles.
                </span>
              </div>
            </div>
          </div>

          {/* RESOURCES */}
          <div
            className={`topbar-menu ${openMenu === "resources" ? "is-open" : ""}`}
            onMouseEnter={() => open("resources")}
            onMouseLeave={requestClose}
          >
            <Link
              href="/#resources"
              className="topbar-link topbar-menu-trigger"
              aria-haspopup="true"
              aria-expanded={openMenu === "resources"}
              aria-controls={resourcesId}
              onFocus={() => open("resources")}
            >
              Resources <ChevronDownIcon className="topbar-caret" />
            </Link>

            <div
              id={resourcesId}
              className="topbar-dropdown"
              role="menu"
              aria-label="Resources menu"
              onMouseEnter={clearClose}
              onMouseLeave={requestClose}
            >
              <div className="topbar-dd-grid topbar-dd-grid--resources">
                {/* Redis-like: lists only, no per-item descriptions */}
                <div className="topbar-dd-col">
                  <div className="topbar-dd-kicker">LEARN</div>

                  <Link className="topbar-dd-item topbar-dd-item--plain" href="/#start" role="menuitem">
                    Quickstart
                  </Link>
                  <Link className="topbar-dd-item topbar-dd-item--plain" href="/#proof" role="menuitem">
                    Tutorials
                  </Link>
                  <Link className="topbar-dd-item topbar-dd-item--plain" href="/#services" role="menuitem">
                    Developer Hub
                  </Link>
                  <Link className="topbar-dd-item topbar-dd-item--plain" href="/#proof" role="menuitem">
                    Commands
                  </Link>
                  <Link className="topbar-dd-item topbar-dd-item--plain" href="/writing" role="menuitem">
                    Blog
                  </Link>
                </div>

                <div className="topbar-dd-col topbar-dd-col--tools">
                  <div className="topbar-dd-kicker">LATEST</div>

                  <Link className="topbar-dd-item topbar-dd-item--plain" href="/status" role="menuitem">
                    News & updates
                  </Link>
                  <Link className="topbar-dd-item topbar-dd-item--plain" href="/status" role="menuitem">
                    Releases
                  </Link>

                  <div className="topbar-dd-sep" aria-hidden="true" />

                  <div className="topbar-dd-kicker">CONNECT</div>

                  <a className="topbar-dd-item topbar-dd-item--plain" href={PILOT_MAILTO} role="menuitem">
                    Support
                  </a>
                  <span className="topbar-dd-item topbar-dd-item--plain topbar-dd-item--muted">
                    Partners (coming soon)
                  </span>
                  <span className="topbar-dd-item topbar-dd-item--plain topbar-dd-item--muted">
                    Professional services (coming soon)
                  </span>
                </div>
              </div>

              <div className="topbar-dd-footer" aria-hidden="true">
                <span className="topbar-dd-footer-kicker">TIP</span>
                <span className="topbar-dd-footer-text">
                  Resources is the home for Hub + Tutorials + Commands + Updates.
                </span>
              </div>
            </div>
          </div>

          <Link href="/#pricing" className="topbar-link">
            Pricing
          </Link>

          <a className="topbar-link" href={DOCS_URL} target="_blank" rel="noreferrer">
            Docs
          </a>
        </div>

        <div className="topbar-actions" aria-label="Actions">
          <button className="topbar-search" type="button" aria-label="Search">
            <SearchIcon />
          </button>

          <a className="topbar-action-link" href={PILOT_MAILTO}>
            Book pilot
          </a>

          <a
            className="button button--primary topbar-cta"
            href={DOCS_URL}
            target="_blank"
            rel="noreferrer"
          >
            Try YAI
          </a>
        </div>
      </nav>
    </header>
  );
}