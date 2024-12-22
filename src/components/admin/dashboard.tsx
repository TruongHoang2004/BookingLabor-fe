'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../protectedRoute';
import { userService } from '@/service/user/user';
import { User } from "@/interface/user";
import { Task } from "@/interface/task";
import { taskService } from '@/service/task/task';
import LoadingSpinner  from "@/components/LoadingSpinner"
const Dashboard: React.FC = () => {
    const [userList, setUsersList] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getAll();
                if (!response) {
                    throw new Error('No data received');
                }
                setUsersList(Array.isArray(response) ? response : [response]);
                setIsLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch users');
                setIsLoading(false);
            }
        };
    
        fetchUsers();
    }, []);
        const [tasksList, setTasksList] = useState<Task[]>([]);
      
        useEffect(() => {
        const fetchTasks = async () => {
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
    return (
        <ProtectedRoute>
        <div className="gap-4 grid grid-cols-2 sm:grid-cols-4 p-4">
            <div className="col-span-2 sm:col-span-4 mb-4 flex justify-center">
                <Card className="max-w-[600px] w-full">
                    <CardHeader className="flex justify-between">
                        <h3 className="text-xl font-bold">Have a good day, here&apos;s something to check out:</h3>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <div className="space-y-4">
                            {/* Notifications */}
                            <div className="bg-warning/10 p-3 rounded-lg">
                                <p className="font-semibold">Some booking payments pending</p>
                                <p className="text-sm text-default-500">Requires immediate attention</p>
                            </div>
                            
                            {/* To-do List */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 bg-default-100 rounded-lg">
                                    <span>Review user and tasker information</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-default-100 rounded-lg">
                                    <span>Update skills and tasks</span>   
                                </div>
                            </div>
                        </div>
                    </CardBody>
                    <Divider/>
                    <CardFooter className='justify-start items-center space-x-4'>
                        <Button 
                            radius="full"
                            color="success"
                            variant="solid"
                            onClick={() => { router.push('/admin/users') }}
                            className="bg-primary text-white px-3 py-1 rounded-md text-sm">
                            User Accounts
                        </Button>
                        <Button 
                            radius="full"
                            color="success"
                            variant="solid"
                            onClick={() => { router.push('/admin/tasks') }}
                            className="bg-primary text-white px-3 py-1 rounded-md text-sm">
                            Task Data
                        </Button>
                        <Button
                            radius="full"
                            color="success"
                            variant="solid"
                            onClick={() => { router.push('/admin/skills') }}
                            className="bg-primary text-white px-3 py-1 rounded-md text-sm">
                            Skills Check
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            {/* Stats Cards */}
            <Card className="bg-primary/10">
                <CardBody>
                    <p className="text-lg font-bold">Total Users</p>
                    <h2 className="text-3xl font-bold">{userList.length}</h2>
                    <p className="text-sm text-default-500">+12% from last month</p>
                </CardBody>
            </Card>

            <Card className="bg-success/10">
                <CardBody>
                    <p className="text-lg font-bold">Active Tasks</p>
                    <h2 className="text-3xl font-bold">{tasksList.length}</h2>
                    <p className="text-sm text-default-500">+5% from last week</p>
                </CardBody>
            </Card>

            <Card className="bg-warning/10">
                <CardBody>
                    <p className="text-lg font-bold">Pending Reviews</p>
                    <h2 className="text-3xl font-bold">89</h2>
                    <p className="text-sm text-default-500">-2% from yesterday</p>
                </CardBody>
            </Card>

            <Card className="bg-secondary/10">
                <CardBody>
                    <p className="text-lg font-bold">Total Revenue</p>
                    <h2 className="text-3xl font-bold">2.320.000 VND</h2>
                    <p className="text-sm text-default-500">+8% from last month</p>
                </CardBody>
            </Card>
        </div>
        </ProtectedRoute>
    );
};

export default Dashboard;