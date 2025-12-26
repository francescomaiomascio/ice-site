import Link from "next/link";

export default function Docs() {
  return (
    <section>
      <h1>Documentation</h1>

      <p>
        ICE Lab documentation is organized by semantic domains. Each section
        describes a specific layer of the ICE ecosystem, from user-facing
        environments to core runtimes, protocols, and networks.
      </p>

      <p>
        Documentation is maintained independently from the website and serves as
        the single source of truth for both users and automated systems.
      </p>

      <h2>Documentation Domains</h2>

      <ul>
        <li>
          <strong>ICE Studio</strong> — Integrated Cognitive Environment
          <br />
          <Link href="https://francescomaiomascio.github.io/ICE-Studio-Docs/ice-studio/">
            Open ICE Studio documentation →
          </Link>
        </li>

        <li>
          <strong>ICE Engine</strong> — Core runtime and orchestration
          <br />
          <Link href="https://francescomaiomascio.github.io/ICE-Studio-Docs/ice-engine/">
            Open ICE Engine documentation →
          </Link>
        </li>

        <li>
          <strong>ICE AI</strong> — Agents, models, cognition
          <br />
          <Link href="https://francescomaiomascio.github.io/ICE-Studio-Docs/ice-ai/">
            Open ICE AI documentation →
          </Link>
        </li>

        <li>
          <strong>ICEP</strong> — Integrated Cognitive Engine Protocol
          <br />
          <Link href="https://francescomaiomascio.github.io/ICE-Studio-Docs/icep/">
            Open ICEP documentation →
          </Link>
        </li>

        <li>
          <strong>ICENet</strong> — Network & discovery layer
          <br />
          <Link href="https://francescomaiomascio.github.io/ICE-Studio-Docs/icenet/">
            Open ICENet documentation →
          </Link>
        </li>

        <li>
          <strong>Meta</strong> — Governance, concepts, and lifecycle
          <br />
          <Link href="https://francescomaiomascio.github.io/ICE-Studio-Docs/meta/">
            Open Meta documentation →
          </Link>
        </li>
      </ul>
    </section>
  );
}
