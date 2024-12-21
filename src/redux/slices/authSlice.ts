import { AuthState, LoginResponse } from "@/interface/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "@/interface/user";
import { Tasker } from "@/interface/user";
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isTasker: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.accessToken = token.access_token;
      state.refreshToken = token.refresh_token;
      state.isAuthenticated = true;
      if (user.tasker) {
        state.isTasker = true;
      }
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isTasker", state.isTasker.toString());
      localStorage.setItem("accessToken", token.access_token);
      localStorage.setItem("refreshToken", token.refresh_token);
    },
    updateUser: (state, action: PayloadAction<Profile>) => {
      if (state.user) {
        state.user.profile = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }

    },
    updateTasker: (state, action: PayloadAction<Tasker>) => {
      if (state.user) {
        state.user.tasker = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    setisTaskers: (state, action: PayloadAction<boolean>) => {
      state.isTasker = action.payload;
      localStorage.setItem("isTasker", "true");
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isTasker = false;
      state.isAuthenticated = false;

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("isTasker");

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
        const isTasker = localStorage.getItem("isTasker");

        if (storedUser && accessToken && refreshToken) {
          state.user = JSON.parse(storedUser);
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
        if (isTasker?.toString() === "true") {
          state.isTasker = isTasker === "true";
        }
      } catch (error) {
        console.error("Error initializing auth from localStorage:", error);
        state.isAuthenticated = false; // Xử lý trường hợp dữ liệu không hợp lệ
      }
    },
  },
});

export const { setCredentials, logout, initializeAuth, loginFailure, setisTaskers, updateUser, updateTasker } =
  authSlice.actions;
export default authSlice.reducer;
