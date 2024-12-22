import { TaskerForm } from "@/interface/becometasker";
import toast from "react-hot-toast";
import api from "../config";
import { setCredentials, setisTaskers } from "@/redux/slices/authSlice";
import { store } from "@/redux/store";
import { Skill } from "@/interface/skill";
import { Tasker } from "@/interface/user";
import { TokenResponse } from "@/interface/auth";

export const becomtaskerService = {
    async create(formData: TaskerForm) {
        try {
            const response = await api.post("/taskers", formData);
            const data = response.data;
            const work_area = data.work_area;
            const experience = data.experience;
            const skills: Skill[] = data.skills;
            const id = data.id;
            const completed_tasks = data.completed_tasks;
            const rating_sum = data.rating_sum;
            const rating_count = data.rating_count;
            const tasker: Tasker = {
                id,
                work_area,
                experience,
                completed_tasks,
                rating_sum,
                rating_count,
                skills,
            };
            const access_token = store.getState().auth.accessToken;
            const refresh_token = store.getState().auth.refreshToken;
            const token: TokenResponse = {access_token: access_token!, refresh_token: refresh_token!};
            const user = data.user;
            user.tasker = tasker;
            store.dispatch(setCredentials({user, token}));
            store.dispatch(setisTaskers(true));
            toast.success("Đăng kí Tasker thành công");
            return response.data;
        } catch (error) {
            console.log(error)
            toast.error("Đăng kí Tasker thất bại");
            throw error;
        }
    }
};