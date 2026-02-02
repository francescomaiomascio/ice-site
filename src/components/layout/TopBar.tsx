import Image from "next/image";
import Link from "next/link";
import avatarSrc from "@/app/img/DSC00498.jpg";

export function TopBar() {
  return (
    <header className="site-header">
      <nav className="site-nav site-shell">
        <Link href="/" className="site-brand">
          <Image
            src={avatarSrc}
            alt="Francesco Maiomascio"
            width={36}
            height={36}
            className="site-brand-avatar"
            priority
          />
          <span className="site-brand-name">Francesco Maiomascio</span>
        </Link>

        <div className="site-nav-links">
          <Link href="/projects">Projects</Link>
          <Link href="/writing">Writing</Link>
          <Link href="/status">Status</Link>
          <Link href="/about">About</Link>

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
