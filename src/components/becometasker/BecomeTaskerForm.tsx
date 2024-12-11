'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button, Select, SelectItem, Textarea } from "@nextui-org/react";
import Background from '../layout-background';
import axiosInstance from '@/api/axiosInstance';
import ENDPOINTS from '@/api/endpoint';

interface FormData {
    skill: number[];
    work_area: string[];
    experience: string;
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

    const validateForm = (): boolean => {
        if (!formData.skill || !formData.work_area || !formData.experience) {
            alert('Please fill in all fields');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            router.push('/tasks/tasker');
        } catch (error) {
            console.error('Error becoming a tasker:', error);
            alert('Registration failed. Please try again.');
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
                            selectionMode='multiple'
                            onChange={(e) => handleInputChange('skill', parseInt(e.target.value))}
                            className="text-lg"
                        >
                            <SelectItem key={1} value="1">Cleaning</SelectItem>
                            <SelectItem key={2} value="2">Delivery</SelectItem>
                            <SelectItem key={3} value="3">Handyman</SelectItem>
                            <SelectItem key={4} value="4">Moving</SelectItem>
                            <SelectItem key={5} value="5">Packing</SelectItem>
                            <SelectItem key={6} value="6">Pet Sitting</SelectItem>
                            <SelectItem key={7} value="7">Plumbing</SelectItem>
                            <SelectItem key={8} value="8">Electrical</SelectItem>
                            <SelectItem key={9} value="9">Gardening</SelectItem>
                            <SelectItem key={10} value="10">Painting</SelectItem>
                        </Select>
                        
                        <Select
                            label="Work Area"
                            value={formData.work_area.toString()}
                            selectionMode='multiple'
                            onChange={(e) => handleInputChange('skill', parseInt(e.target.value))}
                            className="text-lg"
                        >
                            <SelectItem key={1} value="1">Cầu Giấy</SelectItem>
                            <SelectItem key={2} value="2">Hà Đông</SelectItem>
                            <SelectItem key={3} value="3">Đống Đa</SelectItem>
                            <SelectItem key={4} value="4">Ba Đình</SelectItem>
                            <SelectItem key={5} value="5">Nam Từ Liêm</SelectItem>
                            <SelectItem key={6} value="6">Bắc Từ Liêm</SelectItem>
                            <SelectItem key={7} value="7">Hoàn Kiếm</SelectItem>
                            <SelectItem key={8} value="8">Thanh Xuân</SelectItem>
                            <SelectItem key={9} value="9">Hai Bà Trưng</SelectItem>
                            <SelectItem key={10} value="10">Hoàng Mai</SelectItem>
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
