'use client'
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { Bell } from 'lucide-react';
import { Notification } from '@/interface/notification';
import { notificationService } from '@/service/notification/notification';

const NotificationListener = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);
    const user = useAppSelector((state) => state.auth.user);

    // Fetch initial notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await notificationService.getAllNotification();
                setNotifications(data);
                setHasUnread(data.some(notif => !notif.isRead));
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        if (user?.id) {
            fetchNotifications();
        }
    }, [user?.id]);

    // SSE Connection
    useEffect(() => {
        if (!user?.id) return;

        const BACK_END_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const eventSource = new EventSource(
            `${BACK_END_URL}notifications/sse/${user.id}`
        );

        eventSource.onopen = () => {
            console.log('Connected to notification server');
        };

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message) {
                const newNotification: Notification = {
                    id: Date.now(),
                    message: data.message,
                    isRead: false,
                    created_at: new Date().toISOString(),
                    type: data.type || 'SYSTEM',
                    link: data.link
                };

                setNotifications(prev => [newNotification, ...prev]);
                setHasUnread(true);
            }
        };

        eventSource.onerror = (error) => {
            console.error('SSE error:', error);
            eventSource.close();
        };

        return () => eventSource.close();
    }, [user?.id]);

    const handleMarkAllAsRead = async () => {
        try {
            await notificationService.markAllAsRead();
            setNotifications(prev =>
                prev.map(notif => ({ ...notif, isRead: true }))
            );
            setHasUnread(false);
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    const handleClearAll = async () => {
        try {
            await notificationService.clearAll();
            setNotifications([]);
            setHasUnread(false);
        } catch (error) {
            console.error('Failed to clear all notifications:', error);
        }
    };

    const handleNotificationClick = async (notification: Notification) => {
        if (!notification.isRead) {
            try {
                await notificationService.markAsRead(notification);
                setNotifications(prev =>
                    prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
                );
                setHasUnread(notifications.some(n => !n.isRead && n.id !== notification.id));
            } catch (error) {
                console.error('Failed to mark notification as read:', error);
            }
        }

        if (notification.link) {
            window.location.href = notification.link;
        }
    };

    return (
        <div className="relative z-10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative hover:bg-gray-100 p-2 rounded-full transition-all duration-200 hover:scale-110"
            >
                <Bell className="w-6 h-6" />
                {hasUnread && (
                    <span className="top-1 right-1 absolute bg-red-500 rounded-full w-2 h-2 animate-ping" />
                )}
            </button>

            {isOpen && (
                <div className="right-0 absolute border-gray-200 bg-white slide-in-from-top-2 shadow-2xl mt-2 border rounded-lg w-80 max-h-96 animate-in duration-200 overflow-hidden fade-in">
                    <div className="top-0 sticky flex justify-between items-center border-gray-200 bg-white shadow-sm p-4 border-b">
                        <h3 className="font-semibold text-lg">Notifications</h3>
                        <div className="space-x-2">
                            <button
                                onClick={handleMarkAllAsRead}
                                className="font-medium text-blue-500 text-sm hover:text-blue-600 transition-colors"
                            >
                                Mark all as read
                            </button>
                            <button
                                onClick={handleClearAll}
                                className="font-medium text-gray-500 text-sm hover:text-gray-600 transition-colors"
                            >
                                Clear all
                            </button>
                        </div>
                    </div>

                    <div className="max-h-[calc(24rem-4rem)] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                No notifications
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        onClick={() => handleNotificationClick(notif)}
                                        className={`p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer
                                            ${!notif.isRead ? 'bg-blue-50 hover:bg-blue-100' : ''}
                                            ${notif.link ? 'cursor-pointer' : 'cursor-default'}
                                        `}
                                    >
                                        <div className="font-medium text-gray-900 text-sm">{notif.message}</div>
                                        <div className="mt-1 text-gray-500 text-xs">
                                            {new Date(notif.created_at || '').toLocaleTimeString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationListener;