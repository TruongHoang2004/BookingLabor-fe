'use client'
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import FormTaskTitle from "./FormTaskTitle";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { DateInput } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { CardFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { TaskFormDetails } from "@/interface/task";
import { DateValue } from "@nextui-org/react";
import { Skill } from "@/interface/user";
import { SkillService } from "@/service/skill/skill";
import { taskService } from "@/service/task/task";
import toast from 'react-hot-toast';

interface District {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    wards: Ward[];
}

interface Ward {
    name: string;
    code: number;
    division_type: string;
    codename: string;
}


export default function TaskFormPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [task, setTask] = useState(searchParams.get('task') ?? ""); // title
    const [districts, setDistricts] = useState<District[]>([]); // district
    const [wards, setWards] = useState<Ward[]>([]); // ward
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [detailedAddress, setDetailedAddress] = useState("");
    const [startDate, setStartDate] = useState<DateValue | undefined>(undefined)
    const [endDate, setEndDate] = useState<DateValue | undefined>(undefined)
    const [estimatedDuration, setEstimatedDuration] = useState("");
    const [expectedRate, setExpectedRate] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [skills, setSkills] = useState<Skill[]>([])
    const [chosenSkillId, setChosenSkillID] = useState(0);

    const fetchSkills = async () => {
        const response = await SkillService.getAllSkills();
        setSkills(response)
    }

    useEffect(() => {
        fetchSkills()
    }, [])

    useEffect(() => {
        fetchDistricts();
    }, []);

    const fetchDistricts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://provinces.open-api.vn/api/p/01?depth=2');
            const data = await response.json();
            setDistricts(data.districts);
        } catch (err) {
            setError("Failed to fetch districts");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSkillChange = (skillID: string) => {
        setChosenSkillID(parseInt(skillID, 10))
    }

    const handleDistrictChange = async (districtCode: string) => {
        setSelectedDistrict(districtCode);
        setIsLoading(true);
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
            const data = await response.json();
            setWards(data.wards);
        } catch (err) {
            setError("Failed to fetch wards");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleWardChange = (wardCode: string) => {
        setSelectedWard(wardCode)
    }

    const isCheckDate = (startDate: string): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(startDate);
        return start >= today;
    };

    const isCheckendDate = (startDate: string, endDate: string): boolean => {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        return end >= start;
    };

    const handleStartDateChange = (date: DateValue | undefined) => {
        setStartDate(date)
    }

    const handleEndDateChange = (date: DateValue | undefined) => {
        setEndDate(date)
    }

    const isValidEstimatedDuration = (estimatedDuration: string): boolean => {
        const duration = estimatedDuration.trim();
        for (let i = 0; i < duration.length; i++) {
            const charCode = duration.charCodeAt(i);
            if (charCode < 48 || charCode > 57) {
                return false;
            }
        }
        return Number(duration) > 0;
    };

    const isValidExpectedRate = (expectedRate: string): boolean => {
        const expectedrate = expectedRate.trim();
        for (let i = 0; i < expectedrate.length; i++) {
            const charCode = expectedrate.charCodeAt(i);
            if (charCode < 48 || charCode > 57) {
                return false;
            }
        }
        return Number(expectedrate) > 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!detailedAddress) {
            toast.error("Please provide a detailed address.", { duration: 2000 });
            return;
        }
        if (!startDate) {
            toast.error("Please select a start date.", { duration: 2000 });
            return;
        }
        if (!isCheckDate(startDate.toString())) {
            toast.error("Start date cannot be in the past.", { duration: 2000 });
            return;
        }
        if (!endDate) {
            toast.error("Please select an end date.", { duration: 2000 });
            return;
        }
        if (!isCheckendDate(startDate.toString(), endDate.toString())) {
            toast.error("End date cannot be in the past of the Start date.", { duration: 2000 });
            return;
        }
        if (!isValidEstimatedDuration(estimatedDuration)) {
            toast.error("Please provide a valid estimated duration.", { duration: 2000 });
            return;
        }
        if (!isValidExpectedRate(expectedRate)) {
            toast.error("Please provide a valid expected rate.", { duration: 2000 });
            return;
        }
        if (!taskDescription) {
            toast.error("Please provide a task description.", { duration: 2000 });
            return;
        }
        const start_day = startDate?.day;
        const start_month = startDate?.month;
        const start_year = startDate?.year;
        const end_day = endDate?.day;
        const end_month = endDate?.month;
        const end_year = endDate?.year;
        let formattedStartDate;
        let formattedEndDate;
        if (start_day && start_day < 10) {
            formattedStartDate = `${start_year}-${start_month}-0${start_day}`
        }
        else {
            formattedStartDate = `${start_year}-${start_month}-${start_day}`
        }
        if (end_day && end_day < 10) {
            formattedEndDate = `${end_year}-${end_month}-0${end_day}`
        }
        else {
            formattedEndDate = `${end_year}-${end_month}-${end_day}`
        }
        const taskForm: TaskFormDetails = {
            title: task,
            description: taskDescription,
            skill_id: chosenSkillId,
            district: selectedDistrict,
            ward: selectedWard,
            detail_address: detailedAddress,
            estimated_duration: parseInt(estimatedDuration, 10),
            fee_per_hour: expectedRate,
            start_date: formattedStartDate,
            end_date: formattedEndDate,
        }
        const response = await taskService.create(taskForm);
        console.log(response)
        router.push('/taskmanage')
    }

    return (
        <div className="my-10">
            <p className="font-bold md:text-3xl x-sm:text-lg 2sm:text-sm text-emerald-900 text-center">
                Provide us with more details of your task here
            </p>
            <div>
                <form onSubmit={handleSubmit}>
                    <Card className="w-10/12 m-auto py-4 mt-6 px-10">
                        <CardHeader>
                            <FormTaskTitle task={task} setTask={setTask} />
                        </CardHeader>
                        <CardBody className="flex flex-col gap-y-7 mt-5">
                            <div>
                                <Select
                                    labelPlacement="outside"
                                    label="Select your Skill for this Task"
                                    placeholder="Choose Skill"
                                    isRequired
                                    variant="faded"
                                    isLoading={isLoading}
                                    onChange={(e) => handleSkillChange(e.target.value)}
                                >
                                    {skills.map((skill) => (
                                        <SelectItem key={skill.id} value={skill.id}>
                                            {skill.name}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <Select
                                    labelPlacement="outside"
                                    label="Select your district"
                                    placeholder="Choose district"
                                    isRequired
                                    variant="faded"
                                    isLoading={isLoading}
                                    onChange={(e) => handleDistrictChange(e.target.value)}
                                >
                                    {districts.map((district) => (
                                        <SelectItem key={district.code} value={district.code}>
                                            {district.name}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <Select
                                    labelPlacement="outside"
                                    label="Select your ward"
                                    placeholder="Choose ward"
                                    isRequired
                                    variant="faded"
                                    isLoading={isLoading}
                                    isDisabled={!selectedDistrict}
                                    onChange={(e) => handleWardChange(e.target.value)}
                                >
                                    {wards.map((ward) => (
                                        <SelectItem key={ward.code} value={ward.code}>
                                            {ward.name}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <div>
                                <Input
                                    type="text"
                                    label="Detailed Address "
                                    placeholder="Your specific address."
                                    labelPlacement="outside"
                                    isRequired
                                    size="md"
                                    variant="faded"
                                    onChange={(e) => setDetailedAddress(e.target.value)}
                                />
                            </div>
                            <div>
                                <DateInput
                                    label="Start Date"
                                    labelPlacement="outside"
                                    isRequired
                                    size="md"
                                    variant="faded"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                            </div>
                            <div>
                                <DateInput
                                    label="End Date"
                                    labelPlacement="outside"
                                    isRequired
                                    size="md"
                                    variant="faded"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </div>
                            <div>
                                <Input
                                    type="text"
                                    label="Estimated Duration "
                                    placeholder="Estimated total hours needed to complete this task."
                                    labelPlacement="outside"
                                    isRequired
                                    size="md"
                                    variant="faded"
                                    onChange={(e) => setEstimatedDuration(e.target.value)}
                                />
                            </div>
                            <div>
                                <Input
                                    type="text"
                                    label="Expected Rate"
                                    placeholder="How much can you pay for this task per hour?"
                                    labelPlacement="outside"
                                    isRequired
                                    size="md"
                                    variant="faded"
                                    onChange={(e) => setExpectedRate(e.target.value)}
                                />
                            </div>
                            <div>
                                <Textarea
                                    type="text"
                                    label="Task Description"
                                    placeholder="Give taskers more details about the task!"
                                    labelPlacement="outside"
                                    isRequired
                                    size="md"
                                    variant="faded"
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                />
                            </div>
                        </CardBody>
                        <CardFooter className="flex flex-col items-end gap-y-4 mt-5">
                            <Button className="w-full" color="success" type="submit">POST YOUR TASK</Button>
                            <p onClick={() => router.push('/services')} className="underline md:text-base x-sm:text-xs 2sm:text-[8px] cursor-pointer text-green-500">
                                Looking for more services? Goes here.
                            </p>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    )
}