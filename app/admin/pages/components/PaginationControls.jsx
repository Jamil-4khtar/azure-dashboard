"use client";

import React from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";

export default function PaginationControls({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  const PageButton = ({ page, isActive = false, disabled = false, onClick }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 py-2 text-sm font-medium rounded-lg transition-colors
        ${isActive 
          ? 'bg-[var(--primary)] text-[var(--primary-contrast)]' 
          : disabled
          ? 'text-[var(--text-muted)] cursor-not-allowed'
          : 'text-[var(--text)] hover:bg-[var(--hover)]'
        }
      `}
    >
      {page}
    </button>
  );

  const NavigationButton = ({ onClick, disabled, children, title }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded-lg transition-colors
        ${disabled 
          ? 'text-[var(--text-muted)] cursor-not-allowed' 
          : 'text-[var(--text)] hover:bg-[var(--hover)]'
        }
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-[var(--surface)] border-t border-[var(--border)] px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Items per page and info */}
        <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <label htmlFor="itemsPerPage">Show:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => {
                onItemsPerPageChange(Number(e.target.value));
                onPageChange(1); // Reset to first page when changing items per page
              }}
              className="px-2 py-1 bg-[var(--bg)] border border-[var(--border)] rounded text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          
          <span>
            Showing {startItem} to {endItem} of {totalItems} pages
          </span>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-1">
          {/* First page */}
          <NavigationButton
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            title="First page"
          >
            <HiOutlineChevronDoubleLeft className="w-4 h-4" />
          </NavigationButton>

          {/* Previous page */}
          <NavigationButton
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title="Previous page"
          >
            <HiOutlineChevronLeft className="w-4 h-4" />
          </NavigationButton>

          {/* Page numbers */}
          <div className="flex items-center gap-1 mx-2">
            {visiblePages.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-[var(--text-muted)]">...</span>
                ) : (
                  <PageButton
                    page={page}
                    isActive={page === currentPage}
                    onClick={() => onPageChange(page)}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next page */}
          <NavigationButton
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="Next page"
          >
            <HiOutlineChevronRight className="w-4 h-4" />
          </NavigationButton>

          {/* Last page */}
          <NavigationButton
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            title="Last page"
          >
            <HiOutlineChevronDoubleRight className="w-4 h-4" />
          </NavigationButton>
        </div>
      </div>
    </div>
  );
}
