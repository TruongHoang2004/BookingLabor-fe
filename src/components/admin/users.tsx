'use client'
import React from "react";
import { User as UserType } from "@/interface/user";
import { User as UserComponent } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";
import { Phone, Mail, MapPin, CalendarDaysIcon } from "lucide-react";
import { locationService as locations } from "@/service/location/location";

interface UserCardProps {
    user: UserType;
    onView: (id: number) => void;
}
const UserCard: React.FC<UserCardProps> = ({
    user,
    onView
}) => {
    const [districtNames, setDistrictNames] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDistrictNames = () => {
            try {
                const works_area = user.tasker?.work_area;
                const works_area_arr = works_area?.split(",")
                const district_name_arr: string[] = [];
                if (works_area_arr) {
                    works_area_arr.forEach(async area => {
                        const d = await locations.getDistrictByCode(parseInt(area, 10));
                        if (d) {
                            district_name_arr.push((d).name);
                        }
                    });
                    setDistrictNames(district_name_arr.join(", "))
                }
            } catch (error) {
                console.error('Error fetching district names:', error);
                setDistrictNames('Error loading districts');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDistrictNames();
    }, [user.tasker?.work_area]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    console.log(user.profile.avatar);

    return (
        <Card className="w-full">
            <CardBody>
                <div className="flex justify-between items-start">
                    <UserComponent
                        name={user.profile.first_name + " " + user.profile.last_name}
                        description={user.email}
                        avatarProps={{
                            src: user.profile.avatar,
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
                                                className="w-20 h-20"
                                                showFallback
                                                name={user.profile.first_name + " " + user.profile.last_name}
                                                src={user.profile.avatar}
                                            />
                                            <div>
                                                <h3 className="text-gray-500 text-sm">Name</h3>
                                                <p className="font-semibold text-lg">{user.profile.first_name + " " + user.profile.last_name}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-gray-500 text-sm">Email</h3>
                                            <p className="flex items-center gap-2">
                                                <Mail size={16} />
                                                {user.email}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-gray-500 text-sm">Phone</h3>
                                            <p className="flex items-center gap-2">
                                                <Phone size={16} />
                                                {user.profile.phone_number}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-gray-500 text-sm">Gender</h3>
                                            <p className="flex items-center gap-2">
                                                {user.profile.gender}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-gray-500 text-sm">Date_of_Birth</h3>
                                            <p className="flex items-center gap-2">
                                                <CalendarDaysIcon size={16} />
                                                {user.profile.birth_date}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-gray-500 text-sm">Work Area</h3>
                                            {user.tasker ? (
                                                <div className="space-y-2">
                                                    <p className="flex items-center gap-2">
                                                        <MapPin size={16} />
                                                        {isLoading
                                                            ? 'Loading districts...'
                                                            : districtNames || 'No area specified'
                                                        }
                                                    </p>

                                                    <div>
                                                        <h4 className="text-gray-500 text-sm">Skills</h4>
                                                        {user.tasker.skills && user.tasker.skills.length > 0 ? (
                                                            <ul className="list-disc list-inside">
                                                                {user.tasker.skills.map((skill, id) => (
                                                                    <li key={id} className="text-sm">{skill.name}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="text-gray-400 text-sm">No skills listed</p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-gray-500">Experience</h3>
                                                        <p>{user.tasker.experience || 'N/A'}</p>
                                                    </div>
                                                    <div className="gap-2 grid grid-cols-3 text-sm">

                                                        <div>
                                                            <h4 className="text-gray-500">Tasks Completed</h4>
                                                            <p>{user.tasker.completed_tasks || 0}</p>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-gray-500"> Average Rating</h4>
                                                            <p>{user.tasker.rating_count ? (user.tasker.rating_sum / user.tasker.rating_count).toFixed(2) : 'No ratings'}</p>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-gray-500">Rating Count</h4>
                                                            <p>{user.tasker.rating_count || 0}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-gray-400 text-sm">Not a tasker</p>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-gray-500 text-sm">Description</h3>
                                            <p>{user.profile.description}</p>
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
                    </div>
                </div>
            </CardBody>
            <CardFooter>
                <div className="flex items-center gap-1">
                    <div className="text-default-500 text-small">Role: {user.role}</div>
                    {user.role !== "ADMIN" && user.tasker && (
                        <div className="text-default-500 text-small">TASKER</div>
                    )}

                </div>
            </CardFooter>
        </Card>
    );
};

export default UserCard;