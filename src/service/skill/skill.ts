import { Skill, SkillRequest } from "@/interface/skill";
import api from "../config";
import toast from "react-hot-toast";

export const SkillService = {
    async addSkill(skill: SkillRequest): Promise<SkillRequest> {
        try {
          const response = await api.post<Skill>("/skills", skill);
          toast.success("Skill added successfully");
          return response.data;
        } catch (error) {
          toast.error("Failed to add skill");
          throw error;
        }
    },
    async getAllSkills(): Promise<Skill[]> {
        try {
          const response = await api.get<Skill[]>("/skills");
          return response.data;
        } catch (error) {
            toast.error("Failed to fetch skills");  
          throw error;
        }
    },
    async deleteSkill(skill: Skill): Promise<Skill> {
        try {
          const response = await api.delete<Skill>(`/skills/${skill.id}`);
          toast.success("Skill deleted successfully");
          return response.data;
        } catch (error) {
          toast.error("Failed to delete skill");
          throw error;
        }
    },
    async updateSkill(skill: Skill): Promise<Skill> {
        try {
          const response = await api.patch<Skill>(`/skills/${skill.id}`, skill);
          toast.success("Skill updated successfully");
          return response.data;
        } catch (error) {
          toast.error("Failed to update skill");
          throw error;
        }
    }
}
