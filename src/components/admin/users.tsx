import React from "react";
import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    Button,
    User,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";
import { Edit, Trash, Bell, Phone, MoreVertical, Mail, MapIcon, Ban, EyeIcon } from "lucide-react";

interface UserCardProps {
    user: {
        id: number;
        name: string;
        email: string;
        avatar: string;
        phone: string;
        address: string;
        role: string;
    };
    onView: (id: number) => void;
    onBlock: (id: number) => void;
    onHistory: (id: number) => void;
    onModify: (id: number) => void;
    onDelete: (id: number) => void;
    onNotify: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({
    user,
    onView,
    onModify,
    onBlock,
    onHistory,
    onDelete,
    onNotify,
}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <Card className="w-full">
        <CardBody>
            <div className="flex justify-between items-start">
                <User
                    name={user.name}
                    description={user.email}
                    avatarProps={{
                        src: user.avatar,
                    }}
                />
                <div className="flex items-center gap-2">
                    <Button onPress={onOpen}
                        variant="light"
                        onClick={() => onView(user.id)}
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
                                    User Details
                                </ModalHeader>
                                <ModalBody>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Avatar 
                                            src={user.avatar} 
                                            className="w-20 h-20"
                                            showFallback
                                            name={user.name}
                                        />
                                        <div>
                                            <h3 className="text-sm text-gray-500">Name</h3>
                                            <p className="text-lg font-semibold">{user.name}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm text-gray-500">Email</h3>
                                        <p className="flex items-center gap-2">
                                            <Mail size={16} />
                                            {user.email}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500">Phone</h3>
                                        <p className="flex items-center gap-2">
                                            <Phone size={16} />
                                            {user.phone}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500">Address</h3>
                                        <p className="flex items-center gap-2">
                                            <MapIcon size={16} />
                                            {user.address}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500">Role</h3>
                                        <p>{user.role}</p>
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
                                onClick={() => onModify(user.id)}
                                description="Modify user details"
                            >
                                Modify
                            </DropdownItem>
                            <DropdownItem
                                startContent={<EyeIcon size={20} />}
                                onClick={() => onNotify(user.id)}
                                description="View user activity history"
                            >
                                Activity History
                            </DropdownItem>
                            <DropdownItem
                                startContent={<Bell size={20} />}
                                onClick={() => onHistory(user.id)}
                                description="Send notification to user"
                            >
                                Send Notification
                            </DropdownItem>
                            <DropdownItem
                                key="status"
                                startContent={<Ban size={20} />}
                                onClick={() => onBlock(user.id)}
                                description="Temporarily disable account"
                            >
                                Block User
                            </DropdownItem>
                            <DropdownItem
                                startContent={<Trash size={20} />}
                                className="text-danger"
                                color="danger"
                                onClick={() => onDelete(user.id)}
                            >
                                Delete Account
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            </CardBody>
            <CardFooter>
                <div className="flex items-center">
                    <div className="text-small text-default-500">Role: {user.role}</div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default UserCard;