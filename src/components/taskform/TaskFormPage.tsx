'use client'
import { useSearchParams } from "next/navigation";
import { useState} from "react";
import FormTaskTitle from "./FormTaskTitle";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import {DateInput} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";

export default function TaskFormPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [task, setTask] = useState(searchParams.get('task') ?? "");
    const districts = ["Cầu Giấy", "Đống Đa", "Thanh Trì", "Hoàng Mai", "Hòa Lạc"]
    const cities = ["Hà Nội", "Huế", "Đà Nẵng", "Cà Mau", "Bắc Giang"]
    const streets = ["Cầu Giấy", "Xuân Thủy", "Đường Láng", "Ngũ Hiệp", "Thái Hà"]
    return (
        <div className="my-10">
            <p className="font-bold md:text-3xl x-sm:text-lg 2sm:text-sm text-emerald-900 text-center">Provide us with more details of your task here</p>
            <div>
                <form action="">
                    <Card className="w-10/12 m-auto py-4 mt-6 px-10">
                        <CardHeader>
                            <FormTaskTitle task= {task} setTask ={setTask} />
                        </CardHeader>
                        <CardBody className="flex flex-col gap-y-7 mt-5">   
                            <div>
                                <Select labelPlacement="outside" label="Select your city" placeholder="Choose which city the tasked will work."  isRequired variant="faded"> 
                                {cities.map((city, index) => (
                                    <SelectItem key={index}>
                                        {city}
                                    </SelectItem>
                                ))}
                                </Select>
                            </div>
                            <div>
                                <Select labelPlacement="outside" label="Select your district" placeholder="Choose which district the tasked will work."  isRequired variant="faded"> 
                                {districts.map((district, index) => (
                                    <SelectItem key={index}>
                                        {district}
                                    </SelectItem>
                                ))}
                                </Select>
                            </div>
                            <div>
                                <Select labelPlacement="outside" label="Select your street" placeholder="Choose which street the tasked will work."  isRequired variant="faded"> 
                                {streets.map((street, index) => (
                                    <SelectItem key={index}>
                                        {street}
                                    </SelectItem>
                                ))}
                                </Select>
                            </div>
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
                                    label="Expected Fee"
                                    placeholder= "How much can you pay for this task?"
                                    labelPlacement="outside" 
                                    isRequired
                                    size="md"
                                    variant= "faded"
                                />
                            </div>
                            <div>
                                <Textarea
                                    type="text"
                                    label="Task Details"
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