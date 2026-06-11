import Link from 'next/link';
import { CalendarDays, Tag, ArrowUpRight } from 'lucide-react';
import { monthsWithCounts, categoriesWithCounts, getAllPosts } from './lib';

export default async function BlogSidebar({ activeCategorySlug }: { activeCategorySlug?: string }) {
  const [months, categories, posts] = await Promise.all([
    monthsWithCounts(),
    categoriesWithCounts(),
    getAllPosts(),
  ]);

  return (
    <aside className="space-y-6 lg:sticky lg:top-32 self-start">
      <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-[0_15px_45px_-25px_rgba(0,114,153,0.35)]">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <CalendarDays size={16} className="text-blue-600" />
          Blogs by Month-Year
        </h3>
        <ul className="mt-4 space-y-2">
          <li>
            <Link
              href="/blog"
              className={`flex items-center justify-between text-sm rounded-lg px-3 py-2 transition ${
                !activeCategorySlug
                  ? 'text-blue-700 font-bold bg-blue-50'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-blue-50'
              }`}
            >
              All Blogs
              <span className="text-xs">{posts.length}</span>
            </Link>
          </li>
          {months.map((m) => (
            <li key={m.label}>
              <Link href="/blog" className="flex items-center justify-between text-sm text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg px-3 py-2 transition">
                {m.label}
                <span className="text-xs text-slate-500">({m.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-[0_15px_45px_-25px_rgba(0,114,153,0.35)]">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Tag size={16} className="text-blue-600" />
          Blogs by Category
        </h3>
        <ul className="mt-4 space-y-2">
          {categories.map((c) => {
            const active = activeCategorySlug === c.slug;
            return (
              <li key={c.slug}>
                <Link
                  href={`/blog/category/${c.slug}`}
                  className={`flex items-center justify-between text-sm rounded-lg px-3 py-2 transition ${
                    active
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-700 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  {c.name}
                  <span className="text-xs text-slate-500">({c.count})</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="relative rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white p-6 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full border-2 border-white/15" />
        <h4 className="text-lg font-black leading-tight">Need a hand?</h4>
        <p className="text-sm text-blue-50 mt-2">
          Book a free 30-min consultation with our team.
        </p>
        <Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 bg-white text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
          Get Quote <ArrowUpRight size={14} />
        </Link>
      </div>
    </aside>
  );
}
