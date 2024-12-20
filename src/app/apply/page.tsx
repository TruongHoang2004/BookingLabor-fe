'use client'

import { useSearchParams } from 'next/navigation';
import { Button, Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { BiSolidCheckCircle } from 'react-icons/bi';
import { Task } from '@/interface/task';
import { taskService } from '@/service/task/task';
import { ProtectedRoute } from '@/components/protectedRoute';

export default function TaskerApplyTask() {
    const searchParams = useSearchParams();
    const [taskID] = useState(searchParams.get('task_id') ?? ""); // title
    const [task, setTask] = useState<Task | null>(null)
    const handleTaskID =  (id:number) => {
        if(id < 0) {
            return "";
        }
        if(id < 10) {
            return `A00${id}`
        }
        if(id >= 10 && id < 100) {
            return `A0${id}`
        }
        return `A${id}`
    }
 
    useEffect(() =>  {
      const fetchTaskData = async () => {
        const resposne = await taskService.getTaskById(parseInt(taskID, 10))
        setTask(resposne);
      }
      console.log(taskID)
      fetchTaskData()
    }, []);


    const handleConfirm = () => {
        // Add confirm logic
        console.log('Confirmed');
    };

    const handleCancel = () => {
        // Add cancel logic
        console.log('Cancelled');
    };

    return (
    <ProtectedRoute>
    {task?.task_status === 'POSTED' ? (
        <div className='w-full h-[600px] relative'>
            <Image src='/img/apply-task.jpg' className='object-cover object-bottom' alt='BG' fill/>
            <div className="flex flex-col p-8 w-full items-center absolute">
                <div className='w-full flex justify-center font-bold text-4xl text-emerald-900 mt-12'>
                    <p>APPLY FOR THE TASK YOU WANT</p>
                </div>
 
             <div className="flex justify-center w-full mt-12">
                 {task && (
                     <Card
                         className="w-[600px] h-[400px]"
                     >
                         <CardHeader className="flex flex-col items-start gap-y-2 p-6 bg-gray-400 text-black">
                             <div className="flex items-center gap-3">
                                 <p className="font-bold text-2xl"><span className='text-emerald-800'>Task ID:</span> {handleTaskID(task.id)}</p>
                                 <span className="bg-emerald-500 px-4 py-2 rounded-full text-base font-bold">
                                     {task.task_status}
                                 </span>
                             </div>
                             <p className="truncate font-bold text-2xl"><span className='text-emerald-800'>Task's Title:</span> {task.title}</p>
                         </CardHeader>
                         <CardBody className="overflow-hidden px-6 py-4">
                             <div className="space-y-4"> 
                                 <p className="truncate text-gray-600 text-lg flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="text-emerald-700 font-semibold mr-2">Skill:</span>{task.description}</p>                               
                                 <p className="truncate text-gray-600 text-lg flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="text-emerald-700 font-semibold mr-2">Description:</span>{task.description}</p>
                                 <p className="truncate text-gray-600 text-lg flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="text-emerald-700 font-semibold mr-2">Estimated Duration:</span>{task.estimated_duration}</p>
                                 <p className="truncate text-gray-600 text-lg flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="text-emerald-700 font-semibold mr-2">Start Date:</span>{task.start_date.replaceAll('T00:00:00.000Z','')}</p>
                                 <p className="truncate text-gray-600 text-lg flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="text-emerald-700 font-semibold mr-2">End Date:</span>{task.end_date.replaceAll('T00:00:00.000Z','')}</p>
                             </div>
                         </CardBody>
 
                         <CardFooter className="flex justify-between px-24 pb-6">
                             <Button
                                 color="danger"
                                 variant="flat"
                                 size="lg"
                                 className="text-lg px-8 font-bold"
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
                                 className="text-lg px-9 font-bold"
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
        </div>
    ): (
        <div className='w-full text-center text-3xl font-bold text-emerald-700 py-20 flex flex-col items-center gap-y-5'>
            YOUR ARE NOT ALLOWED TO APPLY FOR THIS TASK
            <Image src="/img/sad.png" alt='bg' width={200} height={200}></Image>    
        </div>
    )}
    </ProtectedRoute>
    );
}