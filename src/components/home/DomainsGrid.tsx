import Link from "next/link";
import { DOMAINS, type DomainCard } from "@/content/domains";
import { DomainIllustration, type DomainIllustrationKind } from "@/components/illustrations/DomainIllustration";

function illustrationKindFromSlug(slug: string): DomainIllustrationKind {
  if (slug === "physical-actuators") return "physical";
  if (slug === "digital-egress") return "digital";
  if (slug === "biological-custody") return "biological";
  if (slug === "economic-transactions") return "economic";
  if (slug === "operational-response") return "operational";
  if (slug === "institutional-authority") return "institutional";
  return "scientific";
}

function DomainMark({ slug }: { slug: string }) {
  const kind = slug.split("-")[0];

  if (kind === "physical") {
    return (
      <svg viewBox="0 0 24 24" className="domain-card__icon-svg" aria-hidden="true">
        <rect x="4.5" y="8" width="15" height="8" rx="1.8" />
        <path d="M7.5 8V6.4M16.5 8V6.4M7.5 17.6V16M16.5 17.6V16" />
      </svg>
    );
  }

  if (kind === "digital") {
    return (
      <svg viewBox="0 0 24 24" className="domain-card__icon-svg" aria-hidden="true">
        <path d="M4.5 8.5h6.6l2 2h6.4" />
        <path d="M4.5 15.5h6.8l2-2h6.2" />
        <circle cx="4.5" cy="8.5" r="1.2" />
        <circle cx="4.5" cy="15.5" r="1.2" />
        <circle cx="19.5" cy="8.5" r="1.2" />
        <circle cx="19.5" cy="15.5" r="1.2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="domain-card__icon-svg" aria-hidden="true">
      <circle cx="12" cy="12" r="7.4" />
      <path d="M8.5 12h7M12 8.5v7" />
    </svg>
  );
}

function DomainCardTile({ card }: { card: DomainCard }) {
  return (
    <Link
      href={card.href}
      className={`domains-card domains-card--${card.variant}`}
      data-accent={card.accent}
      data-variant={card.variant}
    >
      <span className="domains-card-affordance" aria-hidden="true">↗</span>
      <DomainIllustration kind={illustrationKindFromSlug(card.slug)} />
      <div className="domains-card-copy">
        <div className="domains-card-top domain-card__header">
          <span className="domain-card__icon" aria-hidden="true">
            <DomainMark slug={card.slug} />
          </span>
          {card.kicker ? <span className="domains-card-kicker">{card.kicker}</span> : null}
        </div>

        <h3 className="domains-card-title domain-card__title">{card.title}</h3>
        <p className="domains-card-desc domain-card__desc">
          {card.descriptionLead} <strong>{card.emphasis}</strong> {card.descriptionTail}
        </p>

        {card.variant === "hero" && card.bullets?.length ? (
          <ul className="domains-card-bullets domain-card__bullets">
            {card.bullets.slice(0, 3).map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </Link>
  );
}

type DomainsGridSectionProps = {
  featuredOnly?: boolean;
  showAllLink?: boolean;
};

export function DomainsGridSection(props: DomainsGridSectionProps = {}) {
  const { featuredOnly = true, showAllLink = true } = props;
  const cards = featuredOnly
    ? (() => {
        const featured = DOMAINS.filter((card) => card.featured);
        const bySlug = new Map(featured.map((card) => [card.slug, card]));
        const homeOrder = [
          "physical-actuators",
          "digital-egress",
          "biological-custody",
          "economic-transactions",
          "operational-response",
          "institutional-authority",
          "scientific-reproducibility",
        ];
        return homeOrder
          .map((slug) => bySlug.get(slug))
          .filter((card): card is DomainCard => Boolean(card));
      })()
    : DOMAINS;
  const gridClass = featuredOnly ? "domains-grid domains-grid--home" : "domains-grid domains-grid--catalog";

  return (
    <div className="domains-grid-wrap">
      <div className={gridClass} aria-label="Domain cards">
        {cards.map((card) => (
          <DomainCardTile key={card.slug} card={card} />
        ))}
      </div>
      {showAllLink ? (
        <div className="domains-grid-more">
          <Link href="/domains" className="domains-grid-more-link">
            View all domains →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
