'use client'
import React from "react";
import { Task } from "@/interface/task";
import { useState, useEffect } from "react";
import { locationService } from "@/service/location/location";
import { 
    Card,
    CardBody,
    Button,
    Chip,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";
import { Trash, Badge, MapPin, Clock } from "lucide-react";
import { taskService } from "@/service/task/task";
import { useRouter } from "next/navigation";

interface TaskCardProps {
    tasks: Task[];
    onView: (id: number) => void;
    onDelete: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
    tasks,
    onView,
    onDelete,
}) => {
    const router = useRouter();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [districtNames, setDistrictNames] = useState<string>('');

    useEffect(() => {
        const fetchDistrictNames = async (task: Task) => {
            try {
                if (task.district) {
                    const names = await locationService.getDistrict(task.district);
                    setDistrictNames(names);
                }
            } catch (error) {
                console.error('Error fetching district names:', error);
                setDistrictNames('Error loading districts');
            } 
        };

        tasks.forEach(task => fetchDistrictNames(task));
    }, [tasks]);

    const handleDelete = async (task: Task) => {
        try {
            await taskService.deleteMe(task);
            onDelete(task); // Pass the task to the onDelete callback
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "posted": return "default";
            case "pending": return "warning";
            case "in_progress": return "primary";
            case "completed": return "success";
            case "cancelled": return "danger";
            default: return "default";
        }
    };

    return (
        <>
            {tasks.map((task) => (
                <Card key={task.id} className="w-full">
                    <CardBody>
                        <div className="flex justify-between items-start">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-semibold">{task.title}</h3>
                                    <Chip color={getStatusColor(task.task_status)} size="sm">
                                        {task.task_status}
                                    </Chip>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <MapPin size={16} />
                                    <span>{districtNames}</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} />
                                        <span> {new Date(task.start_date).toLocaleDateString()}</span>
                                    </div>
                                    <div>Duration: {task.estimated_duration} h </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Badge size={16} />
                                    <span> Skill: {task.skill?.name || "No Skill"}</span>
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
                                                    <h3 className="text-sm text-gray-500">Task Title</h3>
                                                    <p className="text-lg font-semibold">{task.title}</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm text-gray-500">Status</h3>
                                                    <Chip color={getStatusColor(task.task_status)} size="sm">
                                                        {task.task_status}
                                                    </Chip>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm text-gray-500">Area</h3>
                                                    <p className="flex items-center gap-2">
                                                        <MapPin size={16} />
                                                        {districtNames || task.district}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm text-gray-500">Skill</h3>
                                                    <p className="flex items-center gap-2">
                                                        <Badge size={16} />
                                                        {task.skill?.name || "No skill"}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm text-gray-500">Time</h3>
                                                    <p className="flex items-center gap-2">
                                                        <Clock size={16} />
                                                        {task.start_date}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm text-gray-500">Duration</h3>
                                                    <p>{task.estimated_duration} h</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm text-gray-500">Price</h3>
                                                    <p>{task.fee_per_hour} VNĐ</p>
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
                                <Button
                                    startContent={<Trash size={20} />}
                                    className="text-white"
                                    color="danger"
                                    onClick={() => handleDelete(task)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </>
    );
};

export default TaskCard;