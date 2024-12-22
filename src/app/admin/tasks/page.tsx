'use client';

import React from 'react';
import TaskCard from '@/components/admin/tasks';
import { ScrollShadow } from "@nextui-org/react";
import { Task } from '@/interface/task';
import { useState, useEffect } from 'react';
import { taskService } from '@/service/task/task';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ProtectedRoute } from '@/components/protectedRoute';
import { useAppSelector } from '@/redux/store';
import { useRouter } from "next/navigation";

export default function TasksPage() {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const [tasksList, setTasksList] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
    const fetchTasks = async () => {
        if (isAuthenticated && user?.role !== 'ADMIN') {
            router.replace('/');
            return;
        }
        try {
            const response = await taskService.getMe();
            console.log(response);
            if (!response) {
                throw new Error('No data received');
            }
            setTasksList(Array.isArray(response) ? response : [response]);
            setIsLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
            setIsLoading(false);
        }
    };

    fetchTasks();
}, []);

    if (isLoading) return <div><LoadingSpinner/></div>;
    if (error) return <div>Error: {error}</div>;


    const handleView = (id: number) => console.log("View user:", id);

    return (
        <ProtectedRoute>
        <div className="p-4">
        <h1 className="text-5xl font-extrabold text-emerald-800 text-center py-8">
          Task Data Management
        </h1>
          <div className="mt-12 w-full mx-auto bg-white p-6 rounded-lg shadow-md space-y-2">
          <ScrollShadow className="h-[800px] w-full">
              <div className="space-y-4 p-4">
                  {tasksList.map((task) => (
                      <div key={task.id} className="flex items-center gap-4">
                          <TaskCard
                              task={task}
                              onView={handleView}
                          />
                      </div>
                  ))}
              </div>
          </ScrollShadow>
          </div>
        </div>
        </ProtectedRoute>
    );
}