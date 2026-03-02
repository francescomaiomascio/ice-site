"use client";

import { Section } from "@/components/layout/Section";

const PILOT_MAILTO =
  "mailto:pilot@yai.foundation?subject=YAI%20Pilot%20-%2014%20Days";
const DOCS_URL = "https://github.com/yai-labs/yai/tree/main/docs";
const GITHUB_URL = "https://github.com/yai-labs/yai";

function ExternalAnchor(props: {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <a
      href={props.href}
      className={props.className}
      target="_blank"
      rel="noreferrer"
      aria-label={props.ariaLabel}
    >
      {props.children}
    </a>
  );
}

function HomeHero() {
  return (
    <Section id="top" variant="hero" className="home-hero">
      <div className="home-hero-inner">
        <h1 className="home-h1">Make execution predictable.</h1>
        <p className="home-lede">
          YAI is execution infrastructure for systems that act. Define actions,
          enforce constraints, and preserve a verifiable decision history that
          holds up months later.
        </p>

        <div className="home-cta" aria-label="Primary actions">
          <ExternalAnchor
            className="button button--primary"
            href={DOCS_URL}
            ariaLabel="Try via docs"
          >
            Try YAI
          </ExternalAnchor>
          <a className="button button--ghost" href={PILOT_MAILTO}>
            Book pilot
          </a>
        </div>

        <div className="home-trust" aria-label="Trust placeholders">
          <div className="home-trust-title">Trusted by</div>
          <div className="home-trust-row">
            <div className="home-trust-logo" aria-hidden="true" />
            <div className="home-trust-logo" aria-hidden="true" />
            <div className="home-trust-logo" aria-hidden="true" />
            <div className="home-trust-logo" aria-hidden="true" />
          </div>
          <div className="home-trust-note">
            Space reserved for partners / design partners. Until then:{" "}
            <ExternalAnchor href={GITHUB_URL} ariaLabel="Open GitHub repository">
              proof surfaces on GitHub
            </ExternalAnchor>
            .
          </div>
        </div>
      </div>
    </Section>
  );
}

function Split(props: {
  kicker: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="home-split">
      <div className="home-split-left">
        <div className="home-kicker">{props.kicker}</div>
        <h2 className="home-h2">{props.title}</h2>
        <p className="home-sub">{props.subtitle}</p>
      </div>
      <div className="home-split-right">{props.children}</div>
    </div>
  );
}

function Tile(props: {
  title: string;
  body: string;
  href?: string;
  cta?: string;
}) {
  const inner = (
    <>
      <div className="home-tile-title">{props.title}</div>
      <div className="home-tile-body">{props.body}</div>
      {props.href && props.cta ? (
        <div className="home-tile-cta">{props.cta} →</div>
      ) : null}
    </>
  );

  if (props.href) {
    return (
      <a className="home-tile" href={props.href}>
        {inner}
      </a>
    );
  }
  return <div className="home-tile">{inner}</div>;
}

function Pills() {
  const items = [
    "OTEL",
    "S3",
    "GitHub",
    "Kubernetes",
    "Docker",
    "Linux",
    "CI/CD",
    "UDS",
  ];
  return (
    <div className="home-pills" aria-label="Integration surfaces">
      {items.map((x) => (
        <div key={x} className="home-pill">
          {x}
        </div>
      ))}
    </div>
  );
}

function Quickstart() {
  return (
    <div className="home-code" aria-label="Quickstart">
      <div className="home-code-head">
        <div className="home-code-title">Start building in minutes</div>
        <ExternalAnchor
          href={DOCS_URL}
          className="button button--link"
          ariaLabel="Open quickstart"
        >
          Explore docs
        </ExternalAnchor>
      </div>
      <pre className="home-code-pre">
        <code>{`# verify
tools/bin/yai-verify list

# run (example)
yai ws create --id demo
yai run --ws demo --plan ./plans/demo.yml

# inspect proof surfaces
yai proof --ws demo --latest`}</code>
      </pre>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <Section id="faster" className="home-block">
        <Split
          kicker="Move faster"
          title="Think fast. Build safer."
          subtitle="YAI makes action a controllable surface: enforcement at execution time, and a record you can verify afterward."
        >
          <div className="home-tiles">
            <Tile
              title="Deterministic outcomes"
              body="Same inputs follow the same decision paths. Behavior is stable under constraints."
            />
            <Tile
              title="Fail-closed boundaries"
              body="External effects are explicit. When rules don’t match, execution stops or quarantines."
            />
            <Tile
              title="Verifiable history"
              body="Traces and artifacts are produced as part of delivery — replayable, not reconstructive."
            />
          </div>
        </Split>
      </Section>

      <Section id="deploy" className="home-block">
        <Split
          kicker="Deploy anywhere"
          title="Fit into real environments."
          subtitle="Start with one workflow and expand across domains. Deploy locally, in CI, or on edge systems — without rewriting your stack."
        >
          <div className="home-tiles home-tiles--3">
            <Tile
              title="Pilot in your environment"
              body="One real workflow. Tight scope. Proof-led output your team can keep."
              href={PILOT_MAILTO}
              cta="Book pilot"
            />
            <Tile
              title="Self-hosted by default"
              body="Local-first execution surfaces designed for predictable behavior and traceability."
              href={DOCS_URL}
              cta="Read docs"
            />
            <Tile
              title="Open-source foundation"
              body="Specs, runbooks, milestone packs, and reproducible verification are public."
              href={GITHUB_URL}
              cta="View repository"
            />
          </div>
        </Split>
      </Section>

      <Section id="stack" className="home-block">
        <Split
          kicker="Works with your tech stack"
          title="Integrates where actions happen."
          subtitle="YAI wraps workflows, not whitepapers. It sits around pipelines, scripts, automation tools, and device-side execution."
        >
          <Pills />
        </Split>
      </Section>

      <Section id="start" className="home-block">
        <Split
          kicker="Start building"
          title="Proof-led by design."
          subtitle="Documentation and verification surfaces are first-class. If it can’t be verified, it doesn’t ship."
        >
          <Quickstart />
        </Split>
      </Section>

      <Section
        id="yai-launch-footer"
        className="section--projects project-section yai-launch-section"
        withFooter
      />
    </>
  );
}