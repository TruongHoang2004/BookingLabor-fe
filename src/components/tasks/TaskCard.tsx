import { useState } from 'react';
import { Task } from "@/types/Task";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    ModalContent,
} from "@nextui-org/react";

export default function TaskCard({ task }: { task: Task }) {
    const [status, setStatus] = useState("In Progress");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const formatTaskId = (id: number) => {
        const letterCode = Math.floor((id - 1) / 9999);
        const letter = String.fromCharCode(65 + letterCode);
        const number = ((id - 1) % 9999) + 1;
        return `${letter}${String(number).padStart(4, '0')}`;
    }
    const taskId = formatTaskId(task.id);

    return (
        <>
            <div className="flex flex-col gap-4 bg-zinc-100 shadow-xl hover:shadow-lg p-4 rounded-xl h-64 transition-shadow cursor-pointer" onClick={onOpen}>
                <div className="flex items-center gap-2">
                    <h2 className="font-bold text-gray-700">{taskId}</h2>
                    <span className={`px-2 py-1 rounded-full text-sm font-semibold ${status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                        {status}
                    </span>
                </div>
                <div className="overflow-hidden">
                    <p className="mb-2 truncate">{task.title}</p>
                    <p className="truncate">{task.description}</p>
                    <p className="truncate">{task.location}</p>
                    <p className="truncate">{task.category}</p>
                </div>
                {status !== "Completed" && (
                    <div className="mt-auto">
                        <Button
                            color="success"
                            className="w-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                setStatus("Completed");
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
                                {formatTaskId(task.id)}
                            </ModalHeader>
                            <ModalBody className="overflow-y-auto py-4"> {/* Enable scroll */}
                                <div className="bg-gray-200 p-2 rounded-lg w-full mb-4">
                                    <h2 className="font-bold text-gray-700">{taskId}</h2>
                                </div>
                                <div className="space-y-4"> {/* Add spacing between content */}
                                    <p className="mb-2 font-semibold">{task.title}</p>
                                    <p className="whitespace-pre-wrap">{task.description}</p>
                                    <p>{task.location}</p>
                                    <p>{task.category}</p>
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