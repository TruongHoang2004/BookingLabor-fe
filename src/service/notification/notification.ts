import api from "../config";
import toast from "react-hot-toast";
import { Notification } from "@/interface/notification";

export const notificationService = {
  async getAllNotification(): Promise<Notification[]> {
    try {
      const response = await api.get<Notification[]>("/notifications");
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch skills");
      throw error;
    }
  },
  async markAsRead(notification: Notification): Promise<Notification> {
    try {
      const response = await api.patch<Notification>(
        `/notifications/${notification.id}`,
        { read: true }
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to mark notification as read");
      throw error;
    }
  },
  async markAllAsRead(): Promise<void> {
    try {
      await api.patch<void>("/notifications/mark-all-as-read");
    } catch (error) {
      toast.error("Failed to mark all notifications as read");
      throw error;
    }
  },
  async clearAll(): Promise<void> {
    try {
      await api.delete<void>("/notifications");
    } catch (error) {
      toast.error("Failed to clear all notifications");
      throw error;
    }
  },
  async deleteNotification(notification: Notification): Promise<void> {
    try {
      await api.delete<void>(`/notifications/${notification.id}`);
    } catch (error) {
      toast.error("Failed to delete notification");
      throw error;
    }
  },
};
