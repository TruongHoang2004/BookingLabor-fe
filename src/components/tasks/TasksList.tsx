import { Task } from "@/types/Task";
import TaskCard from "./TaskCard";
import { useState } from "react";
import TaskFilter from "./Filter";

const tasksList: Task[] = [
    { "id": 1, "title": "Task 1", "description": "Description 1", "category": "Category 1", "location": "Location 1" },
    { "id": 2, "title": "Task 2", "description": "Description 2", "category": "Category 3", "location": "Location 2" },
    { "id": 3, "title": "Task 3", "description": "Description 3", "category": "Category 2", "location": "Location 3" },
    { "id": 4, "title": "Task 4", "description": "Description 4", "category": "Category 4", "location": "Location 4" },
    { "id": 5, "title": "Task 5", "description": "Description 5", "category": "Category 1", "location": "Location 5" },
    { "id": 6, "title": "Task 6", "description": "Description 6", "category": "Category 5", "location": "Location 6" },
    { "id": 7, "title": "Task 7", "description": "Description 7", "category": "Category 3", "location": "Location 7" },
    { "id": 8, "title": "Task 8", "description": "Description 8", "category": "Category 6", "location": "Location 8" },
    { "id": 9, "title": "Task 9", "description": "Description 9", "category": "Category 2", "location": "Location 9" },
    { "id": 10, "title": "Task 10", "description": "Description 10", "category": "Category 4", "location": "Location 10" },
    { "id": 11, "title": "Task 11", "description": "Description 11", "category": "Category 5", "location": "Location 11" },
    { "id": 12, "title": "Task 12", "description": "Description 12", "category": "Category 1", "location": "Location 12" },
    { "id": 13, "title": "Task 13", "description": "Description 13", "category": "Category 6", "location": "Location 13" },
    { "id": 14, "title": "Task 14", "description": "Description 14", "category": "Category 3", "location": "Location 14" },
    { "id": 15, "title": "Task 15", "description": "Description 15", "category": "Category 2", "location": "Location 15" },
    { "id": 16, "title": "Task 16", "description": "Description 16", "category": "Category 6", "location": "Location 16" },
    { "id": 17, "title": "Task 17", "description": "Description 17", "category": "Category 4", "location": "Location 17" },
    { "id": 18, "title": "Task 18", "description": "Description 18", "category": "Category 1", "location": "Location 18" },
    { "id": 19, "title": "Task 19", "description": "Description 19", "category": "Category 5", "location": "Location 19" },
    { "id": 20, "title": "Task 20", "description": "Description 20", "category": "Category 3", "location": "Location 20" },
    { "id": 21, "title": "Task 21", "description": "Description 21", "category": "Category 2", "location": "Location 21" },
    { "id": 22, "title": "Task 22", "description": "Description 22", "category": "Category 4", "location": "Location 22" },
    { "id": 23, "title": "Task 23", "description": "Description 23", "category": "Category 6", "location": "Location 23" },
    { "id": 24, "title": "Task 24", "description": "Description 24", "category": "Category 1", "location": "Location 24" },
    { "id": 25, "title": "Task 25", "description": "Description 25", "category": "Category 5", "location": "Location 25" }
];

export default function TasksList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const tasksPerPage = 24;

    // Filter tasks theo category
    const filteredTasks = selectedCategory === 'all'
        ? tasksList
        : tasksList.filter(task => task.category === selectedCategory);

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
            <TaskFilter
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                tasks={tasksList}
            />

            {/* Tasks Grid */}
            <div className="flex justify-center items-center my-8 w-full">
                <div className="gap-4 grid grid-cols-6 laptop:grid-cols-4 mini-laptop:grid-cols-4 mobile:grid-cols-1 tablet:grid-cols-2 w-full">
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
