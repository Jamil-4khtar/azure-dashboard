import Cookies from "js-cookie";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const getAuthHeaders = () => {
  const token = Cookies.get("auth-token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

console.log(getAuthHeaders());

export class UserService {
  static async getAllUsers(params = {}) {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.search) queryParams.append("search", params.search);
    if (params.role) queryParams.append("role", params.role);
    if (params.status) queryParams.append("status", params.status);

    const url = `${API_BASE_URL}/users?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders(),
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized - redirection to login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        throw new Error("Authentication required");
      }
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    return response.json();
  }

  static async getUserById(id) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        throw new Error("Authentication required");
      }
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    return response.json();
  }

  static async inviteUser(email, role) {
    const response = await fetch(`${API_BASE_URL}/invite`, {
      method: "POST",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify({ email, role }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        throw new Error("Authentication required");
      }

      // Handle specific error messages from the backend
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Failed to send invitation: ${response.statusText}`
      );
    }

    return response.json();
  }

  static async createUser(userData) {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      if (response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        throw new Error("Authentication required");
      }

      // Handle validation errors
      if (response.status === 409) {
        const errorData = await response.json();
        throw new Error(errorData.message || "User already exists");
      }

      throw new Error(`Failed to create user: ${response.statusText}`);
    }

    return response.json();
  }

  static async updateUser(id, userData) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      if (response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        throw new Error("Authentication required");
      }
      throw new Error(`Failed to update user: ${response.statusText}`);
    }

    return response.json();
  }

  static async deleteUser(id) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        throw new Error("Authentication required");
      }
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }

    return response.json();
  }

  static async toggleUserStatus(id) {
    const response = await fetch(`${API_BASE_URL}/users/${id}/toggle-status`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        throw new Error("Authentication required");
      }
      throw new Error(`Failed to toggle user status: ${response.statusText}`);
    }

    return response.json();
  }

  static async getUserStats() {
    const response = await fetch(`${API_BASE_URL}/users/stats`, {
      method: "GET",
      headers: getAuthHeaders(),
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        throw new Error("Authentication required");
      }
      throw new Error(`Failed to fetch user stats: ${response.statusText}`);
    }

    return response.json();
  }
}
