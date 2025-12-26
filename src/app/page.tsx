import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      <h1>ICE Lab</h1>

      <p>
        ICE Lab is a research and engineering laboratory focused on the design of
        integrated cognitive systems.
      </p>

      <p>
        The project explores how environments, runtime engines, protocols, and
        intelligent agents can be composed into a coherent, local-first
        cognitive ecosystem.
      </p>

      <ul>
        <li>
          <Link href="/project">Explore projects</Link>
        </li>
        <li>
          <Link href="/docs">Read the documentation</Link>
        </li>
        <li>
          <Link href="/status">View project status</Link>
        </li>
      </ul>
    </section>
  );
}
