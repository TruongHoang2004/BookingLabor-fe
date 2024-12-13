'use client'
import { useState } from "react";
import { TaskCardforTasker } from "@/interface/task";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    ModalContent,
} from "@nextui-org/react";

export default function TaskCard({ task }: { task: TaskCardforTasker  }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isVisible, setIsVisible] = useState(true);

    const formatTaskId = (id: number) => {
        const letterCode = Math.floor((id - 1) / 9999);
        const letter = String.fromCharCode(65 + letterCode);
        const number = ((id - 1) % 9999) + 1;
        return `${letter}${String(number).padStart(4, "0")}`;
    };

    const taskId = formatTaskId(task.id);

    const handleCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <>
            <div className="flex flex-col gap-4 bg-zinc-100 shadow-xl hover:shadow-lg p-4 rounded-xl h-64 transition-shadow cursor-pointer" onClick={onOpen}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="font-bold text-gray-700">{taskId}</h2>
                        <span className={`px-2 py-1 rounded-full text-sm font-semibold ${task.task_status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : task.task_status === "In Progress"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}>
                            {task.task_status}
                        </span>
                    </div>
                    {task.task_status === "Pending" && (
                        <Button
                            color="danger"
                            size="sm"
                            variant="flat"
                            onClick={(e) => handleCancel(e)}
                        >
                            Cancel
                        </Button>
                    )}
                </div>

                <div className="overflow-hidden space-y-3">
                    <div className="space-y-2">
                        <p className="truncate font-semibold">{task.title}</p>
                        <p className="truncate">{task.description}</p>
                        <p className="truncate">{task.district}</p>
                        <p className="truncate">{task.estimated_duration}</p>
                    </div>
                            <div className="space-y-1">
                                <p className="truncate">Customer: {task.username}</p>
                                {task.task_status === "In Progress" && (
                                    <Button
                                        color="success"
                                        className="w-full mt-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            task.task_status = "Completed";
                                        }}
                                    >
                                        Complete
                                    </Button>
                                )}
                            </div>
                </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
                <ModalContent className="max-h-[80vh]">
                    {(onClose) => (
                        <>
                            <ModalHeader>{taskId}</ModalHeader>
                            <ModalBody className="overflow-y-auto py-4">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <p className="font-semibold">{task.title}</p>
                                        <p className="whitespace-pre-wrap">{task.description}</p>
                                        <p>{task.district}</p>
                                        <p>{task.estimated_duration}</p>
                                        <p>{task.username}</p>
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