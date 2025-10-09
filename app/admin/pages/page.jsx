"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  HiOutlineDocument,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineDuplicate,
  HiOutlineDownload,
  HiOutlineUpload,
  HiOutlineDotsVertical,
  HiOutlineCheck,
  HiOutlineClock,
  HiOutlineArchive,
  HiOutlineGlobe,
  HiOutlineX,
  HiOutlineChevronDown,
} from "react-icons/hi";
import DashboardHeader from "../../../components/layout/DashboardHeader";
import PageStats from "./components/PageStats";
import BulkActions from "./components/BulkActions";
import StatusBadge from "./components/StatusBadge";
import SearchAndFilters from "./components/SearchAndFilters";
import PagesTable from "./components/PagesTable";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import PaginationControls from "./components/PaginationControls";

export default function PagesManagement() {
  // State management
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPages, setSelectedPages] = useState([]);
  const [bulkActionOpen, setBulkActionOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mock data - Replace with API calls
  const mockPages = [
    {
      id: 1,
      title: "About Us",
      slug: "/about",
      status: "published",
      author: {
        name: "John Doe",
        avatar: "/avatars/john.jpg",
      },
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-20T14:45:00Z",
      publishedAt: "2024-01-16T09:00:00Z",
      views: 1250,
      wordCount: 850,
      seoScore: 85,
      featured: true,
    },
    {
      id: 2,
      title: "Contact Page",
      slug: "/contact",
      status: "draft",
      author: {
        name: "Jane Smith",
        avatar: "/avatars/jane.jpg",
      },
      createdAt: "2024-01-18T16:20:00Z",
      updatedAt: "2024-01-22T11:30:00Z",
      publishedAt: null,
      views: 0,
      wordCount: 420,
      seoScore: 65,
      featured: false,
    },
    // Add more mock data as needed
  ];

  // Load pages on component mount
  useEffect(() => {
    const loadPages = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setPages(mockPages);
      } catch (error) {
        console.error("Failed to load pages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  // Filter and sort logic
  const filteredPages = React.useMemo(() => {
    let filtered = pages.filter((page) => {
      const matchesSearch =
        !searchTerm ||
        page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.author.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || page.status === statusFilter;
      const matchesAuthor =
        authorFilter === "all" || page.author.name === authorFilter;

      return matchesSearch && matchesStatus && matchesAuthor;
    });

    // Sort logic
    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "updatedAt":
        default:
          aValue = new Date(a.updatedAt);
          bValue = new Date(b.updatedAt);
          break;
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [pages, searchTerm, statusFilter, authorFilter, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
  const paginatedPages = filteredPages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Event handlers
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedPages(paginatedPages.map((p) => p.id));
    } else {
      setSelectedPages([]);
    }
  };

  const handleSelectPage = (pageId, checked) => {
    if (checked) {
      setSelectedPages([...selectedPages, pageId]);
    } else {
      setSelectedPages(selectedPages.filter((id) => id !== pageId));
    }
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--text)] flex items-center gap-2">
                <HiOutlineDocument className="w-8 h-8 text-[var(--primary)]" />
                Pages Management
              </h1>
              <p className="text-[var(--text-muted)] mt-1">
                Create, edit, and manage your website pages
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/pages/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-contrast)] rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                <HiOutlinePlus className="w-4 h-4" />
                Create Page
              </Link>
            </div>
          </div>
        </div>

        {/* Components will be rendered here */}
        <PageStats pages={pages} />
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          authorFilter={authorFilter}
          setAuthorFilter={setAuthorFilter}
          setDateFilter={setDateFilter}
        />

        {selectedPages.length > 0 && (
          <BulkActions
            selectedCount={selectedPages.length}
            onBulkAction={(action) => console.log("Bulk action:", action)}
          />
        )}

        <PagesTable
          pages={paginatedPages}
          loading={loading}
          selectedPages={selectedPages}
          onSelectAll={handleSelectAll}
          onSelectPage={handleSelectPage}
          onSort={(column) => {
            if (sortBy === column) {
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            } else {
              setSortBy(column);
              setSortOrder("desc");
            }
          }}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />

        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>
    </div>
  );
}
