import { Task } from "@/interface/task";
import UserCard from "./UserCard";
import { useState, useEffect } from "react";
import { taskService } from "@/service/task/task"; 

export default function UsersList() {
    const [userTasksList, setUserTaskList] = useState<Task[]>([]);
    const [isTaskerChosen, setIsTaskerChosen] = useState(false)

    useEffect(() => {
        const fetchTask = async () => {
            const response = await taskService.getAllTasksCreatedByUser();
            setUserTaskList(response);
            // toast("Lấy thông tin công việc thành công")
        }
        fetchTask();
    }, [isTaskerChosen])
    
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 12;

    // Calculate users for current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userTasksList.slice(indexOfFirstUser, indexOfLastUser);

    // Calculate total pages
    const totalPages = Math.ceil(userTasksList.length / usersPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex justify-center items-center my-8 w-full">
                <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-10 w-full">
                    {currentUsers.map(user => (
                        <UserCard key={user.id} userCard={user} isTaskerChosen={isTaskerChosen} setTaskChosen={setIsTaskerChosen} />
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
        </div>
    );
}
