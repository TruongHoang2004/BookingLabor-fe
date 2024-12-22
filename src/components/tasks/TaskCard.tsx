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

export default function TaskCard({ task }: { task: Task }) {
    const getImageSrc = () => {
        const Index = task.skill?.id;
        return Index?  `/img/taskmanage/task-manage-${Index}.jpg` : '/img/taskmanage/default-task.jpg';
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

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Chỉ lấy phần yyyy-mm-dd
    };

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleApply = async () => {
        try {
            await taskService.applyTask(task.id); // Gọi hàm service với task.id
            toast.success("Ứng tuyển thành công!"); // Thông báo thành công
        } catch (error) {
            toast.error("Ứng tuyển thất bại!"); // Thông báo lỗi
            console.error("Lỗi khi ứng tuyển:", error);
        }
    };

    return (
        <div>
            <Card isFooterBlurred className="w-[400px] h-[400px]">
                <Image src={getImageSrc()} alt="" className={`object-cover`} fill />
                <CardHeader className="flex flex-col bg-slate-200">
                    <p className="font-bold text-emerald-700 text-xl">{formatID(task.id)}</p>
                    <p className="font-semibold text-lg">{task.title}</p>
                    <p className="truncate mt-2 flex items-center max-w-[290px] bg-emerald-400 rounded-xl p-2 font-bold"><span className="text-emerald-900 font-semibold mr-1 ">Status:</span>{task.task_status}</p>
                </CardHeader>
                <CardBody className="p-0">
                    <div className="relative w-full h-full">
                        <div className="top-2/3 left-1/2 absolute flex justify-between items-center bg-gray-200 py-4 pl-2 rounded-lg w-11/12 transform -translate-x-1/2 -translate-y-1/2">
                            <div>
                                <p className="truncate mb-2  flex items-center max-w-[290px] "><TbChecklist className="text-emerald-700 mr-1 text-xl" /> <span className="text-emerald-700 font-semibold mr-1">Duration:</span>{task.estimated_duration} hours</p>
                                <p className="truncate mb-2  flex items-center max-w-[290px]"><TbChecklist className="text-emerald-700 mr-1 text-xl" /> <span className="text-emerald-700 font-semibold mr-1">Fee per hour:</span>{task.fee_per_hour} VND/h</p>
                                <p className="truncate  flex items-center max-w-[290px]"><TbChecklist className="text-emerald-700 mr-1 text-xl" /> <span className="text-emerald-700 font-semibold mr-1">End date:</span>{task.end_date.replaceAll("T00:00:00.000Z", "")}</p>
                            </div>
                            <div>
                                <Tooltip content="View more details">
                                    <Button onPress={onOpen} variant="light" className="text-emerald-700 text-lg"><FaList /></Button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="flex flex-col mt-3 h-[100px]">
                    <div><Button onPress={handleApply} color="success" className="shadow-md mt-2 px-3 py-2 rounded-lg font-semibold text-white">APPLY</Button></div>
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
                            <ModalBody>
                                <div className="flex flex-col gap-y-3">
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Skill:</span>{task.skill?.name}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Description:</span>{task.description}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Estimated Duration:</span>{task.estimated_duration}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Fee per hour:</span>{task.fee_per_hour}VND /h</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Start Date:</span>{formatDate(task.start_date)}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">End Date:</span>{formatDate(task.end_date)}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Status:</span>{task.task_status}</p>
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