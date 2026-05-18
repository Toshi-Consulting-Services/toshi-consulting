'use client';

import Link from 'next/link';
import { Menu, X, ArrowRight, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export default function ModernNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Services', href: '/services', icon: '⚙️' },
    { name: 'About', href: '/about', icon: '👥' },
    { name: 'Blog', href: '/blog', icon: '📝' },
    { name: 'Contact', href: '/contact', icon: '✉️' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 w-full bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-2 px-6 text-sm z-50 border-b border-blue-500/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <div className="flex items-center gap-2 hover:text-blue-300 transition">
              <Phone size={16} />
              <span>+91-9915718004</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-300 transition">
              <Mail size={16} />
              <span>hr@toshiconsulting.com</span>
            </div>
          </div>
          <span className="text-blue-300">⏰ Mon-Sat, 9:00-18:00</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="fixed top-10 w-full bg-slate-950/80 backdrop-blur-xl z-50 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-3xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent hover:from-blue-300 hover:via-cyan-300 hover:to-teal-300 transition">
            TOSHI
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-2 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg text-white hover:bg-blue-600/30 hover:text-cyan-300 transition group relative"
              >
                <span className="flex items-center gap-2">
                  {item.name}
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition" />
                </span>
              </Link>
            ))}
          </div>

          {/* Get Quote Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-blue-500/50 transition transform hover:scale-105"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-blue-600/30 rounded-lg transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gradient-to-b from-slate-900 to-slate-950 border-t border-blue-500/20 px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-lg text-white hover:bg-blue-600/30 hover:text-cyan-300 transition"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold text-center hover:from-blue-500 hover:to-cyan-500 transition"
              onClick={() => setIsOpen(false)}
            >
              Get Quote
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
