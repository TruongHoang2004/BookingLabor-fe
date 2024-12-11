'use client'
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import FormTaskTitle from "./FormTaskTitle";
import {Card, CardHeader, CardBody} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import {DateInput} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import {CardFooter} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface District {
  name: string;
  code: string;
  division_type: string;
  codename: string;
  wards: Ward[];
}

interface Ward {
  name: string;
  code: string;
  division_type: string;
  codename: string;
}

export default function TaskFormPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [task, setTask] = useState(searchParams.get('task') ?? "");
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

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

    const validateForm = (): boolean => {
        if (!task) {
            setError("Please fill in all fields");
            return false;
        }
        if (!selectedDistrict) {
            setError("Please select a district");
            return false;
        }
        return true;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            router.push('/tasks');
        } catch (error) {
            console.error('Error posting task:', error);
            alert('Failed to post task. Please try again.');
        }
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
                                    placeholder= "Your specific address."
                                    labelPlacement="outside" 
                                    isRequired
                                    size="md"
                                    variant= "faded"
                                />
                            </div>
                            <div>
                                <DateInput 
                                    label="Start Date"
                                    labelPlacement="outside" 
                                    isRequired
                                    size="md"
                                    variant= "faded"
                                />
                            </div>
                            <div>
                                <DateInput 
                                    label="End Date"
                                    labelPlacement="outside" 
                                    isRequired
                                    size="md"
                                    variant= "faded"
                                />
                            </div>
                            <div>
                                <Input
                                    type="text"
                                    label="Estimated Duration "
                                    placeholder= "Estimated total hours needed to complete this task."
                                    labelPlacement="outside" 
                                    isRequired
                                    size="md"
                                    variant= "faded"
                                />
                            </div>
                            <div>
                                <Input
                                    type="text"
                                    label="Expected Rate"
                                    placeholder= "How much can you pay for this task per hour?"
                                    labelPlacement="outside" 
                                    isRequired
                                    size="md"
                                    variant= "faded"
                                />
                            </div>
                            <div>
                                <Textarea
                                    type="text"
                                    label="Task Description"
                                    placeholder= "Give taskers more details about the task!"
                                    labelPlacement="outside" 
                                    isRequired
                                    size="md"
                                    variant= "faded"
                                />
                            </div>
                        </CardBody>
                        <CardFooter className="flex flex-col items-end gap-y-4 mt-5">
                            <Button onClick={() => router.push('/tasks')} className="w-full" color="success" type="submit">POST YOUR TASK</Button>
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