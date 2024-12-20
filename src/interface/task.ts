import { Skill } from "./skill";
import { User, Tasker } from "@/interface/user";

export interface TaskCard {
  id: number;
  title: string;
  description: string;
  category: string;
}
export interface TaskCardforTasker {
  id: number;
  title: string;
  description: string;
  task_status: string;
  district: string;
  ward: string;
  detail_address: string;
  estimated_duration: number;
  fee_per_hour: string;
  username: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  user: User;
  skill: Skill;
}

export interface TaskCardforUser {
  street: string | null;
  id: number;
  title: string;
  description: string;
  task_status: string;
  district: string;
  ward: string | null;
  detail_address: string | null;
  skill: Skill | undefined | null;
  estimated_duration: number;
  fee_per_hour: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  apply_tasker: Tasker[];
  chosen_tasker: Tasker | null;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  district: string;
  ward: string;
  detail_address: string;
  estimated_duration: number; // in minutes
  fee_per_hour: string; // Assuming currency is string format
  start_date: string; // ISO timestamp
  end_date: string; // ISO timestamp
  user: User | null; // Nested user object
  created_at: string | null; // ISO timestamp
  updated_at: string | null; // ISO timestamp
  task_status: string; // Task status (e.g., PENDING)
  skill: Skill | null; // Nested skill object
  tasker: Tasker | null;
  taskers: Tasker[] | null;
}

export interface TaskFormDetails {
  title: string;
  skill_id: number;
  description: string;
  district: number;
  ward: string;
  detail_address: string;
  estimated_duration: number;
  fee_per_hour: string;
  start_date: string;
  end_date: string;
}
