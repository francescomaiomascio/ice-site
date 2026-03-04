import { useId } from "react";

type Pt = { x: number; y: number };

const pt = (x: number, y: number): Pt => ({ x, y });
const add = (a: Pt, b: Pt): Pt => ({ x: a.x + b.x, y: a.y + b.y });
const mul = (v: Pt, k: number): Pt => ({ x: v.x * k, y: v.y * k });
const mid = (a: Pt, b: Pt): Pt => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
const poly = (points: Pt[]) => `M ${points.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" L ")} Z`;
const line = (a: Pt, b: Pt) => `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} L ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
const cubic = (s: Pt, c1: Pt, c2: Pt, e: Pt) =>
  `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} C ${c1.x.toFixed(2)} ${c1.y.toFixed(2)} ${c2.x.toFixed(2)} ${c2.y.toFixed(2)} ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
const slope = (a: Pt, b: Pt) => (b.y - a.y) / (b.x - a.x);

export function PhysicalDevicesIllustration() {
  const plateTopGradId = useId().replace(/:/g, "");
  const plateSideGradId = useId().replace(/:/g, "");
  const actuatorTopGradId = useId().replace(/:/g, "");
  const actuatorFrontGradId = useId().replace(/:/g, "");
  const actuatorShadowId = useId().replace(/:/g, "");
  const ambientShadowId = useId().replace(/:/g, "");

  const O = pt(186, 162);
  const Uref = pt(132, -96);
  const Vref = pt(132, 96);
  const W = pt(0, 46);
  const Lu = 1;
  const Lv = 0.92;
  const Hw = 1;
  const P = (u: number, v: number, w = 0) => add(add(add(O, mul(Uref, u)), mul(Vref, v)), mul(W, w));

  const A = P(0, 0);
  const B = P(Lu, 0);
  const C = P(Lu, Lv);
  const D = P(0, Lv);
  const C2 = add(C, mul(W, Hw));
  const D2 = add(D, mul(W, Hw));
  const B2 = add(B, mul(W, Hw));

  const railInsetU = 0.12;
  const railV1 = 0.55;
  const railV2 = 0.68;
  const rail1Start = add(P(railInsetU, railV1), pt(0, 0));
  const rail1End = add(P(Lu - railInsetU, railV1), pt(0, 0));
  const rail2Start = add(P(railInsetU, railV2), pt(0, 0));
  const rail2End = add(P(Lu - railInsetU, railV2), pt(0, 0));

  const gateU = 0.84;
  const gateV = 0.44;
  const gateWu = 0.18;
  const gateDv = 0.22;
  const frameInsetU = 0.03;
  const frameInsetV = 0.04;
  const leafInset = 0.01;

  const G0 = P(gateU, gateV);
  const G1 = add(G0, mul(Uref, gateWu));
  const G2 = add(G1, mul(Vref, gateDv));
  const G3 = add(G0, mul(Vref, gateDv));

  const g0 = add(add(G0, mul(Uref, frameInsetU)), mul(Vref, frameInsetV));
  const g1 = add(add(G1, mul(Uref, -frameInsetU)), mul(Vref, frameInsetV));
  const g2 = add(add(G2, mul(Uref, -frameInsetU)), mul(Vref, -frameInsetV));
  const g3 = add(add(G3, mul(Uref, frameInsetU)), mul(Vref, -frameInsetV));

  const l0 = add(add(g0, mul(Uref, leafInset)), mul(Vref, leafInset));
  const l1 = add(add(g1, mul(Uref, -leafInset)), mul(Vref, leafInset));
  const l2 = add(add(g2, mul(Uref, -leafInset)), mul(Vref, -leafInset));
  const l3 = add(add(g3, mul(Uref, leafInset)), mul(Vref, -leafInset));

  const actBase = P(0.52, 0.5);
  const actWu = 0.16;
  const actDv = 0.11;
  const actDrop = 0.52;
  const AT0 = add(actBase, add(mul(Uref, -actWu * 0.5), mul(Vref, -actDv * 0.5)));
  const AT1 = add(AT0, mul(Uref, actWu));
  const AT2 = add(AT1, mul(Vref, actDv));
  const AT3 = add(AT0, mul(Vref, actDv));
  const AF2 = add(AT2, mul(W, actDrop));
  const AF3 = add(AT3, mul(W, actDrop));
  const AS1 = add(AT1, mul(W, actDrop));

  const E = mid(g0, g1);
  const S = P(-0.08, 0.62);
  const C1 = add(S, mul(Uref, 0.22));
  const C2p = add(E, mul(Uref, -0.18));
  const ringCenter = add(E, mul(Vref, 0.05));

  if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
    const sPlate = slope(A, B);
    const sRail = slope(rail1Start, rail1End);
    const sGate = slope(G0, G1);
    console.debug("[PhysicalGeometry]", {
      slopePlate: sPlate,
      slopeRail: sRail,
      slopeGate: sGate,
      deltaRail: Math.abs(sPlate - sRail),
      deltaGate: Math.abs(sPlate - sGate),
    });
  }

  return (
    <svg viewBox="0 0 600 240" preserveAspectRatio="xMidYMid meet" className="domain-ill domain-ill--physical" aria-hidden="true">
      {/* Physical is the style reference for other domains. */}
      <defs>
        <linearGradient id={plateTopGradId} x1="194" y1="146" x2="434" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--phy-hue-ink)" />
          <stop offset="55%" stopColor="rgba(22, 54, 30, 0.93)" />
          <stop offset="100%" stopColor="var(--phy-hue-ink-2)" />
        </linearGradient>
        <linearGradient id={plateSideGradId} x1="254" y1="182" x2="434" y2="196" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(16, 42, 22, 0.94)" />
          <stop offset="100%" stopColor="var(--phy-hue-ink-2)" />
        </linearGradient>
        <linearGradient id={actuatorTopGradId} x1={AT0.x} y1={AT0.y} x2={AT2.x} y2={AT2.y} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--domain-accent-hi)" />
          <stop offset="55%" stopColor="var(--domain-accent)" />
          <stop offset="100%" stopColor="var(--domain-accent-2)" />
        </linearGradient>
        <linearGradient id={actuatorFrontGradId} x1={AT3.x} y1={AT3.y} x2={AF2.x} y2={AF2.y} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(178, 244, 108, 0.82)" />
          <stop offset="100%" stopColor="rgba(95, 176, 28, 0.84)" />
        </linearGradient>
        <filter id={actuatorShadowId} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.2" floodColor="rgba(8, 28, 14, 0.55)" floodOpacity="0.42" />
        </filter>
        <filter id={ambientShadowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.6" />
        </filter>
      </defs>

      <g className="domain-ill-scene" transform="translate(-246 -104) scale(2.24)">
        <g className="domain-ill-depth">
          <ellipse cx={330} cy={218} rx={144} ry={20} className="domain-ill-physical-shadow" filter={`url(#${ambientShadowId})`} />
          <path d={poly([A, B, C, D])} className="phy-plate-top" fill={`url(#${plateTopGradId})`} />
          <path d={poly([D, C, C2, D2])} className="phy-plate-front" fill={`url(#${plateSideGradId})`} />
          <path d={poly([B, C, C2, B2])} className="phy-plate-right" fill={`url(#${plateSideGradId})`} />
          <path d={poly([A, D, D2, add(A, W)])} className="phy-plate-side" />
          <path d={line(D, C)} className="phy-plate-edge-hi" />
        </g>

        <g className="domain-ill-main">
          <path d={line(rail1Start, rail1End)} className="phy-rail" />
          <path d={line(rail2Start, rail2End)} className="phy-rail" />
          <path d={line(A, B)} className="phy-edge-far" />
          <path d={line(B, C)} className="phy-edge-far" />
          <path d={line(C, C2)} className="phy-edge-far" />
          <path d={line(C, D)} className="phy-edge-near" />
          <path d={line(D, A)} className="phy-edge-near" />
          <path d={line(D, D2)} className="phy-edge-near" />
          <path d={line(D2, C2)} className="phy-edge-near" />
        </g>

        <g className="domain-ill-accent">
          <g className="phy-actuator phy-actuator-press" filter={`url(#${actuatorShadowId})`}>
            <path d={poly([AT0, AT1, AT2, AT3])} className="phy-actuator-top" fill={`url(#${actuatorTopGradId})`} />
            <path d={poly([AT3, AT2, AF2, AF3])} className="phy-actuator-front" fill={`url(#${actuatorFrontGradId})`} />
            <path d={poly([AT1, AT2, AF2, AS1])} className="phy-actuator-side" />
          </g>

          <g className="phy-gate">
            <path d={poly([G0, G1, G2, G3])} className="phy-gate-frame-fill" />
            <path d={line(G0, G1)} className="phy-gate-edge" />
            <path d={line(G1, G2)} className="phy-gate-edge" />
            <path d={line(G2, G3)} className="phy-gate-edge" />
            <path d={line(G3, G0)} className="phy-gate-edge" />

            <path d={line(g0, g1)} className="phy-gate-inner" />
            <path d={line(g1, g2)} className="phy-gate-inner" />
            <path d={line(g2, g3)} className="phy-gate-inner" />
            <path d={line(g3, g0)} className="phy-gate-inner" />

            <path d={line(add(G0, mul(W, 0.02)), add(G1, mul(W, 0.02)))} className="phy-gate-shadow" />

            <g className="phy-gate-leaf">
              <path d={poly([l0, l1, l2, l3])} className="phy-gate-leaf-shape" />
            </g>
          </g>

          <path d={cubic(S, C1, C2p, E)} className="phy-command-path" />
          <circle cx={E.x} cy={E.y} r={2.2} className="phy-command-port" />
          <circle cx={ringCenter.x} cy={ringCenter.y} r={14} className="phy-proof-ring" />
        </g>
      </g>
    </svg>
  );
}
