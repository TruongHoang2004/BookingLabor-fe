import axios from "axios";

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Base URL của API
  timeout: 10000, // Thời gian timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho request
axiosInstance.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu cần
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi toàn cục, ví dụ: lỗi 401 hoặc 500
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
