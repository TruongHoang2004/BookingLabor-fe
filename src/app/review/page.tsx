import TaskCompleted from "@/components/TaskCompleted";
import TaskNameInRV from "@/components/taskNameInRV";
import TaskInforInRV from "@/components/taskinforInRV";
import TaskPhotoReview from "@/components/TaskPhotoRV";
import PhotoTitleInRV from "@/components/PhotoTitleInRV";
import TaskerInRV from "@/components/taskerInRV";
import TaskerInforInRV from "@/components/taskerinforInRV";
import TaskerRating from "@/components/TaskerRating";
import TaskerReview from "@/components/TaskerReview";
import ConfirmReview from "@/components/confirmReviewButton";

export default function Page() {
    return (
        <div>
            <TaskCompleted />
            <TaskNameInRV />
            <TaskInforInRV />
            <PhotoTitleInRV />
            <TaskPhotoReview />
            <TaskerInRV />
            <TaskerInforInRV />
            <TaskerRating />
            <TaskerReview />
            <ConfirmReview />

        </div>


    )
}