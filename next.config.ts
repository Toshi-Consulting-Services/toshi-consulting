import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // SEO migration: the old live site served the blog under /blogs (plural).
  // The new site uses /blog (singular). 301-redirect the old URLs so rankings
  // and backlinks carry over. Per-service pages reuse the old /services/<slug>
  // slugs verbatim, so they need no redirect.
  async redirects() {
    // Explicit 301 (Moved Permanently) — the canonical status for a content
    // move. Next maps `permanent: true` to 308; we use statusCode so every
    // crawler and SEO tool sees the expected 301 and passes link equity.
    return [
      { source: "/blogs", destination: "/blog", statusCode: 301 },
      { source: "/blogs/:slug", destination: "/blog/:slug", statusCode: 301 },
    ];
  },
};

export default nextConfig;
