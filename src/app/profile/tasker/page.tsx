'use client';
import { Textarea, Input, Button, Chip} from "@nextui-org/react";
import AvatarUpload from "@/components/profile/avatar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/react";
import Reviews from "@/components/profile/review";
import { Kanit } from 'next/font/google'

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const TaskerProfilePage = () => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const router = useRouter();

    const handleFileSelect = (file: File) => {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    };

    const [skillInput, setSkillInput] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
  
    const handleSkillAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && skillInput.trim() !== '') {
        event.preventDefault();
        if (!skills.includes(skillInput.trim())) {
          setSkills([...skills, skillInput.trim()]);
        }
        setSkillInput('');
      }
    };
    const handleClose = (skillToRemove: string) => {
      setSkills(skills.filter((skill) => skill !== skillToRemove));
    };
 
  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-8 rounded-md p-12 w-full bg-white shadow-sm">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
              <h1 className={`${kanit.className} text-4xl text-green-500 font-bold`}>MY PROFILE</h1>
              <Button
                radius="full"
                color="success"
                variant="solid"
                className={`${kanit.className} text-lg text-white font-bold flex items-center space-x-4 justify-between gap-x-2`}
                onClick={() => router.push('../profile')}
              >
                Change to Customer Profile
              </Button>
          </div>
          {/* Avatar Section with Upload Button */}
          <div className="flex justify-center mb-8">
            <div className="mt-8">
              <AvatarUpload avatarUrl={avatarUrl} onFileSelect={handleFileSelect} />
            </div>
          </div>
          {/* Personal Info */}
        <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          label="First Name"
          defaultValue="Jeremy"
          className="mr-24"
        />
        <Input
          type="text"
          label="Last Name"
          defaultValue="Truong"
        />
          </div>

          {/* Contact Info */}
        <Input
          type="email"
          label="Email"
          defaultValue="jeremytruong0204@gmail.com"
        />
        <Input
          type="password"
          label="Password"
          defaultValue="mypassword"
        />
        <Input
          isRequired
          type="number"
          label="Phone"
        />
        <Input
          isRequired
          type="text"
          label="Work Area"
        />
        <Input
          isRequired
          type="text"
          label="Work Schedule"
        />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Button Container */}
          <div className="flex items-center justify-end mb-6 space-x-4">
            <Button
              radius="full"
              color="danger"
              variant="bordered"
              className={`${kanit.className} text-lg text-red-600 font-bold flex items-center space-x-4 justify-between gap-x-2`}
            >
              Delete Profile
            </Button>
            <Button
              radius="full"
              color="success"
              variant="solid"
              className={`${kanit.className} text-lg text-white font-bold flex items-center space-x-4 justify-between gap-x-2`}
              onClick={() => { router.push('./') }}
            >
              Save Changes
            </Button>
          </div>
        <Input
          isRequired
          type="text"
          label="Gender"
        />

          {/* Date of birth*/}
          <div className="grid grid-cols-1 gap-4">
        <Input
          type="date"
          label="Date"
        />
          </div>
        <Textarea 
          label="Description"
        />
        <div>
            <Input
              label="Skills"
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillAdd}
            />
            <div className="flex flex-wrap mt-2 gap-2">
              {skills.map((skill) => (
                <Chip
                  key={skill}
                  variant="solid"
                  color="default"
                  className="flex items-center"
                  onClose={() => handleClose(skill)}
                >
                  {skill}
                </Chip>
              ))}
            </div>
          </div>
        <Textarea 
          label="Experience"
        />
        <Input
          type="money"
          label="Expected Fee"
        />
        <Select
          selectionMode="multiple"
          label="Payment Info"
          placeholder="Select payment methods"
          >
            <SelectItem key="credit_card" className="text-black">Credit Card</SelectItem>
            <SelectItem key="pay_pal" className="text-black">PayPal</SelectItem>
            <SelectItem key="bank_transfer" className="text-black">Bank Transfer</SelectItem>
            <SelectItem key="cas" className="text-black">Cash</SelectItem>
        </Select>

        </div>
      </div>
      <div className="mt-12 w-full mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-black">CUSTOMER REVIEWS</h2>
        <Reviews />
      </div>
    </div>
  );
};

export default TaskerProfilePage;