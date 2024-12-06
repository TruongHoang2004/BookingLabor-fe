'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button, Chip, Textarea } from "@nextui-org/react";
import Background from '../layout-background';

const BecomeTaskerForm: React.FC = () => {
    const [formData, setFormData] = useState({
        job: '',
        area: '',
        time: '',
        exp: '',
        fee: ''
    });
    const [chipData, setChipData] = useState<{ [key: string]: string[] }>({
        job: [],
        area: [],
        time: [],
    });
    const router = useRouter();

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    type FormFields = 'job' | 'area' | 'time' | 'exp' | 'fee';

    const handleAddChip = (field: FormFields, value: string) => {
        if (value.trim() === '') return;
        setChipData((prevData) => ({
            ...prevData,
            [field]: [...prevData[field], value]
        }));
        setFormData({ ...formData, [field]: value });
    };

    const handleKeyDown = (e: React.KeyboardEvent, field: FormFields) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddChip(field, formData[field]);
        }
    };

    const handleChipClick = (field: FormFields, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleChipClose = (field: string, value: string) => {
        setChipData({ ...chipData, [field]: chipData[field].filter((chip) => chip !== value) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            alert('Form submitted!');
            router.push('/');
        } catch (error) {
            console.error('Error submitting form:', error);
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
                        <Input
                            label="Choose your job"
                            value={formData.job}
                            onChange={(e) => handleInputChange('job', e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, 'job')}
                            required
                        />
                        <div className="flex flex-wrap gap-2">
                            {chipData.job.map((job, index) => (
                                <Chip
                                    color='primary'
                                    key={index}
                                    onClick={() => handleChipClick('job', job)}
                                    onClose={() => handleChipClose('job', job)}
                                >
                                    {job}
                                </Chip>
                            ))}
                        </div>

                        <Input
                            label="Select your area"
                            value={formData.area}
                            onChange={(e) => handleInputChange('area', e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, 'area')}
                            required
                        />
                        <div className="flex flex-wrap gap-2">
                            {chipData.area.map((area, index) => (
                                <Chip
                                    key={index}
                                    color="primary"
                                    onClick={() => handleChipClick('area', area)}
                                    onClose={() => handleChipClose('area', area)}
                                >
                                    {area}
                                </Chip>
                            ))}
                        </div>

                        <Input
                            label="Pick a time"
                            value={formData.time}
                            onChange={(e) => handleInputChange('time', e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, 'time')}
                            required
                        />
                        <div className="flex flex-wrap gap-2">
                            {chipData.time.map((time, index) => (
                                <Chip
                                    key={index}
                                    color="primary"
                                    onClick={() => handleChipClick('time', time)}
                                    onClose={() => handleChipClose('time', time)}
                                >
                                    {time}
                                </Chip>
                            ))}
                        </div>
                        <Textarea
                            label="Work Experience"
                            value={formData.exp}
                            onChange={(e) => handleInputChange('exp', e.target.value)}
                            required
                        />
                        <div className="flex flex-wrap gap-2"></div>
                        <Input
                            label="Expected fee"
                            value={formData.fee}
                            onChange={(e) => handleInputChange('fee', e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, 'fee')}
                            required
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
