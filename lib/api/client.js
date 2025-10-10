import axios from 'axios';
import Cookies from 'js-cookie';
import { env } from '../config/environment';

const apiClient = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add the auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors, especially 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response.data, // On success, just return the data
  (error) => {
    console.error(`API Error: ${error.config.method?.toUpperCase()} ${error.config.url}`, error);

    if (error.response) {
			// console.log(error.response.config.url)
			// console.log(error.response)
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401 && !error.response.config.url.includes("auth")) {
        // Unauthorized, token might be expired or invalid
        Cookies.remove('auth-token');
        // Redirect to login, preserving the intended destination
        if (typeof window !== 'undefined') {
          const callbackUrl = encodeURIComponent(window.location.pathname + window.location.search);
          window.location.href = `/login?callbackUrl=${callbackUrl}`;
        }
        return Promise.reject(new Error('Authentication required. Redirecting to login.'));
      }
      // Return a structured error from the response
      return Promise.reject(new Error(error.response.data.error));
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject(new Error('Network error: No response received from server.'));
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(new Error(`Request setup error: ${error.message}`));
    }
  }
);

export const get = (url, config) => apiClient.get(url, config);
export const post = (url, data, config) => apiClient.post(url, data, config);
export const put = (url, data, config) => apiClient.put(url, data, config);
export const patch = (url, data, config) => apiClient.patch(url, data, config);
export const del = (url, config) => apiClient.delete(url, config);

export default apiClient;

