import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';
import CTABand from '@/app/components/sections/CTABand';
import { services } from '@/app/components/sections/ServicesSection';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const serviceDetails: Record<string, string[]> = {
  'ai-integration': [
    'LLM and agent integration into existing systems',
    'Custom AI assistants with retrieval-augmented generation',
    'Workflow automation with n8n + AI nodes',
    'Vision, OCR, and document-understanding pipelines',
  ],
  'blockchain-consulting': [
    'Smart-contract design, audit, and gas optimisation',
    'Tokenisation strategy for assets and loyalty programs',
    'Wallet integration and on-chain identity flows',
    'Private chain & permissioned consortium design',
  ],
  'qa-testing-and-automations': [
    'End-to-end test automation (Playwright, Cypress, Selenium)',
    'API contract & load testing with k6 / JMeter',
    'CI-integrated regression suites with screenshot diffing',
    'Python / Java / Cloud upskilling for in-house teams',
  ],
  'digital-media-marketing-and-branding': [
    'Brand identity, logo, and design-system creation',
    'Performance-first paid social and search campaigns',
    'Content engines: blog, video, and short-form social',
    'Marketing-automation flows tied to your CRM',
  ],
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://toshiconsulting.com';

export const metadata = {
  title: 'Our Services — AI, Blockchain, QA, Digital Media | Toshi Consulting',
  description:
    'Choose a service to view complete details, benefits, and delivery approach across AI Integration, Blockchain Consulting, QA Automation and Digital Media & Branding.',
  alternates: { canonical: '/services' },
};

const serviceSchemas = services.map((s) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/services#${s.slug}`,
  name: s.title,
  serviceType: s.title,
  description: s.description,
  url: `${SITE_URL}/services#${s.slug}`,
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
              Choose a service to view complete details, benefits, and delivery approach.
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section className="py-16 section-mint">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
            {services.map((s, idx) => {
              const Icon = s.icon;
              const bullets = serviceDetails[s.slug] ?? [];
              const reversed = idx % 2 === 1;
              return (
                <article
                  key={s.slug}
                  id={s.slug}
                  className="grid lg:grid-cols-2 gap-10 bg-white rounded-3xl p-8 sm:p-10 border border-teal-100 shadow-[0_15px_45px_-25px_rgba(15,118,110,0.4)] scroll-mt-32"
                >
                  <div className={reversed ? 'lg:order-2' : ''}>
                    <div className={`inline-grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br ${s.tone} text-white shadow-[0_15px_30px_-12px_rgba(20,184,166,0.6)]`}>
                      <Icon size={26} />
                    </div>
                    <h2 className="mt-5 text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                      {s.title}
                    </h2>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                      {s.description}
                    </p>
                    <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="grid place-items-center w-5 h-5 rounded-full bg-teal-100 text-teal-700 mt-0.5 shrink-0">
                            <CheckCircle2 size={14} />
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="mt-7 inline-flex items-center gap-2 text-teal-700 font-bold hover:text-teal-800 transition"
                    >
                      Discuss your project
                      <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                  <div className={`relative grid place-items-center ${reversed ? 'lg:order-1' : ''}`}>
                    <div className={`absolute inset-6 rounded-3xl bg-gradient-to-br ${s.tone} opacity-10 blur-2xl`} />
                    <div className={`relative w-full max-w-md aspect-[4/3] rounded-3xl bg-gradient-to-br ${s.tone} p-1 shadow-[0_25px_60px_-25px_rgba(15,118,110,0.55)]`}>
                      <div className="w-full h-full rounded-[20px] bg-white p-8 flex flex-col justify-between">
                        <div className={`inline-grid place-items-center w-16 h-16 rounded-2xl bg-gradient-to-br ${s.tone} text-white`}>
                          <Icon size={30} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                            Toshi Service
                          </div>
                          <div className="text-2xl font-black text-slate-900 leading-tight mt-1">
                            {s.title}
                          </div>
                          <div className="flex items-center gap-2 mt-3 text-xs text-slate-500 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Delivery-ready
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
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
