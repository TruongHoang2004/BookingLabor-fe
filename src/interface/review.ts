import { Task } from './task';
export interface Review {

    id: number;
    rating: number;
    comment: string;
    task: Task;
}