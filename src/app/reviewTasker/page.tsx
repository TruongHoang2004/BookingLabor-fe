'use client'
import TaskCompleted from "@/components/review/TaskCompleted";
import TaskInforAndPhotoTasker from "@/components/review/TaskInforAndPhotoTasker";

export default function Page() {
    return (
        <div className="bg-gray-200">
            <TaskCompleted />
            < TaskInforAndPhotoTasker />


        </div>


    )
}