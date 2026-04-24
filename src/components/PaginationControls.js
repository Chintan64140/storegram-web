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
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        Page {pagination.page} of {pagination.totalPages} · {pagination.totalItems} items
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Rows:</label>
        <select className="input" style={{ width: 'auto', padding: '0.5rem 0.75rem' }} value={pagination.limit} onChange={(event) => onLimitChange?.(Number(event.target.value))}>
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

