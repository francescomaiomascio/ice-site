"use client";

import {
  Alignment,
  Fit,
  Layout,
  useRive,
} from "@rive-app/react-canvas-lite";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { RiveDomainAlignment, RiveDomainFit, RiveDomainSpec } from "@/config/rive.domains";
import { useInViewport } from "@/components/illustrations/rive/useInViewport";
import { usePrefersReducedMotion } from "@/components/illustrations/rive/usePrefersReducedMotion";

type RiveDomainIllustrationProps = {
  spec: RiveDomainSpec;
  active: boolean;
  className?: string;
  lazy?: boolean;
  ariaHidden?: boolean;
  fallback?: ReactNode;
};

function mapFit(fit: RiveDomainFit | undefined) {
  if (fit === "contain") return Fit.Contain;
  return Fit.Cover;
}

function mapAlignment(alignment: RiveDomainAlignment | undefined) {
  if (alignment === "topLeft") return Alignment.TopLeft;
  if (alignment === "bottomRight") return Alignment.BottomRight;
  return Alignment.Center;
}

function RiveDomainCanvas({ spec, active, fallback }: Pick<RiveDomainIllustrationProps, "spec" | "active" | "fallback">) {
  const [hasError, setHasError] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const src = useMemo(() => {
    if (!spec.version) return spec.src;
    return `${spec.src}?v=${spec.version}`;
  }, [spec.src, spec.version]);

  const layout = useMemo(
    () =>
      new Layout({
        fit: mapFit(spec.fit),
        alignment: mapAlignment(spec.alignment),
      }),
    [spec.fit, spec.alignment],
  );

  const { rive, RiveComponent } = useRive({
    src,
    artboard: spec.artboard,
    stateMachines: spec.stateMachine,
    autoplay: false,
    layout,
    onLoadError: () => setHasError(true),
    onLoad: () => setHasError(false),
  });

  const setActiveInput = useCallback((value: boolean) => {
    if (!rive) return false;
    const input = rive.stateMachineInputs(spec.stateMachine).find((item) => item.name === "active");
    if (!input || typeof input !== "object" || !("value" in input)) return false;
    (input as { value: boolean }).value = value;
    return true;
  }, [rive, spec.stateMachine]);

  useEffect(() => {
    if (!rive) return;

    if (prefersReducedMotion) {
      setActiveInput(false);
      rive.pause();
      return;
    }

    if (setActiveInput(active)) {
      if (!active) rive.pause();
      return;
    }

    if (active) {
      rive.play();
    } else {
      rive.pause();
    }
  }, [active, prefersReducedMotion, rive, setActiveInput]);

  if (hasError) {
    return fallback ? <>{fallback}</> : null;
  }

  return <RiveComponent className="domain-rive-canvas" />;
}

export function RiveDomainIllustration({
  spec,
  active,
  className,
  lazy = true,
  ariaHidden = true,
  fallback,
}: RiveDomainIllustrationProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const inView = useInViewport(hostRef);
  const shouldMount = !lazy || inView;

  return (
    <div ref={hostRef} className={`domain-rive ${className ?? ""}`.trim()} aria-hidden={ariaHidden}>
      {shouldMount ? (
        <RiveDomainCanvas spec={spec} active={active} fallback={fallback} />
      ) : (
        <span className="domain-rive-placeholder" aria-hidden="true" />
      )}
    </div>
  );
}
