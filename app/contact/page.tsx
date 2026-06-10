import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';
import FAQAccordion from '@/app/components/sections/FAQAccordion';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import ContactForm from './ContactForm';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://toshiconsulting.com';

export const metadata = {
  title: 'Contact Toshi Consulting — Get In Touch',
  description:
    'Reach out for project inquiries, consultations, or partnerships. We believe in building strong, long-term relationships — and every great one begins with a conversation.',
  alternates: { canonical: '/contact' },
};

// Keep these in sync with the FAQs rendered in FAQAccordion so the schema matches the UI.
const contactFaqs = [
  {
    q: 'What is the cancellation period?',
    a: 'You can cancel any engagement with 30 days notice. Work-in-progress is wrapped up, deliverables handed over, and a transition plan is included at no extra cost.',
  },
  {
    q: 'What does non-exclusive mean?',
    a: 'You retain the right to work with other partners on parallel initiatives. We never lock you into our services as the only path forward — we earn the next engagement.',
  },
  {
    q: 'Where are your offices located?',
    a: 'Our primary office is at Plot 7, Twin Tower, Office 6, 4th Floor, IT Park Panchkula, Haryana 134116. We deliver remotely across India, the EU, and North America — with timezone-overlap built into every team.',
  },
  {
    q: 'How fast can you start?',
    a: 'For most engagements, a discovery session within 5 business days and a working team within 2–3 weeks. Urgent engagements can be accelerated based on availability.',
  },
];

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'Toshi Consulting',
  legalName: 'Toshi Consulting Services Private Limited',
  description:
    'IT consulting firm in Panchkula offering AI integration, blockchain consulting, QA test automation, and digital media & branding services for Indian businesses.',
  url: SITE_URL,
  telephone: '+91-9915718004',
  email: 'info@toshiconsulting.com',
  image: `${SITE_URL}/icon`,
  logo: `${SITE_URL}/icon`,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot 7, Twin Tower, Office 6, 4th Floor, IT Park',
    addressLocality: 'Panchkula',
    addressRegion: 'Haryana',
    postalCode: '134116',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 30.69,
    longitude: 76.85,
  },
  areaServed: [
    { '@type': 'City', name: 'Panchkula' },
    { '@type': 'City', name: 'Chandigarh' },
    { '@type': 'City', name: 'Mohali' },
    { '@type': 'AdministrativeArea', name: 'Haryana' },
    { '@type': 'Country', name: 'India' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '18:00',
    },
  ],
  sameAs: ['https://share.google/crSjVbZQu4RkGaB8W'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'IT Consulting Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Integration Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Blockchain Consulting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'QA Testing & Automation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Media Marketing & Branding' } },
    ],
  },
};

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: contactFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-16 hero-bg overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-teal-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-cyan-200/30 blur-3xl" />
          <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 bg-white border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase shadow-sm">
              <MessageSquare size={13} className="text-teal-600" /> Contact Us
            </div>
            <h1 className="mt-5 text-5xl md:text-6xl font-black tracking-tight text-slate-900">
              Get in <span className="brand-gradient-text">Touch</span>
            </h1>
            <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
              Reach out for project inquiries, consultations, or partnerships.
              We believe in building strong, long-term relationships — and every great one begins with a conversation.
            </p>
          </div>
        </section>

        {/* Form + details */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8">
            {/* Form card */}
            <div className="bg-white rounded-3xl border border-teal-100 shadow-[0_25px_60px_-30px_rgba(15,118,110,0.45)] p-8 sm:p-10">
              <h2 className="text-2xl font-black text-slate-900">Send us a message</h2>
              <p className="text-sm text-slate-600 mt-1">We typically reply within 1 business day.</p>
              <ContactForm />
            </div>

            {/* Contact details */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-teal-100 shadow-[0_25px_60px_-30px_rgba(15,118,110,0.45)] p-8 sm:p-10">
                <h2 className="text-2xl font-black text-slate-900">Contact Details</h2>
                <div className="mt-6 grid gap-5">
                  {[
                    { icon: Phone, label: 'Call us', value: '+91-9915718004', href: 'tel:+919915718004' },
                    { icon: Mail, label: 'Email us', value: 'info@toshiconsulting.com', href: 'mailto:info@toshiconsulting.com' },
                    { icon: MapPin, label: 'Visit us', value: 'Plot 7, Twin Tower, Office 6, 4th Floor, IT Park Panchkula, Haryana 134116, India' },
                    { icon: Clock, label: 'Business hours', value: 'Monday – Friday · 10:00 AM – 6:00 PM' },
                  ].map((c) => {
                    const Icon = c.icon;
                    const body = (
                      <>
                        <span className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-[0_12px_25px_-10px_rgba(20,184,166,0.7)] shrink-0">
                          <Icon size={18} />
                        </span>
                        <span className="flex-1 leading-snug">
                          <span className="block text-[11px] font-bold uppercase tracking-wider text-teal-700">{c.label}</span>
                          <span className="block text-slate-800 font-semibold mt-0.5">{c.value}</span>
                        </span>
                      </>
                    );
                    return c.href ? (
                      <a key={c.label} href={c.href} className="flex items-start gap-3 hover:bg-teal-50/60 -mx-2 p-2 rounded-xl transition">
                        {body}
                      </a>
                    ) : (
                      <div key={c.label} className="flex items-start gap-3 -mx-2 p-2">
                        {body}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <div className="flex items-center gap-2 mb-4 px-1">
                  <h2 className="text-2xl font-black text-slate-900">FAQs</h2>
                  <span className="grid place-items-center w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold">?</span>
                </div>
                <FAQAccordion />
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase">
                <MapPin size={13} /> Find us
              </div>
              <h3 className="mt-3 text-2xl font-black text-slate-900">
                IT Park Panchkula, Haryana
              </h3>
            </div>
            <div className="relative rounded-3xl overflow-hidden border border-teal-100 shadow-[0_25px_60px_-30px_rgba(15,118,110,0.45)] aspect-[21/9] bg-teal-50">
              <iframe
                title="Toshi Consulting on Google Maps"
                src="https://maps.google.com/maps?q=IT%20Park%20Panchkula&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
              {/* "We're here" overlay pin card */}
              <div className="pointer-events-none absolute top-6 left-6 max-w-xs bg-white rounded-2xl shadow-[0_20px_50px_-15px_rgba(15,23,42,0.3)] border border-teal-100 p-5">
                <div className="flex items-start gap-3">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-[0_12px_25px_-10px_rgba(20,184,166,0.7)] shrink-0">
                    <MapPin size={18} />
                  </span>
                  <div className="leading-tight">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                      We're here
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      Plot 7, Twin Tower, Office 6
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      4th Floor, IT Park Panchkula<br />Haryana 134116, India
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Open today · 10 AM – 6 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
