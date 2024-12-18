import { Gender } from "@/enum/gender";
import { User } from "./user";
import { Role } from "@/enum/role";

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isTasker: boolean;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: TokenResponse;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  gender: Gender;
  date_of_birth: string;
  role?: Role;
}
