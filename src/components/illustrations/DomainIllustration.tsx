"use client";

import { RIVE_DOMAINS } from "@/config/rive.domains";
import { RiveDomainIllustration } from "@/components/illustrations/rive/RiveDomainIllustration";
import {
  BiologicalChainIllustration,
  DigitalEgressIllustration,
  EconomicTransactionsIllustration,
  InstitutionalProceduresIllustration,
  OperationalIncidentsIllustration,
  PhysicalDevicesIllustration,
  ScientificReproIllustration,
} from "@/components/illustrations/domains";

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

function renderLegacyIllustration(kind: DomainIllustrationKind) {
  if (kind === "physical") return <PhysicalDevicesIllustration />;
  if (kind === "digital") return <DigitalEgressIllustration />;
  if (kind === "biological") return <BiologicalChainIllustration />;
  if (kind === "economic") return <EconomicTransactionsIllustration />;
  if (kind === "operational") return <OperationalIncidentsIllustration />;
  if (kind === "institutional") return <InstitutionalProceduresIllustration />;
  return <ScientificReproIllustration />;
}

export function DomainIllustration({ slug, kind, active, className }: DomainIllustrationProps) {
  const spec = RIVE_DOMAINS[slug];

  return (
    <div className={`domain-illustration-shell domain-illustration-shell--${kind} ${className ?? ""}`.trim()} aria-hidden="true">
      {spec ? (
        <RiveDomainIllustration
          spec={spec}
          active={active}
          lazy
          fallback={<div className="domain-illustration-legacy">{renderLegacyIllustration(kind)}</div>}
        />
      ) : (
        <div className="domain-illustration-legacy">{renderLegacyIllustration(kind)}</div>
      )}
    </div>
  );
}
