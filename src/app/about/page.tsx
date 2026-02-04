import { Section } from "@/components/layout/Section";

export default function AboutPage() {
  return (
    <>
      <Section id="about-intro" className="section--about">
        <div className="container narrow">
          <h1>About</h1>

          <p>
            I am a <strong>runtime architect and cognitive systems researcher</strong>,
            working at the intersection of software architecture, intelligent systems,
            and long-lived execution environments.
          </p>

          <p>
            My work focuses on how intelligent systems execute over time: how decisions
            are made, validated, constrained, audited, and governed beyond the scope
            of individual models or short-lived processes.
          </p>
        </div>
      </Section>

      <Section id="about-focus" className="section--about">
        <div className="container narrow">
          <h2>Professional focus</h2>

          <p>
            I am not primarily interested in model-centric AI, prompt engineering,
            or isolated algorithmic performance.
          </p>

          <p>
            I focus on <strong>execution semantics</strong>, <strong>runtime governance</strong>,
            and <strong>system-level responsibility</strong> in intelligent infrastructures.
          </p>

          <p>
            This includes:
          </p>

          <ul>
            <li>explicit execution lifecycles</li>
            <li>event-derived state and deterministic replay</li>
            <li>capability-based control of side effects</li>
            <li>memory as a governed and versioned artifact</li>
            <li>long-running, inspectable autonomous processes</li>
          </ul>
        </div>
      </Section>

      <Section id="about-background" className="section--about">
        <div className="container narrow">
          <h2>Background</h2>

          <p>
            My background combines software engineering, systems thinking,
            and independent research into the structural limits of current
            intelligent system architectures.
          </p>

          <p>
            I approach these problems from an architectural perspective,
            treating intelligence as an infrastructural concern rather than
            an emergent property to be observed.
          </p>
        </div>
      </Section>

      <Section id="about-ice" className="section--about">
        <div className="container narrow">
          <h2>MothX Labs and ICE</h2>

          <p>
            I am the founder of <strong>MothX Labs</strong>, an independent research
            and engineering initiative focused on runtime-centric intelligent systems.
          </p>

          <p>
            Within MothX Labs, I lead the design and development of
            <strong> ICE (Intelligent Cognitive Ecosystem)</strong>,
            a runtime architecture for governed cognitive execution.
          </p>

          <p>
            ICE serves as a research platform to validate architectural assumptions
            under real-world constraints and long-term system evolution.
          </p>
        </div>
      </Section>

      <Section id="about-approach" className="section--about" withFooter>
        <div className="container narrow">
          <h2>Approach</h2>

          <p>
            I approach system design with an emphasis on constraints, invariants,
            and explicit responsibility boundaries.
          </p>

          <p>
            My work prioritizes:
          </p>

          <ul>
            <li>architectural coherence over feature accumulation</li>
            <li>governance over convenience</li>
            <li>long-term maintainability over short-term optimization</li>
          </ul>
        </div>
      </Section>
    </>
  );
}
