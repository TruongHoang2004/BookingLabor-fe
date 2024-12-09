import { User, Tasker } from "@/types/User";
import UserCard from "./UserCard";
import { useState } from "react";
import { useRouter } from "next/navigation";

const takserList: Tasker[] = [
    { id: 1, name: "Nguyen Van A", expected_fee: 45000, skill: ["Cleaning", "Moving"], experience: "5 years of cleaning experience" },
    { id: 2, name: "Tran Thi B", expected_fee: 32000, skill: ["Washing Dishes"], experience: "Expert in painting houses for 7 years" },
    { id: 3, name: "Le Hoang C", expected_fee: 67000, skill: ["Cooking", "Organizing"], experience: "Professional chef with 15 years in the kitchen" },
    { id: 4, name: "Pham Dinh D", expected_fee: 55000, skill: ["Gardening", "Driving"], experience: "6 years of moving services" },
    { id: 5, name: "Doan Van E", expected_fee: 43000, skill: ["Repairing", "Painting"], experience: "10 years of repairing electronics" },
    { id: 6, name: "Vu Thi F", expected_fee: 39000, skill: ["Teaching"], experience: "Taught kids for 5 years" },
    { id: 7, name: "Ngo Bao G", expected_fee: 50000, skill: ["Organizing", "Gardening"], experience: "Organized events for 10 years" },
    { id: 8, name: "Hoang Anh H", expected_fee: 47000, skill: ["Driving", "Cleaning"], experience: "Driver with 8 years of experience" },
    { id: 9, name: "Nguyen Hoai I", expected_fee: 34000, skill: ["Cooking"], experience: "Handled washing services for 9 years" },
    { id: 10, name: "Le Van K", expected_fee: 60000, skill: ["Painting", "Moving"], experience: "A gardener for 12 years" }
]

const usersList: User[] = [
    { "id": 1, "title": "Task 1", "description": "Description 1", "category": "Category 1", "location": "Location 1", "applied_tasker_id": [1,2], "chosen_tasker_id": -1 },
    { "id": 2, "title": "Task 2", "description": "Description 2", "category": "Category 3", "location": "Location 2", "applied_tasker_id": [7,8], "chosen_tasker_id": -1 },
    { "id": 3, "title": "Task 3", "description": "Description 3", "category": "Category 2", "location": "Location 3", "applied_tasker_id": [], "chosen_tasker_id": -1 },
    { "id": 4, "title": "Task 4", "description": "Description 4", "category": "Category 4", "location": "Location 4", "applied_tasker_id": [2,3], "chosen_tasker_id": -1 },
    { "id": 5, "title": "Task 5", "description": "Description 5", "category": "Category 1", "location": "Location 5", "applied_tasker_id": [1], "chosen_tasker_id": -1 },
    { "id": 6, "title": "Task 6", "description": "Description 6", "category": "Category 5", "location": "Location 6", "applied_tasker_id": [2], "chosen_tasker_id": -1 },
    { "id": 7, "title": "Task 7", "description": "Description 7", "category": "Category 3", "location": "Location 7", "applied_tasker_id": [8,9,7], "chosen_tasker_id": -1 },
    { "id": 8, "title": "Task 8", "description": "Description 8", "category": "Category 6", "location": "Location 8", "applied_tasker_id": [3,4], "chosen_tasker_id": -1 },
    { "id": 9, "title": "Task 9", "description": "Description 9", "category": "Category 2", "location": "Location 9", "applied_tasker_id": [2,6,7], "chosen_tasker_id": -1 },
    { "id": 10, "title": "Task 10", "description": "Description 10", "category": "Category 4", "location": "Location 10", "applied_tasker_id": [8,4,5], "chosen_tasker_id": -1 },
    { "id": 11, "title": "Task 11", "description": "Description 11", "category": "Category 5", "location": "Location 11", "applied_tasker_id": [1,3,8], "chosen_tasker_id": -1 },
    { "id": 12, "title": "Task 12", "description": "Description 12", "category": "Category 1", "location": "Location 12", "applied_tasker_id": [7,2,8], "chosen_tasker_id": -1 },
    { "id": 13, "title": "Task 13", "description": "Description 13", "category": "Category 6", "location": "Location 13", "applied_tasker_id": [4,7,8], "chosen_tasker_id": -1 },
    { "id": 14, "title": "Task 14", "description": "Description 14", "category": "Category 3", "location": "Location 14", "applied_tasker_id": [6,4,1], "chosen_tasker_id": -1 },
    { "id": 15, "title": "Task 15", "description": "Description 15", "category": "Category 2", "location": "Location 15", "applied_tasker_id": [5,3,6], "chosen_tasker_id": -1 },
    { "id": 16, "title": "Task 16", "description": "Description 16", "category": "Category 6", "location": "Location 16", "applied_tasker_id": [8,7,6,5,4], "chosen_tasker_id": -1 },
    { "id": 17, "title": "Task 17", "description": "Description 17", "category": "Category 4", "location": "Location 17", "applied_tasker_id": [1,2,3], "chosen_tasker_id": -1 },
    { "id": 18, "title": "Task 18", "description": "Description 18", "category": "Category 1", "location": "Location 18", "applied_tasker_id": [1,2,5,6], "chosen_tasker_id": -1 },
    { "id": 19, "title": "Task 19", "description": "Description 19", "category": "Category 5", "location": "Location 19", "applied_tasker_id": [1,2], "chosen_tasker_id": -1 },
    { "id": 20, "title": "Task 20", "description": "Description 20", "category": "Category 3", "location": "Location 20", "applied_tasker_id": [], "chosen_tasker_id": -1 },
    { "id": 21, "title": "Task 21", "description": "Description 21", "category": "Category 2", "location": "Location 21", "applied_tasker_id": [], "chosen_tasker_id": -1 },
    { "id": 22, "title": "Task 22", "description": "Description 22", "category": "Category 4", "location": "Location 22", "applied_tasker_id": [], "chosen_tasker_id": -1},
    { "id": 23, "title": "Task 23", "description": "Description 23", "category": "Category 6", "location": "Location 23", "applied_tasker_id": [], "chosen_tasker_id": -1 },
    { "id": 24, "title": "Task 24", "description": "Description 24", "category": "Category 1", "location": "Location 24", "applied_tasker_id": [], "chosen_tasker_id": -1 },
    { "id": 25, "title": "Task 25", "description": "Description 25", "category": "Category 5", "location": "Location 25", "applied_tasker_id": [], "chosen_tasker_id": -1 }
];

export default function UsersList() {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 12;
    const router = useRouter();

    // Calculate users for current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = usersList.slice(indexOfFirstUser, indexOfLastUser);

    // Calculate total pages
    const totalPages = Math.ceil(usersList.length / usersPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full flex justify-start p-4"></div>

            {/* Users Grid */}
            <div className="flex justify-center items-center my-8 w-full">
                <div className="gap-4 grid grid-cols-6 laptop:grid-cols-4 mini-laptop:grid-cols-4 mobile:grid-cols-1 tablet:grid-cols-2 w-full">
                    {currentUsers.map(user => (
                        <UserCard key={user.id} user={user} />
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