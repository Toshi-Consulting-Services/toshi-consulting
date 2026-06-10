import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';
import CTABand from '@/app/components/sections/CTABand';
import { services } from '@/app/data/services';
import Reveal from '@/app/components/common/Reveal';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://toshiconsulting.com';

export const metadata = {
  title: 'Our Services — AI, Blockchain, QA, DevOps, Cybersecurity, Cloud & Digital Media | Toshi Consulting',
  description:
    'Explore our full range of services: AI Integration, Blockchain Consulting, QA Testing & Automations, DevOps & CI/CD, Cybersecurity Lab, Cloud Deployment & Support, and Digital Media Marketing & Branding.',
  alternates: { canonical: '/services' },
};

const serviceSchemas = services.map((s) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/services/${s.slug}`,
  name: s.title,
  serviceType: s.title,
  description: s.description,
  url: `${SITE_URL}/services/${s.slug}`,
  provider: {
    '@type': 'Organization',
    name: 'Toshi Consulting',
    url: SITE_URL,
  },
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'AdministrativeArea', name: 'Haryana' },
  ],
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Indian SMEs, startups, and enterprises',
  },
}));

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
  ],
};

export default function ServicesPage() {
  return (
    <>
      {serviceSchemas.map((s) => (
        <script key={s['@id']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="flex-1">
        {/* Page hero */}
        <section className="relative pt-32 pb-16 hero-bg overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-teal-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-cyan-200/30 blur-3xl" />
          <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 bg-white border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> What we do
            </div>
            <h1 className="mt-5 text-5xl md:text-6xl font-black tracking-tight text-slate-900">
              All <span className="brand-gradient-text">Services</span>
            </h1>
            <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
              Seven practices, one reliable partner. Choose a service to see the
              benefits, our approach, and what you can expect.
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section className="py-16 section-mint">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.slug} delay={(i % 3) * 80}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group relative flex flex-col h-full bg-white rounded-3xl p-7 border border-teal-100 shadow-[0_12px_35px_-22px_rgba(15,118,110,0.45)] hover:shadow-[0_24px_50px_-22px_rgba(15,118,110,0.55)] hover:-translate-y-1 transition overflow-hidden"
                  >
                    <div className={`absolute -top-12 -right-12 w-32 h-32 ${s.soft} rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition`} />
                    <div className="relative flex-1">
                      <div className={`inline-grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br ${s.tone} text-white shadow-[0_15px_30px_-12px_rgba(20,184,166,0.6)] group-hover:scale-110 transition`}>
                        <Icon size={24} />
                      </div>
                      <h2 className="mt-5 text-xl font-black text-slate-900 leading-tight">
                        {s.title}
                      </h2>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                    <div className="relative mt-5 inline-flex items-center gap-1.5 text-teal-700 text-sm font-bold">
                      View details
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
    </>
  );
}
