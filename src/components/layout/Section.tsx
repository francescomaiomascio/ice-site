import React from "react";
import { Footer } from "./Footer";

type SectionWidth = "full" | "wide" | "narrow";
type SectionVariant = "default" | "hero" | "highlight";

export interface SectionProps {
  id?: string;
  as?: React.ElementType;
  width?: SectionWidth;
  variant?: SectionVariant;
  className?: string;
  innerClassName?: string;
  withFooter?: boolean;
  /**
   * Opt-in scroll snapping. Default off to avoid "half viewport" bleed
   * and trackpad weirdness.
   */
  snap?: boolean;
  children: React.ReactNode;
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Section({
  id,
  as: Component = "section",
  width = "wide",
  variant = "default",
  className,
  innerClassName,
  withFooter = false,
  snap = false,
  children,
}: SectionProps) {
  /**
   * Width/variant are expressed at the Section level,
   * but padding + container are always handled by .section-inner.
   */
  const sectionClass = cx(
    "section",
    snap && "snap-section",
    width !== "wide" && `section--${width}`,
    variant !== "default" && `section--${variant}`,
    className
  );

  const innerClass = cx(
    "section-inner",
    withFooter && "section-inner--with-footer",
    innerClassName
  );

  return (
    <Component id={id} className={sectionClass}>
      <div className={innerClass}>
        {children}
        {withFooter ? <Footer /> : null}
      </div>
    </Component>
  );
}