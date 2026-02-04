export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner site-shell">
        <span className="site-footer-meta">© {year} Francesco Maiomascio</span>

        <nav className="site-footer-links" aria-label="Footer">
          <a href="/status">Status</a>
          <a href="/security">Security</a>
          <a href="/privacy">Privacy</a>
          <a href="/docs">Docs</a>
        </nav>
      </div>
    </footer>
  );
}
