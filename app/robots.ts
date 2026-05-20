import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://toshiconsulting.com';
const IS_PRODUCTION_DOMAIN = SITE_URL.includes('toshiconsulting.com');

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
