// services/userService.js
import { get, post, put, patch, del } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints"; // or wherever your constants are

export const UserService = {
  getAllUsers: (params = {}) => get(API_ENDPOINTS.USERS.LIST, { params }),
  getUserById: (id) => get(API_ENDPOINTS.USERS.GET(id)),
  inviteUser: (email, role) => post(API_ENDPOINTS.AUTH.INVITE, { email, role }),
  createUser: (userData) => post(API_ENDPOINTS.USERS.CREATE, userData),
  updateUser: (id, userData) => put(API_ENDPOINTS.USERS.UPDATE(id), userData),
  deleteUser: (id) => del(API_ENDPOINTS.USERS.DELETE(id)),
  toggleUserStatus: (id) => patch(`/users/${id}/toggle-status`),
  getUserStats: () => get("/users/stats"),
};
