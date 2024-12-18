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
  async getAllTasksCreatedByUser(): Promise<Task[]> {
    try {
      const response = await api.get<Task[]>("/tasks/user");
      return response.data;
    } catch (error) {
      toast.error("Không thể lấy thông tin công việc");
      throw error;
    }
  },
  async userChooseTasker(task_id: number , tasker_id: number) {
    try {
      const response = await api.patch<Task>(`/tasks/${task_id}/choose/${tasker_id}`);
      toast.success("Chọn Người làm việc thành công");
    } catch (error) {
      toast.error("Không thể chọn người làm này! Hãy thử lại sau");
      throw error;
    }
  }
};
