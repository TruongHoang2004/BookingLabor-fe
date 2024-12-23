'use client'
import React from "react";
import { Task } from "@/interface/task";
import { useState, useEffect } from "react";
import { locationService as locations } from "@/service/location/location1";
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
import { Badge, MapPin, Clock } from "lucide-react";
import { taskService } from "@/service/task/task";     

interface TaskCardProps {
    task: Task;
    onView: (id: number) => void;
    isReloaded: boolean; 
    setIsReloaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskCard: React.FC<TaskCardProps> = ({
    task,
    onView,
    isReloaded,
    setIsReloaded
}) => {
    const [districtNames, setDistrictNames] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchDistrictNames = async () => {
        try {
          if (task.district) {
            const d = await locations.getDistrictByCode(parseInt(task.district,10));
            if(d) {
                setDistrictNames((d).name)
            } else {
                setDistrictNames("Unvalid District Code")
            }
          }
        } catch (error) {
          console.error('Error fetching district names:', error);
          setDistrictNames('Error loading districts');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchDistrictNames();
    }, [task.district]);
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
    const {isOpen, onOpen, onClose} = useDisclosure();

    const hanldeTaskerAcceptForTaskerByAdmin = async () => {
        await taskService.confirmPaymentForAdmin(task.id);
        setIsReloaded(!isReloaded)
    }

    return (
        
        <Card className="w-full">
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
                                                {isLoading ? 'Loading...' : districtNames || task.district}
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
                                                {new Date(task.start_date).toLocaleDateString()}
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
                                    {task.task_status === "PAYMENT_CONFIRM" && (
                                        <Button color="primary" variant="solid" onClick={hanldeTaskerAcceptForTaskerByAdmin}>
                                            Cofirm Taskes's Payment
                                        </Button>
                                    )}
                                   
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" variant="solid" onPress={onClose}>
                                        I got it
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </div>
                </div>
            </CardBody>
        </Card>
        
    );
};

export default TaskCard;