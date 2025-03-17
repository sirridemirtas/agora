import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "@/config/api.config";

// Track pending requests
let pendingRequests = 0;
const subscribers: Array<(isLoading: boolean) => void> = [];

// Function to notify subscribers when loading state changes
const notifySubscribers = () => {
  const isLoading = pendingRequests > 0;
  subscribers.forEach((callback) => callback(isLoading));
};

// Create axios instance with default configurations
const axiosInstance: AxiosInstance = axios.create({
  headers: API_CONFIG.headers,
  timeout: 30000, // 30 seconds
  withCredentials: true, //process.env.NODE_ENV === "production" ? true : false,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Increment counter when a request starts
    pendingRequests++;
    notifySubscribers();
    // You can add auth tokens or other logic here
    return config;
  },
  (error) => {
    // Decrement counter even if request preparation fails
    pendingRequests = Math.max(0, pendingRequests - 1);
    notifySubscribers();
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Decrement counter when a response is received
    pendingRequests = Math.max(0, pendingRequests - 1);
    notifySubscribers();
    return response;
  },
  (error) => {
    // Decrement counter even if request fails
    pendingRequests = Math.max(0, pendingRequests - 1);
    notifySubscribers();
    // Handle errors globally
    return Promise.reject(error);
  }
);

// API to check if there are any pending requests
export const isApiLoading = () => pendingRequests > 0;

// API to subscribe to loading state changes
export const subscribeToApiLoading = (
  callback: (isLoading: boolean) => void
) => {
  subscribers.push(callback);
  // Return unsubscribe function
  return () => {
    const index = subscribers.indexOf(callback);
    if (index !== -1) subscribers.splice(index, 1);
  };
};

// Export the axios instance
export default axiosInstance;
