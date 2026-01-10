import type { Metadata } from "next";
import "@/app/globals.css";
import "@/theme/site.css";
import { SiteLayout } from "../components/layout/SiteLayout";

export const metadata: Metadata = {
  title: "Francesco Maiomascio",
  description: "Runtime architect & cognitive systems researcher.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
