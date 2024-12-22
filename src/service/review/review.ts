import toast from "react-hot-toast";
import api from "../config";
import { Review, ReviewRequest } from "@/interface/review";

export const ReviewService = {
    async getReviewbyTaskerID(id: number): Promise<Review[]> {
        try {
            const response = await api.get<Review[]>('/reviews?tasker_id=' + id); 
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getReviewbyTaskID(taskID: number): Promise<Review> {
        try {
            const response = await api.get<Review>('/reviews?task_id=' + taskID); 
            return response.data;
        } catch (error) {
            throw error;
        }
    },     
    async createReview(reviewForm: ReviewRequest): Promise<Review> {
        try {
            const response = await api.post<Review>("/reviews", reviewForm);
            toast.success("Tạo đánh giá thành công");
            return response.data;
        } catch (error) {
            toast.error("Không thể tạo đánh giá này");
            throw error;
        }
    },
}


