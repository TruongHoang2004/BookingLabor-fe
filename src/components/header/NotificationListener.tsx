'use client'
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { Bell } from 'lucide-react';
import toast from 'react-hot-toast';

const NotificationListener = () => {
    interface Notification {
        id: number;
        message: string;
        timestamp: string;
        read: boolean;
    }

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user?.id) return;

        const BACK_END_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const eventSource = new EventSource(
            `${BACK_END_URL}/notifications/sse/${user.id}`
        );

        eventSource.onopen = () => {
            console.log('Connected to notification server');
        };

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            toast.success(data.message);
            if (data.message) {
                setNotifications(prev => [{
                    id: Date.now(),
                    message: data.message,
                    timestamp: new Date().toLocaleTimeString(),
                    read: false
                }, ...prev].slice(0, 10));
                setHasUnread(true);
            }
        };

        eventSource.onerror = (error) => {
            console.error('SSE error:', error);
            eventSource.close();
        };

        return () => eventSource.close();
    }, [user?.id]);

    const handleMarkAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        );
        setHasUnread(false);
    };

    const handleClearAll = () => {
        setNotifications([]);
        setHasUnread(false);
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
                                        className={`p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer
                                            ${!notif.read ? 'bg-blue-50 hover:bg-blue-100' : ''}
                                        `}
                                    >
                                        <div className="font-medium text-gray-900 text-sm">{notif.message}</div>
                                        <div className="mt-1 text-gray-500 text-xs">
                                            {notif.timestamp}
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