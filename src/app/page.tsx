import { Section } from "@/components/layout/Section";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO — BRAND */}
      <Section id="hero" variant="hero">
        <div className="hero-content">
          <header className="hero-header">
            <h1>MothX Labs</h1>

            <p className="hero-subtitle">
              Research and engineering of runtime-centric intelligent systems.
              Execution, governance, and long-term intelligibility by design.
            </p>
          </header>

          <div className="hero-thesis">
            <p>
              We design execution environments for cognitive systems where
              control, governance, and long-term intelligibility are
              first-class concerns.
            </p>
          </div>
        </div>
      </Section>

      {/* WHAT WE DO */}
      <Section id="overview" width="narrow">
        <p>
          <strong>MothX Labs</strong> is an independent research and engineering
          initiative focused on the design of intelligent system infrastructures.
        </p>

        <p>
          Our work explores how cognitive processes execute, interact with
          real-world systems, and remain observable, auditable, and governable
          over time.
        </p>
      </Section>

      {/* PRINCIPLES */}
      <Section id="principles" width="narrow">
        <h2>Core principles</h2>

        <ul>
          <li>explicit execution and lifecycle governance</li>
          <li>event-derived state and deterministic replay</li>
          <li>capability-based control of side effects</li>
          <li>memory as a governed artifact</li>
          <li>long-term intelligibility of autonomous systems</li>
        </ul>

        <p>
          Our focus is on <strong>systems research</strong>, not short-term
          product development.
        </p>
      </Section>

      {/* ICE */}
      <Section id="ice" width="narrow">
        <h2>ICE — Intelligent Cognitive Ecosystem</h2>

        <p>
          ICE is the primary research platform developed at MothX Labs.
        </p>

        <p>
          It is a <strong>runtime architecture for cognitive systems</strong>.
          Not a framework. Not a model.
        </p>

        <p>
          ICE defines how intelligent processes execute, how side effects are
          controlled, and how system behavior remains auditable over time.
        </p>

        <ul>
          <li>
            <Link href="/ice">ICE overview</Link>
          </li>
          <li>
            <Link href="/ice/docs">Documentation</Link>
          </li>
          <li>
            <Link href="/ice/status">Project status</Link>
          </li>
        </ul>
      </Section>

      {/* FOUNDER */}
      <Section id="founder" width="narrow">
        <h2>Founder</h2>

        <p>
          MothX Labs was founded by <strong>Francesco Maiomascio</strong>,
          runtime architect and cognitive systems researcher.
        </p>

        <p>
          His work focuses on execution semantics, governance models,
          and long-term system design for intelligent infrastructures.
        </p>

        <ul>
          <li>
            <Link href="/about">About Francesco</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </Section>
    </>
  );
}
