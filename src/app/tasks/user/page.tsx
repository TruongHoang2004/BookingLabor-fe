'use client'
import { useRouter } from 'next/navigation';
import UserSearchBar from "@/components/tasks/User/SearchBar";
import UsersList from "@/components/tasks/User/UsersList";
// import TaskerList from "@/components/tasks/user/TaskerList";
import { Button } from '@nextui-org/react';

export default function UsersView() {
    const router = useRouter();

    const handleSearch = (userId: string) => {
        console.log('Searching for task:', userId);
    }

    return (
        <div className="flex flex-col p-4 w-full">
           <div className='w-full flex justify-center font-bold text-3xl text-emerald-700 mt-10'>
                <p>Tracking your Posted Tasks</p>
            </div>
            <div className="flex items-center justify-end gap-x-10 mb-8 w-full mt-10 pr-10">
                <div className="w-48">
                    <Button
                        onClick={() => router.push('/tasks')}
                        className="text-white px-4 py-2 rounded font-semibold text-white"
                        color="primary"
                    >
                        See your appplied Tasks
                    </Button>
                </div>
                <div className="w-80">
                    <UserSearchBar onSearch={handleSearch} />
                </div>  
            </div>
            <div className="desktop:w-5/6 laptop:w-5/6 mx-auto w-full">
                <UsersList />
            </div>
            {/* 
            <h2 className="text-2xl font-bold text-center my-8">CHOOSE TASKER</h2>
            <div className="desktop:w-5/6 laptop:w-5/6 mx-auto w-full">
                <TaskerList />
            </div>
            */}
        </div>


    );
}