import { RegisterRequest } from "@/interface/auth";
import { Profile, User, Tasker } from "@/interface/user";
import toast from "react-hot-toast";
import api from "../config";
import { updateAvatar } from "@/redux/slices/authSlice";
import { updateUser, updateTasker } from "@/redux/slices/authSlice";
import { store } from "@/redux/store"; // Import the store
import { TaskerForm } from "@/interface/becometasker";


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
  },
  async updateMe(userData: Profile) {
    try {
      const response = await api.patch<User>("/users/me", userData);
      toast.success("Cập nhật thông tin người dùng thành công");
      store.dispatch(updateUser(response.data.profile)); // Dispatch the updateUser action
    } catch (error) {
      toast.error("Không thể cập nhật thông tin người dùng");
      throw error;
    }
  },
  async updateTasker(taskerData: TaskerForm) {
      console.log(taskerData);
    try {
     const response = await api.patch<Tasker>("/taskers", taskerData) 
      toast.success("Cập nhật thông tin tasker thành công");
      if (response.data) {
        store.dispatch(updateTasker(response.data)); // Dispatch the updateUser action
      } else {
        toast.error("Tasker data is null");
      }
    } catch (error) {
      toast.error("Không thể cập nhật thông tin tasker");
      throw error;
    }
  },
  async deleteMe(): Promise<Profile> {
    try {
      const response = await api.delete<Profile>("/users/me");
      toast.success("Xóa người dùng thành công");
      return response.data;
    } catch (error) {
      toast.error("Không thể xóa người dùng");
      throw error;
    }
  },
  async deleteTasker(): Promise<Tasker> {
    try {
      const response = await api.delete<Tasker>("taskers/me");
      toast.success("Xóa tasker thành công");
      return response.data;
    } catch (error) {
      toast.error("Không thể xóa tasker");
      throw error;
    }
  },
};
