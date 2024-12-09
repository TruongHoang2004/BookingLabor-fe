'use client';
import {Button} from "@nextui-org/react";
import AvatarUpload from "@/components/profile/avatar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Reviews from "@/components/profile/review";
import { Kanit } from 'next/font/google'
import EditableField from "@/components/profile/editable";
import EditableSelect from "@/components/profile/editableselect";
import EditableTextarea from "@/components/profile/editabletext";
import { useAppSelector } from '@/redux/store';
import { ProtectedRoute } from "@/components/protectedRoute";

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const ProfilePage = () => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);

    const handleFileSelect = (file: File) => {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    };
const paymentOptions = [ 
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'pay_pal', label: 'PayPal' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'cash', label: 'Cash' },
];
    
  return (
    <ProtectedRoute>
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-8 rounded-md p-12 w-full bg-white shadow-sm">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
              <h1 className={`${kanit.className} text-4xl text-green-500 font-semibold`}>MY PROFILE</h1>
              <Button
                radius="md"
                color="success"
                variant="solid"
                className={`${kanit.className} text-lg text-white flex items-center space-x-4 justify-between gap-x-2`}
                onClick={() => router.push('/profile/tasker')}
              >
                Change to Tasker Profile
              </Button>
          </div>
          {/* Avatar Section with Upload Button */}
          <div className="flex justify-center mb-8">
            <div className="mt-8">
              <AvatarUpload avatarUrl={avatarUrl} onFileSelect={handleFileSelect} />
            </div>
          </div>
          {/* Personal Info */}
        <EditableField
          type="text"
          label="Name"
          defaultValue={user?.fullname || ''}
        />
          {/* Contact Info */}
        <EditableField
          type="email"
          label="Email"
          defaultValue={user?.email || ''}
        />
        <EditableField
          type="password"
          label="Password"
          defaultValue={''}
        />
        <EditableField
          type="mobile"
          label="Phone"
        />
        <EditableField
          type="text"
          label="Address"
        />
        <EditableField
          type="text"
          label="Country"
        />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Button Container */}
          <div className="flex items-center justify-end mb-6 space-x-4">
            <Button
              radius="md"
              color="danger"
              variant="bordered"
              className={`${kanit.className} text-lg text-red-600 flex items-center space-x-4 justify-between gap-x-2`}
            >
              Delete Profile
            </Button>
            <Button
              radius="md"
              color="success"
              variant="solid"
              className={`${kanit.className} text-lg text-white flex items-center space-x-4 justify-between gap-x-2`}
              onClick={() => { router.push('/') }}
            >
              Save Changes
            </Button>
          </div>
        <EditableField
          type="text"
          label="Gender"
          defaultValue={user?.gender || ''}
        />

          {/* Date of birth*/}
          <div className="grid grid-cols-1 gap-4">
          <EditableField
            type="date"
            label="Date of Birth"
            defaultValue={user?.date_of_birth || ''}
          />
          </div>
          <EditableField
            type="link"
            label="Social Media"
          />
          <EditableTextarea
            type='text'
            label="Description"
          />
          <EditableTextarea
            type='text'
            label="Requirements"
          />
          <EditableField
            type="money"
            label="Expected Fee"
          />
          <EditableSelect
            label="Payment method"
            options={paymentOptions}
            defaultValue=""
          />
        </div>
      </div>
      <div className="mt-12 w-full mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-black">TASKER REVIEWS</h2>
        <Reviews />
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;