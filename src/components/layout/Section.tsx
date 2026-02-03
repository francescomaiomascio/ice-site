import React from "react";

type SectionWidth = "full" | "wide" | "narrow";
type SectionVariant = "default" | "hero" | "highlight";

export interface SectionProps {
  id?: string;
  as?: React.ElementType;
  width?: SectionWidth;
  variant?: SectionVariant;
  className?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  as: Component = "section",
  width = "full",
  variant = "default",
  className = "",
  children,
}: SectionProps) {
  const classes = [
    "section",
    "snap-section",
    `section--${width}`,
    `section--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component id={id} className={classes}>
      <div className="section-inner">
        {variant === "hero" ? (
          <div className="section-hero-content">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </Component>
  );
}
