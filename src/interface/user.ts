import { Gender } from "@/enum/gender";
import { Role } from "@/enum/role";

export interface Skill {
  id: number;
  name: string;
  description: string;
}

export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  gender: Gender;
  birthdate: string;
  description: string | null;
  create_at: string;
  updated_at: string;
}

export interface Tasker {
  id: number;
  word_area: string;
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

