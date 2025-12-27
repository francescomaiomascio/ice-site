export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <img
            src="/theme/icons/brands/png/256.png"
            alt="ICE Lab logo"
            className="hero-logo"
          />
          <h1>ICE Lab</h1>
          <p>
            Integrated cognitive systems research lab.
          </p>
        </div>
      </section>

      <section className="container narrow statement-section">
        <p className="statement">
          The project explores how environments, runtime engines, protocols,
          and intelligent agents can be composed into a coherent, local-first
          cognitive ecosystem.
        </p>
      </section>

      <section className="container narrow">
        <ul>
          <li>
            <a href="/projects">Explore the projects</a>
          </li>
          <li>
            <a href="/docs">Read the documentation</a>
          </li>
          <li>
            <a href="/status">View current status</a>
          </li>
        </ul>
      </section>
    </>
  );
}
