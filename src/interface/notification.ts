export interface Notification {
  id: number;
  message: string;
  created_at: string;
  user_id: number;
  type: string;
  read: boolean;
  data?: string;
}
