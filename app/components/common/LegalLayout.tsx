import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';
import { ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';

/**
 * Shared shell for the Privacy Policy and Terms & Conditions pages.
 * Renders the standard hero + a centred prose article body.
 */
export default function LegalLayout({
  badge,
  title,
  intro,
  updated,
  children,
}: {
  badge: string;
  title: string;
  intro: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-12 hero-bg overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-teal-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-cyan-200/30 blur-3xl" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase shadow-sm">
              <ShieldCheck size={13} className="text-teal-600" /> {badge}
            </div>
            <h1 className="mt-5 text-4xl md:text-5xl font-black tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="mt-4 text-slate-600 text-lg">{intro}</p>
            <p className="mt-3 text-sm text-slate-500">Last updated: {updated}</p>
          </div>
        </section>

        {/* Body */}
        <section className="py-16 bg-white">
          <article className="prose-toshi max-w-3xl mx-auto px-4 sm:px-6 text-slate-700">
            {children}
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
