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

export function DomainIllustration({ kind, className }: { kind: DomainIllustrationKind; className?: string }) {
  return (
    <div className={`domain-illustration-shell domain-illustration-shell--${kind} ${className ?? ""}`.trim()} aria-hidden="true">
      {kind === "physical" ? <PhysicalDevicesIllustration /> : null}
      {kind === "digital" ? <DigitalEgressIllustration /> : null}
      {kind === "biological" ? <BiologicalChainIllustration /> : null}
      {kind === "economic" ? <EconomicTransactionsIllustration /> : null}
      {kind === "operational" ? <OperationalIncidentsIllustration /> : null}
      {kind === "institutional" ? <InstitutionalProceduresIllustration /> : null}
      {kind === "scientific" ? <ScientificReproIllustration /> : null}
    </div>
  );
}
