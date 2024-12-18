import { useEffect, useState } from "react";
import { TaskCardforTasker } from "@/interface/task";
import { taskService } from "@/service/task/task";
import TaskCard from "./TaskCard";

export default function TasksList() {
    const [tasksList, setTasksList] = useState<TaskCardforTasker[]>([]); // State để lưu danh sách task
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const tasksPerPage = 12;

    const [isAccepted, setIsAccepted] = useState(false);

    // Fetch data từ API khi component mount
    useEffect(() => {
        async function fetchTasks() {
            setIsLoading(true);
            setError(null);
            try {
                const tasks = await taskService.getTaskerTasks();
                setTasksList(tasks);
            } catch {
                setError("Không thể tải danh sách công việc.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchTasks();
    }, [isAccepted]);

    // Tính toán các task hiển thị trên trang hiện tại
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasksList.slice(indexOfFirstTask, indexOfLastTask);

    // Tính tổng số trang
    const totalPages = Math.ceil(tasksList.length / tasksPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex flex-col items-center w-full">
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <>
                    {/* Hiển thị danh sách task */}
                    <div className="flex justify-center items-center my-8 w-full">
                        <div className="flex flex-wrap justify-center gap-x-10 gap-y-10 w-full">
                            {currentTasks.map(task => (
                                <TaskCard key={task.id} task={task} isAccepted={isAccepted} setIsAccepted={setIsAccepted} />
                            ))}
                        </div>
                    </div>

                    {/* Phân trang */}
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

                    {/* Thông báo khi không có task */}
                    {tasksList.length === 0 && (
                        <div className="my-8 text-gray-500">
                            No tasks found.
                        </div>
                    )}
                </>
            )}
        </div>
    );
}