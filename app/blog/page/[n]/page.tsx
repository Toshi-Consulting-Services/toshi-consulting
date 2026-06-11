import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';
import CTABand from '@/app/components/sections/CTABand';
import BlogGrid from '../../BlogGrid';
import BlogSidebar from '../../BlogSidebar';
import Pagination from '../../Pagination';
import { getAllPosts, POSTS_PER_PAGE } from '../../lib';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    n: String(i + 2),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  return {
    title: `Blog · Page ${n} — Toshi Consulting`,
    description: 'More insights from the Toshi Consulting team.',
    alternates: { canonical: `/blog/page/${n}` },
  };
}

export default async function BlogPaginatedPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const pageNum = Number(n);
  if (!Number.isInteger(pageNum) || pageNum < 2) notFound();

  const allPosts = await getAllPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  if (pageNum > totalPages) notFound();

  const start = (pageNum - 1) * POSTS_PER_PAGE;
  const pagePosts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative pt-32 pb-16 hero-bg overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-teal-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-cyan-200/30 blur-3xl" />
          <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 bg-white border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Page {pageNum}
            </div>
            <h1 className="mt-5 text-5xl md:text-6xl font-black tracking-tight text-slate-900">
              All <span className="font-display brand-gradient-text">Insights</span>
            </h1>
          </div>
        </section>

        <section className="py-16 section-mint">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[280px_1fr] gap-10">
            <BlogSidebar />
            <div>
              <BlogGrid posts={pagePosts} featureFirst={false} />
              <Pagination currentPage={pageNum} totalPages={totalPages} />
            </div>
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
    </>
  );
}
