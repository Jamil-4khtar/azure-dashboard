"use client";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function Pagination({ pagination, onPageChange }) {
  const { currentPage, totalPages, hasNext, hasPrev, total } = pagination;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if needed
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }

    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Page Info */}
      <div className="text-sm" style={{ color: "var(--text-muted)" }}>
        Showing <span style={{ color: "var(--text)" }} className="font-medium">{((currentPage - 1) * 10) + 1}</span> to{" "}
        <span style={{ color: "var(--text)" }} className="font-medium">{Math.min(currentPage * 10, total)}</span> of{" "}
        <span style={{ color: "var(--text)" }} className="font-medium">{total}</span> results
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev}
          className="flex items-center space-x-1 px-3 py-2 border rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
            color: hasPrev ? "var(--text)" : "var(--text-muted)",
          }}
        >
          <HiOutlineChevronLeft className="w-4 h-4" />
          <span className="hidden sm:block">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' ? onPageChange(page) : null}
              disabled={page === '...'}
              className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
                page === currentPage
                  ? 'ring-2'
                  : 'hover:bg-[var(--hover)]'
              }`}
              style={{
                borderColor: page === currentPage ? "var(--primary)" : "var(--border)",
                backgroundColor: page === currentPage ? "var(--primary)" : "var(--surface)",
                color: page === currentPage ? "white" : "var(--text)",
                ...(page === currentPage && { ringColor: "var(--primary)/30" }),
                ...(page === '...' && { cursor: 'default', opacity: 0.5 }),
              }}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          className="flex items-center space-x-1 px-3 py-2 border rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
            color: hasNext ? "var(--text)" : "var(--text-muted)",
          }}
        >
          <span className="hidden sm:block">Next</span>
          <HiOutlineChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
