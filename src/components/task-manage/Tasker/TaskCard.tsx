import { TaskCardforTasker } from "@/interface/task";
import { Card, CardBody, CardHeader, CardFooter, Tooltip, Button } from "@nextui-org/react";
import { Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { FaList } from "react-icons/fa";
import { TbChecklist } from "react-icons/tb";
import { BiSolidCheckCircle } from "react-icons/bi";

export default function TaskCard({ task }: { task: TaskCardforTasker  }) {
    const getImageSrc = () => {
        const randomIndex = Math.floor(Math.random() * 3) + 1;
        return `/img/taskmanage/task-manage-bg${randomIndex}.jpg`
    }  

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
    <div>
        <Card isFooterBlurred className="w-[400px] h-[450px]">
            <Image src={getImageSrc()} alt=""  className={`object-cover`} fill />
            <CardHeader className="flex flex-col bg-slate-200">
                <p className="font-bold text-emerald-700 text-xl">T00{task.id}</p>
                <p className="font-semibold text-lg">{task.title}</p>
            </CardHeader>
            <CardBody className="p-0">
                <div className="w-full h-full relative">
                    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-2/3 left-1/2 bg-gray-200 rounded-lg py-4 pl-2 w-11/12 flex items-center justify-between">
                        <div>
                            <p className="truncate mb-2  flex items-center"><TbChecklist className="text-emerald-700 mr-1 text-xl"/> <span className="text-emerald-700 font-semibold mr-1">Description:</span>{task.description}</p>
                            <p className="truncate mb-2  flex items-center"><TbChecklist className="text-emerald-700 mr-1 text-xl"/> <span className="text-emerald-700 font-semibold mr-1">Fee per hour:</span>{task.estimated_duration}$ /h</p>
                            <p className="truncate  flex items-center"><TbChecklist className="text-emerald-700 mr-1 text-xl"/> <span className="text-emerald-700 font-semibold mr-1">End date:</span>{task.fee_per_hour}</p>
                        </div>
                        <div>
                            <Tooltip content="View more details">
                                <Button onPress={onOpen} variant="light" className="text-emerald-700 text-lg"><FaList /></Button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="mt-3 flex flex-col h-[150px]">
                <div><Button color="danger" className="mt-2 px-3 py-2 text-white font-semibold rounded-lg shadow-md">Cancel this Task</Button></div>
                <div><Button color="success" className="mt-2 px-3 py-2 text-white font-semibold rounded-lg shadow-md">Complete Comfirmation</Button></div>
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
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">Description:</span>{task.description}</p>
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">District:</span>{task.district}</p>
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">Description:</span>Estimated Duration{task.estimated_duration}</p>
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">Fee per hour:</span>{task.fee_per_hour}$ /h</p>
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">Start Date:</span>{task.start_date}</p>
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">End Date:</span>{task.end_date}</p>
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">Status:</span>{task.task_status}</p>
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