// API endpoint constants
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/forgot-password',
    FORGOT_RESEND_PASS: '/forgot-password/resend',
    RESET_PASSWORD: '/reset-password',
		INVITE: "/invite"
  },
  
  // User endpoints
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    GET: (id) => `/users/${id}`,
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },
  
  // Editor/CMS endpoints
  EDITOR: {
    PAGES: '/editor/pages',
    SAVE: '/editor/save',
    PUBLISH: '/editor/publish',
  },
  
  // Dashboard endpoints
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ANALYTICS: '/dashboard/analytics',
  },
};
