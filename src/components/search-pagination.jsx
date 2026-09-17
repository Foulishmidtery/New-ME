"use client";

export function SearchPagination({ query, onQueryChange, page, totalPages, onPageChange }) {
  return (
    <div className="cms-list-tools">
      <label>
        <span className="sr-only">Cari data</span>
        <input type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Cari data..." />
      </label>
      {totalPages > 1 ? (
        <nav aria-label="Pagination" className="cms-pagination">
          <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Sebelumnya</button>
          <span>Halaman {page} dari {totalPages}</span>
          <button type="button" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Berikutnya</button>
        </nav>
      ) : null}
    </div>
  );
}
