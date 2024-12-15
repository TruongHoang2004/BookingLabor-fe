import TaskCard from "./TaskCard";
import { useState, useEffect } from "react";
// import TaskFilter from "./Filter";
import { taskService } from "@/service/task/task";
import { TaskCardforTasker } from "@/interface/task";

export default function TasksList() {
    const [tasksList, setTasksList] = useState<TaskCardforTasker[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const tasksPerPage = 12;

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await taskService.getMe();
            setTasksList(response)
            setIsLoading(false)
        };

        fetchTasks();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    // Filter tasks theo category
    const filteredTasks = selectedCategory === 'all'
        ? tasksList
        : tasksList.filter(task => task.task_status === selectedCategory);

    // Tính toán tasks cho trang hiện tại
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    // Tính tổng số trang sau khi filter
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Reset về trang 1 khi thay đổi filter
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col items-center w-full">
            {/* Tasks Grid */}
            <div className="flex justify-center items-center my-8 w-full">
                <div className="flex flex-wrap gap-x-10 gap-y-10">
                    {currentTasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center gap-2 my-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="bg-white disabled:opacity-50 shadow-md hover:shadow-lg px-4 py-2 rounded-lg transition-shadow disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    <div className="flex gap-2">
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${currentPage === number
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'bg-white hover:bg-gray-100 shadow-md hover:shadow-lg'
                                    }`}
                            >
                                {number}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="bg-white disabled:opacity-50 shadow-md hover:shadow-lg px-4 py-2 rounded-lg transition-shadow disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* No Results Message */}
            {filteredTasks.length === 0 && (
                <div className="my-8 text-gray-500">
                    No tasks found for the selected category.
                </div>
            )}
        </div>
    );
}