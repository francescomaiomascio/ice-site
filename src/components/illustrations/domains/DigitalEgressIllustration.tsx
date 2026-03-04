import { useId } from "react";

export function DigitalEgressIllustration() {
  const digitalPipeGradId = useId().replace(/:/g, "");
  const digitalAccentGradId = useId().replace(/:/g, "");
  const digitalAmbientShadowId = useId().replace(/:/g, "");

  return (
    <svg viewBox="0 0 600 240" className="domain-ill domain-ill--digital" aria-hidden="true">
      <defs>
        <linearGradient id={digitalPipeGradId} x1="72" y1="106" x2="526" y2="106" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(216, 225, 246, 0.2)" />
          <stop offset="50%" stopColor="rgba(232, 240, 255, 0.36)" />
          <stop offset="100%" stopColor="rgba(205, 220, 240, 0.2)" />
        </linearGradient>
        <linearGradient id={digitalAccentGradId} x1="84" y1="184" x2="520" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--domain-accent-hi)" />
          <stop offset="45%" stopColor="var(--domain-accent)" />
          <stop offset="100%" stopColor="var(--domain-accent-2)" />
        </linearGradient>
        <filter id={digitalAmbientShadowId} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.8" floodColor="#000000" floodOpacity="0.28" />
        </filter>
      </defs>

      <g className="domain-ill-grid">
        <path d="M88 88v122M176 88v122M264 88v122M352 88v122M440 88v122M528 88v122" />
        <path d="M80 106h454M80 142h454M80 178h454" />
      </g>

      <g className="domain-ill-depth">
        <path
          d="M84 184C132 165 181 149 236 160C282 170 334 129 388 136C432 143 472 113 520 118"
          className="domain-ill-digital-ambient"
          filter={`url(#${digitalAmbientShadowId})`}
        />
        <path
          d="M84 174C132 155 181 139 236 150C282 160 334 119 388 126C432 133 472 103 520 108"
          className="domain-ill-digital-ambient"
          filter={`url(#${digitalAmbientShadowId})`}
        />
      </g>

      <g className="domain-ill-main">
        <path
          d="M84 184C132 165 181 149 236 160C282 170 334 129 388 136C432 143 472 113 520 118"
          className="domain-ill-pipe-base"
        />
        <path
          d="M84 174C132 155 181 139 236 150C282 160 334 119 388 126C432 133 472 103 520 108"
          className="domain-ill-pipe-base"
        />
        <path
          d="M84 183C132 164 181 148 236 159C282 169 334 128 388 135C432 142 472 112 520 117"
          className="domain-ill-pipe-hi"
          stroke={`url(#${digitalPipeGradId})`}
        />
        <path
          d="M84 173C132 154 181 138 236 149C282 159 334 118 388 125C432 132 472 102 520 107"
          className="domain-ill-pipe-hi"
          stroke={`url(#${digitalPipeGradId})`}
        />
      </g>

      <g className="domain-ill-nodes">
        <circle cx="132" cy="162" r="6.6" className="domain-ill-digital-node" />
        <circle cx="296" cy="145" r="6.8" className="domain-ill-digital-node" />
        <circle cx="462" cy="120" r="7.3" className="domain-ill-digital-node" />
        <circle cx="296" cy="145" r="15" className="domain-ill-digital-pulse" />
      </g>

      <g className="domain-ill-accent">
        <path
          d="M84 184C132 165 181 149 236 160C282 170 334 129 388 136C432 143 472 113 520 118"
          className="domain-ill-digital-flow"
          stroke={`url(#${digitalAccentGradId})`}
        />
      </g>
    </svg>
  );
}
