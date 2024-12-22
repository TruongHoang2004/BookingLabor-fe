import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Bell } from 'lucide-react';
import { useAppSelector } from '@/redux/store';
import { Notification } from '@/interface/notification';
import toast from 'react-hot-toast';

const NotificationListener = () => {
    const userId = useAppSelector((state) => state.auth.user?.id); // Lấy userId từ Redux store
    const [notifications, setNotifications] = useState<Notification[]>([]); // Danh sách thông báo
    const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng của dropdown

    useEffect(() => {
        if (!userId) return; // Nếu chưa đăng nhập, không làm gì cả

        const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000');

        // Lắng nghe thông báo cho userId
        socket.off(`notification-${userId}`);
        socket.on(`notification-${userId}`, (notification) => {
            setNotifications((prev) => [notification, ...prev]); // Thêm thông báo mới vào đầu danh sách
            toast.success(notification.message); // Hiển thị thông báo popup
        });

        return () => {
            socket.disconnect(); // Ngắt kết nối khi component bị unmount
        };
    }, [userId]);

    // Không render thông báo nếu chưa đăng nhập
    if (!userId) return null;

    return (
        <div className="relative">
            {/* Nút chuông */}
            <button
                onClick={() => setIsOpen(!isOpen)} // Toggle trạng thái mở/đóng
                className="relative hover:bg-gray-100 p-2 rounded-full"
            >
                <Bell className="w-6 h-6 text-gray-600" />
                {/* Hiển thị số lượng thông báo chưa đọc */}
                {notifications.length > 0 && (
                    <span className="top-0 right-0 absolute flex justify-center items-center bg-red-500 rounded-full w-4 h-4 font-bold text-white text-xs">
                        {notifications.length}
                    </span>
                )}
            </button>

            {/* Dropdown thông báo */}
            {isOpen && (
                <div className="right-0 z-50 absolute bg-white shadow-lg mt-2 rounded-lg w-80">
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-800 text-lg">Thông báo</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notif, index) => (
                                <div
                                    key={index}
                                    className="border-gray-200 hover:bg-gray-50 px-4 py-2 border-b"
                                >
                                    <p className="text-gray-700 text-sm">{notif.message}</p>
                                    <p className="text-gray-500 text-xs">
                                        {new Date(notif.created_at || 0).toLocaleTimeString()}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="py-4 text-center text-gray-500 text-sm">
                                Không có thông báo nào
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationListener;
