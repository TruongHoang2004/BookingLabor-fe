import { useState } from 'react';
import { TaskCardforUser, Tasker } from "@/interface/task";
import { Card, CardBody } from "@nextui-org/react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    ModalContent,
} from "@nextui-org/react";
import { format } from 'path';

export default function UserCard({ userCard }: { userCard: TaskCardforUser}) {
    ;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [taskerModalOpen, setTaskerModalOpen] = useState(false);
    const [selectedTasker, setSelectedTasker] = useState<Tasker | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    const formatUserId = (id: number) => {
        const letterCode = Math.floor((id - 1) / 9999);
        const letter = String.fromCharCode(65 + letterCode);
        const number = ((id - 1) % 9999) + 1;
        return `${letter}${String(number).padStart(4, '0')}`;
    }

    const handleChoose = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        const selectedTasker = userCard.apply_tasker[index];
        setSelectedTasker(selectedTasker);
        userCard.chosen_tasker = selectedTasker;
        userCard.task_status = "In Progress";
    };

    const handleComplete = (e: React.MouseEvent) => {
        e.stopPropagation();
        userCard.task_status = "Completed";
    };

    const handleTaskerClick = (taskerId: number) => {
        const tasker = userCard.apply_tasker.find(t => t.id === taskerId);
        if (tasker) {
            setSelectedTasker(tasker);
            setTaskerModalOpen(true);
        }
    };

    const taskID = formatUserId(userCard.id);

    const handleCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsVisible(false); // Hide the card
    };

    if (!isVisible) return null; // Don't render the card if it's not visible

    return (
        <>
            <div className="flex flex-col gap-4 bg-zinc-100 shadow-xl hover:shadow-lg p-4 rounded-xl h-64 transition-shadow cursor-pointer" onClick={onOpen}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="font-bold text-gray-700">{taskID}</h2>
                        <span className={`px-2 py-1 rounded-full text-sm font-semibold ${userCard.task_status === "Posted"
                            ? "bg-gray-300 text-gray-700"
                            : userCard.task_status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : userCard.task_status === "In Progress"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-green-100 text-green-700"
                            }`}>
                            {userCard.task_status}
                        </span>
                    </div>
                    {(userCard.task_status === "Posted" || userCard.task_status === "Pending") && (
                        <Button
                            color="danger"
                            size="sm"
                            variant="flat"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCancel(e);
                            }}
                            className='px-2'
                        >
                            Cancel
                        </Button>
                    )}
                </div>
                <div className="overflow-hidden">
                    <p className="mb-2 truncate font-semibold">{userCard.title}</p>
                    <p className="truncate">{userCard.description}</p>
                    <p className="truncate">{userCard.district}</p>
                    <p className="truncate">{userCard.estimated_duration}</p>
                    <p className="truncate">
                        {"Applied Taskers: "}
                        {Array.isArray(userCard.apply_tasker)
                            ? userCard.apply_tasker.length
                            : userCard.apply_tasker ? 1 : 0}
                    </p>
                </div>
                {userCard.task_status === "In Progress" && (
                    <div className="mt-auto">
                        <Button
                            color="success"
                            className="w-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleComplete(e);
                            }}
                        >
                            Complete
                        </Button>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="3xl"
            >
                <ModalContent className="max-h-[80vh]">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {formatUserId(userCard.id)}
                            </ModalHeader>
                            <ModalBody className="overflow-y-auto py-4">
                                <div className="bg-gray-200 p-2 rounded-lg w-full mb-4">
                                    <h2 className="font-bold text-gray-700">{userCard.id}</h2>
                                </div>
                                <div className="space-y-4">
                                    <p className="mb-2 font-semibold">{userCard.title}</p>
                                    <p className="whitespace-pre-wrap">{userCard.description}</p>
                                    <p>{userCard.district}</p>
                                    <p>{userCard.estimated_duration}</p>

                                    <div className="grid gap-4">
                                        {Array.from({
                                            length: Array.isArray(userCard.apply_tasker)
                                                ? userCard.apply_tasker.length
                                                : userCard.apply_tasker ? 1 : 0
                                        }).map((_, index) => (
                                            <Card key={index} className="shadow-sm">
                                                <CardBody>
                                                    <p className="text-gray-700 flex items-center gap-x-[15px]">
                                                        <span
                                                            className="min-w-[120px] cursor-pointer hover:text-blue-600"
                                                            onClick={() => handleTaskerClick(userCard.apply_tasker[index].id)}
                                                        >
                                                            {userCard.apply_tasker[index].name}
                                                        </span>
                                                        <Modal isOpen={taskerModalOpen} onClose={() => setTaskerModalOpen(false)}>
                                                            <ModalContent>
                                                                <ModalHeader>Tasker Details</ModalHeader>
                                                                <ModalBody>
                                                                    {selectedTasker && (
                                                                        <div className="space-y-4">
                                                                            <p><strong>Name:</strong> {selectedTasker.name}</p>
                                                                            <p><strong>Skills:</strong> {selectedTasker.skill.join(",")}</p>
                                                                            <p><strong>Experience:</strong> {selectedTasker.experience}</p>
                                                                        </div>
                                                                    )}
                                                                </ModalBody>
                                                            </ModalContent>
                                                        </Modal>
                                                        <Button
                                                            style={{ backgroundColor: "#777777", color: "white" }}
                                                            size="sm"
                                                            onClick={(e) => {
                                                                handleChoose(e, index);
                                                            }}
                                                            disabled={selectedTasker !== null}
                                                        >
                                                            {selectedTasker === userCard.chosen_tasker ?   "Choose" : "Selected"}
                                                        </Button>
                                                    </p>
                                                </CardBody>
                                            </Card>
                                        ))}
                                    </div>
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
        </>
    );
}