import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';
import CTABand from '@/app/components/sections/CTABand';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { authors, findAuthor } from '../data';
import { getAllPosts } from '@/app/blog/lib';
import BlogGrid from '@/app/blog/BlogGrid';
import { Mail, ArrowLeft, ChevronRight } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://toshiconsulting.com';

function LinkedinGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M6.94 5a2 2 0 1 1-4.08 0 2 2 0 0 1 4.08 0zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
    </svg>
  );
}

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = findAuthor(slug);
  if (!author) return { title: 'Author — Toshi Consulting' };
  return {
    title: `${author.name} — ${author.role} | Toshi Consulting`,
    description: author.bio,
    alternates: { canonical: `/authors/${slug}` },
    openGraph: {
      title: `${author.name} — ${author.role}`,
      description: author.bio,
      type: 'profile',
    },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = findAuthor(slug);
  if (!author) notFound();

  const allPosts = await getAllPosts();
  // For now every post lists Toshi Consulting as author — show recent posts on each author page.
  // When per-post authorSlug is wired, filter here.
  const posts = allPosts.slice(0, 6);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: `${SITE_URL}/authors/${author.slug}`,
    image: `${SITE_URL}/authors/${author.slug}/opengraph-image`,
    worksFor: {
      '@type': 'Organization',
      name: 'Toshi Consulting',
      url: SITE_URL,
    },
    knowsAbout: author.expertise,
    ...(author.email && { email: `mailto:${author.email}` }),
    ...(author.linkedin && { sameAs: [author.linkedin] }),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',    item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Authors', item: `${SITE_URL}/authors` },
      { '@type': 'ListItem', position: 3, name: author.name, item: `${SITE_URL}/authors/${author.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-12 hero-bg overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-blue-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-cyan-200/30 blur-3xl" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-700 transition">Home</Link>
              <ChevronRight size={12} />
              <Link href="/blog" className="hover:text-blue-700 transition">Blog</Link>
              <ChevronRight size={12} />
              <span className="text-blue-700">{author.name}</span>
            </nav>

            <div className="mt-8 grid md:grid-cols-[200px_1fr] gap-8 items-center">
              <div className={`relative w-40 h-40 mx-auto md:mx-0 ${author.side} rounded-3xl grid place-items-center overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,101,248,0.18),transparent_60%)]" />
                <div className={`relative grid place-items-center w-28 h-28 rounded-full bg-gradient-to-br ${author.tone} text-white font-black text-4xl shadow-[0_20px_45px_-15px_rgba(0,71,212,0.55)] ring-4 ring-white`}>
                  {author.initials}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">{author.role}</div>
                <h1 className="mt-1 text-4xl md:text-5xl font-black tracking-tight text-slate-900">{author.name}</h1>
                <p className="mt-3 text-slate-600 text-lg leading-relaxed">{author.bio}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {author.expertise.map((tag) => (
                    <span key={tag} className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-white border border-blue-200 rounded-full px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex gap-2">
                  {author.linkedin && (
                    <a href={author.linkedin} aria-label="LinkedIn" className="grid place-items-center w-10 h-10 rounded-xl bg-white border border-blue-200 text-blue-700 hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-500 hover:text-white transition">
                      <LinkedinGlyph />
                    </a>
                  )}
                  {author.email && (
                    <a href={`mailto:${author.email}`} aria-label="Email" className="grid place-items-center w-10 h-10 rounded-xl bg-white border border-blue-200 text-blue-700 hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-500 hover:text-white transition">
                      <Mail size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <Link href="/blog" className="mt-8 inline-flex items-center gap-1.5 text-blue-700 font-semibold hover:text-blue-800 transition text-sm">
              <ArrowLeft size={14} /> Back to all blogs
            </Link>
          </div>
        </section>

        {/* Recent posts */}
        <section className="py-16 section-mint">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-black text-slate-900 mb-8">
              Recent <span className="font-display brand-gradient-text">articles</span>
            </h2>
            <BlogGrid posts={posts} featureFirst={false} />
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
    </>
  );
}
