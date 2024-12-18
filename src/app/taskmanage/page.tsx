'use client'
import { useRouter } from 'next/navigation';
import UsersList from "@/components/task-manage/User/UsersList";
import { Button } from '@nextui-org/react';
import { ProtectedRoute } from '@/components/protectedRoute';

export default function UsersView() {
    const router = useRouter();

    return (
        <ProtectedRoute>
            <div className="flex flex-col p-4 w-full">
                <div className='w-full flex justify-center font-bold text-3xl text-emerald-700 mt-10'>
                    <p>Manages your posted And on-going Tasks</p>
                </div>
                <div className="flex items-center justify-end gap-x-10 mb-8 w-full mt-10 pr-10">
                    <div className="w-48">
                        <Button
                            onClick={() => router.push('/taskmanage/tasker')}
                            className="text-white px-4 py-2 rounded font-semibold text-white"
                            color="primary"
                        >
                            Change to Tasker View
                        </Button>
                    </div>
                </div>
                <div className="desktop:w-5/6 laptop:w-5/6 mx-auto w-full">
                    <UsersList />
                </div>
            </div>
        </ProtectedRoute>

    );
}