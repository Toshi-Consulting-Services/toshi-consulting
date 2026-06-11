import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';
import CTABand from '@/app/components/sections/CTABand';
import BlogGrid from '../../BlogGrid';
import BlogSidebar from '../../BlogSidebar';
import { categoriesWithCounts, postsByCategorySlug } from '../../lib';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const cats = await categoriesWithCounts();
  return cats.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cats = await categoriesWithCounts();
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) return { title: 'Category — Toshi Consulting' };
  return {
    title: `${cat.name} Insights — Toshi Consulting`,
    description: `Articles from Toshi Consulting in the ${cat.name} category — practical insights, frameworks, and case studies.`,
    alternates: { canonical: `/blog/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cats = await categoriesWithCounts();
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) notFound();
  const posts = await postsByCategorySlug(slug);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative pt-32 pb-16 hero-bg overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-blue-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-cyan-200/30 blur-3xl" />
          <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Category
            </div>
            <h1 className="mt-5 text-5xl md:text-6xl font-black tracking-tight text-slate-900">
              <span className="font-display brand-gradient-text">{cat.name}</span> Insights
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              {cat.count} {cat.count === 1 ? 'article' : 'articles'} in this category.
            </p>
          </div>
        </section>

        <section className="py-16 section-mint">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[280px_1fr] gap-10">
            <BlogSidebar activeCategorySlug={slug} />
            <BlogGrid posts={posts} />
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
    </>
  );
}
