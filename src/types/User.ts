export interface UserCard {
    id: number;
    title: string;
    description: string;
    category: string;
    location: string;
    applied_tasker_id: number[];
    chosen_tasker_id: number;
}

export interface Tasker {
    id: number;
    name: string;
    expected_fee: number;
    skill: string[];
    experience: string;
}

export interface User {
    id: number;
    title: string;
    description: string;
    category: string;
    location: string;
    applied_tasker_id: number[];
    chosen_tasker_id: number;
}

export interface Customer {
    id: number;
    name: string;
    description: string;
}

