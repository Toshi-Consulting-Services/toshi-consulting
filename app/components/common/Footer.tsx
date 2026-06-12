import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { services } from '@/app/data/services';

type SocialName = 'facebook' | 'linkedin' | 'whatsapp';

const SOCIAL_HANDLES: Record<SocialName, { href: string; label: string }> = {
  facebook: {
    href: 'https://www.facebook.com/people/Toshi-Consulting-Services/61573665045622',
    label: 'Facebook',
  },
  linkedin: {
    href: 'https://www.linkedin.com/company/toshi-consulting-services',
    label: 'LinkedIn',
  },
  whatsapp: {
    href: 'https://wa.me/919915718004',
    label: 'WhatsApp',
  },
};

// Real brand colours per platform (static strings so Tailwind compiles the arbitrary values).
const SOCIAL_STYLE: Record<SocialName, string> = {
  facebook: 'text-[#1877F2] hover:bg-[#1877F2]',
  linkedin: 'text-[#0A66C2] hover:bg-[#0A66C2]',
  whatsapp: 'text-[#25D366] hover:bg-[#25D366]',
};

function SocialIcon({ name }: { name: SocialName }) {
  const paths: Record<SocialName, string> = {
    facebook: 'M13.5 9H15V6.5h-1.5c-1.7 0-3 1.3-3 3V11H9v2h1.5v6h2.5v-6h2L15.4 11H13V9.5c0-.3.2-.5.5-.5z',
    linkedin: 'M6.94 5a2 2 0 1 1-4.08 0 2 2 0 0 1 4.08 0zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z',
    whatsapp: 'M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.74.46 3.45 1.32 4.94L2 22l5.31-1.39a9.92 9.92 0 0 0 4.73 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7zM12.04 20.13h-.01a8.21 8.21 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.36c0-4.53 3.69-8.22 8.23-8.22 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.53-3.69 8.22-8.23 8.22zm4.5-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.7-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.77-1.84-.2-.49-.41-.42-.56-.43-.14-.01-.31-.01-.47-.01-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.06 0 1.22.89 2.39 1.01 2.55.12.16 1.74 2.65 4.22 3.72.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28z',
  };
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d={paths[name]} />
    </svg>
  );
}

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

// Derived from the single services source so footer + dropdown never drift.
const servicesLinks = services.map((s) => ({ name: s.title, href: `/services/${s.slug}` }));

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white to-teal-50 border-t border-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="inline-flex items-center" aria-label="Toshi Consulting — Home">
            <Image
              src="/logo.png"
              alt="Toshi Consulting"
              width={596}
              height={246}
              className="h-12 w-auto"
            />
          </Link>

          <p className="mt-5 text-sm text-slate-600 leading-relaxed">
            Reliable IT solutions for modern businesses — Blockchain, AI,
            DevOps, Cloud — turning complex challenges into scalable success.
          </p>

          <div className="mt-5 space-y-2.5 text-sm">
            <a href="tel:+919915718004" className="flex items-center gap-2.5 text-slate-700 hover:text-teal-700 transition">
              <span className="grid place-items-center w-8 h-8 rounded-lg bg-teal-100 text-teal-700">
                <Phone size={14} />
              </span>
              +91-9915718004
            </a>
            <a href="mailto:info@toshiconsulting.com" className="flex items-center gap-2.5 text-slate-700 hover:text-teal-700 transition">
              <span className="grid place-items-center w-8 h-8 rounded-lg bg-teal-100 text-teal-700">
                <Mail size={14} />
              </span>
              info@toshiconsulting.com
            </a>
          </div>

          <div className="mt-5 flex gap-2">
            {(Object.keys(SOCIAL_HANDLES) as SocialName[]).map((name) => {
              const { href, label } = SOCIAL_HANDLES[name];
              return (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`grid place-items-center w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm hover:text-white hover:border-transparent hover:-translate-y-0.5 transition ${SOCIAL_STYLE[name]}`}
                >
                  <SocialIcon name={name} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.name}>
                <Link href={l.href} className="group inline-flex items-center gap-1 text-slate-600 hover:text-teal-700 transition">
                  <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition text-teal-600" />
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Services</h4>
          <ul className="space-y-2.5 text-sm">
            {servicesLinks.map((l) => (
              <li key={l.name}>
                <Link href={l.href} className="group inline-flex items-center gap-1 text-slate-600 hover:text-teal-700 transition">
                  <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition text-teal-600" />
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Visit Us */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Visit Us</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2.5 text-slate-700">
              <span className="grid place-items-center w-8 h-8 rounded-lg bg-teal-100 text-teal-700 shrink-0">
                <MapPin size={14} />
              </span>
              <span className="leading-relaxed">
                Plot 7, Twin Tower, Office 6,<br />
                4th Floor, IT Park Panchkula,<br />
                Haryana 134116, India
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-slate-700">
              <span className="grid place-items-center w-8 h-8 rounded-lg bg-teal-100 text-teal-700 shrink-0">
                <Clock size={14} />
              </span>
              <span>
                <span className="font-semibold text-slate-900">Hours</span><br />
                Mon–Fri · 10:00 AM – 6:00 PM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} Toshi Consulting Services Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-teal-700 transition">Privacy</Link>
            <Link href="/terms" className="hover:text-teal-700 transition">Terms</Link>
            <a href="/sitemap.xml" className="hover:text-teal-700 transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
