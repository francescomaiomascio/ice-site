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
// NOTE: Keep this list minimal. Avoid per-hero CSS.
// import "@/styles/features/hero.css";
import "@/styles/features/projects.css";

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
  robots: {
    index: true,
    follow: true,
  },
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}