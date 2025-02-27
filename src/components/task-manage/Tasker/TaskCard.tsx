'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
//import { UrlObject } from 'url';
import { Task } from "@/interface/task";
import { Card, CardBody, CardHeader, CardFooter, Tooltip, Button } from "@nextui-org/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter, useDisclosure
} from "@nextui-org/react";
import Image from "next/image";
import { FaList } from "react-icons/fa";
import { TbChecklist } from "react-icons/tb";
import { BiSolidCheckCircle } from "react-icons/bi";
import { taskService } from "@/service/task/task";
import toast from "react-hot-toast";
import { getDistrictByCode, getWardByCode } from "@/service/location/location";
//import { start } from "repl";


export default function TaskCard({ task, isAccepted, setIsAccepted }: { task: Task; isAccepted: boolean; setIsAccepted: React.Dispatch<React.SetStateAction<boolean>>; }) {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true); // Ensure this runs only on the client
    }, []);

    const handleAccept = async () => {
        if (!isMounted) return;

        try {
            const queryParams = new URLSearchParams({
                taskId: task.id.toString(),
                title: task.title,
                district: task.district,
                ward: task.ward,
                detail_address: task.detail_address,
                start_date: new Date(task.start_date).toISOString(),
                end_date: new Date(task.end_date).toISOString(),
                fee_per_hour: task.fee_per_hour.toString(),
                estimated_duration: task.estimated_duration.toString(),
                description: task.description
            }).toString();

            console.log('Query params:', queryParams); // Debug log

            await router.push(`/order?${queryParams}`);
        } catch (error) {
            console.error('Navigation error:', error);
            toast.error('Failed to navigate to order page');
        }
    };
    const getImageSrc = () => {
        const Index = task.skill?.id;
        return Index ? `/img/taskmanage/task-manage-${Index}.jpg` : '/img/taskmanage/default-task.jpg';
    }


    const formatID = (id: number) => {
        if (id < 10) {
            return `A00${id}`
        }
        if (id >= 10 && id < 100) {
            return `A0${id}`
        }
        if (id < 10) {
            return `A${id}`
        }
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Chỉ lấy phần yyyy-mm-dd
    };

    const [districtName, setDistrictName] = useState('');
    const [wardName, setWardName] = useState('');
    useEffect(() => {
        setIsMounted(true); // Ensure this runs only on the client
        const fetchDistrictAndWard = () => {
            const response1 = getDistrictByCode(parseInt(task.district, 10))
            const response2 = getWardByCode(parseInt(task.ward, 10))
            if (response1) {
                setDistrictName(response1.name);
            }
            if (response2) {
                setWardName(response2.name);
            }
        }
        fetchDistrictAndWard()
    }, []);

    const handleTaskerRejectTask = async () => {
        try {
            await taskService.TaskerRejectTask(task.id);
            // toast.success("Hủy công việc thành công");
            setIsAccepted(!isAccepted)
        } catch (error) {
            //toast.error("Hủy công việc thất bại");
            console.error("Lỗi khi hủy công việc:", error);
        }
    };

    const handleTaskerCompleteTask = async () => {
        try {
            await taskService.TaskerCompleteTask(task.id);
            // toast.success("Hoàn thành công việc thành công");
            setIsAccepted(!isAccepted)
        } catch (error) {
            // toast.error("Hoàn thành công việc thất bại");
            console.error("Lỗi khi hoàn thành công việc:", error);
        }
    }

    const handleRouteToReviewDetails = async () => {
        if (!isMounted) return;

        try {
            const queryParams = new URLSearchParams({
                taskId: task.id.toString(),
                title: task.title,
                district: task.district,
                ward: task.ward,
                detail_address: task.detail_address,
                start_date: new Date(task.start_date).toISOString(),
                end_date: new Date(task.end_date).toISOString(),
                fee_per_hour: task.fee_per_hour.toString(),
                estimated_duration: task.estimated_duration.toString(),
                description: task.description,
                rating: task.review?.rating.toString() || '0',
                comment: task.review?.comment || '',
            }).toString();

            console.log('Query params:', queryParams); // Debug log

            await router.push(`/reviewTasker/reviewdetails?${queryParams}`);
        } catch (error) {
            console.error('Navigation error:', error);
            toast.error('Failed to navigate to order page');
        }


    };


    return (
        <div>
            <Card isFooterBlurred className="w-[400px] h-[450px]">
                <Image src={getImageSrc()} alt="" className={`object-cover`} fill />
                <CardHeader className="flex flex-col bg-slate-200">
                    <p className="font-bold text-emerald-700 text-xl">{formatID(task.id)}</p>
                    <p className="font-semibold text-lg">{task.title}</p>
                    <p className="flex items-center bg-emerald-400 mt-2 p-2 rounded-xl max-w-[290px] font-bold truncate">
                        <span className="mr-1 font-semibold text-emerald-900">
                            Status:
                        </span>
                        {task.task_status === "WAITING" ? "COMPLETED" : task.task_status}
                    </p>

                </CardHeader>
                <CardBody className="p-0">
                    <div className="relative w-full h-full">
                        <div className="top-2/3 left-1/2 absolute flex justify-between items-center bg-gray-200 py-4 pl-2 rounded-lg w-11/12 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="">
                                <p className="flex items-center mb-2 max-w-[290px] truncate"><TbChecklist className="mr-1 text-emerald-700 text-xl" /> <span className="mr-1 font-semibold text-emerald-700">Duration:</span>{task.estimated_duration} hours</p>
                                <p className="flex items-center mb-2 max-w-[290px] truncate"><TbChecklist className="mr-1 text-emerald-700 text-xl" /> <span className="mr-1 font-semibold text-emerald-700">Fee per hour:</span>{task.fee_per_hour} VND/h</p>
                                <p className="flex items-center max-w-[290px] truncate"><TbChecklist className="mr-1 text-emerald-700 text-xl" /> <span className="mr-1 font-semibold text-emerald-700">End date:</span>{task.end_date.replaceAll("T00:00:00.000Z", "")}</p>
                            </div>
                            <div>
                                <Tooltip content="View more details">
                                    <Button onPress={onOpen} variant="light" className="text-emerald-700 text-lg"><FaList /></Button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="flex flex-col justify-center items-center mt-3 h-[150px]">
                    <div>
                        {/* Hiển thị nút nút tương ứng với các trạng thái  */}
                        {task.task_status === 'IN_PROGRESS' ? (
                            <div><Button onClick={handleTaskerCompleteTask} color="success" className="shadow-md mt-2 px-3 py-2 rounded-lg font-semibold text-white">Completion Confirmation</Button></div>
                        ) : (
                            <div></div>
                        )}
                        {task.task_status === 'PENDING' ? (
                            <div className="flex flex-col justify-center items-center gap-y-2">
                                <Button onClick={handleAccept} color="success" className="shadow-md mt-2 px-3 py-2 rounded-lg font-semibold text-white">Accept Task</Button>
                                <Button onClick={handleTaskerRejectTask} color="danger" className="shadow-md mt-2 px-3 py-2 rounded-lg font-semibold text-white">Decline Task</Button>
                            </div>
                        ) : (
                            <div></div>
                        )}
                        {task.task_status === 'WAITING' || task.task_status === 'COMPLETED' ? (
                            <div><Button color="success" className="shadow-md mt-2 px-3 py-2 rounded-lg font-semibold text-white">You Have Completed This Task</Button></div>
                        ) : (
                            <div></div>
                        )}
                        {task.task_status === 'COMPLETED' && task.review ? (
                            <div className="flex justify-center"><Button onClick={handleRouteToReviewDetails} color="success" className="shadow-md mt-2 px-3 py-2 rounded-lg font-semibold text-white">See Review About You</Button></div>
                        ) : (
                            <div></div>
                        )}


                    </div>
                </CardFooter>
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="font-bold text-emerald-800">
                                <div className="flex flex-col">
                                    <p className="font-bold text-emerald-700 text-xl">T00{task.id}</p>
                                    <p className="font-semibold text-lg">{task.title}</p>
                                </div>
                            </ModalHeader>
                            <ModalBody className="flex flex-col gap-y-4">
                                <div className="flex flex-col gap-y-3">
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Description:</span>{task.description}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Skill:</span>{task.skill?.name}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Estimated Duration:</span>{task.estimated_duration}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Fee per hour:</span>{task.fee_per_hour}VND /h</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Start Date:</span>{formatDate(task.start_date)}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">End Date:</span>{formatDate(task.end_date)}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Status:</span>{task.task_status}</p>
                                </div>
                                <p className="mb-[-10px] font-bold text-sm">YOUR CLIENT'S DETAILED ADDRESS</p>

                                <div className={task.task_status === 'IN_PROGRESS' || task.task_status === 'COMPLETED' ? 'bg-gray-200 rounded-lg p-3 flex flex-col gap-y-2' : 'hidden'}>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">User's ID:</span>{task.user?.id}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">User's Email:</span>{task.user?.email}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">District:</span>{districtName}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Ward:</span>{wardName}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Detail Address:</span>{task.detail_address}</p>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}