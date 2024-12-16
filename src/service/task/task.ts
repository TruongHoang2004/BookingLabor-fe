import toast from "react-hot-toast";
import api from "../config";
import { Task, TaskFormDetails } from "@/interface/task";

export const taskService = {
  async create(taskForm: TaskFormDetails): Promise<Task> {
    try {
      const response = await api.post<Task>("/tasks", taskForm);
      toast.success("Tạo công việc thành công");
      return response.data;
    } catch (error) {
      toast.error("Không thể tạo công việc này");
      throw error;
    }
  },
  async getMe(): Promise<Task[]> {
    try {
      const response = await api.get<Task[]>("/tasks");
      return response.data;
    } catch (error) {
      toast.error("Không thể lấy thông tin công việc");
      throw error;
    }
  },
};
