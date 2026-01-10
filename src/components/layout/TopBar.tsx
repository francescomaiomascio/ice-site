import Link from "next/link";

export function TopBar() {
  return (
    <header className="site-header">
      <nav className="site-nav">
        <div className="site-nav-left">
          <Link href="/" className="site-brand">
            Francesco Maiomascio
          </Link>
        </div>

        <div className="site-nav-right">
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/ice">ICE</Link>
          <a
            href="https://github.com/francescomaiomascio"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
