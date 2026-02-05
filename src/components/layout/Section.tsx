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
  snap?: boolean;
  children: React.ReactNode;
}

export function Section({
  id,
  as: Component = "section",
  width = "full",
  variant = "default",
  className = "",
  innerClassName = "",
  withFooter = false,
  snap = true,
  children,
}: SectionProps) {
  const classes = [
    "section",
    snap ? "snap-section" : "",
    `section--${width}`,
    `section--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const innerClasses = [
    "section-inner",
    innerClassName,
    withFooter ? "section-inner--with-footer" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component id={id} className={classes}>
      <div className={innerClasses}>
        {variant === "hero" ? (
          <div className="section-hero-content">
            {children}
          </div>
        ) : (
          children
        )}
        {withFooter ? <Footer /> : null}
      </div>
    </Component>
  );
}
