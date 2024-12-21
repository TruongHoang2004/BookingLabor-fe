'use client'
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { Bell } from 'lucide-react';
import { Notification } from '@/interface/notification';
import { notificationService } from '@/service/notification/notification';
import { AnimatePresence, motion } from 'framer-motion';

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
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <Bell className="w-6 h-6" />
                {hasUnread && (
                    <motion.span
                        className="top-1 right-1 absolute bg-red-500 rounded-full w-2 h-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            times: [0, 0.5, 1]
                        }}
                    />
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="right-0 absolute border-gray-200 bg-white shadow-2xl mt-2 border rounded-lg w-80 max-h-96 overflow-hidden"
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            className="top-0 sticky flex justify-between items-center border-gray-200 bg-white shadow-sm p-4 border-b"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="font-semibold text-lg">Notifications</h3>
                            <div className="space-x-2">
                                <motion.button
                                    onClick={handleMarkAllAsRead}
                                    className="font-medium text-blue-500 text-sm hover:text-blue-600 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Mark all as read
                                </motion.button>
                                <motion.button
                                    onClick={handleClearAll}
                                    className="font-medium text-gray-500 text-sm hover:text-gray-600 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Clear all
                                </motion.button>
                            </div>
                        </motion.div>

                        <motion.div
                            className="max-h-[calc(24rem-4rem)] overflow-y-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {notifications.length === 0 ? (
                                <motion.div
                                    className="p-8 text-center text-gray-500"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    No notifications
                                </motion.div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    <AnimatePresence>
                                        {notifications.map((notif, index) => (
                                            <motion.div
                                                key={notif.id}
                                                onClick={() => handleNotificationClick(notif)}
                                                className={`p-4 transition-colors duration-150
                                                    ${!notif.isRead ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'}
                                                    ${notif.link ? 'cursor-pointer' : 'cursor-default'}
                                                `}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ delay: index * 0.1 }}
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                <div className="font-medium text-gray-900 text-sm">{notif.message}</div>
                                                <div className="mt-1 text-gray-500 text-xs">
                                                    {new Date(notif.created_at || '').toLocaleTimeString()}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationListener;