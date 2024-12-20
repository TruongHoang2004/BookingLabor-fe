import { User } from "./user";

// export interface Notification {
//   id: number;
//   message: string;
//   created_at: string;
//   user_id: number;
//   type: string;
//   read: boolean;
//   data?: string;
// }
export interface Notification {
  id?: number;
  message: string;
  link?: string;
  isRead: boolean;
  type?: string; // e.g., 'SYSTEM', 'MESSAGE', 'ALERT'
  user?: User;
  created_at?: string;
}
