"use client";

type RivePlaceholderProps = {
  label?: string;
  className?: string;
};

export function RivePlaceholder({ label, className }: RivePlaceholderProps) {
  const showLabel = process.env.NODE_ENV !== "production" && label;

  return (
    <div className={`domain-rive-placeholder ${className ?? ""}`.trim()} aria-hidden="true">
      {showLabel ? <span className="domain-rive-placeholder-label">{label}</span> : null}
    </div>
  );
}
