"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState, type ReactElement } from "react";
import {
  FOOTER_COLUMNS,
  FOOTER_COPY,
  FOOTER_CTA,
  FOOTER_LANGUAGE_KEY,
  FOOTER_LEGAL_LINKS,
  FOOTER_LOCALES,
  FOOTER_SOCIALS,
  type FooterLinkItem,
  type FooterLocale,
  type FooterLocalized,
  type FooterSocial,
} from "@/config/footer";

function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .5C5.73.5.75 5.74.75 12.24c0 5.2 3.36 9.62 8.02 11.18.59.11.8-.26.8-.57v-2.1c-3.26.73-3.95-1.6-3.95-1.6-.53-1.39-1.3-1.76-1.3-1.76-1.06-.75.08-.74.08-.74 1.17.08 1.78 1.24 1.78 1.24 1.04 1.83 2.73 1.3 3.4.99.1-.77.41-1.3.74-1.6-2.6-.31-5.33-1.35-5.33-6.01 0-1.33.46-2.42 1.22-3.28-.12-.31-.53-1.58.12-3.29 0 0 1-.33 3.3 1.26.96-.27 2-.4 3.03-.4 1.03 0 2.07.14 3.03.4 2.3-1.6 3.3-1.26 3.3-1.26.65 1.71.24 2.98.12 3.29.76.86 1.22 1.95 1.22 3.28 0 4.68-2.73 5.7-5.34 6.01.42.37.79 1.1.79 2.23v3.31c0 .31.21.68.81.57 4.66-1.56 8.02-5.98 8.02-11.18C23.25 5.74 18.27.5 12 .5Z"
      />
    </svg>
  );
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.9 2H22l-6.77 7.73L23 22h-6.2l-4.86-6.54L6.2 22H3l7.25-8.3L1 2h6.36l4.4 5.9L18.9 2Zm-1.08 18h1.72L6.28 3.93H4.45L17.82 20Z"
      />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.5 23.5h4V7.98h-4V23.5Zm7 0h4v-8.5c0-2.28.43-4.48 3.25-4.48 2.78 0 2.81 2.6 2.81 4.63v8.35h4V14.3c0-4.52-.97-8-6.26-8-2.54 0-4.25 1.39-4.95 2.71h-.05V7.98h-3.8V23.5Z"
      />
    </svg>
  );
}

function IconMedium() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.5 7.2c.03-.3-.08-.6-.3-.8L5 3.9V3.5h6.9l5.3 11.7L21.8 3.5H28v.4l-1.9 1.8c-.16.12-.24.32-.2.52v13.2c-.04.2.04.4.2.52l1.9 1.8v.4h-9.5v-.4l2-1.8c.2-.2.2-.24.2-.52V8.4l-5.6 14.1h-.8L7.5 7.2Z"
        transform="translate(-4 -2)"
      />
    </svg>
  );
}

const SOCIAL_ICON_BY_ID: Record<FooterSocial["id"], () => ReactElement> = {
  github: IconGithub,
  x: IconX,
  linkedin: IconLinkedIn,
  medium: IconMedium,
};

function translate(locale: FooterLocale, value: FooterLocalized) {
  return value[locale] ?? value.en;
}

function FooterLink({ item, locale }: { item: FooterLinkItem; locale: FooterLocale }) {
  const label = translate(locale, item.label);
  if (item.external || item.href.startsWith("mailto:")) {
    return (
      <a href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined}>
        {label}
      </a>
    );
  }
  return <Link href={item.href}>{label}</Link>;
}

