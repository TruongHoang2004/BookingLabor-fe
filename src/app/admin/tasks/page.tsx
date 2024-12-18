'use client';

import TaskCard from '@/components/admin/tasks';
import { ScrollShadow } from "@nextui-org/react";
import { Task } from '@/interface/task';
import { taskService } from '@/service/task/task';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ProtectedRoute } from '@/components/protectedRoute';
import useSWR from 'swr';

export default function TasksPage() {
    const { data, isLoading, error, mutate } = useSWR('/tasks/admin', taskService.getMe);

    const handleView = (id: number) => console.log("View user:", id);

    const handleDelete = async (task: Task) => {
        await mutate(); // Refresh the skills list
        console.log("Deleted skill:", task);
      };

    if (isLoading) return <LoadingSpinner/>;
    if (error) return <div>Error: {error}</div>;


    return (    
        <ProtectedRoute>
        <div className="p-4">
        <h1 className="text-5xl font-extrabold text-emerald-800 text-center py-8">
          Task Data Management
        </h1>
          <div className="mt-12 w-full mx-auto bg-white p-6 rounded-lg shadow-md space-y-2">
          <ScrollShadow className="h-[800px] w-full">
              <div className="space-y-4 p-4">
                        <TaskCard
                            tasks={[...(data || [])].reverse()}
                            onView={handleView}
                            onDelete={handleDelete}
                        />
              </div>
          </ScrollShadow>
          </div>
        </div>
        </ProtectedRoute>
    );
}