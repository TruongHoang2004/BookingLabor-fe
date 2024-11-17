'use client';

import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, ScrollShadow, User } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
const Dashboard: React.FC = () => {
    const router = useRouter();
    return (
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
                                <p className="font-semibold">3 new booking requests pending</p>
                                <p className="text-sm text-default-500">Requires immediate attention</p>
                            </div>
                            
                            {/* To-do List */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 bg-default-100 rounded-lg">
                                    <span>Review new labor registrations</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-default-100 rounded-lg">
                                    <span>Update service pricing</span>   
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
                            onClick={() => { router.push('./admin/users') }}
                            className="bg-primary text-white px-3 py-1 rounded-md text-sm">
                            User Accounts
                        </Button>
                        <Button 
                            radius="full"
                            color="success"
                            variant="solid"
                            onClick={() => { router.push('./admin/tasks') }}
                            className="bg-primary text-white px-3 py-1 rounded-md text-sm">
                            Task Data
                        </Button>
                        <Button 
                            radius="full"
                            color="success"
                            variant="solid"
                            onClick={() => { router.push('./admin/monitor') }}
                            className="bg-primary text-white px-3 py-1 rounded-md text-sm">
                            Monitoring
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            {/* Stats Cards */}
            <Card className="bg-primary/10">
                <CardBody>
                    <p className="text-lg font-bold">Total Users</p>
                    <h2 className="text-3xl font-bold">1,234</h2>
                    <p className="text-sm text-default-500">+12% from last month</p>
                </CardBody>
            </Card>

            <Card className="bg-success/10">
                <CardBody>
                    <p className="text-lg font-bold">Active Tasks</p>
                    <h2 className="text-3xl font-bold">567</h2>
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
                    <h2 className="text-3xl font-bold">$45.2K</h2>
                    <p className="text-sm text-default-500">+8% from last month</p>
                </CardBody>
            </Card>

            {/* Recent Activity */}
            <Card className="col-span-2 sm:col-span-4">
                <CardHeader className="flex justify-between">
                    <h3 className="text-xl font-bold">Recent Activity</h3>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <ScrollShadow className="h-[300px]">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex items-center gap-4 mb-4">
                                <User
                                    name={`User ${item}`}
                                    description={`Action performed ${item} hour ago`}
                                    avatarProps={{
                                        src: `https://i.pravatar.cc/150?u=${item}`,
                                        size: "lg",
                                    }}
                                    classNames={{
                                        name: "text-lg font-semibold",
                                        description: "text-base"
                                    }}
                                />
                            </div>
                        ))}
                    </ScrollShadow>
                </CardBody>
            </Card>
        </div>
    );
};

export default Dashboard;