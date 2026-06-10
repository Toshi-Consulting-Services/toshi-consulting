import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // SEO migration: the old live site served the blog under /blogs (plural).
  // The new site uses /blog (singular). 301-redirect the old URLs so rankings
  // and backlinks carry over. Per-service pages reuse the old /services/<slug>
  // slugs verbatim, so they need no redirect.
  async redirects() {
    return [
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/blogs/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
