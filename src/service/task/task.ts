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
      const response = await api.get<Task[]>("/tasks/admin");
      return response.data;
    } catch (error) {
      toast.error("Không thể lấy thông tin công việc");
      throw error;
    }
  },
  async getTaskById(id: number): Promise<Task> {
    try {
      const response = await api.get<Task>(`/tasks?id=${id}`);
      //toast.success("Lấy thông tin công việc thành công")
      return response.data;
    } catch (error) {
      toast.error("Không thể lấy thông tin công việc");
      throw error;
    }
  },
  async getAllTaskAvailable(): Promise<Task[]> {
    try {
      const response = await api.get<Task[]>("/tasks");
      return response.data;
    } catch (error) {
      toast.error("Không thể lấy thông tin công việc");
      throw error;
    }
  },
  async deleteMe(task: Task): Promise<Task> {
    try {
      const response = await api.delete<Task>(`/tasks/${task.id}`);
      toast.success("Hủy công việc thành công");
      return response.data;
    } catch (error) {
      toast.error("Không thể hủy công việc này");
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
  async userChooseTasker(task_id: number, tasker_id: number) {
    try {
      await api.patch<Task>(`/tasks/${task_id}/choose/${tasker_id}`);
      toast.success("Chọn Người làm việc thành công");
    } catch (error) {
      toast.error("Không thể chọn người làm này! Hãy thử lại sau");
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

  async getTaskerTasks(): Promise<Task[]> {
    try {
      const response = await api.get<Task[]>("/tasks/tasker");
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Không thể lấy thông tin công việc");
      throw error;
    }
  },
  async UserCancelTask(id: number): Promise<void> {
    try {
      const response = await api.delete(`/tasks/${id}`);
      toast.success("Hủy công việc thành công!");
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Không thể hủy công việc này");
      throw error;
    }
  },

  async TaskerRejectTask(id: number): Promise<void> {
    try {
      const response = await api.patch(`/tasks/${id}/reject`);
      toast.success("Từ chối công việc thành công!");
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Không thể từ chối công việc này");
      throw error;
    }
  }
};
