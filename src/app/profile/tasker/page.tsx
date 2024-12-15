'use client';
import AvatarUpload from "@/components/profile/avatar";
import React, { useState } from "react";
import Reviews from "@/components/profile/review";
import EditableField from "@/components/profile/editable";
import EditableTextarea from "@/components/profile/editabletext";
import EditableChipInput from "@/components/profile/editablechip";
import HeaderProfile from "@/components/profile/headerprofile";
import { ProtectedRoute } from "@/components/protectedRoute";
import { useAppSelector } from '@/redux/store';
import { Input } from '@nextui-org/react';

const TaskerProfilePage = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const handleFileSelect = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setAvatarUrl(imageUrl);
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
        <div className="bg-white shadow-sm mt-2 p-10 rounded-md w-full">
          <HeaderProfile />
          <div className="flex justify-center shadow-sm p-6 rounded-lg">
            <AvatarUpload
              avatarUrl={avatarUrl}
              onFileSelect={handleFileSelect}
            />
          </div>
          {/* Main Content */}
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 bg-white shadow-sm p-12 rounded-md">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Personal Info */}
              <EditableField
                type="text"
                label="Name"
                defaultValue={`${user?.profile.first_name ?? ''} ${user?.profile.last_name ?? ''}`.trim()}
              />
              {/* Contact Info */}
              <EditableField
                type="email"
                label="Email"
                defaultValue={user?.email || ''}
              />
              <EditableField
                type="text"
                label="Phone Number"
                defaultValue={user?.profile.phone_number || ''}
              />
              <EditableField
                type="text"
                label="Work Area"
                defaultValue={user?.tasker?.work_area || ''}
              />
              <Input
                isDisabled
                type="text"
                label="Completed Tasks"
                defaultValue={user?.tasker?.completed_tasks.toString() || ''}
              />
            </div>
            {/* Right Column */}
            <div className="space-y-6">
              <EditableChipInput
                label="Skills"
                defaultValue={user?.tasker?.skills.map(skill => skill.name) || []}
              />
              <EditableTextarea
                type="text"
                label="Experience"
                defaultValue={user?.tasker?.experience || ''}
              />
              <Input
                isDisabled
                type="text"
                label="Average Rating"
                defaultValue={user?.tasker?.avg_rating.toString() || ''}
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
        <div className="bg-white shadow-md mx-auto mt-12 p-6 rounded-lg w-full">
          <h2 className="mb-4 font-semibold text-2xl text-black text-center">CUSTOMER REVIEWS</h2>
          <Reviews />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TaskerProfilePage; 