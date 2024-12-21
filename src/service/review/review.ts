import toast from "react-hot-toast";
import api from "../config";
import { Review, ReviewRequest } from "@/interface/review";


export const reviewService = {
    async createReview(reviewForm: ReviewRequest): Promise<Review> {
        try {
            const response = await api.post<Review>("/reviews", reviewForm);
            toast.success("Tạo đánh giá thành công");
            return response.data;
        } catch (error) {
            toast.error("Không thể tạo đánh giá này");
            throw error;
        }
    }
}

