import { TopBar } from "./TopBar";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <main className="site-main">{children}</main>
      <Footer />
    </>
  );
}
