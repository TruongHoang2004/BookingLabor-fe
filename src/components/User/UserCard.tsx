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

export default function UserCard({ user }: { user: User }) {
    const formatUserId = (id: number) => {
        const letterCode = Math.floor((id - 1) / 9999);
        const letter = String.fromCharCode(65 + letterCode);
        const number = ((id - 1) % 9999) + 1;
        return `${letter}${String(number).padStart(4, '0')}`;
    }
    const userId = formatUserId(user.id);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div className="flex flex-col gap-4 bg-zinc-100 shadow-xl hover:shadow-lg p-4 rounded-xl h-64 transition-shadow cursor-pointer" onClick={onOpen}>
                <div className="bg-gray-200 p-2 rounded-lg w-full">
                    <h2 className="font-bold text-gray-700">{userId}</h2>
                </div>
                <div>
                    <p className="mb-2">{user.title}</p>
                    <p>{user.description}</p>
                    <p>{user.location}</p>
                    <p>{user.category}</p>
                </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{formatUserId(user.id)}</ModalHeader>
                            <ModalBody>
                                <div className="bg-gray-200 p-2 rounded-lg w-full">
                                    <h2 className="font-bold text-gray-700">{userId}</h2>
                                </div>
                                <div>
                                    <p className="mb-2">{user.title}</p>
                                    <p>{user.description}</p>
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