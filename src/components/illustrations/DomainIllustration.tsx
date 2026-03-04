"use client";

import { RIVE_DOMAINS } from "@/config/rive.domains";
import { RiveDomainIllustration } from "@/components/illustrations/rive/RiveDomainIllustration";
import { RivePlaceholder } from "@/components/illustrations/rive/RivePlaceholder";

export type DomainIllustrationKind =
  | "physical"
  | "digital"
  | "biological"
  | "economic"
  | "operational"
  | "institutional"
  | "scientific";

type DomainIllustrationProps = {
  slug: string;
  kind: DomainIllustrationKind;
  active: boolean;
  className?: string;
};

const warnedMissingSpecs = new Set<string>();

export function DomainIllustration({ slug, kind, active, className }: DomainIllustrationProps) {
  const spec = RIVE_DOMAINS[slug];

  if (!spec) {
    if (process.env.NODE_ENV !== "production" && !warnedMissingSpecs.has(slug)) {
      warnedMissingSpecs.add(slug);
      console.warn(`[RiveDomains] Missing mapping for slug: ${slug}`);
    }

    return (
      <div className={`domain-illustration-shell domain-illustration-shell--${kind} ${className ?? ""}`.trim()} aria-hidden="true">
        <RivePlaceholder />
      </div>
    );
  }

  return (
    <div className={`domain-illustration-shell domain-illustration-shell--${kind} ${className ?? ""}`.trim()} aria-hidden="true">
      <RiveDomainIllustration spec={spec} active={active} lazy />
    </div>
  );
}
