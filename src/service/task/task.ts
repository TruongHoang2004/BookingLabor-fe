import toast from "react-hot-toast";
import api from "../config";
import { Task, TaskFormDetails, TaskCardforTasker } from "@/interface/task";

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

  async applyTask(id: number): Promise<void> {
    try {
      const response = await api.patch(`/tasks/${id}/apply`);
      toast.success("Ứng tuyển công việc thành công!");
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Không thể ứng tuyển công việc này");
      throw error;
    }
  },

  async acceptTask(id: number): Promise<void> {
    try {
      const response = await api.patch(`/tasks/${id}/accept`);
      toast.success("Ứng tuyển công việc thành công!");
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Không thể ứng tuyển công việc này");
      throw error;
    }
  },





  async getTaskerTasks(): Promise<TaskCardforTasker[]> {
    try {
      const response = await api.get<TaskCardforTasker[]>("/tasks/tasker");
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Không thể lấy thông tin công việc");
      throw error;
    }
  }

};
