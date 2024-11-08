import TaskCompleted from "@/components/TaskCompleted";
import RatingandReviewTasker from "@/components/RatingandReviewTasker";
import TaskInforAndPhotoTasker from "@/components/TaskInforAndPhotoTasker";

export default function Page() {
    return (
        <div className="bg-gray-200">
            <TaskCompleted />
            < TaskInforAndPhotoTasker />
            <RatingandReviewTasker />

        </div>


    )
}