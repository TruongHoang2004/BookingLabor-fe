'use client'
import { Task } from "@/interface/task";
import { Card, CardBody, CardHeader, CardFooter, Tooltip, Button, Avatar, Divider, ScrollShadow } from "@nextui-org/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter, useDisclosure
} from "@nextui-org/react";
import Image from "next/image";
import { FaList } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TbChecklist } from "react-icons/tb";
import { BiSolidCheckCircle } from "react-icons/bi";
import { taskService } from "@/service/task/task";
import { locationService } from "@/service/location/location";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
//import TaskCard from "../Tasker/TaskCard";
import { ReviewService } from "@/service/review/review";
import { Review } from "@/interface/review";
import { Tasker } from "@/interface/user";
import { FaStar } from "react-icons/fa";

const location = new locationService();
interface TaskerWithReview {
    tasker: Tasker,
    reviews: Review[]
}

export default function UserCard({
    userCard,
    isTaskerChosen,
    setTaskChosen,

}: {
    userCard: Task;
    isTaskerChosen: boolean;
    setTaskChosen: React.Dispatch<React.SetStateAction<boolean>>;

}) {
    const getImageSrc = () => {
        const Index = userCard.skill?.id;
        return Index ? `/img/taskmanage/task-manage-${Index}.jpg` : '/img/taskmanage/default-task.jpg';
    }

    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true); // Ensure this runs only on the client
    }, []);


    // const router = useRouter();
    const [taskDetailVisible, setTaskDetailVisible] = useState(false);
    const [choseTaskerVisible, setChoseTaskerVisible] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [allTaskerReviews, setAllTaskerReviews] = useState<TaskerWithReview[]>([]);

    const handleChoseTasker = () => {
        setTaskDetailVisible(false);
        setChoseTaskerVisible(true);
    }

    const fetchAllReviews = async () => {
        const tmp_arr: TaskerWithReview[] = [];
        if (userCard.taskers) {
            for (let i = 0; i < userCard.taskers.length; i++) {
                const tasker = userCard.taskers[i];
                const reviews = await ReviewService.getReviewbyTaskerID(tasker.id);
                tmp_arr.push({ tasker: tasker, reviews: reviews });
            }
        }
        setAllTaskerReviews(tmp_arr);
    }

    useEffect(() => {
        fetchAllReviews();
    }, [])
    const formatID = (id: number) => {
        if (id < 10) {
            return `A00${id}`
        }
        if (id >= 10 && id < 100) {
            return `A0${id}`
        }
        if (id < 10) {
            return `A${id}`
        }
    }

    const formatDate = (date: string) => {
        return date.slice(0, 10);
    }

    const handleShowTaskDetails = () => {
        setTaskDetailVisible(true);
        setChoseTaskerVisible(false);
    }

    const renderModalHeader = () => {
        // nếu xem thông tin mà không phải chọn taskers
        if (taskDetailVisible && !choseTaskerVisible) {
            return (
                <div className="flex flex-col">
                    <p className="font-bold text-emerald-700 text-xl">{formatID(userCard.id)}</p>
                    <p className="font-semibold text-lg">{userCard.title}</p>
                </div>
            )
        }
        // nếu chọn tasker mà không phải hiện thông tin task
        if (!taskDetailVisible && choseTaskerVisible) {
            return (
                <div className="font-bold text-2xl text-emerald-800">
                    Choose your tasker
                </div>
            )
        }
    }

    const chooseTasker = async (task_id: number, tasker_id: number) => {
        await taskService.userChooseTasker(task_id, tasker_id);
        setTaskChosen(!isTaskerChosen)
    }


    const handleUserCancelTask = async () => {
        try {
            await taskService.UserCancelTask(userCard.id); // Gọi hàm service với task.id
            toast.success("Xác nhận thành công!"); // Thông báo thành công
            setTaskChosen(!isTaskerChosen); // Cập nhật lại trạng thái



        } catch (error) {
            toast.error("Xác nhận thất bại!"); // Thông báo lỗi
            console.error("Lỗi khi xác nhận:", error);
        }
    };


    const handleTaskerComfirmCompletion = async () => {
        try {
            await taskService.UserConfirmCompleteTask(userCard.id); // Gọi hàm service với task.id
            // toast.success("Xác nhận thành công!"); // Thông báo thành công
            setTaskChosen(!isTaskerChosen); // Cập nhật lại trạng thái
        }
        catch (error) {
            //toast.error("Xác nhận thất bại!"); // Thông báo lỗi
            console.error("Lỗi khi xác nhận:", error);
        }
    };

    const handleRouteToReview = async () => {
        if (!isMounted) return;

        try {
            const queryParams = new URLSearchParams({
                taskId: userCard.id.toString(),
                title: userCard.title,
                district: userCard.district,
                ward: userCard.ward,
                detail_address: userCard.detail_address,
                start_date: new Date(userCard.start_date).toISOString(),
                end_date: new Date(userCard.end_date).toISOString(),
                fee_per_hour: userCard.fee_per_hour.toString(),
                estimated_duration: userCard.estimated_duration.toString(),
                description: userCard.description
            }).toString();

            console.log('Query params:', queryParams); // Debug log

            await router.push(`/reviewTasker?${queryParams}`);
        } catch (error) {
            console.error('Navigation error:', error);
            toast.error('Failed to navigate to order page');
        }
    };

    const handleRouteToReviewDetails = async () => {
        if (!isMounted) return;

        try {
            const queryParams = new URLSearchParams({
                taskId: userCard.id.toString(),
                title: userCard.title,
                district: userCard.district,
                ward: userCard.ward,
                detail_address: userCard.detail_address,
                start_date: new Date(userCard.start_date).toISOString(),
                end_date: new Date(userCard.end_date).toISOString(),
                fee_per_hour: userCard.fee_per_hour.toString(),
                estimated_duration: userCard.estimated_duration.toString(),
                description: userCard.description,
                rating: userCard.review?.rating.toString() || '0',
                comment: userCard.review?.comment || '',
            }).toString();

            console.log('Query params:', queryParams); // Debug log

            await router.push(`/reviewTasker/reviewdetails?${queryParams}`);
        } catch (error) {
            console.error('Navigation error:', error);
            toast.error('Failed to navigate to order page');
        }


    };




    const renderModalContent = (onClose: () => void) => {
        // nếu xem thông tin mà không phải chọn taskers
        if (taskDetailVisible && !choseTaskerVisible) {
            return (
                <div className="flex flex-col gap-y-3">
                    <p className="flex items-center"><BiSolidCheckCircle className="flex-shrink-0 text-emerald-500" /><span className="mr-2 font-semibold text-emerald-700">Description:</span>{userCard.description}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="flex-shrink-0 text-emerald-500" /><span className="mr-2 font-semibold text-emerald-700">Skill:</span>{userCard.skill?.name}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">District:</span>{location.getDistrictByCode(parseInt(userCard.district, 10))?.name}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Ward:</span>{location.getWardByCode(parseInt(userCard.ward, 10))?.name}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Estimated Duration:</span>{userCard.estimated_duration} hours</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Fee per hour:</span>{userCard.fee_per_hour}VND /h</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Start Date:</span>{userCard.start_date.replaceAll("T00:00:00.000Z", "")}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">End Date:</span>{userCard.end_date.replaceAll("T00:00:00.000Z", "")}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Status:</span>{userCard.task_status}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Created At:</span>{userCard.created_at && formatDate(userCard.created_at)}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Number of Taskers applying:</span>{userCard.taskers && userCard.taskers.length}</p>
                    <p className="flex items-center"><BiSolidCheckCircle className="text-emerald-500" /><span className="mr-1 font-semibold text-emerald-700">Chosen Tasker's ID:</span>{userCard?.tasker?.id}</p>
                </div>
            )
        }
        // nếu chọn tasker mà không phải hiện thông tin task
        if (!taskDetailVisible && choseTaskerVisible) {
            return (
                <ScrollShadow className="flex flex-col gap-y-5 p-4 max-h-[400px]">
                    {allTaskerReviews.map((taskerwithReviews) => (
                        <div key={taskerwithReviews.tasker.id}>
                            <div className="flex items-center gap-x-3">
                                <Avatar isBordered name={`T${taskerwithReviews.tasker.id}`} size='sm' />
                                <p className="font-semibold">Tasker's ID: {taskerwithReviews.tasker.id}</p>
                            </div>
                            <div className="flex flex-col gap-y-2 bg-gray-200 mt-3 p-3 rounded-xl">
                                <div className="flex gap-x-2 jsutify-start">
                                    <span className="mr-1 font-semibold text-emerald-700">Skill:</span>
                                    <div>
                                        {taskerwithReviews.tasker.skills.map((s) => (
                                            <p key={s.id} className="flex items-center mb-1"><BiSolidCheckCircle className="flex-shrink-0 mr-1 text-emerald-500" />{s.name}</p>
                                        ))}
                                    </div>
                                </div>
                                <p><span className="mr-1 font-semibold text-emerald-700">Experience:</span>{taskerwithReviews.tasker.experience}</p>
                                <p><span className="mr-1 font-semibold text-emerald-700">Completed Task:</span>{taskerwithReviews.tasker.completed_tasks}</p>
                                <p><span className="mr-1 font-semibold text-emerald-700">Average Rating:</span>{(taskerwithReviews.tasker.rating_sum / taskerwithReviews.tasker.rating_count).toFixed(2)}</p>
                                <span className="mr-1 font-semibold text-emerald-700">All Reviews: </span>
                                <div className="flex items-center gap-x-3 py-3 w-full overflow-y-auto">
                                    {taskerwithReviews.reviews.map((review: Review) => (
                                        <div key={review.id} className="flex flex-col gap-x-2 bg-slate-300 p-3 rounded-lg h-24">
                                            <p className="flex items-center"><span className="mr-1 font-semibold text-emerald-700">Rating:</span>{review.rating}<FaStar className="text-yellow-500" /></p>
                                            <p><span className="mr-1 font-semibold text-emerald-700">Comment:</span>{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Button onPress={onClose} className="bg-emerald-700 mt-3 font-semibold text-white" onClick={() => { chooseTasker(userCard.id, taskerwithReviews.tasker.id) }}>Choose this Tasker</Button>
                            <Divider className="mt-5" />
                        </div>
                    ))}
                </ScrollShadow>
            )
        }
    }

    return (
        <div>
            <Card isFooterBlurred className="w-[400px] h-[450px]">
                <Image src={getImageSrc()} alt="" className={`object-cover`} fill />
                <CardHeader className="flex flex-col bg-slate-200">
                    <p className="font-bold text-emerald-700 text-xl">{formatID(userCard.id)}</p>
                    <p className="font-semibold text-lg">{userCard.title}</p>
                    <p className={`truncate mt-2 flex items-center max-w-[290px] ${userCard.task_status === 'CANCELLED'
                        ? 'bg-red-500'
                        : 'bg-emerald-400'
                        } rounded-xl p-2 font-bold`}>
                        <span className="mr-1 font-semibold text-emerald-900">Status:</span>
                        {userCard.task_status}
                    </p>
                </CardHeader>
                <CardBody className="p-0">
                    <div className="relative w-full h-full">
                        <div className="top-2/3 left-1/2 absolute flex justify-between items-center bg-gray-200 py-4 pl-2 rounded-lg w-11/12 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="">
                                <p className="flex items-center mb-2 max-w-[290px] truncate"><TbChecklist className="mr-1 text-emerald-700 text-xl" /> <span className="mr-1 font-semibold text-emerald-700">Duration:</span>{userCard.estimated_duration} hours</p>
                                <p className="flex items-center mb-2 max-w-[290px] truncate"><TbChecklist className="mr-1 text-emerald-700 text-xl" /> <span className="mr-1 font-semibold text-emerald-700">Fee per hour:</span>{userCard.fee_per_hour} VND/h</p>
                                <p className="flex items-center max-w-[290px] truncate"><TbChecklist className="mr-1 text-emerald-700 text-xl" /> <span className="mr-1 font-semibold text-emerald-700">End date:</span>{userCard.end_date.replaceAll("T00:00:00.000Z", "")}</p>
                            </div>
                            <div>
                                <Tooltip content="View more details">
                                    <Button onPress={onOpen} onClick={handleShowTaskDetails} variant="light" className="text-emerald-700 text-lg"><FaList /></Button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="flex flex-col mt-3 h-[150px]">
                    <div className="mr-5 font-bold text-emerald-800 text-sm">
                        {/* Nếu trạng thái không phải là in progress thì hiển thị ra Các tasker đang apply nếu có */}
                        {userCard.task_status !== 'IN_PROGRESS' && userCard.task_status !== 'WAITING' && userCard.task_status !== 'COMPLETED' ? (
                            <div className="flex items-center">
                                <span>{userCard.taskers && userCard.taskers.length} Taskers applying :</span>
                                {userCard.taskers && userCard.taskers.map((tasker) => (
                                    <div key={tasker.id}>
                                        <Avatar isBordered name={`T${tasker.id.toString()}`} size='sm' />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="font-bold text-md">Chosen Tasker's ID: {userCard.tasker?.id}</p>
                        )}
                    </div>

                    <div>
                        {/* Hiển thị nút nút tương ứng với các trạng thái  */}
                        {userCard.task_status === 'IN_PROGRESS' ? (
                            <div className="bg-emerald-800 mt-6 p-3 rounded-xl font-bold text-center text-sm text-white">Waiting for Tasker's Completion Confirmation</div>
                        ) : (
                            <div></div>
                        )}
                        {userCard.task_status === 'PENDING' ? (
                            <div className="bg-emerald-800 mt-6 p-3 rounded-xl font-bold text-center text-sm text-white">Waiting for Tasker's Consent</div>
                        ) : (
                            <div></div>
                        )}
                        {/* Hiển thị nút Choose Tasker nếu có tasker và chưa có tasker nào được chọn */}
                        {userCard.task_status === 'POSTED' && userCard.taskers && userCard.taskers.length > 0 && (
                            <Button onPress={onOpen} onClick={handleChoseTasker} className="bg-emerald-700 shadow-md mt-3 px-4 py-2 rounded-lg font-semibold text-white">
                                Choose Tasker
                            </Button>
                        )}
                        {userCard.task_status === 'POSTED' ? (
                            <div><Button onClick={handleUserCancelTask} color="danger" className="shadow-md mt-2 px-3 py-2 rounded-lg font-semibold text-white">Cancel this Task</Button></div>
                        ) : (
                            <div></div>
                        )}
                        {userCard.task_status === 'WAITING' && (
                            <Button onClick={handleTaskerComfirmCompletion} color="success" className="bg-emerald-800 mt-6 p-3 rounded-xl font-bold text-center text-sm text-white">
                                Confirm Completion
                            </Button>

                        )}
                        {userCard.task_status === 'COMPLETED' && !userCard.review ? (
                            <Button onClick={handleRouteToReview} color="success" className="bg-emerald-800 mt-6 p-3 rounded-xl font-bold text-center text-sm text-white">
                                Review Tasker
                            </Button>
                        ) : (
                            <div>
                            </div>
                        )}
                        {userCard.task_status === 'COMPLETED' && userCard.review ? (
                            <Button onClick={handleRouteToReviewDetails} color="success" className="bg-emerald-800 mt-6 p-3 rounded-xl font-bold text-center text-sm text-white">
                                See Review Details
                            </Button>
                        ) : (
                            <div>
                            </div>
                        )}
                    </div>
                </CardFooter>
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                {renderModalHeader()}
                            </ModalHeader>
                            <ModalBody>
                                {renderModalContent(onClose)}
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
        </div>
    )
}