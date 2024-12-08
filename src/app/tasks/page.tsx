'use client'
import { useRouter } from 'next/navigation';
import TaskSearchBar from "@/components/tasks/SearchBar";
import TasksList from "@/components/tasks/TasksList";

export default function TasksView() {
    const router = useRouter();

    const handleSearch = (taskId: string) => {
        console.log('Searching for task:', taskId);
    }

    return (
        <div className="flex flex-col p-4 w-full">
            <div className="flex justify-start mx-auto mt-4 w-5/6">
                <button
                    onClick={() => router.push('/User')}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Go to User Tasks
                </button>
            </div>
            <div className="flex justify-end mx-auto mb-8 w-5/6">
                <div className="w-80">
                    <TaskSearchBar onSearch={handleSearch} />
                </div>
            </div>
            <div className="desktop:w-5/6 laptop:w-5/6 mx-auto w-full">
                <TasksList />
            </div>
        </div>
    );
}