import { useId } from "react";

export function BiologicalChainIllustration() {
  const bioChainGradId = useId().replace(/:/g, "");
  const bioSealGradId = useId().replace(/:/g, "");
  const bioSealShadowId = useId().replace(/:/g, "");

  return (
    <svg viewBox="0 0 600 240" className="domain-ill domain-ill--biological" aria-hidden="true">
      <defs>
        <linearGradient id={bioChainGradId} x1="190" y1="172" x2="500" y2="168" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(214, 226, 246, 0.28)" />
          <stop offset="50%" stopColor="rgba(237, 243, 255, 0.5)" />
          <stop offset="100%" stopColor="rgba(198, 218, 242, 0.26)" />
        </linearGradient>
        <linearGradient id={bioSealGradId} x1="486" y1="150" x2="514" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--domain-accent-hi)" />
          <stop offset="45%" stopColor="var(--domain-accent)" />
          <stop offset="100%" stopColor="var(--domain-accent-2)" />
        </linearGradient>
        <filter id={bioSealShadowId} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.2" floodColor="#000000" floodOpacity="0.28" />
        </filter>
      </defs>

      <g className="domain-ill-grid">
        <path d="M188 108h324M188 138h324M188 168h324M188 198h324" />
      </g>

      <g className="domain-ill-main">
        <path d="M188 176h324" className="domain-ill-line" />
        <path d="M210 176H492" className="domain-ill-chain-base" />
      </g>

      <g className="domain-ill-depth">
        <path d="M210 180H492" className="domain-ill-biological-shadow" />
        <path d="M210 175H492" className="domain-ill-chain-hi" stroke={`url(#${bioChainGradId})`} />
      </g>

      <g className="domain-ill-nodes">
        <circle cx="238" cy="176" r="14" className="domain-ill-biological-node" />
        <circle cx="318" cy="176" r="14" className="domain-ill-biological-node" />
        <circle cx="398" cy="176" r="14" className="domain-ill-biological-node" />
        <circle cx="478" cy="176" r="14" className="domain-ill-biological-node domain-ill-biological-node--end" />
      </g>

      <g className="domain-ill-accent domain-ill-seal" filter={`url(#${bioSealShadowId})`}>
        <ellipse cx="500" cy="198" rx="17" ry="6" className="domain-ill-biological-seal-shadow" />
        <circle cx="500" cy="176" r="16" className="domain-ill-seal-fill" fill={`url(#${bioSealGradId})`} />
        <circle cx="500" cy="176" r="12.4" className="domain-ill-seal-ring" />
        <path d="M492 176l6 6 10-13" className="domain-ill-check" />
      </g>

      <g className="domain-ill-accent">
        <path d="M210 176H500" className="domain-ill-custody-sweep" />
      </g>
    </svg>
  );
}
