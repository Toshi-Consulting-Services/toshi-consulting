import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';
import CTABand from '@/app/components/sections/CTABand';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPost, formatDate, relatedPosts, categorySlug } from '../lib';
import BlogTopicIcon from '../Icon';
import { authors, DEFAULT_AUTHOR_SLUG } from '@/app/authors/data';
import {
  CalendarDays,
  Clock,
  User,
  Tag,
  ShieldCheck,
  ArrowUpRight,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://toshiconsulting.com';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Article — Toshi Consulting' };
  return {
    title: `${post.title} | Toshi Consulting`,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await relatedPosts(slug, 3);
  const catSlug = categorySlug(post.category);
  // Round-robin authors based on slug hash so posts are evenly attributed
  const authorIdx = post.slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % authors.length;
  const author = authors[authorIdx] || authors.find((a) => a.slug === DEFAULT_AUTHOR_SLUG)!;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: `${SITE_URL}/blog/${slug}/opengraph-image`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: author.name,
      url: `${SITE_URL}/authors/${author.slug}`,
      jobTitle: author.role,
      knowsAbout: author.expertise,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Toshi Consulting',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` },
    wordCount: post.wordCount,
    articleSection: post.category,
    keywords: post.targetKeyword,
  };

  const faqSchema = post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',    item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog',    item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.category, item: `${SITE_URL}/blog/category/${catSlug}` },
      { '@type': 'ListItem', position: 4, name: post.title, item: `${SITE_URL}/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-12 hero-bg overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-blue-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-cyan-200/30 blur-3xl" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-700 transition">Home</Link>
              <ChevronRight size={12} />
              <Link href="/blog" className="hover:text-blue-700 transition">Blog</Link>
              <ChevronRight size={12} />
              <Link href={`/blog/category/${catSlug}`} className="hover:text-blue-700 transition">{post.category}</Link>
            </nav>

            <Link href="/blog" className="mt-5 inline-flex items-center gap-1.5 text-blue-700 font-semibold hover:text-blue-800 transition text-sm">
              <ArrowLeft size={14} /> Back to all blogs
            </Link>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Link
                href={`/blog/category/${catSlug}`}
                className="inline-flex items-center gap-1.5 bg-white text-blue-700 border border-blue-200 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider hover:bg-blue-50 transition"
              >
                <Tag size={12} /> {post.category}
              </Link>
              <span className="inline-flex items-center gap-1 bg-white/80 backdrop-blur text-slate-600 rounded-full px-3 py-1 text-[11px] font-semibold">
                <CalendarDays size={12} /> {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1 bg-white/80 backdrop-blur text-slate-600 rounded-full px-3 py-1 text-[11px] font-semibold">
                <Clock size={12} /> {post.readMinutes} min read
              </span>
              <Link
                href={`/authors/${author.slug}`}
                className="inline-flex items-center gap-1 bg-white/80 backdrop-blur text-slate-600 hover:text-blue-700 hover:bg-white rounded-full px-3 py-1 text-[11px] font-semibold transition"
              >
                <User size={12} /> {author.name}
              </Link>
            </div>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
          </div>
        </section>

        {/* Featured image */}
        <section className="relative pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className={`relative h-72 md:h-96 rounded-3xl bg-gradient-to-br ${post.tone} overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,114,153,0.55)]`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_55%)]" />
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:44px_44px]" />
              <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full border border-white/25" />
              <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-white/30" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative grid place-items-center w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-white/15 backdrop-blur-sm border border-white/30 text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)]">
                  <BlogTopicIcon name={post.iconName} size={84} className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="pb-16 bg-white">
          <article className="max-w-3xl mx-auto px-4 sm:px-6">
            {post.draft && (
              <div className="mb-8 rounded-xl bg-amber-50 border border-amber-200 px-5 py-3 text-amber-900 text-sm font-semibold">
                ✏️ Draft — full article publishing soon. Subscribe for the release notification.
              </div>
            )}
            <div
              className="prose-toshi text-slate-700"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {/* FAQ Section */}
            {post.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-3xl font-black text-slate-900 mb-6">
                  Frequently Asked <span className="font-display brand-gradient-text">Questions</span>
                </h2>
                <div className="grid gap-3">
                  {post.faqs.map((f) => (
                    <details key={f.q} className="group bg-blue-50/60 border border-blue-100 rounded-xl p-5 open:bg-white open:shadow-[0_15px_45px_-25px_rgba(0,114,153,0.35)] transition">
                      <summary className="cursor-pointer font-bold text-slate-900 flex items-start gap-3 list-none">
                        <span className="grid place-items-center w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xs font-black shrink-0 group-open:rotate-45 transition">+</span>
                        <span className="flex-1">{f.q}</span>
                      </summary>
                      <p className="mt-3 ml-10 text-sm text-slate-700 leading-relaxed">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <div className="mt-12 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white p-8 shadow-[0_25px_60px_-25px_rgba(0,114,153,0.55)] flex flex-col md:flex-row items-start md:items-center gap-6 justify-between overflow-hidden relative">
              <div className="absolute -bottom-20 -left-12 w-64 h-64 rounded-full border-2 border-white/15" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                  <ShieldCheck size={12} /> Talk to an expert
                </div>
                <h3 className="text-2xl font-black mt-3">Need professional help?</h3>
                <p className="text-blue-50 mt-1 text-sm md:text-base">
                  We specialise in tailored solutions for your exact stack and risk profile.
                </p>
              </div>
              <Link
                href="/contact"
                className="relative inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-full font-bold shadow-[0_15px_35px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 transition"
              >
                Get a Consultation
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        </section>

        {/* Related */}
        <section className="py-16 section-mint">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h3 className="text-3xl font-black text-slate-900 mb-8">
              Related <span className="font-display brand-gradient-text">Articles</span>
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-blue-100 shadow-[0_10px_30px_-20px_rgba(0,114,153,0.4)] hover:-translate-y-1 hover:shadow-[0_22px_44px_-22px_rgba(0,114,153,0.55)] transition flex flex-col"
                >
                  <div className={`relative h-44 bg-gradient-to-br ${r.tone} grid place-items-center overflow-hidden`}>
                    <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:32px_32px]" />
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border border-white/30" />
                    <div className="relative grid place-items-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white">
                      <BlogTopicIcon name={r.iconName} size={32} />
                    </div>
                    <div className="absolute top-3 left-3 bg-white/95 text-blue-700 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                      {r.category}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition leading-snug">
                      {r.title}
                    </h4>
                    <p className="mt-2 text-xs text-slate-600 line-clamp-2">{r.excerpt}</p>
                    <div className="mt-3 inline-flex items-center gap-1 text-blue-700 text-xs font-bold">
                      Read more <ArrowUpRight size={12} />
                    </div>
                  </div>
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
