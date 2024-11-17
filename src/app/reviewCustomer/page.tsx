import TaskCompleted from "@/components/review/TaskCompleted";
import TaskInforAndPhotoCustomer from "@/components/review/TaskinforandPhotoCustomer";
import RatingandReviewCustomer from "@/components/review/RatingandReviewCustomer";
export default function Page() {
    return (
        <div className="bg-gray-200">
            <TaskCompleted />
            <TaskInforAndPhotoCustomer />
            <RatingandReviewCustomer />


        </div>


    )
}