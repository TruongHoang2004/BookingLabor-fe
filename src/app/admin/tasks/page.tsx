'use client';

import React from 'react';
import TaskCard from '@/components/admin/tasks';
import { ScrollShadow, Select, SelectItem } from "@nextui-org/react";
import { Task } from '@/interface/task';
import { useState, useEffect } from 'react';
import { taskService } from '@/service/task/task';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ProtectedRoute } from '@/components/protectedRoute';
import { useAppSelector } from '@/redux/store';
import { useRouter } from "next/navigation";

export default function TasksPage() {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const [isReloaded, setIsReloaded] = useState(false)
    const router = useRouter();
    const [tasksList, setTasksList] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentTaskList, setCurrentTaskList] = useState<Task[]>();
    const status = ["POSTED", "PENDING", "IN_PROGRESS", "COMPLETED", "WAITING" ,"CANCELLED","PAYMENT_CONFIRM","ALL"];

    const handleSelectedStatus = (status: string) => {
        if(status === "ALL") {
            setCurrentTaskList(tasksList);
            return
        }
        const filteredTasks = tasksList.filter(task => task.task_status === status);
        setCurrentTaskList(filteredTasks);
        console.log(filteredTasks);
    }

    useEffect(() => {
    const fetchTasks = async () => {
        if (isAuthenticated && user?.role !== 'ADMIN') {
            router.replace('/');
            return;
        }
        try {
            const response = await taskService.getMe();
            if (!response) {
                throw new Error('No data received');
            }
            setTasksList(Array.isArray(response) ? response : [response]);
            setCurrentTaskList(Array.isArray(response) ? response : [response]);
            setIsLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
            setIsLoading(false);
        }
    };

    fetchTasks();
    handleSelectedStatus("ALL")
}, [isReloaded]);

    if (isLoading) return <div><LoadingSpinner/></div>;
    if (error) return <div>Error: {error}</div>;


    const handleView = (id: number) => null;

    return (
        <ProtectedRoute>
        <div className="p-4">
        <h1 className="text-5xl font-extrabold text-emerald-800 text-center py-8">
          Task Data Management
        </h1>
        <div className='w-full flex justify-end pr-16 gap-x-2 items-center'>
            <Select className='w-64' label="Filter by Status">
                {status.map((s) => (
                    <SelectItem key={s} value={s} onClick={() => handleSelectedStatus(s)}>
                        {s}
                    </SelectItem>
                ))}
            </Select>
        </div>
        <div className="mt-12 w-full mx-auto bg-white p-6 rounded-lg shadow-md space-y-2">
          <ScrollShadow className="h-[800px] w-full">
              <div className="space-y-4 p-4">
                  {currentTaskList?.map((task) => (
                      <div key={task.id} className="flex items-center gap-4">
                          <TaskCard
                              task={task}
                              onView={handleView}
                              isReloaded={isReloaded}
                              setIsReloaded={setIsReloaded}
                          />
                      </div>
                  ))}
                  {currentTaskList?.length === 0 && (
                    <div className="text-center text-2xl font-bold text-black">No tasks available</div>
                  )}
              </div>
          </ScrollShadow>
          </div>
        </div>
        </ProtectedRoute>
    );
}