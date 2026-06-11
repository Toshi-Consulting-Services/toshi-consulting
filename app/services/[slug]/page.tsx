import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';
import CTABand from '@/app/components/sections/CTABand';
import { services, getService } from '@/app/data/services';
import { CheckCircle2, ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://toshiconsulting.com';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: 'Service — Toshi Consulting' };
  return {
    title: `${service.title} — Toshi Consulting`,
    description: service.meta,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${service.slug}`,
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { '@type': 'Organization', name: 'Toshi Consulting', url: SITE_URL },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'AdministrativeArea', name: 'Haryana' },
    ],
    audience: { '@type': 'BusinessAudience', audienceType: 'Indian SMEs, startups, and enterprises' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: service.title, item: `${SITE_URL}/services/${service.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-16 hero-bg overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-blue-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-cyan-200/30 blur-3xl" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-700 transition">Home</Link>
              <ChevronRight size={14} />
              <Link href="/services" className="hover:text-blue-700 transition">Services</Link>
              <ChevronRight size={14} />
              <span className="text-slate-700 font-semibold">{service.title}</span>
            </nav>

            <div className={`mt-6 inline-grid place-items-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.tone} text-white shadow-[0_18px_35px_-12px_rgba(0,101,248,0.65)]`}>
              <Icon size={30} />
            </div>
            <h1 className="mt-5 text-4xl md:text-5xl font-black tracking-tight text-slate-900">
              {service.title}
            </h1>
            <p className="mt-4 text-slate-600 text-lg max-w-2xl">
              {service.description}
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-[0_15px_35px_-12px_rgba(0,101,248,0.9)] hover:-translate-y-0.5 transition"
            >
              Discuss your project <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Benefits + Expectations */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Key benefits</h2>
              <ul className="mt-5 space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-slate-700">
                    <span className="grid place-items-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 mt-0.5 shrink-0">
                      <CheckCircle2 size={15} />
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">What you can expect</h2>
              <ul className="mt-5 space-y-3">
                {service.expectations.map((e) => (
                  <li key={e} className="flex items-start gap-3 text-slate-700">
                    <span className="grid place-items-center w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 mt-0.5 shrink-0">
                      <ArrowRight size={14} />
                    </span>
                    <span className="leading-relaxed">{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Trust strip */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12">
            <div className="grid sm:grid-cols-3 gap-4">
              {['24/7 Support', 'Security-First Delivery', 'Trusted Partner'].map((t) => (
                <div key={t} className="flex items-center gap-3 bg-blue-50/60 border border-blue-100 rounded-2xl px-5 py-4">
                  <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shrink-0">
                    <CheckCircle2 size={16} />
                  </span>
                  <span className="text-sm font-bold text-slate-800">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Other services */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Explore other services</h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {services
                .filter((s) => s.slug !== service.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-1.5 bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-50 transition"
                  >
                    {s.title}
                  </Link>
                ))}
            </div>
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
    </>
  );
}
