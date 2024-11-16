'use client'
import TaskSearchBar from "@/components/tasks/SearchBar";
import TasksList from "@/components/tasks/TasksList";

interface Task {
    id: number;
    title: string;
    description: string;
}

export default function TasksView() {
    const handleSearch = (taskId: string) => {
        console.log('Searching for task:', taskId);
    }

    return (
        <div className="flex flex-col p-4 w-full">
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