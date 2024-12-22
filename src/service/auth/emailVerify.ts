import toast from "react-hot-toast";
import api from "../config";
import { OTPRequest } from "@/interface/auth";

export const EmailVerify = {
    async getOTP(otp: OTPRequest): Promise<string> {
        try {
            const response = await api.post<string>('/auth/otp', otp); 
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}


