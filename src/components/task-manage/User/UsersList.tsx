import { TaskCardforUser } from "@/interface/task";
import UserCard from "./UserCard";
import { useState } from "react";
import TaskFilter from "./Filter";

const tasksList: TaskCardforUser[] = [
  { id: 1, title: "Task 1", description: "Description 1", task_status: "Pending", district: "District 1", street: "Street 1", estimated_duration: 2, fee_per_hour: "45", start_date: "2023-01-01", end_date: "2023-01-02", created_at: "2023-01-01", updated_at: "2023-01-01", apply_tasker: [{ id: 1, name: "Nguyen Van A", skill: ["Cleaning", "Moving"], experience: "5 years of cleaning experience" }, { id: 2, name: "Tran Thi B", skill: ["Washing Dishes"], experience: "Expert in painting houses for 7 years" }], chosen_tasker: null },
  { id: 2, title: "Task 2", description: "Description 2", task_status: "Pending", district: "District 2", street: "Street 2", estimated_duration: 3, fee_per_hour: "32", start_date: "2023-01-03", end_date: "2023-01-04", created_at: "2023-01-03", updated_at: "2023-01-03", apply_tasker: [{ id: 7, name: "Ngo Bao G", skill: ["Organizing", "Gardening"], experience: "Organized events for 10 years" }, { id: 8, name: "Hoang Anh H", skill: ["Driving", "Cleaning"], experience: "Driver with 8 years of experience" }], chosen_tasker: null },
  { id: 3, title: "Task 3", description: "Description 3", task_status: "Pending", district: "District 3", street: "Street 3", estimated_duration: 1, fee_per_hour: "67", start_date: "2023-01-05", end_date: "2023-01-06", created_at: "2023-01-05", updated_at: "2023-01-05", apply_tasker: [], chosen_tasker: null },
  { id: 4, title: "Task 4", description: "Description 4", task_status: "Pending", district: "District 4", street: "Street 4", estimated_duration: 4, fee_per_hour: "55", start_date: "2023-01-07", end_date: "2023-01-08", created_at: "2023-01-07", updated_at: "2023-01-07", apply_tasker: [{ id: 2, name: "Tran Thi B", skill: ["Washing Dishes"], experience: "Expert in painting houses for 7 years" }, { id: 3, name: "Le Hoang C", skill: ["Cooking", "Organizing"], experience: "Professional chef with 15 years in the kitchen" }], chosen_tasker: null },
  { id: 5, title: "Task 5", description: "Description 5", task_status: "Pending", district: "District 5", street: "Street 5", estimated_duration: 2, fee_per_hour: "43", start_date: "2023-01-09", end_date: "2023-01-10", created_at: "2023-01-09", updated_at: "2023-01-09", apply_tasker: [{ id: 1, name: "Nguyen Van A", skill: ["Cleaning", "Moving"], experience: "5 years of cleaning experience" }], chosen_tasker: null },
  { id: 6, title: "Task 6", description: "Description 6", task_status: "Pending", district: "District 6", street: "Street 6", estimated_duration: 3, fee_per_hour: "39", start_date: "2023-01-11", end_date: "2023-01-12", created_at: "2023-01-11", updated_at: "2023-01-11", apply_tasker: [{ id: 2, name: "Tran Thi B", skill: ["Washing Dishes"], experience: "Expert in painting houses for 7 years" }], chosen_tasker: null },
  { id: 7, title: "Task 7", description: "Description 7", task_status: "Pending", district: "District 7", street: "Street 7", estimated_duration: 1, fee_per_hour: "50", start_date: "2023-01-13", end_date: "2023-01-14", created_at: "2023-01-13", updated_at: "2023-01-13", apply_tasker: [{ id: 8, name: "Hoang Anh H", skill: ["Driving", "Cleaning"], experience: "Driver with 8 years of experience" }, { id: 9, name: "Nguyen Hoai I", skill: ["Cooking"], experience: "Handled washing services for 9 years" }, { id: 7, name: "Ngo Bao G", skill: ["Organizing", "Gardening"], experience: "Organized events for 10 years" }], chosen_tasker: null },
  { id: 8, title: "Task 8", description: "Description 8", task_status: "Pending", district: "District 8", street: "Street 8", estimated_duration: 4, fee_per_hour: "47", start_date: "2023-01-15", end_date: "2023-01-16", created_at: "2023-01-15", updated_at: "2023-01-15", apply_tasker: [{ id: 3, name: "Le Hoang C", skill: ["Cooking", "Organizing"], experience: "Professional chef with 15 years in the kitchen" }, { id: 4, name: "Pham Dinh D", skill: ["Gardening", "Driving"], experience: "6 years of moving services" }], chosen_tasker: null },
  { id: 9, title: "Task 9", description: "Description 9", task_status: "Pending", district: "District 9", street: "Street 9", estimated_duration: 2, fee_per_hour: "34", start_date: "2023-01-17", end_date: "2023-01-18", created_at: "2023-01-17", updated_at: "2023-01-17", apply_tasker: [{ id: 2, name: "Tran Thi B", skill: ["Washing Dishes"], experience: "Expert in painting houses for 7 years" }, { id: 6, name: "Vu Thi F", skill: ["Teaching"], experience: "Taught kids for 5 years" }, { id: 7, name: "Ngo Bao G", skill: ["Organizing", "Gardening"], experience: "Organized events for 10 years" }], chosen_tasker: null },
  { id: 10, title: "Task 10", description: "Description 10", task_status: "Pending", district: "District 10", street: "Street 10", estimated_duration: 3, fee_per_hour: "60", start_date: "2023-01-19", end_date: "2023-01-20", created_at: "2023-01-19", updated_at: "2023-01-19", apply_tasker: [{ id: 8, name: "Hoang Anh H", skill: ["Driving", "Cleaning"], experience: "Driver with 8 years of experience" }, { id: 4, name: "Pham Dinh D", skill: ["Gardening", "Driving"], experience: "6 years of moving services" }, { id: 5, name: "Doan Van E", skill: ["Repairing", "Painting"], experience: "10 years of repairing electronics" }], chosen_tasker: null },
  { id: 11, title: "Task 11", description: "Description 11", task_status: "Pending", district: "District 11", street: "Street 11", estimated_duration: 1, fee_per_hour: "43", start_date: "2023-01-21", end_date: "2023-01-22", created_at: "2023-01-21", updated_at: "2023-01-21", apply_tasker: [{ id: 1, name: "Nguyen Van A", skill: ["Cleaning", "Moving"], experience: "5 years of cleaning experience" }, { id: 3, name: "Le Hoang C", skill: ["Cooking", "Organizing"], experience: "Professional chef with 15 years in the kitchen" }, { id: 8, name: "Hoang Anh H", skill: ["Driving", "Cleaning"], experience: "Driver with 8 years of experience" }], chosen_tasker: null },
  { id: 12, title: "Task 12", description: "Description 12", task_status: "Pending", district: "District 12", street: "Street 12", estimated_duration: 4, fee_per_hour: "32", start_date: "2023-01-23", end_date: "2023-01-24", created_at: "2023-01-23", updated_at: "2023-01-23", apply_tasker: [{ id: 7, name: "Ngo Bao G", skill: ["Organizing", "Gardening"], experience: "Organized events for 10 years" }, { id: 2, name: "Tran Thi B", skill: ["Washing Dishes"], experience: "Expert in painting houses for 7 years" }, { id: 8, name: "Hoang Anh H", skill: ["Driving", "Cleaning"], experience: "Driver with 8 years of experience" }], chosen_tasker: null },
  { id: 13, title: "Task 13", description: "Description 13", task_status: "Pending", district: "District 13", street: "Street 13", estimated_duration: 2, fee_per_hour: "47", start_date: "2023-01-25", end_date: "2023-01-26", created_at: "2023-01-25", updated_at: "2023-01-25", apply_tasker: [{ id: 4, name: "Pham Dinh D", skill: ["Gardening", "Driving"], experience: "6 years of moving services" }, { id: 7, name: "Ngo Bao G", skill: ["Organizing", "Gardening"], experience: "Organized events for 10 years" }, { id: 8, name: "Hoang Anh H", skill: ["Driving", "Cleaning"], experience: "Driver with 8 years of experience" }], chosen_tasker: null },
  { id: 14, title: "Task 14", description: "Description 14", task_status: "Pending", district: "District 14", street: "Street 14", estimated_duration: 3, fee_per_hour: "34", start_date: "2023-01-27", end_date: "2023-01-28", created_at: "2023-01-27", updated_at: "2023-01-27", apply_tasker: [{ id: 6, name: "Vu Thi F", skill: ["Teaching"], experience: "Taught kids for 5 years" }, { id: 4, name: "Pham Dinh D", skill: ["Gardening", "Driving"], experience: "6 years of moving services" }, { id: 1, name: "Nguyen Van A", skill: ["Cleaning", "Moving"], experience: "5 years of cleaning experience" }], chosen_tasker: null },
  { id: 15, title: "Task 15", description: "Description 15", task_status: "Pending", district: "District 15", street: "Street 15", estimated_duration: 1, fee_per_hour: "60", start_date: "2023-01-29", end_date: "2023-01-30", created_at: "2023-01-29", updated_at: "2023-01-29", apply_tasker: [{ id: 5, name: "Doan Van E", skill: ["Repairing", "Painting"], experience: "10 years of repairing electronics" }, { id: 3, name: "Le Hoang C", skill: ["Cooking", "Organizing"], experience: "Professional chef with 15 years in the kitchen" }, { id: 6, name: "Vu Thi F", skill: ["Teaching"], experience: "Taught kids for 5 years" }], chosen_tasker: null },
  { id: 16, title: "Task 16", description: "Description 16", task_status: "Pending", district: "District 16", street: "Street 16", estimated_duration: 4, fee_per_hour: "47", start_date: "2023-01-31", end_date: "2023-02-01", created_at: "2023-01-31", updated_at: "2023-01-31", apply_tasker: [{ id: 8, name: "Hoang Anh H", skill: ["Driving", "Cleaning"], experience: "Driver with 8 years of experience" }, { id: 7, name: "Ngo Bao G", skill: ["Organizing", "Gardening"], experience: "Organized events for 10 years" }, { id: 6, name: "Vu Thi F", skill: ["Teaching"], experience: "Taught kids for 5 years" }, { id: 5, name: "Doan Van E", skill: ["Repairing", "Painting"], experience: "10 years of repairing electronics" }, { id: 4, name: "Pham Dinh D", skill: ["Gardening", "Driving"], experience: "6 years of moving services" }], chosen_tasker: null },
  { id: 17, title: "Task 17", description: "Description 17", task_status: "Pending", district: "District 17", street: "Street 17", estimated_duration: 2, fee_per_hour: "43", start_date: "2023-02-02", end_date: "2023-02-03", created_at: "2023-02-02", updated_at: "2023-02-02", apply_tasker: [{ id: 1, name: "Nguyen Van A", skill: ["Cleaning", "Moving"], experience: "5 years of cleaning experience" }, { id: 2, name: "Tran Thi B", skill: ["Washing Dishes"], experience: "Expert in painting houses for 7 years" }, { id: 3, name: "Le Hoang C", skill: ["Cooking", "Organizing"], experience: "Professional chef with 15 years in the kitchen" }], chosen_tasker: null },
  { id: 18, title: "Task 18", description: "Description 18", task_status: "Pending", district: "District 18", street: "Street 18", estimated_duration: 3, fee_per_hour: "39", start_date: "2023-02-04", end_date: "2023-02-05", created_at: "2023-02-04", updated_at: "2023-02-04", apply_tasker: [{ id: 1, name: "Nguyen Van A", skill: ["Cleaning", "Moving"], experience: "5 years of cleaning experience" }, { id: 2, name: "Tran Thi B", skill: ["Washing Dishes"], experience: "Expert in painting houses for 7 years" }, { id: 5, name: "Doan Van E", skill: ["Repairing", "Painting"], experience: "10 years of repairing electronics" }, { id: 6, name: "Vu Thi F", skill: ["Teaching"], experience: "Taught kids for 5 years" }], chosen_tasker: null },
  { id: 19, title: "Task 19", description: "Description 19", task_status: "Pending", district: "District 19", street: "Street 19", estimated_duration: 1, fee_per_hour: "50", start_date: "2023-02-06", end_date: "2023-02-07", created_at: "2023-02-06", updated_at: "2023-02-06", apply_tasker: [{ id: 1, name: "Nguyen Van A", skill: ["Cleaning", "Moving"], experience: "5 years of cleaning experience" }, { id: 2, name: "Tran Thi B", skill: ["Washing Dishes"], experience: "Expert in painting houses for 7 years" }], chosen_tasker: null },
  { id: 20, title: "Task 20", description: "Description 20", task_status: "Pending", district: "District 20", street: "Street 20", estimated_duration: 4, fee_per_hour: "60", start_date: "2023-02-08", end_date: "2023-02-09", created_at: "2023-02-08", updated_at: "2023-02-08", apply_tasker: [], chosen_tasker: null }, 
];   
export default function UsersList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const usersPerPage = 12;

    // Calculate users for current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = tasksList.slice(indexOfFirstUser, indexOfLastUser);

    // Calculate total pages
    const totalPages = Math.ceil(tasksList.length / usersPerPage);
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

            {/* Users Grid */}
            <div className="flex justify-center items-center my-8 w-full">
                <div className="gap-4 grid grid-cols-6 laptop:grid-cols-4 mini-laptop:grid-cols-4 mobile:grid-cols-1 tablet:grid-cols-2 w-full">
                    {currentUsers.map(user => (
                        <UserCard key={user.id} userCard={user}/>
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
