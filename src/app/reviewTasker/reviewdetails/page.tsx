'use client'
import TaskCompleted from "@/components/review/TaskCompleted";
import ReviewDetails from "@/components/review/SeeReview";

export default function Page() {
    return (
        <div className="bg-gray-200">
            <TaskCompleted />
            < ReviewDetails />
        </div>


    )
}