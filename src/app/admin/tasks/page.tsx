'use client';

import React from 'react';
import TaskCard from '@/components/admin/tasks';
import { ScrollShadow } from "@nextui-org/react";

export default function TasksPage() {
    const tasks = [
    {
        id: 1,
        type: 'Cleaning',
        status: 'Pending',
        area: 'Living Room',
        time: '09:00 AM',
        duration: '2 hours',
        price: '$50',
        description: 'Deep cleaning of living room area'
    },
    {
        id: 2,
        type: 'Gardening',
        status: 'In Progress',
        area: 'Front Yard',
        time: '10:30 AM',
        duration: '3 hours',
        price: '$75',
        description: 'Lawn mowing and hedge trimming'
    },
    {
        id: 3,
        type: 'Plumbing',
        status: 'Completed',
        area: 'Bathroom',
        time: '02:00 PM',
        duration: '1 hour',
        price: '$100',
        description: 'Fix leaking faucet'
    },
    {
        id: 4,
        type: 'Painting',
        status: 'Pending',
        area: 'Bedroom',
        time: '11:00 AM',
        duration: '4 hours',
        price: '$200',
        description: 'Paint walls and ceiling'
    },
    {
        id: 5,
        type: 'Electrical',
        status: 'In Progress',
        area: 'Kitchen',
        time: '03:30 PM',
        duration: '2 hours',
        price: '$150',
        description: 'Install new light fixtures'
    },
    {
        id: 6,
        type: 'Moving',
        status: 'Posting',
        area: 'Whole House',
        time: '08:00 AM',
        duration: '6 hours',
        price: '$300',
        description: 'Help with moving furniture'
    },
    {
        id: 7,
        type: 'Carpentry',
        status: 'Cancelled',
        area: 'Garage',
        time: '01:00 PM',
        duration: '3 hours',
        price: '$180',
        description: 'Build custom storage shelves'
    }
    ];

    const handleView = (id: number) => console.log("View user:", id);
    const handleModify = (id: number) => console.log("Modify user:", id);
    const handleDelete = (id: number) => console.log("Delete user:", id);
    const handleMessage = (id: number) => console.log("Message user:", id);

    return (
        <div className="p-4">
        <h1 className="text-5xl font-extrabold text-emerald-800 text-center py-8">
          Task Data Management
        </h1>
          <div className="mt-12 w-full mx-auto bg-white p-6 rounded-lg shadow-md space-y-2">
          <ScrollShadow className="h-[800px] w-full">
              <div className="space-y-4 p-4">
                  {tasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-4">
                          <TaskCard
                              task={task}
                              onView={handleView}
                              onModify={handleModify}
                              onMessage={handleMessage}
                              onDelete={handleDelete}
                          />
                      </div>
                  ))}
              </div>
          </ScrollShadow>
          </div>
        </div>
    );
}