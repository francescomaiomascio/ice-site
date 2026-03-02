// src/app/layout.tsx
import type { Metadata } from "next";
import { SiteLayout } from "../components/layout/SiteLayout";

// 1) Theme foundation (reset + tokens + base + components)
import "@/styles/theme/index.css";

// 2) App-level defaults (typography + global elements)
import "@/styles/globals.css";

// 3) Shared component styles
import "@/styles/components/navigation.css";
import "@/styles/components/footer.css";

// 4) Feature/page styles (scoped)
import "@/styles/features/home-hero.css";
import "@/styles/features/home-domains.css";
import "@/styles/features/home-sections.css";

import { Inter, Roboto_Condensed } from "next/font/google";

/**
 * Two-font system:
 * - Inter: global UI/body (“Redis-like”)
 * - Roboto Condensed: display only (hero H1)
 */
const yaiSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const yaiDisplay = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yai.foundation"),
  title: {
    default: "YAI",
    template: "%s — YAI",
  },
  description:
    "Execution infrastructure for systems that act: enforce constraints, preserve verifiable history, ship proof-led.",
  applicationName: "YAI",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
      { url: "/favicon.jpg" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "YAI",
    title: "YAI",
    description:
      "Execution infrastructure for systems that act: enforce constraints, preserve verifiable history, ship proof-led.",
    url: "https://yai.foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "YAI",
    description:
      "Execution infrastructure for systems that act: enforce constraints, preserve verifiable history, ship proof-led.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${yaiSans.variable} ${yaiDisplay.variable}`}
    >
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}