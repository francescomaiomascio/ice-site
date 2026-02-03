import type { NextConfig } from "next";
import { dirname } from "path";
import { fileURLToPath } from "url";

const root = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "readmecodegen.vercel.app",
        pathname: "/api/social-icon**",
      },
    ],
  },
  turbopack: {
    root,
  },

  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
