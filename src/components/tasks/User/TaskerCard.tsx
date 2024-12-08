import { useState } from 'react';
import { User } from "@/types/User";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    ModalContent,
} from "@nextui-org/react";

export default function TaskerCard({ user }: { user: User }) {
    const [status, setStatus] = useState("Pending");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const formatUserId = (id: number) => {
        const letterCode = Math.floor((id - 1) / 9999);
        const letter = String.fromCharCode(65 + letterCode);
        const number = ((id - 1) % 9999) + 1;
        return `${letter}${String(number).padStart(4, '0')}`;
    }
    const userId = formatUserId(user.id);

    return (
        <>
            <div className="flex flex-col gap-4 bg-zinc-100 shadow-xl hover:shadow-lg p-4 rounded-xl h-64 transition-shadow cursor-pointer" onClick={onOpen}>
                <div className="flex items-center gap-2">
                    <h2 className="font-bold text-gray-700">{userId}</h2>
                    <span className={`px-2 py-1 rounded-full text-sm font-semibold ${status === "Pending"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-blue-100 text-blue-700"
                        }`}>
                        {status}
                    </span>
                </div>
                <div className="overflow-hidden">
                    <p className="mb-2 truncate">{user.title}</p>
                    <p className="truncate">{user.description}</p>
                    <p className="truncate">{user.location}</p>
                    <p className="truncate">{user.category}</p>
                </div>
                {status === "Pending" && (
                    <div className="mt-auto">
                        <Button
                            color="warning"
                            className="w-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                setStatus("In Progress");
                            }}
                        >
                            Choose
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
                                {formatUserId(user.id)}
                            </ModalHeader>
                            <ModalBody className="overflow-y-auto py-4">
                                <div className="bg-gray-200 p-2 rounded-lg w-full mb-4">
                                    <h2 className="font-bold text-gray-700">{userId}</h2>
                                </div>
                                <div className="space-y-4">
                                    <p className="mb-2 font-semibold">{user.title}</p>
                                    <p className="whitespace-pre-wrap">{user.description}</p>
                                    <p>{user.location}</p>
                                    <p>{user.category}</p>
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