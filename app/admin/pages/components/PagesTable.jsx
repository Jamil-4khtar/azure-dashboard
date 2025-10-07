"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineDuplicate,
  HiOutlineDotsVertical,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineGlobe,
} from "react-icons/hi";
import StatusBadge from "./StatusBadge";

export default function PagesTable({
  pages,
  loading,
  selectedPages,
  onSelectAll,
  onSelectPage,
  onSort,
  sortBy,
  sortOrder,
  onDeletePage,
  onDuplicatePage,
}) {
  const [dropdownOpen, setDropdownOpen] = useState({});

  const toggleDropdown = (pageId) => {
    setDropdownOpen(prev => ({
      ...prev,
      [pageId]: !prev[pageId]
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatViews = (views) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  const SortButton = ({ column, children }) => (
    <button
      onClick={() => onSort(column)}
      className="flex items-center gap-1 text-left font-medium text-[var(--text)] hover:text-[var(--primary)] transition-colors"
    >
      {children}
      {sortBy === column && (
        sortOrder === "asc" ? 
        <HiOutlineChevronUp className="w-4 h-4" /> : 
        <HiOutlineChevronDown className="w-4 h-4" />
      )}
    </button>
  );

  if (loading) {
    return (
      <div className="bg-[var(--surface)]/50 rounded-lg border border-[var(--border)] p-8">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-[var(--bg-muted)] rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-x-auto bg-[var(--surface)]/50 border-[var(--border)]">
      <table className="w-full ">
        <thead className="bg-[var(--bg-muted)]/80 border-b border-[var(--border)]">
          <tr>
            <th className="w-12 px-4 py-3">
              <input
                type="checkbox"
                checked={selectedPages.length === pages.length && pages.length > 0}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
              />
            </th>
            <th className="px-4 py-3 text-left">
              <SortButton column="title">Title</SortButton>
            </th>
            <th className="px-4 py-3 text-left">
              <SortButton column="status">Status</SortButton>
            </th>
            <th className="px-4 py-3 text-left">
              <SortButton column="author">Author</SortButton>
            </th>
            <th className="px-4 py-3 text-left">
              <SortButton column="views">Views</SortButton>
            </th>
            <th className="px-4 py-3 text-left">
              <SortButton column="updatedAt">Last Modified</SortButton>
            </th>
            <th className="w-20 px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr
              key={page.id}
              className="border-b border-[var(--border)] hover:bg-[var(--hover)] transition-colors"
            >
              <td className="px-4 py-4">
                <input
                  type="checkbox"
                  checked={selectedPages.includes(page.id)}
                  onChange={(e) => onSelectPage(page.id, e.target.checked)}
                  className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
              </td>
              <td className="px-4 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-[var(--text)]">
                      {page.title}
                    </h3>
                    {page.featured && (
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mt-1 font-mono">
                    {page.slug}
                  </p>
                </div>
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={page.status} />
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center text-[var(--primary-contrast)] text-sm font-medium">
                    {page.author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm text-[var(--text)]">
                    {page.author.name}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm text-[var(--text)]">
                  {formatViews(page.views)}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm text-[var(--text-muted)]">
                  {formatDate(page.updatedAt)}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(page.id)}
                    className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] rounded transition-colors"
                  >
                    <HiOutlineDotsVertical className="w-5 h-5" />
                  </button>
                  
                  {dropdownOpen[page.id] && (
                    <div className="absolute right-0 top-8 w-48 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-lg z-10">
                      <div className="py-1">
                        <Link
                          href={page.slug}
                          target="_blank"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--hover)] transition-colors"
                        >
                          <HiOutlineEye className="w-4 h-4" />
                          View Page
                        </Link>
                        <Link
                          href={`/admin/pages/${page.id}/edit`}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--hover)] transition-colors"
                        >
                          <HiOutlinePencil className="w-4 h-4" />
                          Edit
                        </Link>
                        <button
                          onClick={() => onDuplicatePage(page)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--hover)] transition-colors"
                        >
                          <HiOutlineDuplicate className="w-4 h-4" />
                          Duplicate
                        </button>
                        <hr className="my-1 border-[var(--border)]" />
                        <button
                          onClick={() => onDeletePage(page)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[var(--error)] hover:bg-red-50 transition-colors"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
