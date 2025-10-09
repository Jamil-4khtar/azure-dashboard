import Cookies from "js-cookie";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getAuthToken() {
    return Cookies.get("auth-token");
  }

  getHeaders(customHeaders = {}) {
    const token = this.getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      ...customHeaders,
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL.replace(/\/+$/, "")}/${endpoint.replace(
      /^\/+/,
      ""
    )}`;
    const config = {
      ...options,
      headers: this.getHeaders(options.headers),
      credentials: "include",
    };

    try {
      const response = await fetch(url, config);
      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { error: text };
      }

      if (!response.ok) {
        if (response.status === 401) {
          Cookies.remove("auth-token");
          window.location.href = "/login";
          throw new Error("Authentication required");
        }
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(
        `API Error [${config.method || "GET"}] ${endpoint}:`,
        error
      );
      throw error;
    }
  }

  // Arrow functions to preserve 'this' binding
  get = async (endpoint, options = {}) => {
    return this.request(endpoint, { ...options, method: "GET" });
  };

  post = async (endpoint, data = null, options = {}) => {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: data != null ? JSON.stringify(data) : undefined,
    });
  };

  put = async (endpoint, data = null, options = {}) => {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: data != null ? JSON.stringify(data) : undefined,
    });
  };

  patch = async (endpoint, data = null, options = {}) => {
    return this.request(endpoint, {
      ...options,
      method: "PATCH",
      body: data != null ? JSON.stringify(data) : undefined,
    });
  };

  delete = async (endpoint, options = {}) => {
    return this.request(endpoint, { ...options, method: "DELETE" });
  };
}

const apiClient = new ApiClient();
export const { get, post, put, patch, delete: del } = apiClient;
export default apiClient;
