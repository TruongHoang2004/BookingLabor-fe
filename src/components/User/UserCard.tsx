import { useState } from 'react';
import { User, Tasker } from "@/types/User";
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

export default function UserCard({ user, taskerList }: { user: User; taskerList: any[] }) {
    const getInitialStatus = () => {
        const appliedLength = Array.isArray(user.applied_tasker_id)
            ? user.applied_tasker_id.length
            : user.applied_tasker_id ? 1 : 0;
        return appliedLength === 0 ? "Posted" : "Pending";
    };

    const [status, setStatus] = useState(getInitialStatus());
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedTaskerId, setSelectedTaskerId] = useState<number | null>(null);
    const [taskerModalOpen, setTaskerModalOpen] = useState(false);
    const [selectedTasker, setSelectedTasker] = useState<Tasker | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    const formatUserId = (id: number) => {
        const letterCode = Math.floor((id - 1) / 9999);
        const letter = String.fromCharCode(65 + letterCode);
        const number = ((id - 1) % 9999) + 1;
        return `${letter}${String(number).padStart(4, '0')}`;
    }
    const userId = formatUserId(user.id);

    const handleChoose = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        const selectedId = user.applied_tasker_id[index];
        setSelectedTaskerId(selectedId);
        user.applied_tasker_id = [selectedId];
        setStatus("In Progress");
    };

    const handleComplete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setStatus("Completed");
    };

    const handleTaskerClick = (taskerId: number) => {
        const tasker = taskerList.find(t => t.id === taskerId);
        if (tasker) {
            setSelectedTasker(tasker);
            setTaskerModalOpen(true);
        }
    };

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
                        <h2 className="font-bold text-gray-700">{userId}</h2>
                        <span className={`px-2 py-1 rounded-full text-sm font-semibold ${status === "Posted"
                            ? "bg-gray-100 text-gray-700"
                            : status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : status === "In Progress"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-green-100 text-green-700"
                            }`}>
                            {status}
                        </span>
                    </div>
                    {(status === "Posted" || status === "Pending") && (
                        <Button
                            color="danger"
                            size="sm"
                            variant="flat"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCancel(e);
                            }}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
                <div className="overflow-hidden">
                    <p className="mb-2 truncate font-semibold">{user.title}</p>
                    <p className="truncate">{user.description}</p>
                    <p className="truncate">{user.location}</p>
                    <p className="truncate">{user.category}</p>
                    <p className="truncate">
                        {"Applied Taskers: "}
                        {Array.isArray(user.applied_tasker_id)
                            ? user.applied_tasker_id.length
                            : user.applied_tasker_id ? 1 : 0}
                    </p>
                </div>
                {status === "In Progress" && (
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

                                    <div className="grid gap-4">
                                        {Array.from({
                                            length: Array.isArray(user.applied_tasker_id)
                                                ? user.applied_tasker_id.length
                                                : user.applied_tasker_id ? 1 : 0
                                        }).map((_, index) => (
                                            <Card key={index} className="shadow-sm">
                                                <CardBody>
                                                    <p className="text-gray-700 flex items-center gap-x-[15px]">
                                                        <span
                                                            className="min-w-[120px] cursor-pointer hover:text-blue-600"
                                                            onClick={() => handleTaskerClick(user.applied_tasker_id[index])}
                                                        >
                                                            {taskerList[user.applied_tasker_id[index] - 1]?.name}
                                                        </span>
                                                        <span className="ml-8 font-semibold">
                                                            {taskerList[user.applied_tasker_id[index] - 1]?.expected_fee} đ
                                                        </span>
                                                        <Modal isOpen={taskerModalOpen} onClose={() => setTaskerModalOpen(false)}>
                                                            <ModalContent>
                                                                <ModalHeader>Tasker Details</ModalHeader>
                                                                <ModalBody>
                                                                    {selectedTasker && (
                                                                        <div className="space-y-4">
                                                                            <p><strong>Name:</strong> {selectedTasker.name}</p>
                                                                            <p><strong>Expected Fee:</strong> {selectedTasker.expected_fee} đ</p>
                                                                            <p><strong>Skills:</strong> {selectedTasker.skill.join(", ")}</p>
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
                                                            disabled={selectedTaskerId !== null}
                                                        >
                                                            {selectedTaskerId === user.applied_tasker_id[index] ? "Selected" : "Choose"}
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