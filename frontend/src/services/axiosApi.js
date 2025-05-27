import axios from "axios";

// Get token safely on the client-side
const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

// Create Axios instance
export const instance = axios.create({
  baseURL: "https://click-url.onrender.com",
  headers: {
    "Content-Type": "application/json",
    "Authorization": accessToken ? `Bearer ${accessToken}` : "",
    "Accept": "*/*",
  },
});

// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Correctly retrieve the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized. Redirect to login.");
        // optional: redirect to login
      }
      if (error.response.status === 500) {
        console.error("Server Error");
      }
    }
    return Promise.reject(error);
  }
);
