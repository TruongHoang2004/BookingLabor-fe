'use client'
import { Task } from "@/interface/task";
import { Card, CardBody, CardHeader, CardFooter, Tooltip, Button, Avatar, Divider, ScrollShadow } from "@nextui-org/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter, useDisclosure
} from "@nextui-org/react";
import Image from "next/image";
import { FaList } from "react-icons/fa";
import { useState } from "react";
import { TbChecklist } from "react-icons/tb";
import { BiSolidCheckCircle } from "react-icons/bi";
import { taskService } from "@/service/task/task";
import { locationService } from "@/service/location/location1";
import toast from "react-hot-toast";
//import TaskCard from "../Tasker/TaskCard";


const location = new locationService();

export default function UserCard({
    userCard,
    isTaskerChosen,
    setTaskChosen,

}: {
    userCard: Task;
    isTaskerChosen: boolean;
    setTaskChosen: React.Dispatch<React.SetStateAction<boolean>>;

}) {
    const getImageSrc = () => {
        return `/img/taskmanage/task-manage-bg6.jpg`
    }


    // const router = useRouter();
    const [taskDetailVisible, setTaskDetailVisible] = useState(false);
    const [choseTaskerVisible, setChoseTaskerVisible] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleChoseTasker = () => {
        setTaskDetailVisible(false);
        setChoseTaskerVisible(true);
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

    const formatDate = (date: string) => {
        return date.slice(0, 10);
    }

    const handleShowTaskDetails = () => {
        setTaskDetailVisible(true);
        setChoseTaskerVisible(false);
    }

    const renderModalHeader = () => {
        // nếu xem thông tin mà không phải chọn taskers
        if (taskDetailVisible && !choseTaskerVisible) {
            return (
                <div className="flex flex-col">
                    <p className="font-bold text-emerald-700 text-xl">{formatID(userCard.id)}</p>
                    <p className="font-semibold text-lg">{userCard.title}</p>
                </div>
            )
        }
        // nếu chọn tasker mà không phải hiện thông tin task
        if (!taskDetailVisible && choseTaskerVisible) {
            return (
                <div className="font-bold text-emerald-800 text-2xl">
                    Choose your tasker
                </div>
            )
        }
    }

    const chooseTasker = async (task_id: number, tasker_id: number) => {
        await taskService.userChooseTasker(task_id, tasker_id);
        setTaskChosen(!isTaskerChosen)
    }


    const handleUserCancelTask = async () => {
        try {
            await taskService.UserCancelTask(userCard.id); // Gọi hàm service với task.id
            toast.success("Xác nhận thành công!"); // Thông báo thành công
            setTaskChosen(!isTaskerChosen); // Cập nhật lại trạng thái



        } catch (error) {
            toast.error("Xác nhận thất bại!"); // Thông báo lỗi
            console.error("Lỗi khi xác nhận:", error);
        }
    };

    const renderModalContent = (onClose: () => void) => {
        // nếu xem thông tin mà không phải chọn taskers
        if (taskDetailVisible && !choseTaskerVisible) {
            return (
                <div className="flex flex-col gap-y-3">
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500 flex-shrink-0" /><span className="text-emerald-700 font-semibold mr-2">Description:</span>{userCard.description}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500 flex-shrink-0" /><span className="text-emerald-700 font-semibold mr-2">Skill:</span>{userCard.skill?.name}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="text-emerald-700 font-semibold mr-1">District:</span>{location.getDistrictByCode(parseInt(userCard.district, 10))?.name}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="text-emerald-700 font-semibold mr-1">Ward:</span>{location.getWardByCode(parseInt(userCard.ward, 10))?.name}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="text-emerald-700 font-semibold mr-1">Estimated Duration:</span>{userCard.estimated_duration} hours</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="text-emerald-700 font-semibold mr-1">Fee per hour:</span>{userCard.fee_per_hour}VND /h</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="text-emerald-700 font-semibold mr-1">Start Date:</span>{userCard.start_date.replaceAll("T00:00:00.000Z", "")}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="text-emerald-700 font-semibold mr-1">End Date:</span>{userCard.end_date.replaceAll("T00:00:00.000Z", "")}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="text-emerald-700 font-semibold mr-1">Status:</span>{userCard.task_status}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="text-emerald-700 font-semibold mr-1">Created At:</span>{userCard.created_at && formatDate(userCard.created_at)}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="text-emerald-700 font-semibold mr-1">Number of Taskers applying:</span>{userCard.taskers && userCard.taskers.length}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="text-emerald-700 font-semibold mr-1">Chosen Tasker's ID:</span>{userCard?.tasker?.id}</p>
                </div>
            )
        }
        // nếu chọn tasker mà không phải hiện thông tin task
        if (!taskDetailVisible && choseTaskerVisible) {
            return (
                <ScrollShadow className="flex flex-col gap-y-5 max-h-[400px] p-4">
                    {userCard.taskers && userCard.taskers.map((tasker) => (
                        <div key={tasker.id}>
                            <div className="flex items-center gap-x-3">
                                <Avatar isBordered name={`T${tasker.id}`} size='sm' />
                                <p className="font-semibold">Tasker's ID: {tasker.id}</p>
                            </div>
                            <div className="flex flex-col gap-y-2 mt-3 bg-gray-200 rounded-xl p-3">
                                <div className="flex jsutify-start gap-x-2">
                                    <span className="text-emerald-700 font-semibold mr-1">Skill:</span>
                                    <div>
                                        {tasker.skills.map((s) => (
                                            <p key={s.id} className="mb-1 flex items-center"><BiSolidCheckCircle className="text-emerald-500 flex-shrink-0 mr-1" />{s.name}</p>
                                        ))}
                                    </div>
                                </div>
                                <p><span className="text-emerald-700 font-semibold mr-1">Experience:</span>{tasker.experience}</p>
                            </div>
                            <Button onPress={onClose} className="bg-emerald-700 mt-3 font-semibold text-white" onClick={() => { chooseTasker(userCard.id, tasker.id) }}>Choose this Tasker</Button>
                            <Divider className="mt-5" />
                        </div>
                    ))}
                </ScrollShadow>
            )
        }
    }

    return (
        <div>
            <Card isFooterBlurred className="w-[400px] h-[450px]">
                <Image src={getImageSrc()} alt="" className={`object-cover`} fill />
                <CardHeader className="flex flex-col bg-slate-200">
                    <p className="font-bold text-emerald-700 text-xl">{formatID(userCard.id)}</p>
                    <p className="font-semibold text-lg">{userCard.title}</p>
                    <p className={`truncate mt-2 flex items-center max-w-[290px] ${userCard.task_status === 'CANCELLED'
                        ? 'bg-red-500'
                        : 'bg-emerald-400'
                        } rounded-xl p-2 font-bold`}>
                        <span className="text-emerald-900 font-semibold mr-1">Status:</span>
                        {userCard.task_status}
                    </p>
                </CardHeader>
                <CardBody className="p-0">
                    <div className="w-full h-full relative">
                        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-2/3 left-1/2 bg-gray-200 rounded-lg py-4 pl-2 w-11/12 flex items-center justify-between">
                            <div className="">
                                <p className="truncate mb-2  flex items-center max-w-[290px] "><TbChecklist className="text-emerald-700 mr-1 text-xl" /> <span className="text-emerald-700 font-semibold mr-1">Duration:</span>{userCard.estimated_duration} hours</p>
                                <p className="truncate mb-2  flex items-center max-w-[290px]"><TbChecklist className="text-emerald-700 mr-1 text-xl" /> <span className="text-emerald-700 font-semibold mr-1">Fee per hour:</span>{userCard.fee_per_hour} VND/h</p>
                                <p className="truncate  flex items-center max-w-[290px]"><TbChecklist className="text-emerald-700 mr-1 text-xl" /> <span className="text-emerald-700 font-semibold mr-1">End date:</span>{userCard.end_date.replaceAll("T00:00:00.000Z", "")}</p>
                            </div>
                            <div>
                                <Tooltip content="View more details">
                                    <Button onPress={onOpen} onClick={handleShowTaskDetails} variant="light" className="text-emerald-700 text-lg"><FaList /></Button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="mt-3 flex flex-col h-[150px]">
                    <div className="mr-5 font-bold text-emerald-800 text-sm">
                        {/* Nếu trạng thái không phải là in progress thì hiển thị ra Các tasker đang apply nếu có */}
                        {userCard.task_status !== 'IN_PROGRESS' ? (
                            <div className="flex items-center" >
                                <span>{userCard.taskers && userCard.taskers.length} Taskers applying :</span>
                                {userCard.taskers && userCard.taskers.map((tasker) => (
                                    <div key={tasker.id}>
                                        <Avatar isBordered name={`T${tasker.id.toString()}`} size='sm' />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-md font-bold">Chosen Tasker's ID: {userCard.tasker?.id}</p>
                        )}
                    </div>

                    <div>
                        {/* Hiển thị nút nút tương ứng với các trạng thái  */}
                        {userCard.task_status === 'IN_PROGRESS' ? (
                            <div><Button color="success" className="mt-2 px-3 py-2 text-white font-semibold rounded-lg shadow-md">Completion Confirmation</Button></div>
                        ) : (
                            <div></div>
                        )}
                        {userCard.task_status === 'PENDING' ? (
                            <div className="text-sm bg-emerald-800 rounded-xl p-3 font-bold text-center mt-6 text-white">Waiting for Tasker's Final Confirmation</div>
                        ) : (
                            <div></div>
                        )}
                        {/* Hiển thị nút Choose Tasker nếu có tasker và chưa có tasker nào được chọn */}
                        {userCard.task_status === 'POSTED' && userCard.taskers && userCard.taskers.length > 0 && (
                            <Button onPress={onOpen} onClick={handleChoseTasker} className="mt-3 px-4 py-2 bg-emerald-700 text-white font-semibold rounded-lg shadow-md">
                                Choose Tasker
                            </Button>
                        )}
                        {userCard.task_status === 'POSTED' ? (
                            <div><Button onClick={handleUserCancelTask} color="danger" className="mt-2 px-3 py-2 text-white font-semibold rounded-lg shadow-md">Cancel this Task</Button></div>
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
                            <ModalHeader>
                                {renderModalHeader()}
                            </ModalHeader>
                            <ModalBody>
                                {renderModalContent(onClose)}
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