'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Select, SelectItem, Textarea } from "@nextui-org/react";
import Background from '../layout-background';
import { TaskerForm } from '@/interface/becometasker';
import { becomtaskerService } from '@/service/becometasker/becometasker';
import { SkillService } from '@/service/skill/skill';
import { useAppSelector } from '@/redux/store';
import { Skill } from '@/interface/skill';
import { District } from '@/interface/location1';
import { getAllDistricts } from '@/service/location/location';


const ALL_SKILLS_ID = -1;
const ALL_DISTRICTS_ID = -1;
const BecomeTaskerForm: React.FC = () => {
    const [formData] = useState<TaskerForm>({
        skillIds: [],
        work_area: [],
        experience: ''
    });

    const [districts, setDistricts] = useState<District[]>([]);
    const [chosenDistricts, setChosenDistricts] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [skills, setSkills] = useState<Skill[]>([])
    const [chosenSkillId, setChosenSkillID] = useState<number[]>([]);
    const [experience, setExperience] = useState("")
    const { isTasker } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const handleSkillChange = (skillID: string) => {
        const selectedIds = skillID.split(',').map(Number);

        if (selectedIds.includes(ALL_SKILLS_ID)) {
            // If "all" is selected, include all skill IDs except the "all" option
            const allSkillIds = skills
                .filter(skill => skill.id !== ALL_SKILLS_ID)
                .map(skill => skill.id);
            setChosenSkillID(allSkillIds);
        } else {
            setChosenSkillID(selectedIds);
        }
    };
    console.log(chosenSkillId)


    const handleWorkAreaChange = (work_area: string) => {
        const selectedIds = work_area.split(',').map(Number);

        if (selectedIds.includes(ALL_DISTRICTS_ID)) {
            // If "all" is selected, include all skill IDs except the "all" option
            const allDistrictIds = districts
                .filter(district => district.code !== ALL_DISTRICTS_ID)
                .map(district => district.code);
            setChosenDistricts(allDistrictIds);
        } else {
            setChosenDistricts(selectedIds);
        }
    };
    //     const arr: number[] = work_area.split(',').map(Number)
    //     setChosenDistricts(arr)
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data: TaskerForm = {
            skillIds: chosenSkillId,
            work_area: chosenDistricts,
            experience: experience
        }
        const response = await becomtaskerService.create(data);
        router.push(`/taskmanage`);
        console.log(response);
        //console.log(isTasker)
    };

    useEffect(() => {
        fetchDistricts();
        fetchSkills()
        if (isTasker) {
            router.push('/taskmanage');
        }
        setIsLoading(false);
        console.log(isTasker)
        return () => {
            setIsLoading(false);
        };
    }, [isTasker, router]);
    const fetchDistricts = () => {
        try {
            const data = getAllDistricts();
            const allOption = { code: ALL_DISTRICTS_ID, name: "Select All", division_type: "", codename: "", province_code: 0, wards: [] };
            setDistricts([allOption, ...data]);
        } catch (err) {
            console.error(err);
        }
    };


    const fetchSkills = async () => {
        const response = await SkillService.getAllSkills();
        const allOption = { id: ALL_SKILLS_ID, name: "Select All", description: "" };
        setSkills([allOption, ...response]);
    };
    console.log(chosenDistricts)
    return (
        <div className="relative flex justify-center items-center min-h-screen">
            <Background imageUrl='./img/becometasker.jpg' />
            <Card className="top-1/2 left-1/2 z-10 absolute p-8 w-full max-w-2xl transform -translate-x-1/2 -translate-y-1/2">
                <CardHeader className="flex flex-col gap-3 pt-2 pb-2">
                    <h1 className="font-extrabold text-4xl">Become a Tasker</h1>
                    <p className="text-gray-600 text-sm">Be flexible, Be helpful</p>
                    <Divider orientation='horizontal' className="rounded-t-lg" />
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardBody className="gap-4">
                        <Select
                            label="Choose your job"
                            placeholder="Select your skill"
                            value={Array.from(new Set(chosenSkillId.map(String)))}
                            isRequired
                            selectionMode='multiple'
                            onChange={(e) => handleSkillChange(e.target.value)}
                            className="text-lg"
                        >
                            {skills.map(skill => (
                                <SelectItem key={skill.id} value={skill.id}>{skill.name}</SelectItem>
                            ))}
                        </Select>

                        <Select
                            label="Choose your work area"
                            placeholder="Choose district"
                            value={Array.from(new Set(formData.work_area.map(String)))}
                            isRequired
                            selectionMode='multiple'
                            variant="faded"
                            isLoading={isLoading}
                            onChange={(e) => handleWorkAreaChange(e.target.value)}
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
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
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