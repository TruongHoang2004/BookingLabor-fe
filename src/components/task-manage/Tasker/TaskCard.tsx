'use client'
import { useState } from "react";
import { Task } from "@/types/Tasks";
import { Customer } from "@/types/User";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    ModalContent,
} from "@nextui-org/react";

export default function TaskCard({ task, customerList }: { task: Task; customerList: Customer[] }) {
    const getInitialStatus = () => {
        const hasAssignedCustomers = Array.isArray(task.assigned_customer_id)
            ? task.assigned_customer_id.length > 0
            : task.assigned_customer_id !== null;
        return hasAssignedCustomers ? "In Progress" : "Pending";
    };

    const [status, setStatus] = useState(getInitialStatus());
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
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <h2 className="font-bold text-gray-700">{taskId}</h2>
                        <span className={`px-2 py-1 rounded-full text-sm font-semibold ${status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : status === "In Progress"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}>
                            {status}
                        </span>
                    </div>
                    {status === "Pending" && (
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

                <div className="space-y-3 overflow-hidden">
                    <div className="space-y-2">
                        <p className="font-semibold truncate">{task.title}</p>
                        <p className="truncate">{task.description}</p>
                        <p className="truncate">{task.location}</p>
                        <p className="truncate">{task.category}</p>
                    </div>

                    {customerList
                        .filter((customer) =>
                            Array.isArray(task.assigned_customer_id)
                                ? task.assigned_customer_id.includes(customer.id)
                                : task.assigned_customer_id === customer.id
                        )
                        .map((customer) => (
                            <div key={customer.id} className="space-y-1">
                                <p className="truncate">{customer.name}</p>
                                {status === "In Progress" && (
                                    <Button
                                        color="success"
                                        className="mt-2 w-full"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setStatus("Completed");
                                        }}
                                    >
                                        Complete
                                    </Button>
                                )}
                            </div>
                        ))}
                </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
                <ModalContent className="max-h-[80vh]">
                    {(onClose) => (
                        <>
                            <ModalHeader>{taskId}</ModalHeader>
                            <ModalBody className="py-4 overflow-y-auto">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <p className="font-semibold">{task.title}</p>
                                        <p className="whitespace-pre-wrap">{task.description}</p>
                                        <p>{task.location}</p>
                                        <p>{task.category}</p>
                                    </div>
                                    <p className="font-semibold"> Customer Detail </p>
                                    {customerList
                                        .filter((customer) =>
                                            Array.isArray(task.assigned_customer_id)
                                                ? task.assigned_customer_id.includes(customer.id)
                                                : task.assigned_customer_id === customer.id
                                        )
                                        .map((customer) => (
                                            <div key={customer.id} className="space-y-3">
                                                <p>{customer.name}</p>
                                                <p>{customer.description}</p>
                                            </div>
                                        ))}
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