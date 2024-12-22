import axios, {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { authService } from "./auth/auth-service";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Single request interceptor that handles both token presence and expiration
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = authService.getAccessToken();

    // Skip token check for auth endpoints
    if (
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/refresh") ||
      config.url?.includes("/auth/register") ||
      config.url?.includes("/auth/otp")
    ) {
      console.log(config);
      return config;
    }

    try {
      if (!accessToken) {
        throw new Error("No access token available");
      }

      if (authService.isTokenExpired(accessToken)) {
        const newTokens = await authService.refreshToken();
        config.headers.Authorization = `Bearer ${newTokens.access_token}`;
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      // If there's any error in token handling, redirect to login
      authService.logout();
      console.log(error);
      // if (typeof window !== 'undefined') {
      //   window.location.href = '/authentication/login';
      // }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Simplified response interceptor focusing only on error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig;

    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Handle 401 errors only if they're not from auth endpoints
    if (
      error.response?.status === 401 &&
      originalRequest.url &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      try {
        originalRequest._retry = true;
        const newTokens = await authService.refreshToken();

        // Safely update Authorization header
        if (originalRequest.headers) {
          (originalRequest.headers as AxiosRequestHeaders).Authorization =
            `Bearer ${newTokens.access_token}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        authService.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
