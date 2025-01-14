'use client';
import React, { useState } from "react";
import { Button, Select, SelectItem, Textarea } from "@nextui-org/react";
import { ProtectedRoute } from "@/components/protectedRoute";
import { useAppSelector } from '@/redux/store';
import { Input } from '@nextui-org/react';
import { Skill } from '@/interface/skill';
import { District } from '@/interface/location';
import { TaskerForm } from '@/interface/becometasker';
import { userService } from '@/service/user/user';
import { getDistrictByCode } from "@/service/location/location";
import { SkillService } from "@/service/skill/skill";
import { useRouter } from 'next/navigation';
import { Kanit } from 'next/font/google'
import { Save, Edit3 } from 'react-feather';
import { Avatar as NextAvatar } from "@nextui-org/react";
import { ReviewService } from '@/service/review/review';
import { Review } from '@/interface/review';

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})
const TaskerProfilePage = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const avatarUrl = user?.profile.avatar;
  const [taskerData, setTaskerData] = useState<TaskerForm>({
    work_area: user?.tasker?.work_area?.split(',').map(code => parseInt(code.trim())) || [],
    skillIds: user?.tasker?.skills?.map(skill => skill.id) || [],
    experience: user?.tasker?.experience || ''
  });
  const [editStatus, setEditStatus] = useState({
    workArea: false,
    skills: false,
    experience: false
  });
  const [skills, setSkills] = useState<Skill[]>([])
  const [districts, setDistricts] = useState<District[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const handleSkillChange = (skillID: string) => {
    const arr: number[] = skillID.split(',').map(Number)
    setTaskerData((prev) => ({ ...prev, skillIds: arr }));
  };
  const handleWorkAreaChange = (work_area: string) => {
    const arr: number[] = work_area.split(',').map(Number)
    setTaskerData((prev) => ({ ...prev, work_area: arr }));
  };
  const handleExperienceChange = (experience: string) => {
    setTaskerData((prev) => ({ ...prev, experience }));
  }
  const fetchDistricts = async () => {
    try {
      const response = await fetch('https://provinces.open-api.vn/api/p/01?depth=2');
      const data = await response.json();
      setDistricts(data.districts);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSkills = async () => {
    const response = await SkillService.getAllSkills();
    setSkills(response)
  }

  React.useEffect(() => {
    fetchDistricts();
    fetchSkills()
  }, []);

  React.useEffect(() => {
    if (user?.tasker?.work_area) {
      const districtCodes = user.tasker.work_area.split(',').map(code => parseInt(code.trim()));
      districtCodes
        .map(code => getDistrictByCode(code)?.name || '')
        .filter(name => name !== '');
    }
  }, [user?.tasker?.work_area]);

  const handleSubmit = async () => {
    try {
      const response = await userService.updateTasker(taskerData);
      console.log(response);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    try {
      if (user?.tasker?.id !== undefined) {
        const response = await ReviewService.getReviewbyTaskerID(user.tasker.id);
        setReviews(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (user?.tasker?.id) {
      fetchReviews();
    }
  }, [user?.tasker?.id]);

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
        <div className="bg-white shadow-sm mt-2 p-10 rounded-md w-full">
          {/* Profile Header */}
          <div className="bg-white shadow-sm p-4 rounded-lg w-full">
            <div className="flex lg:flex-row flex-col justify-between items-start lg:items-center gap-4 mb-8">
              <h1 className={`${kanit.className} text-4xl text-green-500 font-semibold`}>
                TASKER PROFILE
              </h1>
              <div className="flex flex-wrap gap-8">
                <Button
                  radius="md"
                  color="success"
                  variant="solid"
                  className={`${kanit.className} text-lg text-white`}
                  onClick={() => router.push('/profile')}
                >
                  Change to Customer Profile
                </Button>
                <Button
                  radius="md"
                  color="success"
                  variant="solid"
                  className={`${kanit.className} text-lg text-white`}
                  onClick={handleSubmit}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-center shadow-sm p-6 rounded-lg">
            <NextAvatar
              className="w-32 h-32"
              showFallback
              src={avatarUrl || undefined}
            />
          </div>
          {/* Main Content */}
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 bg-white shadow-sm p-12 rounded-md">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex space-x-24">
                <Input
                  type="text"
                  label="First Name"
                  isDisabled
                  defaultValue={user?.profile?.first_name || ''}
                />
                <Input
                  type="text"
                  label="Last Name"
                  isDisabled
                  defaultValue={user?.profile?.last_name || ''}
                />
              </div>
              <Input
                type="email"
                label="Email"
                isDisabled
                defaultValue={user?.email || ''}
              />
              <Input
                type="mobile"
                label="Phone"
                isDisabled
                defaultValue={user?.profile.phone_number || ''}
              />
              <div className="flex items-center space-x-2">
                <Select
                  label="Skills"
                  defaultSelectedKeys={user?.tasker?.skills.map(skill => skill.id.toString())}
                  value={Array.from(new Set(taskerData.skillIds.map(String)))}
                  isRequired
                  selectionMode='multiple'
                  variant="faded"
                  isDisabled={!editStatus.skills}
                  onChange={(e) => handleSkillChange(e.target.value)}
                  className="flex-1 max-w-xl"
                >
                  {skills.map(skill => (
                    <SelectItem key={skill.id} value={skill.id}>{skill.name}</SelectItem>
                  ))}
                </Select>
                <Button
                  isIconOnly
                  onClick={() => setEditStatus(prev => ({ ...prev, skills: !prev.skills }))}
                >
                  {editStatus.skills ? <Save size={16} /> : <Edit3 size={16} />}
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Select
                  label="Work Area"
                  defaultSelectedKeys={user?.tasker?.work_area.split(',').map(code => code.trim())}
                  value={Array.from(new Set(taskerData.work_area.map(String)))}
                  isRequired
                  selectionMode='multiple'
                  variant="faded"
                  isDisabled={!editStatus.workArea}
                  onChange={(e) => handleWorkAreaChange(e.target.value)}
                  className="flex-1 max-w-xl"
                >
                  {districts.map((district) => (
                    <SelectItem key={district.code} value={district.code}>
                      {district.name}
                    </SelectItem>
                  ))}
                </Select>
                <Button
                  isIconOnly
                  onClick={() => setEditStatus(prev => ({ ...prev, workArea: !prev.workArea }))}
                >
                  {editStatus.workArea ? <Save size={16} /> : <Edit3 size={16} />}
                </Button>
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Textarea
                  label="Experience"
                  placeholder="Describe your experience"
                  value={taskerData.experience}
                  isDisabled={!editStatus.experience}
                  onChange={(e) => handleExperienceChange(e.target.value)}
                  className="text-lg"
                />
                <Button
                  isIconOnly
                  onClick={() => setEditStatus(prev => ({ ...prev, experience: !prev.experience }))}
                >
                  {editStatus.experience ? <Save size={16} /> : <Edit3 size={16} />}
                </Button>
              </div>
              <Input
                isDisabled
                type="text"
                label="Completed Tasks"
                defaultValue={user?.tasker?.completed_tasks.toString() || ''}
              />
              <Input
                isDisabled
                type="text"
                label="Average Rating"
                defaultValue={user?.tasker?.rating_count ? (user.tasker.rating_sum / user.tasker.rating_count).toFixed(2) : 'N/A'}
              />
              <Input
                isDisabled
                type="text"
                label="Rating Count"
                defaultValue={user?.tasker?.rating_count.toString() || ''}
              />
            </div>
          </div>
        </div>
        <div className="bg-white shadow-sm mt-8 p-10 rounded-md w-full">
          <h2 className={`${kanit.className} text-2xl text-green-500 font-semibold mb-4`}>
            Reviews
          </h2>
          <div className="space-y-6">
            {reviews ? (
              reviews.map((review) => (
                <div key={review.id} className="shadow-sm p-4 border rounded-md">
                  <p className="mt-4">{review.comment}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">{Array(review.rating).fill('★').join('')}</span>
                    <span className="ml-2 text-gray-500">{review.rating}/5</span>
                    {/* <span className="ml-4 text-gray-500">{review.image}</span> */}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews available.</p>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TaskerProfilePage; 
