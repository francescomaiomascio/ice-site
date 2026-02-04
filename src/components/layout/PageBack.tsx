"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function getParentPath(segments: string[]) {
  if (segments.length <= 1) return "/";
  return `/${segments.slice(0, -1).join("/")}`;
}

function buildSegmentPaths(segments: string[]) {
  return segments.map((segment, index) => ({
    label: segment,
    href: `/${segments.slice(0, index + 1).join("/")}`,
  }));
}

export function PageBack() {
  const pathname = usePathname();

  if (!pathname || pathname === "/") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  const parentPath = getParentPath(segments);
  const breadcrumbs = buildSegmentPaths(segments);

  return (
    <div className="page-back" aria-label="Breadcrumb">
      <Link href={parentPath} className="page-back-icon" aria-label="Go up one level">
        <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <path
            d="M12.75 4.75L7.5 10l5.25 5.25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <nav className="page-back-path" aria-label="Path">
        <Link href={parentPath} className="page-back-crumb">
          ..
        </Link>
        {breadcrumbs.map((crumb) => (
          <span key={crumb.href} className="page-back-seg">
            <span className="page-back-sep">/</span>
            <Link href={crumb.href} className="page-back-crumb">
              {crumb.label}
            </Link>
          </span>
        ))}
      </nav>
    </div>
  );
}
