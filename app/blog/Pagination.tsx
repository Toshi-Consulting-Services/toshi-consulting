import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  basePath = '/blog',
}: {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const href = (n: number) => (n === 1 ? basePath : `${basePath}/page/${n}`);

  return (
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          href={href(currentPage - 1)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 transition font-semibold text-sm"
        >
          <ArrowLeft size={14} /> Previous
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-50/50 text-slate-400 border border-blue-100 font-semibold text-sm">
          <ArrowLeft size={14} /> Previous
        </span>
      )}

      {pages.map((n) =>
        n === currentPage ? (
          <span key={n} className="inline-grid place-items-center w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 text-white font-bold text-sm shadow-[0_10px_22px_-10px_rgba(0,101,248,0.7)]">
            {n}
          </span>
        ) : (
          <Link key={n} href={href(n)} className="inline-grid place-items-center w-10 h-10 rounded-full bg-white text-slate-700 border border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition font-bold text-sm">
            {n}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link
          href={href(currentPage + 1)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 transition font-semibold text-sm"
        >
          Next <ArrowRight size={14} />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-50/50 text-slate-400 border border-blue-100 font-semibold text-sm">
          Next <ArrowRight size={14} />
        </span>
      )}
    </nav>
  );
}
