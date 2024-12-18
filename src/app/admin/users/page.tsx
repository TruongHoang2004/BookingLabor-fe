// pages/users/page.tsx
'use client';
import UserCard from "@/components/admin/users";
import { ScrollShadow } from "@nextui-org/react";
import { User } from "@/interface/user";
import { useState, useEffect } from 'react';
import { userService } from '@/service/user/user';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ProtectedRoute } from '@/components/protectedRoute';
import { useAppSelector } from '@/redux/store';
import { useRouter } from "next/navigation";    
const UsersPage = () => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const [userList, setUsersList] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchUsers = async () => {
      if (isAuthenticated && user?.role !== 'ADMIN') {
        router.replace('/');
        return;
    }
        try {
            const response = await userService.getAll();
            if (!response) {
                throw new Error('No data received');
            }
            setUsersList(Array.isArray(response) ? response : [response]);
            setIsLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
            setIsLoading(false);
        }
    };

    fetchUsers();
}, []);

    if (isLoading) return <div><LoadingSpinner/></div>;
    if (error) return <div>Error: {error}</div>;


  // Handler functions remain the same
  const handleView = (id: number) => console.log("View user:", id);
  const handleModify = (id: number) => console.log("Modify user:", id);
  const handleDelete = (id: number) => console.log("Delete user:", id);
  const handleNotify = (id: number) => console.log("Notify user:", id);
  const handleBlock = (id: number) => console.log("Block user:", id);
  const handleHistory = (id: number) => console.log("View history:", id);

  return (
    <ProtectedRoute>
    <div className="p-4">
      <h1 className="text-5xl font-extrabold text-emerald-800 text-center py-8">
        User Accounts Management
      </h1>
        <div className="mt-12 w-full mx-auto bg-white p-6 rounded-lg shadow-md space-y-2">
        <ScrollShadow className="h-[800px] w-full">
            <div className="space-y-4 p-4">
                {userList.map((user) => (
                    <div key={user.id} className="flex items-center gap-4">
                        <UserCard
                            user={user}
                            onView={handleView}
                            onModify={handleModify}
                            onBlock={handleBlock}
                            onHistory={handleHistory}
                            onDelete={handleDelete}
                            onNotify={handleNotify}
                        />
                    </div>
                ))}
            </div>
        </ScrollShadow>
        </div>
    </div>
    </ProtectedRoute>
  );
};

export default UsersPage;