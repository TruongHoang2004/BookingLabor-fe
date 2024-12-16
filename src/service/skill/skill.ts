import { Skill } from "@/interface/user";
import api from "../config";

export const SkillService = {
    async getAllSkills(): Promise<Skill[]> {
        try {
          const response = await api.get<Skill[]>("/skills");
          return response.data;
        } catch (error) {
          throw error;
        }
    }
}