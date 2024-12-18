import { TaskCardforUser } from "@/interface/task";
import { Card, CardBody, CardHeader, CardFooter, Tooltip, Button, Avatar, Divider, ScrollShadow } from "@nextui-org/react";
import { Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { FaList } from "react-icons/fa";
import { useState } from "react";
import { TbChecklist } from "react-icons/tb";
import { BiSolidCheckCircle } from "react-icons/bi";

export default function UserCard({ userCard }: { userCard: TaskCardforUser}) {
    const getImageSrc = () => {
        return `/img/taskmanage/task-manage-bg6.jpg`
    }  
    const [ taskDetailVisible, setTaskDetailVisible] = useState(false);
    const [ choseTaskerVisible, setChoseTaskerVisible] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const handleChoseTasker = () => {
        setTaskDetailVisible(false);
        setChoseTaskerVisible(true);
    }

    const handleShowTaskDetails = () => {
        setTaskDetailVisible(true);
        setChoseTaskerVisible(false);
    }

    const renderModalHeader = () => {
        // nếu xem thông tin mà không phải chọn taskers
        if(taskDetailVisible && !choseTaskerVisible) {
            return (
                <div className="flex flex-col">
                    <p className="font-bold text-emerald-700 text-xl">T00{userCard.id}</p>
                    <p className="font-semibold text-lg">{userCard.title}</p>
                </div>
            )
        }
        // nếu chọn tasker mà không phải hiện thông tin task
        if(!taskDetailVisible && choseTaskerVisible) {
            return (
                <div className="font-bold text-emerald-800 text-2xl">
                    Choose your tasker 
                </div>
            )
        }
    }

    const renderModalContent = () => {
          // nếu xem thông tin mà không phải chọn taskers
          if(taskDetailVisible && !choseTaskerVisible) {
            return (
                <div className="flex flex-col gap-y-3">
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">Description:</span>{userCard.description}</p>
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">District:</span>{userCard.district}</p>
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">Street:</span>{userCard.street}</p>
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">Estimated Duration:</span>{userCard.estimated_duration} hour</p>
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">Fee per hour:</span>{userCard.fee_per_hour}VND /h</p>
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">Start Date:</span>{userCard.start_date}</p>
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">End Date:</span>{userCard.end_date}</p>
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">Status:</span>{userCard.task_status}</p>
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">Created At:</span>{userCard.created_at}</p>
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">Number of Taskers applying:</span>{userCard.apply_tasker.length}</p>
                   <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500"/><span className="text-emerald-700 font-semibold mr-1">Chosen Tasker:</span>{userCard.chosen_tasker?.name || ""}</p>
                </div>
            )
        }
        // nếu chọn tasker mà không phải hiện thông tin task
        if(!taskDetailVisible && choseTaskerVisible) {
            return (
                <ScrollShadow className="flex flex-col gap-y-5 max-h-[400px] p-4">
                    {userCard.apply_tasker.map((tasker) => (
                       <div key={tasker.id}>
                            <div className="flex items-center gap-x-3">
                                <Avatar isBordered name={`Ta${tasker.id.toString()}`} size='sm' />
                                <p className="font-semibold">{tasker.name}</p>
                            </div>
                            <div className="flex flex-col gap-y-2 mt-3 bg-gray-200 rounded-xl p-3">
                                <p><span className="text-emerald-700 font-semibold mr-1">Skill:</span>{tasker.skill.join(",")}</p>
                                <p><span className="text-emerald-700 font-semibold mr-1">Experience:</span>{tasker.experience}</p>
                            </div>
                            <Button className="bg-emerald-700 mt-3 font-semibold text-white">Choose this Tasker</Button>
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
            <Image src={getImageSrc()} alt=""  className={`object-cover`} fill />
            <CardHeader className="flex flex-col bg-slate-200">
                <p className="font-bold text-emerald-700 text-xl">T00{userCard.id}</p>
                <p className="font-semibold text-lg">{userCard.title}</p>
            </CardHeader>
            <CardBody className="p-0">
                <div className="w-full h-full relative">
                    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-2/3 left-1/2 bg-gray-200 rounded-lg py-4 pl-2 w-11/12 flex items-center justify-between">
                        <div className="">
                            <p className="truncate mb-2  flex items-center max-w-[290px] "><TbChecklist className="text-emerald-700 mr-1 text-xl"/> <span className="text-emerald-700 font-semibold mr-1">Description:</span>{userCard.description}</p>
                            <p className="truncate mb-2  flex items-center max-w-[290px]"><TbChecklist className="text-emerald-700 mr-1 text-xl"/> <span className="text-emerald-700 font-semibold mr-1">District:</span>{userCard.district}</p>
                            <p className="truncate mb-2  flex items-center max-w-[290px]"><TbChecklist className="text-emerald-700 mr-1 text-xl"/> <span className="text-emerald-700 font-semibold mr-1">Fee per hour:</span>{userCard.fee_per_hour}VND /h</p>
                            <p className="truncate  flex items-center max-w-[290px]"><TbChecklist className="text-emerald-700 mr-1 text-xl"/> <span className="text-emerald-700 font-semibold mr-1">End date:</span>{userCard.end_date}</p>
                        </div>
                        <div>
                            <Tooltip content="View more details">
                                <Button onPress={onOpen} onClick={handleShowTaskDetails}  variant="light" className="text-emerald-700 text-lg"><FaList /></Button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="mt-3 flex flex-col h-[150px]">
                <div className="flex items-center">
                    <span className="mr-5 font-bold text-emerald-800 text-sm">{userCard.apply_tasker.length} Taskers applying : </span>
                    {userCard.apply_tasker.map((tasker) => (
                        <div key={tasker.id}>
                            <Avatar isBordered name={`Ta${tasker.id.toString()}`} size='sm' />
                        </div>
                    ))}
                </div>
                <div>
                    {/* Hiển thị nút Choose Tasker nếu có tasker */}
                    {userCard.apply_tasker.length > 0 && (
                        <Button onPress={onOpen} onClick={handleChoseTasker} className="mt-3 px-4 py-2 bg-emerald-700 text-white font-semibold rounded-lg shadow-md">
                            Choose Tasker
                        </Button>
                    )}
                </div>
                <div><Button color="danger" className="mt-2 px-3 py-2 text-white font-semibold rounded-lg shadow-md">Cancel this Task</Button></div>
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
                    {renderModalContent()}
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