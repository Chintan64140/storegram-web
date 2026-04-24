'use client';

export default function PaginationControls({
  pagination,
  onPageChange,
  onLimitChange,
  limitOptions = [10, 20, 50],
}) {
  if (!pagination) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-border bg-surface/60 p-4 md:flex-row md:items-center md:justify-between">
      <div className="text-sm text-muted">
        Page {pagination.page} of {pagination.totalPages} · {pagination.totalItems} items
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <label className="text-sm text-muted">Rows:</label>
        <select
          className="input w-full sm:min-w-24 sm:w-auto"
          value={pagination.limit}
          onChange={(event) => onLimitChange?.(Number(event.target.value))}
        >
          {limitOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onPageChange?.(pagination.page - 1)}
          disabled={!pagination.hasPrevPage}
          style={{ opacity: pagination.hasPrevPage ? 1 : 0.5 }}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onPageChange?.(pagination.page + 1)}
          disabled={!pagination.hasNextPage}
          style={{ opacity: pagination.hasNextPage ? 1 : 0.5 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
