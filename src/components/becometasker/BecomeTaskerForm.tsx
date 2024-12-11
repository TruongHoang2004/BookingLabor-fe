'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Select, SelectItem, Textarea } from "@nextui-org/react";
import Background from '../layout-background';

interface FormData {
    skill: number[];
    work_area: string[];
    experience: string;
}

interface District {
    name: string;
    code: string;
    division_type: string;
    codename: string;
}

const BecomeTaskerForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        skill: [],
        work_area: [],
        experience: ''
    });
    
    const router = useRouter();

    const handleInputChange = (field: keyof FormData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            router.push('/tasks/tasker');
        } catch (error) {
            console.error('Error becoming a tasker:', error);
            alert('Registration failed. Please try again.');
        }
    };

    const skills = [
        { key: 1, value: "1", label: "Cleaning" },
        { key: 2, value: "2", label: "Delivery" },
        { key: 3, value: "3", label: "Handyman" },
        { key: 4, value: "4", label: "Moving" },
        { key: 5, value: "5", label: "Packing" },
        { key: 6, value: "6", label: "Pet Sitting" },
        { key: 7, value: "7", label: "Plumbing" },
        { key: 8, value: "8", label: "Electrical" },
        { key: 9, value: "9", label: "Gardening" },
        { key: 10, value: "10", label: "Painting" }
    ];

    const [districts, setDistricts] = useState<District[]>([]); 
    const [isLoading, setIsLoading] = useState(false);
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
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center">
            <Background imageUrl='./img/becometasker.jpg' />
            <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl p-8 z-10">
                <CardHeader className="flex flex-col gap-3 pb-2 pt-2">
                    <h1 className="text-4xl font-extrabold">Become a Tasker</h1>
                    <p className="text-sm text-gray-600">Be flexible, Be helpful</p>
                    <Divider orientation='horizontal' className="rounded-t-lg" />
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardBody className="gap-4">
                        <Select 
                            label="Choose your job"
                            placeholder="Select your skill"
                            value={formData.skill.toString()}
                            isRequired
                            selectionMode='multiple'
                            onChange={(e) => handleInputChange('skill', parseInt(e.target.value))}
                            className="text-lg"
                        >

                            {skills.map(skill => (
                                <SelectItem key={skill.key} value={skill.value}>{skill.label}</SelectItem>
                            ))}
                        </Select>
                        
                        <Select 
                            label="Choose your work area"
                            placeholder="Choose district"
                            value={formData.work_area.toString()}
                            isRequired 
                            selectionMode='multiple'
                            variant="faded"
                            isLoading={isLoading}
                            onChange={(e) => handleInputChange('work_area', e.target.value)}
                            > 
                                {districts.map((district) => (
                                    <SelectItem key={district.code} value={district.code}>
                                        {district.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        
                        <Textarea
                            label="Experience"
                            placeholder="Describe your experience"
                            value={formData.experience}
                            onChange={(e) => handleInputChange('experience', e.target.value)}
                            className="text-lg"
                        />
                    </CardBody>

                    <CardFooter>
                        <Button
                            type="submit"
                            color="primary"
                            variant="solid"
                            fullWidth
                            size="lg"
                        >
                            Submit
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default BecomeTaskerForm;
