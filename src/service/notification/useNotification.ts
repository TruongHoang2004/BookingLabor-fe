import { useEffect, useState, useCallback } from "react";
import { authService } from "../auth/auth-service";
import api from "../config";
import { Notification } from "@/interface/notification";

interface UseNotificationsReturn {
  notifications: Notification[];
  error: string | null;
  isConnected: boolean;
  markAsRead: (notificationId: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export const useNotifications = (userId: number): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRY_COUNT = 5;

  const setupEventSource = useCallback(() => {
    const token = authService.getAccessToken();
    console.log(token);
    if (!token) {
      setError("Not authenticated");
      return null;
    }

    if (!userId) {
      setError("User ID not found");
      return null;
    }

    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}notifications/subscribe?userId=${userId}`
    );

    const eventSource = new EventSource(url.toString(), {
      withCredentials: true,
    });

    return eventSource;
  }, []);

  const connect = useCallback(async () => {
    if (retryCount >= MAX_RETRY_COUNT) {
      setError("Max reconnection attempts reached");
      return;
    }

    const eventSource = setupEventSource();
    if (!eventSource) return;

    eventSource.onopen = () => {
      setIsConnected(true);
      setError(null);
      setRetryCount(0);
      console.log("SSE Connected");
    };

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        const notification = parsedData.data as Notification;

        setNotifications((prev) => {
          // Avoid duplicate notifications
          const exists = prev.some((n) => n.id === notification.id);
          if (exists) return prev;
          return [notification, ...prev];
        });
      } catch (err) {
        console.error("Error parsing notification:", err);
      }
    };

    eventSource.onerror = async () => {
      setIsConnected(false);
      eventSource.close();

      // Retry connection
      await new Promise((resolve) => setTimeout(resolve, 2000));
    };

    return () => {
      eventSource.close();
      setIsConnected(false);
    };
  }, [retryCount, setupEventSource]);

  // Initial connection
  useEffect(() => {
    const cleanupPromise = connect();
    cleanupPromise.then((cleanup) => {
      return () => {
        cleanup?.();
      };
    });
  }, [connect]);

  // Fetch initial notifications
  useEffect(() => {
    const fetchInitialNotifications = async () => {
      try {
        const { data } = await api.get<Notification[]>("/notifications");
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchInitialNotifications();
  }, []);

  // Mark single notification as read
  const markAsRead = async (notificationId: number) => {
    try {
      await api.patch(`/notifications/${notificationId}/read`);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
      throw err;
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await api.patch("/notifications/read-all");
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true }))
      );
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
      throw err;
    }
  };

  return {
    notifications,
    error,
    isConnected,
    markAsRead,
    markAllAsRead,
  };
};
