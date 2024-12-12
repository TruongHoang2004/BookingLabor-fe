import { TokenResponse, LoginRequest, LoginResponse } from "@/interface/auth";
import { setCredentials, logout, loginFailure } from "@/redux/slices/authSlice";
import { store } from "@/redux/store";
import axios from "axios";
import api from "../config";
import toast from "react-hot-toast";

class AuthService {
  private refreshPromise: Promise<TokenResponse> | null = null;

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>(
        "/auth/login",
        JSON.stringify(credentials)
      );
      const { access_token, refresh_token, user } = response.data;
      toast.success("Đăng nhập thành công");
      // this.setTokens(access_token, refresh_token);
      store.dispatch(
        setCredentials({
          user,
          access_token,
          refresh_token,
        })
      );

      return response.data;
    } catch (error) {
      console.log(error);
      this.handleAuthError(error);
      throw error;
    }
  }

  async refreshToken(): Promise<TokenResponse> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    this.refreshPromise = api
      .post<TokenResponse>("/auth/refresh", { refreshToken })
      .then((response) => {
        const { access_token, refresh_token } = response.data;
        store.dispatch(
          setCredentials({
            user: store.getState().auth.user!,
            access_token,
            refresh_token: refresh_token || refreshToken,
          })
        );
        return response.data;
      })
      .catch((error) => {
        this.logout();
        throw error;
      })
      .finally(() => {
        this.refreshPromise = null;
      });

    return this.refreshPromise;
  }

  async logout(): Promise<void> {
    store.dispatch(logout());
  }

  private handleAuthError(error: any): void {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Authentication failed";
      store.dispatch(loginFailure(errorMessage));
    } else {
      store.dispatch(loginFailure());
    }
  }

  getAccessToken(): string | null {
    return store.getState().auth.accessToken;
  }

  getRefreshToken(): string | null {
    return store.getState().auth.refreshToken;
  }

  isTokenExpired(token: string): boolean {
    if (!token) return true;

    try {
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) return true;

      const payload = JSON.parse(atob(tokenParts[1]));
      // Add 30-second buffer to handle refresh before actual expiration
      return Date.now() >= payload.exp * 1000 - 30000;
    } catch {
      return true;
    }
  }
}

export const authService = new AuthService();
