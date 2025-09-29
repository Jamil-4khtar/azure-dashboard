"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/Auth/AuthContext";
import { UserService } from "@/features/users/userService";
import SignOutButton from "@/features/Auth/SignOutButton";
import InviteForm from "./components/inviteUser/InviteForm";
import UserTable from "./components/UserTable";
import UserFilters from "./components/UserFilters";
import Pagination from "./components/Pagination";
import UserStats from "./components/UserStats";
import InviteContainer from "./components/inviteUser/InviteContainer";

export default function UsersPage() {
  const { user } = useAuth();
	console.log(user)

  // Redirect if not admin
  // if (user?.role !== "ADMIN") {
		
  //   if (typeof window !== "undefined") {
  //     window.location.href = "/admin";
  //   }
  //   return null;
  // }

  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

	// Handle new user creation - THIS IS THE CALLBACK FUNCTION
  const handleUserCreated = (newUser) => {
    // Option 1: Add the new user to the current list (if it fits the current filters)
    setUsers(prev => [newUser, ...prev]);
    
    // Option 2: Or simply refresh the entire list and stats
    // fetchUsers();
    
    // Always refresh stats to show updated counts
    fetchStats();
  };

  // Handle user updates
  const handleUserUpdate = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    fetchStats(); // Refresh stats
  };

  // Handle user deletion
  const handleUserDelete = (deletedUserId) => {
    setUsers((prev) => prev.filter((user) => user.id !== deletedUserId));
    fetchStats(); // Refresh stats

    // If this was the last user on the page, go to previous page
    if (users.length === 1 && filters.page > 1) {
      setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  if (loading && users.length === 0) {
    return (
      <main className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading users...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <div className="flex items-center space-x-4">
          <InviteContainer 
						loading={loading}
						setLoading={setLoading}
						onUserCreated={handleUserCreated}
					/>
          <SignOutButton />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* User Statistics */}
      {stats && <UserStats stats={stats} />}

      {/* Filters */}
      <UserFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Users Table */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-lg">Loading...</div>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No users found matching your criteria.
        </div>
      ) : (
        <>
          <UserTable
            users={users}
            onUserUpdate={handleUserUpdate}
            onUserDelete={handleUserDelete}
          />

          {/* Pagination */}
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </>
      )}
    </main>
  );
}
