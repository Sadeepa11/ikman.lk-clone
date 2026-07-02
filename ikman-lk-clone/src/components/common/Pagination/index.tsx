import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  total?: number;
  perPage?: number;
}

export const Pagination = ({ page, totalPages, onPageChange, total, perPage }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const start = total && perPage ? (page - 1) * perPage + 1 : undefined;
  const end = total && perPage ? Math.min(page * perPage, total) : undefined;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {total !== undefined && start !== undefined && end !== undefined && (
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-700">{start}–{end}</span> of{' '}
          <span className="font-medium text-slate-700">{total.toLocaleString()}</span> listings
        </p>
      )}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-600"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPages().map((p, i) => (
          p === '...' ? (
            <span key={`dots-${i}`} className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={clsx(
                'w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors',
                page === p
                  ? 'bg-[#149777] text-white border border-[#149777]'
                  : 'border border-slate-200 hover:border-[#149777]/50 hover:text-[#149777] hover:bg-[#e8f7f4] text-slate-600'
              )}
            >
              {p}
            </button>
          )
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-600"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
