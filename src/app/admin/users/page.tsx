// pages/users/page.tsx
'use client';
import UserCard from "@/components/admin/users";
import { ScrollShadow } from "@nextui-org/react";

const UsersPage = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@dreamlabour.com",
      avatar: "/avatars/avatar-1.png",
      phone:"123-456-7890",
      address:"1234 Elm Street",
      role: "Customer"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@dreamlabour.com",
      avatar: "/avatars/avatar-2.png",
      phone:"123-456-7890",
      address:"543 Elm Street",    
      role: "Tasker"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@dreamlabour.com",
      avatar: "/avatars/avatar-3.png",
      phone:"123-456-7890",
      address:"543 Elm Street", 
      role: "Customer"
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@dreamlabour.com",
      avatar: "/avatars/avatar-4.png",
      phone:"123-456-7890",
      address:"543 Elm Street", 
      role: "Customer"
    },
    {
      id: 5,
      name: "Alex Chen",
      email: "alex@dreamlabour.com",
      avatar: "/avatars/avatar-5.png",
      phone:"123-456-7890",
      address:"543 Elm Street", 
      role: "Tasker"
    },
    {
        id: 6,
        name: "Alex Chen",
        email: "alex@dreamlabour.com",
        avatar: "/avatars/avatar-5.png",
        phone:"123-456-7890",
        address:"543 Elm Street", 
        role: "Tasker"
    },
    {
        id: 7,
        name: "Alex Chen",
        email: "alex@dreamlabour.com",
        avatar: "/avatars/avatar-5.png",
        phone:"123-456-7890",
        address:"543 Elm Street", 
        role: "Tasker"
    },
  ];

  // Handler functions remain the same
  const handleView = (id: number) => console.log("View user:", id);
  const handleModify = (id: number) => console.log("Modify user:", id);
  const handleDelete = (id: number) => console.log("Delete user:", id);
  const handleNotify = (id: number) => console.log("Notify user:", id);
  const handleBlock = (id: number) => console.log("Block user:", id);
  const handleHistory = (id: number) => console.log("View history:", id);

  return (
    <div className="p-4">
      <h1 className="text-5xl font-extrabold text-emerald-800 text-center py-8">
        User Accounts Management
      </h1>
        <div className="mt-12 w-full mx-auto bg-white p-6 rounded-lg shadow-md space-y-2">
        <ScrollShadow className="h-[800px] w-full">
            <div className="space-y-4 p-4">
                {users.map((user) => (
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
  );
};

export default UsersPage;