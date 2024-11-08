import TaskCompleted from "@/components/TaskCompleted";
import TaskInforAndPhotoCustomer from "@/components/TaskinforandPhotoCustomer";
import RatingandReviewCustomer from "@/components/RatingandReviewCustomer";
export default function Page() {
    return (
        <div className="bg-gray-200">
            <TaskCompleted />
            <TaskInforAndPhotoCustomer />
            <RatingandReviewCustomer />


        </div>


    )
}