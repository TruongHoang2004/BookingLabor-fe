import { TaskerForm, TaskerResponse } from "@/interface/becometasker";
import toast from "react-hot-toast";
import api from "../config";
import { setisTaskers } from "@/redux/slices/authSlice";
import { store } from "@/redux/store";

export const becomtaskerService = {
    async create(formData: TaskerForm): Promise<TaskerResponse> {
        try {
            const response = await api.post<TaskerResponse>("/taskers", formData);
            store.dispatch(setisTaskers(true));
            toast.success("Bạn đã trở thành Tasker");
            return response.data;
        } catch (error) {
            console.log(error)
            toast.error("Đăng kí Tasker thất bại");
            throw error;
        }
    }
};