export function Footer() {
  const [locale, setLocale] = useState<FooterLocale>(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem(FOOTER_LANGUAGE_KEY);
    return stored === "it" || stored === "en" ? stored : "en";
  });

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(FOOTER_LANGUAGE_KEY, locale);
  }, [locale]);

  const ui = useMemo(
    () => ({
      getStartedTitle: translate(locale, FOOTER_COPY.getStartedTitle),
      getStartedSub: translate(locale, FOOTER_COPY.getStartedSub),
      brandLabel: translate(locale, FOOTER_COPY.brandLabel),
      socialLabel: translate(locale, FOOTER_COPY.socialLabel),
      columnsLabel: translate(locale, FOOTER_COPY.columnsLabel),
      legalLabel: translate(locale, FOOTER_COPY.legalLabel),
      languageLabel: translate(locale, FOOTER_COPY.languageLabel),
    }),
    [locale]
  );

  const columnById = useMemo(() => {
    return new Map(FOOTER_COLUMNS.map((col) => [col.id, col] as const));
  }, []);

  const mobileLeft = ["use-cases", "company", "connect"];
  const mobileRight = ["industries", "compare", "partners", "support"];

  const renderCol = (colId: string) => {
    const col = columnById.get(colId);
    if (!col) return null;
    return (
      <nav key={col.id} className={`yai-footer-col yai-footer-col--${col.id}`} aria-label={translate(locale, col.title)}>
        <h3 className="yai-footer-col-title">{translate(locale, col.title)}</h3>
        <div className="yai-footer-col-items">
          {col.items.map((item) => (
            <FooterLink key={item.id} item={item} locale={locale} />
          ))}
        </div>
      </nav>
    );
  };

  return (
    <footer className="yai-footer" aria-label="Site footer">
      <section className="yai-footer-get-started" aria-label={ui.getStartedTitle}>
        <div className="yai-footer-shell yai-container">
          <h2 className="yai-footer-cta-title">{ui.getStartedTitle}</h2>
          <p className="yai-footer-cta-sub">{ui.getStartedSub}</p>
          <div className="yai-footer-cta-row" role="group" aria-label={ui.getStartedTitle}>
            {FOOTER_CTA.map((cta) => {
              const label = translate(locale, cta.label);
              const className =
                cta.variant === "primary"
                  ? "button button--primary yai-footer-cta-btn"
                  : "button button--ghost yai-footer-cta-btn";
              if (cta.href.startsWith("mailto:")) {
                return (
                  <a key={cta.id} href={cta.href} className={className}>
                    {label}
                  </a>
                );
              }
              return (
                <Link key={cta.id} href={cta.href} className={className}>
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="yai-footer-main">
        <div className="yai-footer-shell yai-container yai-footer-grid">
          <div className="yai-footer-brand-block">
            <Link href="/" className="yai-footer-logo" aria-label={ui.brandLabel}>
              <Image src="/yai.png" alt="YAI" width={30} height={30} className="yai-footer-logo-icon" />
              <span className="yai-footer-logo-mark">YAI</span>
              <span className="yai-footer-logo-sub">Labs</span>
            </Link>

            <div className="yai-footer-social" aria-label={ui.socialLabel}>
              {FOOTER_SOCIALS.map((social) => {
                const Icon = SOCIAL_ICON_BY_ID[social.id];
                return (
                  <a key={social.id} className="yai-footer-social-btn" href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                    <Icon />
                  </a>
                );
              })}
            </div>

            <nav className="yai-footer-rail-links" aria-label={ui.legalLabel}>
              {FOOTER_LEGAL_LINKS.map((item) => (
                <FooterLink key={item.id} item={item} locale={locale} />
              ))}
            </nav>

            <div className="yai-footer-lang-wrap yai-footer-lang-wrap--rail">
              <select
                id="yai-footer-lang-rail"
                className="yai-footer-lang-select"
                value={locale}
                aria-label={ui.languageLabel}
                onChange={(event) => {
                  const next = event.target.value as FooterLocale;
                  setLocale(next);
                }}
              >
                {FOOTER_LOCALES.map((entry) => (
                  <option key={entry.value} value={entry.value}>
                    {translate(locale, entry.label)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="yai-footer-cols yai-footer-cols--desktop" aria-label={ui.columnsLabel}>
            {FOOTER_COLUMNS.map((col) => renderCol(col.id))}
          </div>

          <div className="yai-footer-cols-mobile" aria-label={ui.columnsLabel}>
            <div className="yai-footer-col-stack">{mobileLeft.map((id) => renderCol(id))}</div>
            <div className="yai-footer-col-stack">{mobileRight.map((id) => renderCol(id))}</div>
          </div>
        </div>

        <div className="yai-footer-shell yai-container yai-footer-lang-mobile">
          <div className="yai-footer-lang-wrap">
            <select
              id="yai-footer-lang"
              className="yai-footer-lang-select"
              value={locale}
              aria-label={ui.languageLabel}
              onChange={(event) => {
                const next = event.target.value as FooterLocale;
                setLocale(next);
              }}
            >
              {FOOTER_LOCALES.map((entry) => (
                <option key={entry.value} value={entry.value}>
                  {translate(locale, entry.label)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="yai-footer-shell yai-container yai-footer-bottom yai-footer-bottom--mobile">
          <nav className="yai-footer-legal" aria-label={ui.legalLabel}>
            {FOOTER_LEGAL_LINKS.map((item) => (
              <FooterLink key={item.id} item={item} locale={locale} />
            ))}
          </nav>
        </div>
      </section>
    </footer>
  );
}
