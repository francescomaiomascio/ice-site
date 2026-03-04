"use client";

import {
  Alignment,
  Fit,
  Layout,
  useRive,
} from "@rive-app/react-canvas-lite";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RiveDomainAlignment, RiveDomainFit, RiveDomainSpec } from "@/config/rive.domains";
import { useInViewport } from "@/components/illustrations/rive/useInViewport";
import { usePrefersReducedMotion } from "@/components/illustrations/rive/usePrefersReducedMotion";
import { RivePlaceholder } from "@/components/illustrations/rive/RivePlaceholder";

type RiveDomainIllustrationProps = {
  spec: RiveDomainSpec;
  active: boolean;
  className?: string;
  lazy?: boolean;
  ariaHidden?: boolean;
  missingLabel?: string;
};

type AssetStatus = "idle" | "loading" | "ready" | "invalid";
const assetStatusCache = new Map<string, AssetStatus>();
const missingAssetWarnings = new Set<string>();

function mapFit(fit: RiveDomainFit | undefined) {
  if (fit === "contain") return Fit.Contain;
  return Fit.Cover;
}

function mapAlignment(alignment: RiveDomainAlignment | undefined) {
  if (alignment === "topLeft") return Alignment.TopLeft;
  if (alignment === "bottomRight") return Alignment.BottomRight;
  return Alignment.Center;
}

function RiveDomainCanvas({ spec, active }: Pick<RiveDomainIllustrationProps, "spec" | "active">) {
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
    return <RivePlaceholder label="Art error" />;
  }

  return <RiveComponent className="domain-rive-canvas" />;
}

export function RiveDomainIllustration({
  spec,
  active,
  className,
  lazy = true,
  ariaHidden = true,
  missingLabel,
}: RiveDomainIllustrationProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const inView = useInViewport(hostRef);
  const shouldMount = !lazy || inView;
  const src = useMemo(() => {
    if (!spec.version) return spec.src;
    return `${spec.src}?v=${spec.version}`;
  }, [spec.src, spec.version]);
  const [assetStatus, setAssetStatus] = useState<AssetStatus>(() => assetStatusCache.get(src) ?? "idle");

  useEffect(() => {
    if (!shouldMount) return;

    const cached = assetStatusCache.get(src);
    if (cached === "ready" || cached === "invalid") {
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    const validateRiveAsset = async () => {
      setAssetStatus("loading");
      try {
        const response = await fetch(src, {
          method: "GET",
          cache: "force-cache",
          signal: controller.signal,
        });

        if (!response.ok) {
          assetStatusCache.set(src, "invalid");
          if (!cancelled) setAssetStatus("invalid");
          return;
        }

        const bytes = new Uint8Array(await response.arrayBuffer());
        const isRiveHeader =
          bytes.length >= 4 &&
          bytes[0] === 82 &&
          bytes[1] === 73 &&
          bytes[2] === 86 &&
          bytes[3] === 69;

        const status: AssetStatus = isRiveHeader ? "ready" : "invalid";
        assetStatusCache.set(src, status);
        if (!cancelled) setAssetStatus(status);
      } catch {
        if (!cancelled) {
          assetStatusCache.set(src, "invalid");
          setAssetStatus("invalid");
        }
      }
    };

    void validateRiveAsset();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [shouldMount, src]);

  useEffect(() => {
    if (assetStatus !== "invalid" || missingAssetWarnings.has(src)) return;
    missingAssetWarnings.add(src);
    console.warn(`[RiveDomains] Missing or invalid asset: ${src}. Rendering fallback illustration.`);
  }, [assetStatus, src]);

  return (
    <div ref={hostRef} className={`domain-rive-shell ${className ?? ""}`.trim()} aria-hidden={ariaHidden}>
      {shouldMount && assetStatus === "ready" ? (
        <RiveDomainCanvas spec={spec} active={active} />
      ) : shouldMount && assetStatus === "invalid" ? (
        <RivePlaceholder label={missingLabel ? `${missingLabel} art missing` : "Art missing"} />
      ) : (
        <RivePlaceholder label={missingLabel ? `${missingLabel} art loading` : "Art loading"} />
      )}
    </div>
  );
}
