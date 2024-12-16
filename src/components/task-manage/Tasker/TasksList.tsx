import { Task } from "@/interface/task";
import TaskCard from "./TaskCard";
import { useState } from "react";

const tasksList: Task[] = [
    {
        id: 1, title: "Task 1", description: "Description 1", task_status: "In-progress", district: "District 1", estimated_duration: 100, fee_per_hour: "34", start_date: "2023-01-01", end_date: "2023-01-02",
        ward: "",
        detail_address: "",
        user: null,
        created_at: "",
        updated_at: "",
        skill: null
    },
    {
        id: 2, title: "Task 2", description: "Description 2", task_status: "In-progress", district: "District 2", estimated_duration: 100, fee_per_hour: "34", start_date: "2023-01-01", end_date: "2023-01-02",
        ward: "",
        detail_address: "",
        user: null,
        created_at: "",
        updated_at: "",
        skill: null
    },
    {
        id: 3, title: "Task 3", description: "Description 3", task_status: "Pending", district: "District 3", estimated_duration: 100, fee_per_hour: "34", start_date: "2023-01-01", end_date: "2023-01-02",
        ward: "",
        detail_address: "",
        user: null,
        created_at: "",
        updated_at: "",
        skill: null
    },
    {
        id: 4, title: "Task 4", description: "Description 4", task_status: "Pending", district: "District 4", estimated_duration: 100, fee_per_hour: "34", start_date: "2023-01-01", end_date: "2023-01-02",
        ward: "",
        detail_address: "",
        user: null,
        created_at: "",
        updated_at: "",
        skill: null
    },
    {
        id: 5, title: "Task 5", description: "Description 5", task_status: "In-progress", district: "District 5", estimated_duration: 100, fee_per_hour: "34", start_date: "2023-01-01", end_date: "2023-01-02",
        ward: "",
        detail_address: "",
        user: null,
        created_at: "",
        updated_at: "",
        skill: null
    },
    {
        id: 6, title: "Task 6", description: "Description 6", task_status: "Pending", district: "District 6", estimated_duration: 100, fee_per_hour: "34", start_date: "2023-01-01", end_date: "2023-01-02",
        ward: "",
        detail_address: "",
        user: null,
        created_at: "",
        updated_at: "",
        skill: null
    },
    {
        id: 7, title: "Task 7", description: "Description 7", task_status: "Pending", district: "District 7", estimated_duration: 100, fee_per_hour: "34", start_date: "2023-01-01", end_date: "2023-01-02",
        ward: "",
        detail_address: "",
        user: null,
        created_at: "",
        updated_at: "",
        skill: null
    },
    {
        id: 8, title: "Task 8", description: "Description 8", task_status: "In-progress", district: "District 8", estimated_duration: 100, fee_per_hour: "34", start_date: "2023-01-01", end_date: "2023-01-02",
        ward: "",
        detail_address: "",
        user: null,
        created_at: "",
        updated_at: "",
        skill: null
    },
    {
        id: 9, title: "Task 9", description: "Description 9", task_status: "Pending", district: "District 9", estimated_duration: 100, fee_per_hour: "34", start_date: "2023-01-01", end_date: "2023-01-02",
        ward: "",
        detail_address: "",
        user: null,
        created_at: "",
        updated_at: "",
        skill: null
    },
    {
        id: 10, title: "Task 10", description: "Description 10", task_status: "Pending", district: "District 10", estimated_duration: 100, fee_per_hour: "34", start_date: "2023-01-01", end_date: "2023-01-02",
        ward: "",
        detail_address: "",
        user: null,
        created_at: "",
        updated_at: "",
        skill: null
    }
];

export default function TasksList() {
    const [currentPage, setCurrentPage] = useState(1);
    const selectedCategory = 'all';
    const tasksPerPage = 12;

    // Filter tasks theo category
    const filteredTasks = selectedCategory === 'all'
        ? tasksList
        : tasksList.filter(task => task.district === selectedCategory);

    // Tính toán tasks cho trang hiện tại
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    // Tính tổng số trang sau khi filter
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex flex-col items-center w-full">

            <div className="flex justify-center items-center my-8 w-full">
                <div className="flex flex-wrap justify-center gap-x-10 gap-y-10 w-full">
                    {currentTasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </div>

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