import type { NextConfig } from "next";

// Files in public/ are served with no cache by default. These never change under the same name, so
// browsers and the CDN can keep them for a year (rename a file when you replace it).
const longCache = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/about/:file*", headers: longCache },
      { source: "/logos/:file*", headers: longCache },
      { source: "/grain.png", headers: longCache },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    // There's a stray package-lock.json in the home folder; pin the root here.
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
