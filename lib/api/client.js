// lib/api.js
import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      Cookies.remove("auth-token");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    // Optionally: return error.response?.data?.message for a clean error surface
    return Promise.reject(error);
  }
);

// Direct export of HTTP methods; all return promise of .data
export const get = (url, config) => instance.get(url, config);
export const post = (url, data, config) => instance.post(url, data, config);
export const put = (url, data, config) => instance.put(url, data, config);
export const patch = (url, data, config) => instance.patch(url, data, config);
export const del = (url, config) => instance.delete(url, config);

export default instance;
