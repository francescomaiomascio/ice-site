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
    src: "/rive/domains/yai_physical.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
  "digital-egress": {
    src: "/rive/domains/yai_digital.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
  "biological-custody": {
    src: "/rive/domains/yai_biological.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
  "economic-transactions": {
    src: "/rive/domains/yai_economic.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
  "operational-response": {
    src: "/rive/domains/yai_operational.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
  "institutional-authority": {
    src: "/rive/domains/yai_institutional.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
  "scientific-reproducibility": {
    src: "/rive/domains/yai_scientific.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
  "cognitive-publishing": {
    src: "/rive/domains/yai_scientific.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
  "environmental-telemetry": {
    src: "/rive/domains/yai_digital.riv",
    artboard: "Main",
    stateMachine: "Hover",
    fit: "cover",
    alignment: "center",
    version: 1,
  },
};
