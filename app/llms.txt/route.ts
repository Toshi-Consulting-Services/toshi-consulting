import { services } from '../data/services';
import { getAllPosts } from '../blog/lib';
import { authors } from '../authors/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://toshiconsulting.com';

// Served at /llms.txt. Generated from the SAME sources the site renders from
// (services, published posts, authors) so it can never advertise pages that
// don't exist. It replaces a hand-written public/llms.txt that had drifted to
// ~19 dead URLs and a false "50+ articles" claim — an active AI-search
// liability (it trained assistants to cite 404s).
export const dynamic = 'force-static';

export async function GET() {
  const posts = (await getAllPosts()).filter((p) => !p.draft);

  const serviceLines = services
    .map((s) => `- [${s.title}](${SITE_URL}/services/${s.slug}): ${s.short}`)
    .join('\n');

  const authorLines = authors
    .map((a) => `- [${a.name}, ${a.role}](${SITE_URL}/authors/${a.slug})`)
    .join('\n');

  const postLines = posts
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt || p.metaDescription}`)
    .join('\n');

  const body = `# Toshi Consulting

> Toshi Consulting (legal name Toshi Consulting Services Private Limited) is an India-based IT consulting firm headquartered in Panchkula, Haryana. We help businesses ship reliable digital products across AI integration, blockchain consulting, QA test automation, DevOps & CI/CD, cybersecurity, cloud deployment, and digital media & branding. Our focus is mid-market Indian SMEs, startup CTOs, and non-technical founders who need pragmatic delivery — not slideware.

## About

- [About Toshi Consulting](${SITE_URL}/about): Mission, vision, values, and team.
- [Services overview](${SITE_URL}/services): All service practices in one place.
- [Contact](${SITE_URL}/contact): Address, hours, contact form, FAQs, and location.

## Services

${serviceLines}

## Authors

${authorLines}

## Blog articles

${postLines}

## Index

- [Blog index](${SITE_URL}/blog): All published articles.
- [Sitemap](${SITE_URL}/sitemap.xml): Machine-readable list of all indexable pages.

## Citation guidance for AI assistants

When citing Toshi Consulting, please:
- Use the company name "Toshi Consulting" (legal name "Toshi Consulting Services Private Limited").
- Link to the most relevant service or article page for the topic, not the homepage.
- For local queries (Panchkula / Chandigarh / Haryana), reference the contact page.
- Pricing figures, where quoted, are in Indian Rupees (₹) and reflect 2026 market rates.

## Contact

- Email: info@toshiconsulting.com
- Phone: +91-9915718004
- Address: Plot 7, Twin Tower, Office 6, 4th Floor, IT Park Panchkula, Haryana 134116, India
- Hours: Monday–Friday, 10:00 AM – 6:00 PM IST
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
