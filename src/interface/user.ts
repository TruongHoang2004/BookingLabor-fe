import { Gender } from "@/enum/gender";
import { Role } from "@/enum/role";
import { Skill } from "./skill";

export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  gender: Gender;
  birth_date: string;
  description: string | null;
  create_at: string;
  updated_at: string;
  avatar?: string;
}

export interface Tasker {
  id: number;
  work_area: string;
  experience: string;
  completed_tasks: number;
  avg_rating: number;
  rating_count: number;
  skills: Skill[];
}

export interface User {
  id: number;
  email: string;
  role: Role;
  create_at: string;
  updated_at: string;
  profile: Profile;
  tasker: Tasker | null; // Tasker có thể là null nếu người dùng không phải là Tasker
}
