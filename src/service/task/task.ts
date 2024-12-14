import { RegisterRequest } from "@/interface/auth";
import { User } from "@/interface/user";
import toast from "react-hot-toast";
import api from "../config";
import { Task } from "@/interface/task";

export const taskService = {
  async create(userData: RegisterRequest): Promise<User> {
    try {
      const response = await api.post<User>("/task", userData);
      toast.success("Tạo công việc thành công");
      return response.data;
    } catch (error) {
      toast.error("Không thể tạo công việc này");
      throw error;
    }
  },
  async getMe(): Promise<Task[]> {
    try {
      const response = await api.get<Task[]>("/task");
      return response.data;
    } catch (error) {
      toast.error("Không thể lấy thông tin công việc");
      throw error;
    }
  },
};
