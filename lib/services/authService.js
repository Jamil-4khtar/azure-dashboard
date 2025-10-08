import { get, post } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import Cookies from 'js-cookie';

export const authService = {
  async login(email, password) {
    try {
      const response = await post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
      
      if (response.token) {
        // Store token in cookie (following your existing pattern)
        Cookies.set('auth-token', response.token, { 
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
      }
      
      return { success: true, user: response.user, token: response.token };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async register(invite, name, password) {
    try {
      const response = await post(API_ENDPOINTS.AUTH.REGISTER, { 
        token: invite, 
        name, 
        password 
      });
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getCurrentUser() {
    try {
      const response = await get(API_ENDPOINTS.AUTH.ME);
      return { success: true, user: response.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async forgotPassword(email) {
    try {
      const response = await post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async resetPassword(token, password) {
    try {
      const response = await post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, password });
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  logout() {
    Cookies.remove('auth-token');
  },
};
