'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { services } from '@/app/data/services';
import { openQuoteBot } from '@/app/components/chat/quoteBus';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services', dropdown: true },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

// Unified site nav — fixed glass pill on EVERY page (Verdant look). Transparent
// over the homepage hero at the top; a faint mint band appears once scrolled or
// on inner pages so content doesn't peek beside the floating pill.
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-jakarta">
      {/* Utility bar — plain text on the page background (no container/border); slides up & away on scroll */}
      <div className={`hidden md:flex items-center justify-between px-6 lg:px-10 text-[12.5px] font-medium text-[#15433D] overflow-hidden transition-all duration-300 ${scrolled ? '-translate-y-2 max-h-0 py-0 opacity-0' : 'translate-y-0 max-h-12 py-[7px] opacity-100'}`}>
        <div className="flex items-center gap-[26px]">
          <a href="tel:+919915718004" className="flex items-center gap-[7px] hover:text-[#0D9488] transition"><span className="text-[#0D9488]">✆</span> +91-9915718004</a>
          <a href="mailto:info@toshiconsulting.com" className="flex items-center gap-[7px] hover:text-[#0D9488] transition"><span className="text-[#0D9488]">✉</span> info@toshiconsulting.com</a>
        </div>
        <div className="flex items-center gap-[22px] text-[#1d534c]">
          <span>Mon–Fri · 10:00–18:00</span>
          <span className="opacity-45">·</span>
          <span className="flex items-center gap-1.5"><span className="text-[#0D9488]">◍</span> Panchkula, Haryana</span>
        </div>
      </div>

      {/* Floating glass pill — ALWAYS rounded, never a full-width bar; the page background shows behind it */}
      <div className="px-4 sm:px-7 py-2.5">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 py-2.5 rounded-[20px] bg-white/90 backdrop-blur-xl border border-white shadow-[0_14px_38px_-10px_rgba(10,61,55,0.22)]">
          {/* logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="Toshi Consulting — Home">
            <Image src="/logo.png" alt="Toshi Consulting" width={596} height={246} priority className="h-9 sm:h-10 w-auto" />
          </Link>

          {/* desktop links */}
          <div className="hidden lg:flex items-center gap-[30px] text-[14.5px] font-semibold text-[#3a5a55]">
            {navItems.map((item) => {
              const active = isActive(item.href);

              if (item.dropdown) {
                return (
                  <div key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className={`relative transition ${active ? 'text-[#0A3D37]' : 'text-[#3a5a55] hover:text-[#0D9488]'}`}
                    >
                      {item.name}
                      {active && (
                        <span className="absolute left-0 right-0 -bottom-[7px] h-[2.5px] rounded-[2px]" style={{ background: 'linear-gradient(90deg,#0D9488,#2DD4BF)' }} />
                      )}
                    </Link>
                    {/* Dropdown mega-menu (2×4 grid) — pt-4 bridges the hover gap */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition duration-200 z-50">
                      <div className="w-[680px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-teal-100 shadow-[0_25px_60px_-20px_rgba(10,61,55,0.3)] p-3">
                        <div className="grid grid-cols-2 gap-1">
                          {services.map((s) => {
                            const Icon = s.icon;
                            return (
                              <Link key={s.slug} href={`/services/${s.slug}`} className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-teal-50 transition group/item">
                                <span className={`grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br ${s.tone} text-white shrink-0`}><Icon size={16} weight="duotone" /></span>
                                <span className="min-w-0">
                                  <span className="block text-sm font-bold text-[#0A3D37] group-hover/item:text-[#0D9488] transition">{s.title}</span>
                                  <span className="block text-xs text-slate-500 leading-snug line-clamp-2">{s.short}</span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                        <Link href="/services" className="mt-2 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-bold text-[#0D9488] bg-teal-50/60 hover:bg-teal-100 transition border-t border-teal-50">
                          View all services <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative transition ${active ? 'text-[#0A3D37]' : 'text-[#3a5a55] hover:text-[#0D9488]'}`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute left-0 right-0 -bottom-[7px] h-[2.5px] rounded-[2px]" style={{ background: 'linear-gradient(90deg,#0D9488,#2DD4BF)' }} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button type="button" onClick={() => openQuoteBot()} className="hidden sm:inline-flex items-center gap-2 text-[14px] font-bold text-white px-[22px] py-3 rounded-full shadow-[0_10px_24px_rgba(13,148,136,0.34)] hover:brightness-[1.06] transition cursor-pointer" style={{ background: 'linear-gradient(135deg,#0D9488,#0c7a70)' }}>
              Get Quote <span className="text-[13px]">→</span>
            </button>
            <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" className="lg:hidden grid place-items-center w-10 h-10 rounded-xl text-[#0D9488] hover:bg-teal-50 transition">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* mobile sheet */}
        {open && (
          <div className="lg:hidden max-w-[1500px] mx-auto mt-2 rounded-2xl border border-teal-100 bg-white shadow-[0_25px_60px_-25px_rgba(10,61,55,0.35)] p-3 flex flex-col gap-1 max-h-[78vh] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link href={item.href} onClick={() => setOpen(false)} className={`block px-4 py-3 rounded-xl text-sm font-semibold transition ${isActive(item.href) ? 'bg-teal-50 text-[#0D9488]' : 'text-[#3a5a55] hover:bg-teal-50 hover:text-[#0D9488]'}`}>{item.name}</Link>
                {item.dropdown && (
                  <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-teal-100 pl-3">
                    {services.map((s) => (
                      <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-teal-50 hover:text-[#0D9488] transition">{s.title}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button type="button" onClick={() => { setOpen(false); openQuoteBot(); }} className="mt-1 inline-flex items-center justify-center gap-2 text-sm font-bold text-white px-5 py-3 rounded-full cursor-pointer" style={{ background: 'linear-gradient(135deg,#0D9488,#0c7a70)' }}>Get Quote →</button>
          </div>
        )}
      </div>
    </header>
  );
}
