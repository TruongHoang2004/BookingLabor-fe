import { User } from "./user";
import { Skill } from "./skill";

export interface TaskerForm {
  skillIds: number[];
  work_area: number[];
  experience: string;
}

export interface TaskerResponse {
  work_area: string;
  exprerience: string;
  user: User;
  skill: Skill[];
  create_at: string;
  update_at: string;
  id: number;
  completed_tasks: number;
  avg_rating: number;
  rating_count: number;
}
