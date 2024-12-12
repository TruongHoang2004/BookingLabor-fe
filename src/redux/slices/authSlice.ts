import { AuthState, LoginResponse } from "@/interface/auth";
import { User } from "@/interface/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      const { user, access_token, refresh_token } = action.payload;
      state.user = user;
      state.accessToken = access_token;
      state.refreshToken = refresh_token;
      state.isAuthenticated = true;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    loginFailure: (state) => {
      console.log("Login failed");
      state.isAuthenticated = false;
    },

    initializeAuth: (state) => {
      try {
        const storedUser = localStorage.getItem("user");
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (storedUser && accessToken && refreshToken) {
          state.user = JSON.parse(storedUser);
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
      } catch (error) {
        console.error("Error initializing auth from localStorage:", error);
        state.isAuthenticated = false; // Xử lý trường hợp dữ liệu không hợp lệ
      }
    },
  },
});

export const { setCredentials, logout, initializeAuth, loginFailure } =
  authSlice.actions;
export default authSlice.reducer;
