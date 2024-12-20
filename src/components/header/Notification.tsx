import React, { useState, useEffect } from 'react';
import { Bell, BellOff, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

// Types
interface Notification {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    createdAt: string;
    read: boolean;
}

const NotificationComponent = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Get initial notifications
        // fetch('/api/notifications')
        //     .then(res => res.json())
        //     .then(data => {
        //         setNotifications(data);
        //         setUnreadCount(data.filter((n: Notification) => !n.read).length);
        //     });

        // Setup SSE connection
        const userId = localStorage.getItem('userId');

        const eventSource = new EventSource(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/subscribe?userId=${userId}`,
            {
                withCredentials: true
            }
        );
        toast.success('Connected to notification server');

        eventSource.onopen = () => {
            setIsConnected(true);
        };

        eventSource.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            setNotifications(prev => [notification, ...prev]);
            setUnreadCount(prev => prev + 1);
            showToast(notification);
        };

        eventSource.onerror = () => {
            setIsConnected(false);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const showToast = (notification: Notification) => {
        // Show temporary toast notification
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 transition-all duration-500';
        toast.innerHTML = notification.message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    };

    const markAsRead = async (id: number) => {
        try {
            await fetch(`/api/notifications/${id}/read`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, read: true } : n)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetch('/api/notifications/read-all', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            setNotifications(prev =>
                prev.map(n => ({ ...n, read: true }))
            );
            setUnreadCount(0);
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <Check className="w-5 h-5 text-green-500" />;
            case 'error':
                return <X className="w-5 h-5 text-red-500" />;
            default:
                return <Bell className="w-5 h-5 text-blue-500" />;
        }
    };

    return (
        <div className="relative">
            {/* Notification Bell */}
            <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative hover:bg-gray-100 p-2 rounded-full"
            >
                {isConnected ? (
                    <Bell className="w-6 h-6" />
                ) : (
                    <BellOff className="w-6 h-6 text-gray-400" />
                )}
                {unreadCount > 0 && (
                    <span className="-top-1 -right-1 absolute flex justify-center items-center bg-red-500 rounded-full w-5 h-5 text-white text-xs">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Notification Panel */}
            {showNotifications && (
                <div className="right-0 absolute bg-white shadow-lg mt-2 border rounded-lg w-80 overflow-hidden">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="font-semibold">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-blue-500 text-sm hover:text-blue-600"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                No notifications
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 border-b hover:bg-gray-50 ${notification.read ? 'bg-gray-50' : 'bg-white'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        {getNotificationIcon(notification.type)}
                                        <div className="flex-1">
                                            <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-900'}`}>
                                                {notification.message}
                                            </p>
                                            <p className="mt-1 text-gray-500 text-xs">
                                                {new Date(notification.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        {!notification.read && (
                                            <button
                                                onClick={() => markAsRead(notification.id)}
                                                className="text-blue-500 text-xs hover:text-blue-600"
                                            >
                                                Mark as read
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationComponent;