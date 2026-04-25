'use client';
import { useState, useEffect } from 'react';
import { ChevronFirst, ChevronLeft, ChevronRight, ChevronLast } from 'lucide-react';

export default function PaginationControls({
  pagination,
  onPageChange,
  onLimitChange,
  limitOptions = [10, 20, 25, 50, 100],
}) {
  const [inputPage, setInputPage] = useState('');

  useEffect(() => {
    if (pagination) {
      setInputPage(pagination.page.toString());
    }
  }, [pagination]);

  if (!pagination) return null;

  const { page, limit, totalItems, totalPages, hasPrevPage, hasNextPage } = pagination;
  const startItem = totalItems === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalItems);

  const handlePageSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      let p = parseInt(inputPage, 10);
      if (isNaN(p) || p < 1) p = 1;
      if (p > totalPages) p = totalPages;
      setInputPage(p.toString());
      if (p !== page) onPageChange?.(p);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-4 text-sm text-muted">
      
      {/* Left side */}
      <div className="flex items-center gap-3 flex-wrap">
        <span>Items per page</span>
        <select
          className="border border-border rounded-md px-2 py-1 bg-surface text-foreground outline-none"
          value={limit}
          onChange={(e) => {
            onLimitChange?.(Number(e.target.value));
          }}
        >
          {limitOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <span>{startItem}–{endItem} of {totalItems} items</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
        <button
          onClick={() => onPageChange?.(1)}
          disabled={!hasPrevPage}
          className={`p-1 flex items-center justify-center transition-colors ${hasPrevPage ? 'text-accent hover:bg-accent/10 rounded cursor-pointer' : 'text-muted/50 cursor-not-allowed'}`}
          title="First page"
        >
          <ChevronFirst size={18} />
        </button>

        <button
          onClick={() => onPageChange?.(page - 1)}
          disabled={!hasPrevPage}
          className={`flex items-center gap-1 px-2 py-1 transition-colors ${hasPrevPage ? 'text-accent hover:bg-accent/10 rounded cursor-pointer' : 'text-muted/50 cursor-not-allowed'}`}
        >
          <ChevronLeft size={18} /> Previous
        </button>

        <input
          type="text"
          className="border border-border rounded-md w-10 text-center py-1 bg-surface outline-none mx-1 text-foreground"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          onKeyDown={handlePageSubmit}
          onBlur={handlePageSubmit}
        />
        <span className="mx-1">of {totalPages}</span>

        <button
          onClick={() => onPageChange?.(page + 1)}
          disabled={!hasNextPage}
          className={`flex items-center gap-1 px-2 py-1 transition-colors ${hasNextPage ? 'text-accent hover:bg-accent/10 rounded cursor-pointer' : 'text-muted/50 cursor-not-allowed'}`}
        >
          Next <ChevronRight size={18} />
        </button>

        <button
          onClick={() => onPageChange?.(totalPages)}
          disabled={!hasNextPage}
          className={`p-1 flex items-center justify-center transition-colors ${hasNextPage ? 'text-accent hover:bg-accent/10 rounded cursor-pointer' : 'text-muted/50 cursor-not-allowed'}`}
          title="Last page"
        >
          <ChevronLast size={18} />
        </button>
      </div>

    </div>
  );
}
