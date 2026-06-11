import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';
import CTABand from '@/app/components/sections/CTABand';
import BlogGrid from './BlogGrid';
import BlogSidebar from './BlogSidebar';
import Pagination from './Pagination';
import { getAllPosts, POSTS_PER_PAGE } from './lib';

export const metadata = {
  title: 'Insights & Updates — Toshi Consulting Blog',
  description:
    'Stay ahead with the latest trends in cloud, AI, blockchain, DevOps, and digital media — explored by the Toshi Consulting team.',
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const pagePosts = allPosts.slice(0, POSTS_PER_PAGE);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative pt-32 pb-16 hero-bg overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-blue-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-cyan-200/30 blur-3xl" />
          <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Latest Blog
            </div>
            <h1 className="mt-5 text-5xl md:text-6xl font-black tracking-tight text-slate-900">
              Insights & <span className="font-display brand-gradient-text">Updates</span>
            </h1>
            <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
              Stay ahead with the latest trends in cloud, AI, and DevOps from our experts.
              Browse by month or category, or jump straight to the topic that matters to you.
            </p>
          </div>
        </section>

        <section className="py-16 section-mint">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[280px_1fr] gap-10">
            <BlogSidebar />
            <div>
              <BlogGrid posts={pagePosts} />
              <Pagination currentPage={1} totalPages={totalPages} />
            </div>
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
    </>
  );
}
