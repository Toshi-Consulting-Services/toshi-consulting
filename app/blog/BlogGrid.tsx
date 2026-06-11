import Link from 'next/link';
import { CalendarDays, Clock, User, ArrowUpRight } from 'lucide-react';
import Reveal from '@/app/components/common/Reveal';
import BlogTopicIcon from './Icon';
import { formatDate, type BlogPost } from './lib';

export default function BlogGrid({ posts, featureFirst = true }: { posts: BlogPost[]; featureFirst?: boolean }) {
  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-teal-100 p-12 text-center text-slate-600">
        No posts in this view yet.
      </div>
    );
  }
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {posts.map((p, i) => {
        const isFeature = featureFirst && i === 0;
        return (
          <Reveal key={p.slug} delay={i * 60} className={isFeature ? 'sm:col-span-2' : ''}>
            <Link
              href={`/blog/${p.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden border border-teal-100 shadow-[0_10px_30px_-20px_rgba(15,118,110,0.4)] hover:shadow-[0_22px_44px_-22px_rgba(15,118,110,0.55)] hover:-translate-y-1 transition h-full"
            >
              <div className={`relative ${isFeature ? 'h-72' : 'h-48'} bg-gradient-to-br ${p.tone} overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.25),transparent_55%)]" />
                <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:36px_36px]" />
                <div className="absolute -right-12 -bottom-12 w-56 h-56 rounded-full border border-white/25" />
                <div className="absolute -right-6 -bottom-6 w-40 h-40 rounded-full border border-white/30" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative grid place-items-center w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/15 backdrop-blur-sm border border-white/30 text-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.4)] group-hover:scale-110 transition">
                    <BlogTopicIcon name={p.iconName} size={isFeature ? 56 : 44} className="drop-shadow-[0_8px_15px_rgba(0,0,0,0.25)]" />
                  </div>
                </div>

                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur text-teal-700 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  {p.category}
                </div>
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur text-slate-700 rounded-full px-3 py-1 text-[11px] font-semibold shadow-sm flex items-center gap-1">
                  <CalendarDays size={11} /> {formatDate(p.date)}
                </div>
              </div>
              <div className="p-6 flex flex-col">
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-semibold">
                  <span className="flex items-center gap-1"><User size={11} /> {p.author}</span>
                  <span className="text-teal-300">•</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {p.readMinutes} min read</span>
                </div>
                <h3 className="mt-3 text-lg md:text-xl font-bold text-slate-900 leading-snug group-hover:text-teal-700 transition">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {p.excerpt}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-teal-700 font-bold text-sm">
                  Read More
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
