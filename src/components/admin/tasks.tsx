import React from "react";

import {
    Card,
    CardBody,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Chip,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";
import { Mail, Edit, Trash, MoreVertical, MapPin, Clock } from "lucide-react";


interface TaskCardProps {
    task: {
        id: number;
        type: string;
        status: string;
        area: string;
        time: string;
        duration: string;
        price: string;
        description: string;
    };
    onView: (id: number) => void;
    onModify: (id: number) => void;
    onDelete: (id: number) => void;
    onMessage: (id: number) => void;
}


const TaskCard: React.FC<TaskCardProps> = ({
    task,
    onView,
    onModify,
    onDelete,
    onMessage
}) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "posting": return "warning";
            case "pending": return "default";
            case "in progress": return "primary";
            case "completed": return "success";
            case "cancelled": return "danger";
            default: return "default";
        }
    };

    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <Card className="w-full">
            <CardBody>
                <div className="flex justify-between items-start">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{task.type}</h3>
                            <Chip color={getStatusColor(task.status)} size="sm">
                                {task.status}
                            </Chip>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <MapPin size={16} />
                            <span>{task.area}</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-500">
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>{task.time}</span>
                            </div>
                            <div>Duration: {task.duration}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onPress={onOpen}
                            variant="light"
                            onClick={() => onView(task.id)}
                            className="flex"

                        >   
                            View Details
                        </Button>
                        <Modal 
                            isOpen={isOpen} 
                            onClose={onClose}
                            size="2xl"
                        >
                            <ModalContent>
                                <ModalHeader className="flex flex-col gap-1">
                                    Task Details
                                </ModalHeader>
                                <ModalBody>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm text-gray-500">Task Type</h3>
                                            <p className="text-lg font-semibold">{task.type}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-500">Status</h3>
                                            <Chip color={getStatusColor(task.status)} size="sm">
                                                {task.status}
                                            </Chip>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-500">Area</h3>
                                            <p className="flex items-center gap-2">
                                                <MapPin size={16} />
                                                {task.area}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-500">Time</h3>
                                            <p className="flex items-center gap-2">
                                                <Clock size={16} />
                                                {task.time}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-500">Duration</h3>
                                            <p>{task.duration}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-500">Price</h3>
                                            <p>{task.price}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-500">Description</h3>
                                            <p className="text-gray-700">{task.description}</p>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" variant="solid" onPress={onClose}>
                                        I got it
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly variant="light">
                                    <MoreVertical size={20} />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    startContent={<Edit size={20} />}
                                    onClick={() => onModify(task.id)}
                                    description="Modify task details"
                                >
                                    Modify
                                </DropdownItem>
                                <DropdownItem
                                    startContent={<Mail size={20} />}
                                    onClick={() => onMessage(task.id)}
                                    description="Send message to inform user"
                                >
                                    Send Message
                                </DropdownItem>
                                <DropdownItem
                                    startContent={<Trash size={20} />}
                                    className="text-danger"
                                    color="danger"
                                    onClick={() => onDelete(task.id)}
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </CardBody>
        </Card>
        
    );
};

export default TaskCard;