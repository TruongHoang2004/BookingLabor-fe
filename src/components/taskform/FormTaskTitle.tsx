'use client'
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure, Button} from "@nextui-org/react";

interface TaskTitle {
    task: string;
    setTask: (value: string) => void 
}

export default function FormTaskTitle({task, setTask}: TaskTitle) {
    const [editingTask, setEditingTask] = useState(task)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const saveTaskContent = () => {
        if(editingTask) {
            setTask(editingTask);
        }
    }
    const cancelEditTaskContent = () => {
        setEditingTask(task)
    }
    return (
        <div className="flex items-center justify-center gap-x-2 w-full">
            <p className="font-semibold md:text-3xl x-sm:text-lg 2sm:text-sm text-center">Your Task:  
                <span className="underline ml-2 text-emerald-700">{task}</span>
            </p>
            <div>
                <FaEdit onClick={onOpen} className="text-emerald-900 text-xl cursor-pointer"/>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Edit your Task&apos;s name here</ModalHeader>
                        <ModalBody>
                        <form action="" onSubmit={(event) => event.preventDefault()}>
                            <input 
                                type="text"
                                placeholder="Your task name goes here"
                                value={editingTask}
                                onChange={(e) => setEditingTask(e.target.value)}
                                required
                                maxLength={50}
                                className='focus:outline-none rounded-xl font-semibold py-4 px-4 border-emerald-700 border-1 w-full'/>    
                        </form>
                    
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose} onClick={cancelEditTaskContent}>
                                Close
                            </Button>
                            <Button onPress={onClose} onClick={saveTaskContent}>
                                Save
                            </Button>
                        </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    )
}