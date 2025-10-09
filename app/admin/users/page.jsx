"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/Auth/components/AuthGuard";
import { UserService } from "@/features/users/services/userService";
import DashboardHeader from "../../../components/layout/DashboardHeader";
import InviteContainer from "./components/inviteUser/InviteContainer";
import UserTable from "./components/UserTable";
import UserFilters from "./components/UserFilters";
import Pagination from "./components/Pagination";
import UserStats from "./components/UserStats";
import { HiOutlineUsers, HiOutlineRefresh } from "react-icons/hi";

export default function UsersPage() {
  const { user } = useAuth();

  // Redirect if not admin
  if (user?.role !== "ADMIN") {
    if (typeof window !== "undefined") {
      window.location.href = "/admin";
    }
    return null;
  }

  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    role: "",
    status: "",
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await UserService.getAllUsers(filters);

      if (result.success) {
        setUsers(result.data);
        setPagination(result.pagination);
      } else {
        setError("Failed to fetch users");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user statistics
  const fetchStats = async () => {
    try {
      const result = await UserService.getUserStats();
      if (result.success) {
        setStats(result.data);
      }
    } catch (err) {
      console.error("Error fetching user stats:", err);
    }
  };

  // Refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchUsers(), fetchStats()]);
    setRefreshing(false);
  };

  // Initial data fetch
  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  // Handle new user creation
  const handleUserCreated = (newUser) => {
    setUsers((prev) => [newUser, ...prev]);
    fetchStats();
  };

  // Handle user updates
  const handleUserUpdate = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    fetchStats();
  };

  // Handle user deletion
  const handleUserDelete = (deletedUserId) => {
    setUsers((prev) => prev.filter((user) => user.id !== deletedUserId));
    fetchStats();

    if (users.length === 1 && filters.page > 1) {
      setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: "var(--primary)/10" }}
              >
                <HiOutlineUsers
                  className="w-6 h-6"
                  style={{ color: "var(--primary)" }}
                />
              </div>
              <div>
                <h1
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: "var(--text)" }}
                >
                  Users Management
                </h1>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Manage your team members and their permissions
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors disabled:opacity-50"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                  backgroundColor: "var(--surface)",
                }}
              >
                <HiOutlineRefresh
                  className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </button>

              <InviteContainer
                loading={loading}
                setLoading={setLoading}
                onUserCreated={handleUserCreated}
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="mb-6 p-4 rounded-lg border"
            style={{
              backgroundColor: "var(--error)/10",
              borderColor: "var(--error)/20",
              color: "var(--error)",
            }}
          >
            <div className="flex items-center space-x-2">
              <span className="font-medium">Error:</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* User Statistics */}
        {stats && (
          <div className="mb-6 md:mb-8">
            <UserStats stats={stats} />
          </div>
        )}

        {/* Filters */}
        <div className="mb-6">
          <UserFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Users Content */}
        <div
          className="rounded-lg border overflow-hidden bg-[var(--surface)]/50"
          style={{
            borderColor: "var(--border)",
          }}
        >
          {loading && users.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div
                  className="inline-block w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin mb-3"
                  style={{ color: "var(--primary)" }}
                ></div>
                <div style={{ color: "var(--text-muted)" }}>
                  Loading users...
                </div>
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <HiOutlineUsers
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: "var(--text-muted)" }}
              />
              <h3
                className="text-lg font-medium mb-2"
                style={{ color: "var(--text)" }}
              >
                No users found
              </h3>
              <p style={{ color: "var(--text-muted)" }}>
                {filters.search || filters.role || filters.status
                  ? "No users match your current filters."
                  : "Get started by inviting your first team member."}
              </p>
            </div>
          ) : (
            <>
              <UserTable
                users={users}
                onUserUpdate={handleUserUpdate}
                onUserDelete={handleUserDelete}
                loading={loading}
              />

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div
                  className="px-6 py-4 border-t"
                  style={{ borderColor: "var(--border)" }}
                >
                  <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Info */}
        <div
          className="mt-6 text-center text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          {users.length > 0 && (
            <p>
              Showing {(pagination.currentPage - 1) * filters.limit + 1} to{" "}
              {Math.min(
                pagination.currentPage * filters.limit,
                pagination.total
              )}{" "}
              of {pagination.total} users
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
