import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://toshiconsulting.com';
// Index ONLY on the exact canonical host. A staging subdomain like
// new.toshiconsulting.com must NOT count as production — a substring match
// would wrongly let it be indexed (duplicate-content SEO harm).
const PRODUCTION_HOSTS = ['toshiconsulting.com', 'www.toshiconsulting.com'];
const IS_PRODUCTION_DOMAIN = PRODUCTION_HOSTS.includes(new URL(SITE_URL).hostname);

export default function robots(): MetadataRoute.Robots {
  // Allow indexing only on the canonical prod domain. Staging gets blocked.
  if (IS_PRODUCTION_DOMAIN) {
    return {
      rules: [{ userAgent: '*', allow: '/' }],
      sitemap: `${SITE_URL}/sitemap.xml`,
      host: SITE_URL,
    };
  }
  return { rules: [{ userAgent: '*', disallow: '/' }] };
}
