import type { Metadata } from "next";
import "@/styles/theme/index.css";
import "@/styles/theme/tokens/themes/theme-yai.css";
import "@/styles/globals.css";
import "@/styles/components/navigation.css";
import "@/styles/components/footer.css";
import "@/styles/features/projects.css";
import "@/styles/features/hero.css";
import { SiteLayout } from "../components/layout/SiteLayout";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Francesco Maiomascio",
  description: "Research and engineering of runtime-centric intelligent systems.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
      { url: "/favicon.jpg" },
    ],
    shortcut: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="preload">
      <body>
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
            if (document && document.documentElement) { document.documentElement.classList.add('preload'); document.documentElement.scrollTop = 0; }
            window.addEventListener('DOMContentLoaded', () => {
              const main = document.getElementById('scroll-root');
              if (main) { main.scrollTop = 0; }
            }, { once: true });
            window.addEventListener('pageshow', () => {
              const main = document.getElementById('scroll-root');
              if (main) { main.scrollTop = 0; }
              if (document && document.documentElement) { document.documentElement.scrollTop = 0; }
            });`}
        </Script>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
