import { Task } from '@/interface/task';

export interface Review {
    id: number;
    rating: number;
    comment: string;
    task: Task;
    image: string;
}