import type { NextConfig } from "next";

// The site is a fully static export (`out/`), hosted on Cloudflare Pages.
// Old WordPress URL redirects live in public/_redirects (handled by Cloudflare).
const nextConfig: NextConfig = {
  output: "export",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Static hosting has no image server; our images are already small WebP/SVG files.
    unoptimized: true,
  },
};

export default nextConfig;
