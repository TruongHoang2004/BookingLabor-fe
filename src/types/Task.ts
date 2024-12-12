export interface TaskCard {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  assigned_customer_id: number | number[];
}
