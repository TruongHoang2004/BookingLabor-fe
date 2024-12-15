import { Skill } from "./skill";

export interface TaskCard {
  id: number;
  title: string;
  description: string;
  category: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  task_status: string;
  district: string;
  ward: string;
  detail_address: string;
  skill: Skill;
  estimated_duration: number;
  fee_per_hour: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  category: string;
  location: string;
  assigned_customer_id: number | number[];
}
