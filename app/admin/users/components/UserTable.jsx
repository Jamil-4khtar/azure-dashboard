"use client";
import { useState } from "react";
import { UserService } from "@/features/users/userService";

export default function UserTable({ users, onUserUpdate, onUserDelete }) {
  const [loading, setLoading] = useState(null);

  const handleToggleStatus = async (userId) => {
    setLoading(userId);
		console.log(userId)
    try {
      const result = await UserService.toggleUserStatus(userId);
      onUserUpdate(result.data);
    } catch (error) {
      console.error("Error toggling user status:", error);
      alert("Failed to update user status");
    } finally {
      setLoading(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    setLoading(userId);
    try {
      await UserService.deleteUser(userId);
      onUserDelete(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    } finally {
      setLoading(null);
    }
  };

	const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

	return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border rounded-lg overflow-hidden">
        <thead className="bg-gray-600">
          <tr>
            <th className="text-left p-3 border-b font-medium">Name</th>
            <th className="text-left p-3 border-b font-medium">Email</th>
            <th className="text-left p-3 border-b font-medium">Role</th>
            <th className="text-left p-3 border-b font-medium">Status</th>
            <th className="text-left p-3 border-b font-medium">Created</th>
            {/* <th className="text-left p-3 border-b font-medium">Last Login</th> */}
            <th className="text-center p-3 border-b font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user?.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="p-3 border-b">
                <div className="font-medium">{user?.name || 'N/A'}</div>
              </td>
              <td className="p-3 border-b">{user?.email}</td>
              <td className="p-3 border-b">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  user?.role === 'ADMIN' 
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' 
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                }`}>
                  {user?.role}
                </span>
              </td>
              <td className="p-3 border-b">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  user.isActive 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {user?.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="p-3 border-b text-gray-600 dark:text-gray-300">
                {formatDate(user?.createdAt)}
              </td>
              {/* <td className="p-3 border-b text-gray-600 dark:text-gray-300">
                {user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Never'}
              </td> */}
              <td className="p-3 border-b">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    disabled={loading === user.id}
                    className={`px-3 py-1 text-xs rounded ${
                      user.isActive
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
                    } disabled:opacity-50`}
                  >
                    {loading === user.id ? 'Loading...' : (user.isActive ? 'Deactivate' : 'Activate')}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={loading === user.id}
                    className="px-3 py-1 text-xs rounded bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
