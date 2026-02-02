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
          <span className="site-brand-short" aria-hidden="true">FM</span>
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

        <div className="site-nav-icons" aria-label="Presence">
          <a
            href="https://github.com/francescomaiomascio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <img
              src="https://readmecodegen.vercel.app/api/social-icon?name=github&theme=dark&size=20"
              alt=""
            />
          </a>
          <a
            href="https://www.linkedin.com/in/francesco-maiomascio/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <img
              src="https://readmecodegen.vercel.app/api/social-icon?name=linkedin&theme=dark&size=20"
              alt=""
            />
          </a>
          <a
            href="https://x.com/francescomaiom"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <img
              src="https://readmecodegen.vercel.app/api/social-icon?name=x&theme=dark&size=20"
              alt=""
            />
          </a>
          <a
            href="https://bsky.app/profile/francescomaiomascio.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bluesky"
          >
            <img
              src="https://readmecodegen.vercel.app/api/social-icon?name=bluesky&theme=dark&size=20"
              alt=""
            />
          </a>
          <a
            href="https://maiomascio.gumroad.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Gumroad"
          >
            <img
              src="https://readmecodegen.vercel.app/api/social-icon?name=gumroad&theme=dark&size=20"
              alt=""
            />
          </a>
          <a
            href="https://www.youtube.com/@francescomaiomascio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <img
              src="https://readmecodegen.vercel.app/api/social-icon?name=youtube&theme=dark&size=20"
              alt=""
            />
          </a>
          <a
            href="https://stackoverflow.com/users/21671654/francesco-maiomascio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Stack Overflow"
          >
            <img
              src="https://readmecodegen.vercel.app/api/social-icon?name=stackoverflow&theme=dark&size=20"
              alt=""
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
