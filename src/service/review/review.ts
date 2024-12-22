import { Review } from "@/interface/review";
import api from "../config";
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
}        