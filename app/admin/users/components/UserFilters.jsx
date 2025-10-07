"use client";
import { HiOutlineSearch, HiOutlineFilter, HiOutlineX } from "react-icons/hi";
import { useState } from "react";

export default function UserFilters({ filters, onFilterChange }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value,
      page: 1, // Reset to first page when filtering
    });
  };

  const clearFilters = () => {
    onFilterChange({
      page: 1,
      limit: filters.limit || 10,
      search: "",
      role: "",
      status: "",
    });
  };

  const hasActiveFilters = filters.search || filters.role || filters.status;

  return (
    <div
      className="p-4 md:p-6 rounded-lg border bg-[var(--surface)]/50"
      style={{
        borderColor: "var(--border)",
      }}
    >
      {/* Main Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
        <div className="relative flex-1 max-w-md">
          <HiOutlineSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            style={{ color: "var(--text-muted)" }}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={filters.search || ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border)",
              color: "var(--text)",
              focusRingColor: "var(--primary)",
            }}
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center space-x-2 px-3 py-2 border rounded-lg transition-colors ${
              showAdvanced ? 'ring-2' : ''
            }`}
            style={{
              borderColor: "var(--border)",
              backgroundColor: showAdvanced ? "var(--primary)/10" : "var(--bg)",
              color: showAdvanced ? "var(--primary)" : "var(--text-muted)",
              ...(showAdvanced && { ringColor: "var(--primary)/30" }),
            }}
          >
            <HiOutlineFilter className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-3 py-2 border rounded-lg transition-colors"
              style={{
                borderColor: "var(--error)/50",
                backgroundColor: "var(--error)/10",
                color: "var(--error)",
              }}
            >
              <HiOutlineX className="w-4 h-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
          {/* Role Filter */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text)" }}
            >
              Role
            </label>
            <select
              value={filters.role || ""}
              onChange={(e) => handleFilterChange("role", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              <option value="">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="EDITOR">Editor</option>
              <option value="VIEWER">Viewer</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text)" }}
            >
              Status
            </label>
            <select
              value={filters.status || ""}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Items per page */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text)" }}
            >
              Items per page
            </label>
            <select
              value={filters.limit || 10}
              onChange={(e) =>
                handleFilterChange("limit", parseInt(e.target.value))
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              <option value={5}>5 items</option>
              <option value={10}>10 items</option>
              <option value={25}>25 items</option>
              <option value={50}>50 items</option>
            </select>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Active filters:
            </span>
            
            {filters.search && (
              <span
                className="inline-flex items-center px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--primary)/10",
                  color: "var(--primary)",
                }}
              >
                Search: "{filters.search}"
              </span>
            )}
            
            {filters.role && (
              <span
                className="inline-flex items-center px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--primary)/10",
                  color: "var(--primary)",
                }}
              >
                Role: {filters.role}
              </span>
            )}
            
            {filters.status && (
              <span
                className="inline-flex items-center px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--primary)/10",
                  color: "var(--primary)",
                }}
              >
                Status: {filters.status}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
