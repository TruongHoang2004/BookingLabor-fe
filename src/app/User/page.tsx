'use client'
import { useRouter } from 'next/navigation';
import UserSearchBar from "@/components/tasks/User/SearchBar";
import UsersList from "@/components/tasks/User/UsersList";
import TaskerList from "@/components/tasks/User/TaskerList";

export default function UsersView() {
    const router = useRouter();

    const handleSearch = (userId: string) => {
        console.log('Searching for task:', userId);
    }

    return (
        <div className="flex flex-col p-4 w-full">
            <div className="flex justify-start mx-auto mt-4 w-5/6">
                <button
                    onClick={() => router.push('/tasks')}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Back
                </button>
            </div>
            <div className="flex justify-end mx-auto mb-8 w-5/6">
                <div className="w-80">
                    <UserSearchBar onSearch={handleSearch} />
                </div>
            </div>
            <div className="desktop:w-5/6 laptop:w-5/6 mx-auto w-full">
                <UsersList />
            </div>
            <h2 className="text-2xl font-bold text-center my-8">CHOOSE TASKER</h2>
            <div className="desktop:w-5/6 laptop:w-5/6 mx-auto w-full">
                <TaskerList />
            </div>
        </div>


    );
}