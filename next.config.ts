import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Dhaba Tycoon (our Android game) legal pages: plain HTML in public/dhaba-tycoon/, served at clean URLs.
  // The Play Store listing links to these two URLs, so keep them stable.
  async rewrites() {
    return [
      { source: "/dhaba-tycoon/privacy", destination: "/dhaba-tycoon/privacy.html" },
      { source: "/dhaba-tycoon/terms", destination: "/dhaba-tycoon/terms.html" },
    ];
  },
};

export default nextConfig;
