import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Bell, Trash2, Check, X } from 'lucide-react';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import api from '@/service/config';
import { User } from '@/interface/user';
import { Notification } from '@/interface/notification';

// Notification Service
const notificationService = {
    async getAllNotification(): Promise<Notification[]> {
        const response = await api.get<Notification[]>("/notifications");
        return response.data;
    },

    async markAsRead(notification: Notification): Promise<Notification> {
        const response = await api.patch<Notification>(
            `/notifications/${notification.id}`,
            { read: true }
        );
        return response.data;
    },

    async markAllAsRead(): Promise<void> {
        await api.patch<void>("/notifications/mark-all-as-read");
    },

    async clearAll(): Promise<void> {
        await api.delete<void>("/notifications");
    },

    async deleteNotification(notification: Notification): Promise<void> {
        await api.delete<void>(`/notifications/${notification.id}`);
    },
};

// Main Component
const NotificationListener = () => {
    const router = useRouter();
    const userId = useAppSelector((state) => state.auth.user?.id);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isNewNotification, setIsNewNotification] = useState(false);

    // Fetch notifications when component mounts
    useEffect(() => {
        if (userId) {
            loadNotifications();
        }
    }, [userId]);

    const loadNotifications = async () => {
        try {
            const data = await notificationService.getAllNotification();
            setNotifications(data);
        } catch (error) {
            console.error('Failed to load notifications:', error);
        }
    };

    useEffect(() => {
        if (!userId) return;

        const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000');

        socket.off(`notification-${userId}`);
        socket.on(`notification-${userId}`, (notification) => {
            setNotifications((prev) => [notification, ...prev]);
            // Trigger bell animation
            setIsNewNotification(true);
            setTimeout(() => setIsNewNotification(false), 2000);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId]);

    const handleNotificationClick = async (notification: Notification) => {
        try {
            if (!notification.isRead) {
                await notificationService.markAsRead(notification);
                setNotifications(notifications.map(n =>
                    n.id === notification.id ? { ...n, isRead: true } : n
                ));
            }

            if (notification.link) {
                setIsOpen(false);
                router.push(notification.link);
            }
        } catch (error) {
            console.error('Error handling notification click:', error);
        }
    };

    const handleDeleteNotification = async (event: React.MouseEvent, notification: Notification) => {
        event.stopPropagation();
        try {
            await notificationService.deleteNotification(notification);
            setNotifications(prev =>
                prev.filter(n => n.id !== notification.id)
            );
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await notificationService.markAllAsRead();
            setNotifications(notifications.map(n => ({ ...n, isRead: true })));
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    const handleClearAll = async () => {
        try {
            await notificationService.clearAll();
            setNotifications([]);
        } catch (error) {
            console.error('Error clearing notifications:', error);
        }
    };

    if (!userId) return null;

    return (
        <><style jsx global>{`
            @keyframes wiggle {
                0%, 100% { transform: rotate(-3deg); }
                50% { transform: rotate(3deg); }
            }
            
            @keyframes ring {
                0% { transform: scale(1); }
                20% { transform: scale(1.3); }
                30% { transform: scale(1.15); }
                40% { transform: scale(1.3); }
                100% { transform: scale(1); }
            }
            
            @keyframes popIn {
                0% { transform: scale(0); }
                80% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
            
            @keyframes slideDown {
                0% { transform: translateY(-10px); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes fadeIn {
                0% { opacity: 0; transform: translateY(5px); }
                100% { opacity: 1; transform: translateY(0); }
            }

            .animate-wiggle {
                animation: wiggle 0.3s ease-in-out infinite;
            }
            
            .animate-ring {
                animation: ring 1s ease-out;
            }
            
            .animate-pop-in {
                animation: popIn 0.3s ease-out;
            }
            
            .animate-slide-down {
                animation: slideDown 0.2s ease-out;
            }
            
            .animate-fade-in {
                animation: fadeIn 0.2s ease-out forwards;
            }
        `}</style><div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative hover:bg-gray-100 p-2 rounded-full transition-transform duration-200 ${isNewNotification ? 'animate-wiggle' : ''}`}
                >
                    <Bell className={`w-6 h-6 text-gray-600 ${isNewNotification ? 'animate-ring' : ''}`} />
                    {notifications.filter(n => !n.isRead).length > 0 && (
                        <span
                            className="top-0 right-0 absolute flex justify-center items-center bg-red-500 rounded-full w-4 h-4 font-bold text-white text-xs animate-pop-in"
                        >
                            {notifications.filter(n => !n.isRead).length}
                        </span>
                    )}
                </button>

                {isOpen && (
                    <div
                        className="right-0 z-50 absolute bg-white shadow-lg mt-2 rounded-lg w-96 origin-top animate-slide-down"
                    >
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="font-semibold text-gray-800 text-lg">Thông báo</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleMarkAllAsRead}
                                    className="text-blue-600 text-sm hover:text-blue-800 transition-colors duration-200"
                                >
                                    <Check className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleClearAll}
                                    className="text-red-600 text-sm hover:text-red-800 transition-colors duration-200"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                            {notifications.length > 0 ? (
                                notifications.map((notif, index) => (
                                    <div
                                        key={notif.id}
                                        onClick={() => handleNotificationClick(notif)}
                                        className={`border-b border-gray-200 hover:bg-gray-50 px-4 py-3 cursor-pointer relative transition-all duration-200 animate-fade-in ${!notif.isRead ? 'bg-blue-50' : ''}`}
                                        style={{
                                            animationDelay: `${index * 50}ms`
                                        }}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <p className={`text-sm ${!notif.isRead ? 'font-semibold' : 'text-gray-700'}`}>
                                                    {notif.message}
                                                </p>
                                                <p className="mt-1 text-gray-500 text-xs">
                                                    {new Date(notif.created_at || 0).toLocaleString()}
                                                </p>
                                            </div>
                                            <button
                                                onClick={(e) => handleDeleteNotification(e, notif)}
                                                className="opacity-0 group-hover:opacity-100 ml-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="py-4 text-center text-gray-500 text-sm animate-fade-in">
                                    Không có thông báo nào
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div></>
    );
};

export default NotificationListener;