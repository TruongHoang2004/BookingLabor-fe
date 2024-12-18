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
import { locationService } from "@/service/location/location";
import { useState, useEffect } from "react";
import { taskService } from "@/service/task/task";
import toast from "react-hot-toast";

export default function TaskCard({ task, isAccepted, setIsAccepted }: { task: Task; isAccepted: boolean; setIsAccepted: React.Dispatch<React.SetStateAction<boolean>>; }) {


    const [districtName, setDistrictName] = useState<string>("");
    const getImageSrc = () => {
        const randomIndex = 1;
        return `/img/taskmanage/task-manage-bg${randomIndex}.jpg`
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Chỉ lấy phần yyyy-mm-dd
    };

    useEffect(() => {
        const fetchLocationNames = async () => {
            try {
                const district_ = await locationService.getDistrict(task.district);
                //const ward = await locationService.getWard(task.ward);
                setDistrictName(district_);
                //setWardName(ward);
            } catch (error) {
                console.error("Failed to fetch district or ward name:", error);
            }
        };

        fetchLocationNames();
    }, [task.district, task.ward]);

    const handleAccept = async () => {
        try {
            await taskService.acceptTask(task.id); // Gọi hàm service với task.id
            toast.success("Xác nhận thành công!"); // Thông báo thành công
            setIsAccepted(!isAccepted)
        } catch (error) {
            toast.error("Xác nhận thất bại!"); // Thông báo lỗi
            console.error("Lỗi khi xác nhận:", error);
        }
    };


    return (
        <div>
            <Card isFooterBlurred className="w-[400px] h-[450px]">
                <Image src={getImageSrc()} alt="" className={`object-cover`} fill />
                <CardHeader className="flex flex-col bg-slate-200">
                    <p className="font-bold text-emerald-700 text-xl">T00{task.id}</p>
                    <p className="font-semibold text-lg">{task.title}</p>
                </CardHeader>
                <CardBody className="p-0">
                    <div className="relative w-full h-full">
                        <div className="top-2/3 left-1/2 absolute flex justify-between items-center bg-gray-200 py-4 pl-2 rounded-lg w-11/12 transform -translate-x-1/2 -translate-y-1/2">
                            <div>
                                <p className="flex items-center mb-2 max-w-[290px] truncate"><TbChecklist className="mr-1 text-emerald-700 text-xl" /> <span className="mr-1 font-semibold text-emerald-700">Description:</span>{task.description}</p>
                                <p className="flex items-center mb-2 max-w-[290px] truncate"><TbChecklist className="mr-1 text-emerald-700 text-xl" /> <span className="mr-1 font-semibold text-emerald-700">Fee per hour:</span>{task.fee_per_hour}VND /h</p>
                                <p className="flex items-center max-w-[290px] truncate"><TbChecklist className="mr-1 text-emerald-700 text-xl" /> <span className="mr-1 font-semibold text-emerald-700">End date:</span>{formatDate(task.end_date)}</p>
                            </div>
                            <div>
                                <Tooltip content="View more details">
                                    <Button onPress={onOpen} variant="light" className="text-emerald-700 text-lg"><FaList /></Button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="flex flex-col mt-3 h-[150px]">
                    <div>
                        {/* Hiển thị nút nút tương ứng với các trạng thái  */}
                        {task.task_status === 'IN_PROGRESS' ? (
                            <div><Button color="success" className="mt-2 px-3 py-2 text-white font-semibold rounded-lg shadow-md">Completion Confirmation</Button></div>
                        ) : (
                            <div></div>
                        )}
                        {task.task_status === 'PENDING' ? (
                            <div className="flex flex-col gap-y-2 justify-center items-center">
                                <Button onClick={handleAccept} color="success" className="mt-2 px-3 py-2 text-white font-semibold rounded-lg shadow-md">Accept Task</Button>
                                <Button color="danger" className="mt-2 px-3 py-2 text-white font-semibold rounded-lg shadow-md">Decline Task</Button>
                            </div>
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
                            <ModalBody>
                                <div className="flex flex-col gap-y-3">
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Description:</span>{task.description}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">District:</span>{districtName}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Ward:</span>{task.ward}</p>
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