// This file is not in use for user management, its just a template I saved.
import { get, post, put, del } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const userService = {
  async getUsers(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `${API_ENDPOINTS.USERS.LIST}?${queryString}` : API_ENDPOINTS.USERS.LIST;
      const response = await get(endpoint);
      return { success: true, users: response.users, pagination: response.pagination };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getUser(id) {
    try {
      const response = await get(API_ENDPOINTS.USERS.GET(id));
      return { success: true, user: response.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async createUser(userData) {
    try {
      const response = await post(API_ENDPOINTS.USERS.CREATE, userData);
      return { success: true, user: response.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async updateUser(id, userData) {
    try {
      const response = await put(API_ENDPOINTS.USERS.UPDATE(id), userData);
      return { success: true, user: response.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async deleteUser(id) {
    try {
      await del(API_ENDPOINTS.USERS.DELETE(id));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
