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

export default function TaskCard({ task }: { task: Task }) {
    const getImageSrc = () => {
        const randomIndex = 4;
        return `/img/taskmanage/task-manage-bg${randomIndex}.jpg`
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div>
            <Card isFooterBlurred className="w-[400px] h-[400px]">
                <Image src={getImageSrc()} alt="" className={`object-cover`} fill />
                <CardHeader className="flex flex-col bg-slate-200">
                    <p className="font-bold text-emerald-700 text-xl">T00{task.id}</p>
                    <p className="font-semibold text-lg">{task.title}</p>
                </CardHeader>
                <CardBody className="p-0">
                    <div className="relative w-full h-full">
                        <div className="top-2/3 left-1/2 absolute flex justify-between items-center bg-gray-200 py-4 pl-2 rounded-lg w-11/12 transform -translate-x-1/2 -translate-y-1/2">
                            <div>
                                <div className="flex items-center mb-2 max-w-[280px] truncate">
                                    <TbChecklist className="mr-1 text-emerald-700 text-xl" />
                                    <span className="mr-1 font-semibold text-emerald-700">Description:</span>{task.description}
                                </div>
                                <p className="flex items-center mb-2 max-w-[280px] truncate"><TbChecklist className="mr-1 text-emerald-700 text-xl" /> <span className="mr-1 font-semibold text-emerald-700">Fee per hour:</span>{task.fee_per_hour}VND /h</p>
                                <p className="flex items-center max-w-[290px] truncate"><TbChecklist className="mr-1 text-emerald-700 text-xl" /> <span className="mr-1 font-semibold text-emerald-700">Duration:</span>{task.estimated_duration} hour</p>
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
                    <div><Button color="success" className="shadow-md mt-2 px-3 py-2 rounded-lg font-semibold text-white">APPLY</Button></div>
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
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">District:</span>{task.district}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Estimated Duration:</span>{task.estimated_duration} hour</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Fee per hour:</span>{task.fee_per_hour}VND /h</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Start Date:</span>{task.start_date.replace("T00:00:00.000Z", "")}</p>
                                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">End Date:</span>{task.end_date.replace("T00:00:00.000Z", "")}</p>
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