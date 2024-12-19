import { useState,useEffect } from "react";

interface Notification {
    type: string;
    messae: string;
    timestamp: string;
}

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    useEffect(() => {
        const eventSource = new EventSource('/api/notifications/subscribe')

        eventSource.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            setNotifications((prev) => [...prev, notification]);
        };

        eventSource.onerror = (error) => {
            console.error('SSE Error:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return {notifications};
};