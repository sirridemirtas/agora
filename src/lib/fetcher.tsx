import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "@/config/api.config";

// Create axios instance with default configurations
const axiosInstance: AxiosInstance = axios.create({
  headers: API_CONFIG.headers,
  timeout: 30000, // 30 seconds
  withCredentials: true, //process.env.NODE_ENV === "production" ? true : false,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth tokens or other logic here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

// Export the axios instance
export default axiosInstance;
