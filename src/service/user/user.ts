import { RegisterRequest } from "@/interface/auth";
import { User } from "@/interface/user";
import toast from "react-hot-toast";
import api from "../config";

export const userService = {
  async create(userData: RegisterRequest): Promise<User> {
    try {
      const response = await api.post<User>("/users", userData);
      toast.success("Tạo người dùng thành công");
      return response.data;
    } catch (error) {
      toast.error("Không thể tạo người dùng");
      throw error;
    }
  },
  async getMe(): Promise<User> {
    try {
      const response = await api.get<User>("/users/me");
      return response.data;
    } catch (error) {
      toast.error("Không thể lấy thông tin người dùng");
      throw error;
    }
  },

  async getAll(): Promise<User[]> {
    try {
      const response = await api.get<User[]>("/users");
      return response.data;
    } catch (error) {
      toast.error("Không thể lấy thông tin người dùng");
      throw error;
    }
  },
  async deleteUser(userId: number): Promise<User> {
    try {
      const response = await api.delete<User>(`/users/${userId}`);
      toast.success("Xóa người dùng thành công");
      return response.data;
    } catch (error) {
      toast.error("Không thể xóa người dùng");
      throw error;
    }
  }
};
