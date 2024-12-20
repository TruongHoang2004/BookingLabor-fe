'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Card, CardHeader, CardBody, CardFooter, useDisclosure } from '@nextui-org/react';
import { useState, useEffect } from 'react';

interface Task {
    id: string;
    title: string;
    description: string;
    status: 'Pending';
    estimated_duration: string;
    fee_per_hour: string;
    start_date: string[];
    end_date: string[];
}

export default function TaskerView() {
    const searchParams = useSearchParams();
    const { onOpen } = useDisclosure();
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        const taskParam = searchParams.get('task');
        if (taskParam) {
            try {
                let decodedTask = JSON.parse(taskParam);
                if (!decodedTask) {
                    decodedTask = JSON.parse(decodeURIComponent(taskParam));
                }

                setTask({
                    ...decodedTask,
                    status: 'Pending',
                    assigned_customer_id: []
                });
            } catch (error) {
                try {
                    const decoded = decodeURIComponent(taskParam);
                    const taskData = JSON.parse(decoded);
                    setTask({
                        ...taskData,
                        status: 'Pending',
                        assigned_customer_id: []
                    });
                } catch (err) {
                    console.error('Failed to parse task data:', err);
                }
            }
        }
    }, [searchParams]);

    const handleCardClick = () => {
        if (task) {
            onOpen();
        }
    };

    const handleConfirm = () => {
        // Add confirm logic
        console.log('Confirmed');
    };

    const handleCancel = () => {
        // Add cancel logic
        console.log('Cancelled');
    };

    return (
        <div className="flex flex-col p-8 w-full">
            <div className='w-full flex justify-center font-bold text-4xl text-emerald-700 mt-12'>
                <p>Task Details</p>
            </div>

            <div className="flex justify-center w-full mt-12">
                {task && (
                    <Card
                        isPressable
                        onPress={handleCardClick}
                        className="w-[600px] h-[400px]"
                    >
                        <CardHeader className="flex justify-between p-6">
                            <div className="flex items-center gap-3">
                                <h2 className="font-bold text-gray-700 text-2xl">{task.id}</h2>
                                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-base font-semibold">
                                    {task.status}
                                </span>
                            </div>
                        </CardHeader>

                        <CardBody className="overflow-hidden px-6 py-4">
                            <div className="space-y-4">
                                <p className="truncate font-semibold text-2xl">{task.title}</p>
                                <p className="truncate text-gray-600 text-lg"><span className="text-emerald-700 font-semibold mr-2">Description:</span>{task.description}</p>
                                <p className="truncate text-gray-600 text-lg"><span className="text-emerald-700 font-semibold mr-2">Estimated Duration:</span>{task.estimated_duration}</p>
                                <p className="truncate text-gray-600 text-lg"><span className="text-emerald-700 font-semibold mr-2">Start Date:</span>{task.start_date}</p>
                                <p className="truncate text-gray-600 text-lg"><span className="text-emerald-700 font-semibold mr-2">End Date:</span>{task.end_date}</p>
                            </div>
                        </CardBody>

                        <CardFooter className="flex justify-between px-24 pb-6">
                            <Button
                                color="danger"
                                variant="flat"
                                size="lg"
                                className="text-lg px-8"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancel();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="success"
                                size="lg"
                                className="text-lg px-8"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleConfirm();
                                }}
                            >
                                Apply
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    );
}