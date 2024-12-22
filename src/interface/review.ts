
import { Task } from '@/interface/task';

export interface Review {
    id: number;
    rating: number;
    comment: string;
    task: Task;
}


export interface ReviewRequest {
    rating: number;
    comment: string;
    task_id: number;
}
