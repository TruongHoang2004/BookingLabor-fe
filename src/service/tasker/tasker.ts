import { RegisterRequest } from "@/interface/auth";
import { Tasker } from "@/interface/user";
import toast from "react-hot-toast";
import api from "../config";

export const taskerService = {
  async getAll(): Promise<Tasker[]> {
    try {
      const response = await api.get<Tasker[]>("/taskers");
      return response.data;
    } catch (error) {
      toast.error("Không thể lấy thông tin người lao động");
      throw error;
    }
  }
};
