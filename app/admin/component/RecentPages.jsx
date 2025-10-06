"use client"

import Link from "next/link";
import { HiOutlineEye, HiOutlinePencil } from "react-icons/hi";

export default function RecentPages({ pages }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return { bg: '#dcfce7', text: '#16a34a', darkBg: 'rgba(22, 163, 74, 0.1)', darkText: '#4ade80' };
      case 'draft':
        return { bg: '#fef3c7', text: '#d97706', darkBg: 'rgba(217, 119, 6, 0.1)', darkText: '#fbbf24' };
      case 'archived':
        return { bg: '#f3f4f6', text: '#6b7280', darkBg: 'rgba(107, 114, 128, 0.1)', darkText: '#9ca3af' };
      default:
        return { bg: '#f3f4f6', text: '#6b7280', darkBg: 'rgba(107, 114, 128, 0.1)', darkText: '#9ca3af' };
    }
  };

  return (
    <div 
      className="rounded-lg p-6 border bg-[var(--surface)]/50 border-[var(--border)] shadow-[var(--shadow-sm)]"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 
          className="text-lg font-semibold"
          style={{ color: 'var(--text)' }}
        >
          Recent Pages
        </h3>
        <Link 
          href="/admin/pages"
          className="text-sm hover:opacity-80"
          style={{ color: 'var(--primary)' }}
        >
          View all
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr style={{ borderBottomColor: 'var(--border)' }} className="border-b">
              <th 
                className="text-left text-xs font-medium uppercase tracking-wider py-3"
                style={{ color: 'var(--text-muted)' }}
              >
                Page
              </th>
              <th 
                className="text-left text-xs font-medium uppercase tracking-wider py-3"
                style={{ color: 'var(--text-muted)' }}
              >
                Status
              </th>
              <th 
                className="text-left text-xs font-medium uppercase tracking-wider py-3"
                style={{ color: 'var(--text-muted)' }}
              >
                Author
              </th>
              <th 
                className="text-left text-xs font-medium uppercase tracking-wider py-3"
                style={{ color: 'var(--text-muted)' }}
              >
                Modified
              </th>
              <th 
                className="text-right text-xs font-medium uppercase tracking-wider py-3"
                style={{ color: 'var(--text-muted)' }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page, index) => {
              const statusColors = getStatusColor(page.status);
              
              return (
                <tr 
                  key={page.id} 
                  className="transition-colors"
                  style={{ 
                    borderBottomColor: index < pages.length - 1 ? 'var(--border)' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td className="py-4">
                    <div>
                      <div 
                        className="text-sm font-medium"
                        style={{ color: 'var(--text)' }}
                      >
                        {page.title}
                      </div>
                      <div 
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {page.slug}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span 
                      className="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: document.documentElement.getAttribute('data-theme') === 'dark' 
                          ? statusColors.darkBg 
                          : statusColors.bg,
                        color: document.documentElement.getAttribute('data-theme') === 'dark' 
                          ? statusColors.darkText 
                          : statusColors.text
                      }}
                    >
                      {page.status}
                    </span>
                  </td>
                  <td 
                    className="py-4 text-sm"
                    style={{ color: 'var(--text)' }}
                  >
                    {page.author}
                  </td>
                  <td 
                    className="py-4 text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {page.lastModified}
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-muted)';
                        }}
                      >
                        <HiOutlineEye className="w-4 h-4" />
                      </button>
                      <button 
                        className="transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-muted)';
                        }}
                      >
                        <HiOutlinePencil className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
