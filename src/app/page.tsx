import { Section } from "@/components/layout/Section";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
    {/* HERO */}
    <Section id="hero" variant="hero">
  <div className="hero-content">
    <div className="hero-identity">
      <img
        src="https://drive.google.com/uc?export=view&id=1vWxflDsTqL0xvGQ5ajEdbQhdu4qdWqNC"
        alt="Francesco Maiomascio"
        className="hero-avatar"
      />
    </div>

    <header className="hero-header">
      <h1>Francesco Maiomascio</h1>

      <p className="hero-subtitle">
        Runtime architect & cognitive systems researcher
      </p>
    </header>

    <div className="hero-thesis">
      <p>
        Designing systems where execution is explicit, governed,
        and intelligible over time.
      </p>
    </div>
  </div>
</Section>


      {/* STATEMENT */}
      <Section id="statement" width="narrow">
        <p>
          I design and engineer <strong>runtime-centric cognitive systems</strong>.
        </p>

        <p>
          I am not primarily interested in models, prompts, or isolated AI
          capabilities. I am interested in <strong>how intelligent systems
          execute</strong>, how they are constrained, how they evolve over time,
          and how their effects can be observed, audited, and governed.
        </p>

        <p>
          For me, intelligence is not an emergent property to be admired.
          It is a <strong>process to be controlled</strong>.
        </p>
      </Section>

      {/* WHY */}
      <Section id="why" width="narrow">
        <h2>Why this work exists</h2>

        <p>
          Most contemporary AI systems operate without a clear notion of authority.
        </p>

        <p>
          Models decide. Side effects happen. State mutates. Memory accumulates.
        </p>

        <p>
          But no component is truly responsible for <em>why</em> something was
          allowed to happen.
        </p>

        <p>
          If intelligence is becoming infrastructural, then
          <strong> execution must be sovereign</strong>.
        </p>
      </Section>

      {/* FOCUS */}
      <Section id="focus" width="narrow">
        <h2>Research focus</h2>

        <ul>
          <li>execution is explicit and governed</li>
          <li>state is derived, never mutated implicitly</li>
          <li>side effects are capability-gated and traceable</li>
          <li>memory is an artifact, not an accident</li>
          <li>long-running processes remain intelligible over time</li>
        </ul>

        <p>
          I approach this as <strong>systems research</strong>, not product
          development.
        </p>
      </Section>

      {/* ICE */}
      <Section id="ice" width="narrow">
        <h2>ICE Lab</h2>

        <p>
          ICE is a runtime architecture research effort.
          Not a framework. Not a model.
        </p>

        <p>
          A <strong>kernel-like execution environment</strong> for cognitive systems.
        </p>

        <ul>
          <li>
            <Link href="/ice/projects">Explore the projects</Link>
          </li>
          <li>
            <Link href="/ice/docs">Read the documentation</Link>
          </li>
          <li>
            <Link href="/ice/status">View current status</Link>
          </li>
        </ul>
      </Section>
    </>
  );
}
