// pages/users/page.tsx
'use client';
import UserCard from "@/components/admin/users";
import { ScrollShadow } from "@nextui-org/react";
import { userService } from '@/service/user/user';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ProtectedRoute } from '@/components/protectedRoute';   
import  useSWR from  'swr';
const UsersPage = () => {
    const { data, isLoading, error, mutate } = useSWR('/users', userService.getAll);


    if (isLoading) return <div><LoadingSpinner/></div>;
    if (error) return <div>Error: {error}</div>;


  // Handler functions remain the same
  const handleView = (id: number) => console.log("View user:", id);
  const handleModify = (id: number) => console.log("Modify user:", id);
  const handleDelete = async (id: number) => {
    await mutate(); // Refresh the user list
    console.log("Deleted user:", id);
  };
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
                        <UserCard
                            users={[...(data || [])].reverse()}
                            onView={handleView}
                            onModify={handleModify}
                            onBlock={handleBlock}
                            onHistory={handleHistory}
                            onDelete={handleDelete}
                            onNotify={handleNotify}
                        />
                    </div>
        </ScrollShadow>
        </div>
    </div>
    </ProtectedRoute>
  );
};

export default UsersPage;