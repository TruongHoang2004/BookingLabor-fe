'use client'
import { useRouter } from 'next/navigation';
import TaskSearchBar from "@/components/task-manage/Tasker/SearchBar";
import TasksList from "@/components/task-manage/Tasker/TasksList";
import { Button } from '@nextui-org/react';

export default function TasksView() {
    const router = useRouter();

    const handleSearch = (taskId: string) => {
        console.log('Searching for task:', taskId);
    }

    return (
        <div className="flex flex-col p-4 w-full">
            <div className='w-full flex justify-center font-bold text-3xl text-emerald-700 mt-10'>
                <p>Tracking your ongoing and completed Tasks</p>
            </div>
            <div className="flex items-center justify-end gap-x-10 mb-8 w-full mt-10 pr-10">
                <div className="w-44">
                    <Button
                        onClick={() => router.push('/taskmanage/user')}
                        className="text-white px-4 py-2 rounded font-semibold text-white"
                        color="primary"
                    >
                        See Your Posted Tasks
                    </Button>
                </div>
                <div className="w-80">
                    <TaskSearchBar onSearch={handleSearch} />
                </div>
            </div>
            <div className="desktop:w-5/6 laptop:w-5/6 mx-auto w-full">
                <TasksList />
            </div>
        </div>
    );
}