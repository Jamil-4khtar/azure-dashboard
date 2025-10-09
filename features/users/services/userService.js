import { get, post, patch, put, del } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

// UserService uses apiClient and endpoints
export class UserService {
  static async getAllUsers(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.search) queryParams.append("search", params.search);
    if (params.role) queryParams.append("role", params.role);
    if (params.status) queryParams.append("status", params.status);

    return get(
      `${API_ENDPOINTS.USERS.LIST}?${queryParams.toString()}`
    );
  }

  static async getUserById(id) {
    return get(API_ENDPOINTS.USERS.GET(id));
  }

  static async inviteUser(email, role) {
    return post(API_ENDPOINTS.AUTH.INVITE, { email, role });
  }

  static async createUser(userData) {
    return post(API_ENDPOINTS.USERS.CREATE, userData);
  }

  static async updateUser(id, userData) {
    return put(API_ENDPOINTS.USERS.UPDATE(id), userData);
  }

  static async deleteUser(id) {
    return del(API_ENDPOINTS.USERS.DELETE(id));
  }

  static async toggleUserStatus(id) {
    // Assuming PATCH for status toggle, may need endpoint update
    return patch(`/users/${id}/toggle-status`);
  }

  static async getUserStats() {
    // Replace with API_ENDPOINTS if defined
    return get("/users/stats");
  }
}

export default UserService;
