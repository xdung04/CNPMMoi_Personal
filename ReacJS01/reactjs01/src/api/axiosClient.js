// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8888/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 👉 Thêm interceptor nếu cần (token, logging, error handling...)
axiosClient.interceptors.request.use((config) => {
  // Ví dụ: gắn token từ localStorage
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Có thể xử lý lỗi chung ở đây
    return Promise.reject(error);
  }
);

export default axiosClient;
