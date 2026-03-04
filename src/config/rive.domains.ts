export type RiveDomainFit = "cover" | "contain";
export type RiveDomainAlignment = "center" | "topLeft" | "bottomRight";

export type RiveDomainSpec = {
  src: string;
  artboard: string;
  stateMachine: string;
  fit?: RiveDomainFit;
  alignment?: RiveDomainAlignment;
  version?: number;
};

export const RIVE_DOMAINS: Record<string, RiveDomainSpec> = {
  "physical-actuators": {
    src: "/rive/domains/physical-actuators.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
  "digital-egress": {
    src: "/rive/domains/digital-egress.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
  "biological-custody": {
    src: "/rive/domains/biological-custody.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
  "economic-transactions": {
    src: "/rive/domains/economic-transactions.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
  "operational-response": {
    src: "/rive/domains/operational-response.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
  "institutional-authority": {
    src: "/rive/domains/institutional-authority.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
  "scientific-reproducibility": {
    src: "/rive/domains/scientific-reproducibility.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
  "cognitive-publishing": {
    src: "/rive/domains/cognitive-publishing.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
  "environmental-telemetry": {
    src: "/rive/domains/environmental-telemetry.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
};
