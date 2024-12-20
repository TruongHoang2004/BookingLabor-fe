import { RegisterRequest } from "@/interface/auth";
import { User } from "@/interface/user";
import toast from "react-hot-toast";
import api from "../config";
import { store } from "@/redux/store";
import { updateAvatar } from "@/redux/slices/authSlice";

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
  },
  async updateAvatarURL(user_avatar: string): Promise<void> {
    try {
      await api.patch('/users/me', { avatar: user_avatar })
      store.dispatch(updateAvatar(user_avatar))
      toast.success("Cập nhật ảnh đại diện thành công")
    } catch (error) {
      toast.error('Cập nhật ảnh không thành công');
      throw error;
    }
  }
};
