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
  estimated_duration: string;
  username: string;
}

export interface Tasker {
  id: number;
  name: string;
  skill: string[];
  experience: string;
}


export interface TaskCardforUser {
  id: number;
  title: string;
  description: string;
  task_status: string;
  district: string;
  street: string;
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
  task_status: string;
  district: string;
  street: string;
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
